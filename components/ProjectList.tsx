"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { flushSync } from "react-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/lib/projects";
import { open } from "./flight";

type Item = Pick<Project, "slug" | "name" | "location" | "type" | "cover">;
const share = { project: "morph", default: "none" };

// Portada de la obra a pantalla completa: se empieza a bajar apenas el mouse (o el foco) llega a la fila,
// así al abrir la obra ya está cargada y no se ve el placeholder desenfocado. Mismos parámetros que la portada
// de la página de la obra (fill, 100vw), así el navegador reusa exactamente esa descarga.
const warmed = new Set<string>();
function warm(src: string) {
  if (warmed.has(src)) return;
  warmed.add(src);
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: "100vw" });
  const img = new window.Image();
  img.sizes = props.sizes ?? "100vw";
  if (props.srcSet) img.srcset = props.srcSet;
  img.src = props.src;
}

/*
  Lista de obras. Con mouse, la portada de la fila señalada flota junto al cursor: lo sigue con retraso y se
  inclina hacia donde va. En pantallas táctiles cada fila trae su miniatura.
  Al abrir una obra, esa foto (la flotante o la miniatura) viaja hasta la portada de la obra (flight.ts).
  Para que el viaje salga siempre, la foto flotante tiene que estar visible al hacer click:
  - aparece apenas el puntero entra en una fila (no hace falta moverlo),
  - al scrollear se esconde y, cuando el scroll se detiene, reaparece bajo el cursor si quedó sobre una fila,
  - si igual no estaba visible al hacer click, aparece en ese instante, ya en su estado final.
*/
export function ProjectList({ projects, lang }: { projects: Item[]; lang: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  // Las fotos flotantes se bajan recién cuando la lista está por entrar en pantalla y hay mouse (~250 KB menos
  // para quien no llega a esta sección o usa el celular).
  const [armed, setArmed] = useState(false);
  // Nombre de transición solo durante el viaje: Next deja el inicio montado (oculto) y dos portadas con el
  // mismo nombre a la vez rompen las View Transitions.
  const [opened, setOpened] = useState<{ slug: string; from: "float" | "thumb" } | null>(null);
  const list = useRef<HTMLUListElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const pointer = useRef<{ x: number; y: number } | null>(null);
  const activeRef = useRef<number | null>(null);
  const fine = useRef(false);
  const on = active !== null;
  // La fila activa también en un ref, para los listeners (scroll, puntero) que no ven el estado actualizado.
  const setRow = (v: number | null) => {
    activeRef.current = v;
    setActive(v);
  };

  const show = (i: number, x: number, y: number) => {
    target.current = { x, y };
    if (activeRef.current === null) pos.current = { x, y }; // aparece donde está el cursor, no vuela desde otro lado
    setRow(i);
  };

  useEffect(() => {
    fine.current = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const el = list.current;
    if (!fine.current || !el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setArmed(true), io.disconnect()), { rootMargin: "100% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!opened) return;
    const t = setTimeout(() => {
      setOpened(null);
      box.current?.removeAttribute("data-instant");
    }, 1200);
    return () => clearTimeout(t);
  }, [opened]);

  // Seguimiento con retraso e inclinación.
  useEffect(() => {
    const el = box.current;
    if (!on || !el) return;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = calm ? 1 : 0.14;
    let raf = 0;
    const tick = () => {
      const p = pos.current;
      const dx = target.current.x - p.x;
      p.x += dx * k;
      p.y += (target.current.y - p.y) * k;
      const tilt = calm ? 0 : Math.max(-12, Math.min(12, dx * 0.12));
      el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  // Scroll: las filas se mueven bajo un cursor quieto. La foto se esconde mientras dura y, al detenerse,
  // vuelve bajo el cursor si quedó sobre una fila de esta lista.
  useEffect(() => {
    let t = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      if (activeRef.current !== null) setRow(null);
      clearTimeout(t);
      t = window.setTimeout(() => {
        const p = pointer.current;
        if (!p || !fine.current) return;
        const row = document.elementFromPoint(p.x, p.y)?.closest<HTMLElement>("[data-row]");
        if (row && list.current?.contains(row)) show(Number(row.dataset.row), p.x, p.y);
      }, 140);
    };
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      removeEventListener("pointermove", onMove);
      removeEventListener("scroll", onScroll);
    };
    // `show` solo usa refs y el setter del estado: no cambia entre renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const named = (slug: string, from: "float" | "thumb") => (opened?.slug === slug && opened.from === from ? `cover-${slug}` : undefined);

  return (
    <>
      <ul ref={list} className="rows border-t border-line" onPointerLeave={() => setRow(null)}>
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal>
            <Link
              href={`/${lang}/proyectos/${p.slug}`}
              data-row={i}
              transitionTypes={["project"]}
              onPointerEnter={(e) => {
                warm(p.cover.src);
                if (e.pointerType === "mouse") show(i, e.clientX, e.clientY);
              }}
              onPointerMove={(e) => {
                if (e.pointerType !== "mouse") return;
                target.current = { x: e.clientX, y: e.clientY };
                if (activeRef.current !== i) show(i, e.clientX, e.clientY);
              }}
              onFocus={() => warm(p.cover.src)}
              onClick={(e) => {
                const float = fine.current;
                const el = box.current;
                if (float && el) {
                  // La foto tiene que estar visible y quieta en la captura del viaje: si no lo estaba, aparece ya.
                  el.setAttribute("data-instant", "");
                  if (activeRef.current !== i) {
                    pos.current = target.current = { x: e.clientX, y: e.clientY };
                    el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
                    flushSync(() => setRow(i));
                  }
                }
                open("project", p.slug, float ? el?.firstElementChild : e.currentTarget.querySelector("[data-thumb]"));
                setOpened({ slug: p.slug, from: float ? "float" : "thumb" });
              }}
              className="group grid grid-cols-[1fr_auto] items-center gap-x-5 border-b border-line py-5 transition-opacity duration-500 md:grid-cols-[3.5rem_1fr_18rem_auto] md:py-9"
            >
              <span className="hidden text-sm text-muted tabular-nums md:block">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex items-center gap-4">
                <span data-thumb className="relative hidden size-16 shrink-0 overflow-hidden rounded-xl bg-surface [@media(hover:none)]:block">
                  <ViewTransition name={named(p.slug, "thumb")} share={share} default="none">
                    <span className="absolute inset-0">
                      <Image src={p.cover.src} alt="" fill sizes="64px" placeholder="blur" blurDataURL={p.cover.blur} className="object-cover" />
                    </span>
                  </ViewTransition>
                </span>
                <span className="title text-[1.75rem] transition-[color,translate] duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-accent md:text-5xl">
                  {p.name}
                </span>
              </span>
              <span className="hidden text-[15px] text-muted md:block">{[p.location, p.type].filter(Boolean).join(", ")}</span>
              <ArrowUpRight size={24} weight="light" aria-hidden className="text-muted transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
            </Link>
          </li>
        ))}
      </ul>

      <div ref={box} aria-hidden className="float-preview pointer-events-none fixed top-0 left-0 z-30 hidden w-[min(15rem,20vw)] [@media(hover:hover)_and_(pointer:fine)]:block">
        <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-20px_rgb(28_31_27/0.5)] transition-[opacity,scale] duration-500 ease-out-expo ${on ? "scale-100 opacity-100" : "scale-75 opacity-0"}`}>
          {armed && projects.map((p, i) => (
            <ViewTransition key={p.slug} name={named(p.slug, "float")} share={share} default="none">
              <div className="absolute inset-0">
                <Image
                  src={p.cover.src}
                  alt=""
                  fill
                  sizes="240px"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={p.cover.blur}
                  className={`object-cover transition-[opacity,scale] duration-700 ease-out-expo ${i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                />
              </div>
            </ViewTransition>
          ))}
        </div>
      </div>
    </>
  );
}
