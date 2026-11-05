"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { Locale } from "@/lib/i18n";
import type { Photo } from "@/lib/projects";
import { SplitText } from "./SplitText";
import { RollText } from "./RollText";
import { SHADE, calm, flyInto, open, opened as openedIn, recall, track, traversed } from "./flight";

type Step = { id: string; name: string; photo: Photo };

// Reglas del viaje de la foto: ver flight.ts.

// Envuelve la foto de cada servicio en /servicios: anota su posición y recibe el vuelo al ir "adelante".
export function ServicePhotoAnchor({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => track("service:photo", () => (id === openedIn("service") ? ref.current : null)), [id]);
  useEffect(() => {
    const el = ref.current;
    const from = recall("service:from");
    if (!el || !from || id !== openedIn("service") || !traversed() || calm()) return;
    return flyInto(el, from, { radius: ["1.5rem", "1.5rem"], shade: [1, 0], hide: [el] });
  }, [id]);
  return <div ref={ref}>{children}</div>;
}

// Servicios en tarjetas lado a lado. En escritorio la activa se ensancha; cambia al pasar el mouse
// (o el foco) y sola cada 12 s (la línea marca el tiempo y se detiene con el mouse encima).
// El texto tiene el ancho fijo de una tarjeta angosta: al ensancharse solo crece la foto, el texto no se mueve.
// Debajo de 1024 px es una fila que se desliza de costado.
export function ServiceCards({ title, link, steps, lang }: { title: string; link: string; steps: Step[]; lang: Locale }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  // Contenido que cambia solo: una vuelta completa y se detiene (pauta de accesibilidad para lo que se mueve
  // solo). Se pausa con el mouse encima o con el foco del teclado en una tarjeta.
  const advanced = useRef(0);
  const next = () => {
    advanced.current += 1;
    if (advanced.current >= steps.length - 1) setAuto(false);
    setActive((a) => (a + 1) % steps.length);
  };
  const [naming, setNaming] = useState<string | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const photos = useRef<(HTMLDivElement | null)[]>([]);
  const pad = (n: number) => String(n).padStart(2, "0");
  const cardOf = (id: string | null) => photos.current[steps.findIndex((s) => s.id === id)] ?? undefined;

  // El nombre de transición de la tarjeta dura lo que dura el viaje del click.
  useEffect(() => {
    if (!naming) return;
    const t = setTimeout(() => setNaming(null), 1200);
    return () => clearTimeout(t);
  }, [naming]);

  // Posición de la tarjeta abierta (vuelo al ir "adelante") y vuelo de regreso al volver "atrás".
  useEffect(() => track("service:from", () => cardOf(openedIn("service"))));
  useEffect(() => {
    const el = cardOf(openedIn("service"));
    const from = recall("service:photo");
    if (!el || !from || !traversed() || calm()) return;
    const veil = el.nextElementSibling as HTMLElement;
    const text = el.parentElement!.querySelector<HTMLElement>(".svc-text")!;
    return flyInto(el, from, { radius: ["1.5rem", "1.5rem"], shade: [0, 1], hide: [el, veil], reveal: [text] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // El avance automático solo corre en escritorio y con las tarjetas casi enteras en pantalla.
  useEffect(() => {
    const el = row.current;
    if (!el) return;
    const desk = matchMedia("(min-width: 64rem)");
    const io = new IntersectionObserver(([e]) => setAuto(e.isIntersecting && desk.matches && advanced.current < steps.length - 1), { threshold: 0.9 });
    io.observe(el);
    return () => io.disconnect();
  }, [steps.length]);

  return (
    <div className="pt-20 md:pt-36">
      <div className="wrap flex items-end justify-between gap-8">
        <SplitText text={title} className="title max-w-[20ch] text-[2.25rem] md:text-6xl" />
        <Link href={`/${lang}/servicios`} className="group hidden min-h-11 shrink-0 items-center gap-2 text-[15px] md:flex">
          <RollText text={link} />
          <ArrowRight size={16} aria-hidden className="transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </div>

      <div
        ref={row}
        style={{ "--n": steps.length } as React.CSSProperties}
        className="svc mt-10 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 [scrollbar-width:none] md:scroll-px-10 md:px-10 lg:wrap lg:mt-16 lg:h-[min(72svh,46rem)] lg:snap-none lg:overflow-visible"
      >
        {steps.map((s, i) => {
          const on = i === active;
          return (
            <Link
              key={s.id}
              href={`/${lang}/servicios#${s.id}`}
              transitionTypes={["service"]}
              onClick={() => {
                open("service", s.id, photos.current[i]);
                setNaming(s.id);
              }}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              onFocus={() => setActive(i)}
              className={`relative isolate flex aspect-[4/5] w-[78vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-3xl text-on-photo sm:w-[46vw] lg:aspect-auto lg:w-auto lg:min-w-0 lg:basis-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo ${on ? "lg:grow-[2]" : "lg:grow"}`}
            >
              <ViewTransition name={naming === s.id ? `service-${s.id}` : undefined} share="morph" default="none">
                <div ref={(n) => void (photos.current[i] = n)} className="absolute inset-0 -z-10">
                  <Image src={s.photo.src} alt="" fill sizes="(min-width: 1024px) 45vw, 80vw" placeholder="blur" blurDataURL={s.photo.blur} className="object-cover" />
                </div>
              </ViewTransition>
              <div aria-hidden className="absolute inset-0 -z-10" style={{ background: SHADE }} />
              <div className="svc-text p-5 lg:p-7">
                <span className="text-sm text-on-photo/75 tabular-nums">{pad(i + 1)}</span>
                <h3 className="title mt-2 text-[1.75rem] leading-[1.1] lg:text-[clamp(1.125rem,1.6vw,1.75rem)]">{s.name}</h3>
                <span aria-hidden className={`mt-5 hidden h-px bg-on-photo/25 lg:block ${auto && on ? "" : "invisible"}`}>
                  {auto && on && <span key={active} className="svc-bar block h-full bg-on-photo" onAnimationEnd={next} />}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="wrap mt-10 md:hidden">
        <Link href={`/${lang}/servicios`} className="group flex min-h-11 w-fit items-center gap-2 text-[15px]">
          <RollText text={link} />
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </div>
  );
}
