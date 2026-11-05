"use client";

import { useEffect, useLayoutEffect, useRef, useState, ViewTransition } from "react";
import { DURATION, EASE, HERO_SHADE, calm, flyInto, open, opened, recall, track, traversed } from "./flight";

// Esquinas de la portada de la obra: a todo el ancho, rectas arriba y redondeadas abajo.
const HERO = "0 0 2rem 2rem";
const share = { project: "morph", default: "none" };

// Origen del viaje hacia una obra: la portada de una tarjeta (/proyectos, "siguiente obra").
// Reglas: ver flight.ts. Escucha el click del link que la contiene (foto o texto, da igual).
export function ProjectCoverAnchor({ slug, radius = "1rem", children }: { slug: string; radius?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [naming, setNaming] = useState(false);

  useEffect(() => {
    const link = ref.current?.closest("a");
    if (!link) return;
    const onClick = () => {
      open("project", slug, ref.current);
      setNaming(true);
    };
    link.addEventListener("click", onClick);
    return () => link.removeEventListener("click", onClick);
  }, [slug]);
  useEffect(() => {
    if (!naming) return;
    const t = setTimeout(() => setNaming(false), 1200);
    return () => clearTimeout(t);
  }, [naming]);

  useEffect(() => track("project:from", () => (slug === opened("project") ? ref.current : null)), [slug]);
  // Atrás desde la obra: la portada vuelve a acomodarse en esta tarjeta.
  useEffect(() => {
    const el = ref.current;
    const from = recall("project:hero");
    if (!el || !from || slug !== opened("project") || !traversed() || calm()) return;
    return flyInto(el, from, { radius: [HERO, radius], veil: HERO_SHADE, shade: [1, 0], hide: [el] });
  }, [slug, radius]);

  return (
    <ViewTransition name={naming ? `cover-${slug}` : undefined} share={share} default="none">
      <div ref={ref}>{children}</div>
    </ViewTransition>
  );
}

// Destino: la portada de la página de la obra. Al llegar con "adelante" del navegador, la foto vuela hasta acá
// y después aparecen el degradé y los textos ([data-hero-reveal] de la misma portada).
export function ProjectHeroAnchor({ slug, children }: { slug: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => track("project:hero", () => (slug === opened("project") ? ref.current : null)), [slug]);
  useEffect(() => {
    const el = ref.current;
    const from = recall("project:from");
    if (!el || !from || slug !== opened("project") || !traversed() || calm()) return;
    const reveal = [...(el.parentElement?.querySelectorAll<HTMLElement>("[data-hero-reveal]") ?? [])];
    return flyInto(el, from, { radius: ["1rem", HERO], veil: HERO_SHADE, shade: [1, 1], hide: [el], reveal });
  }, [slug]);
  // En el click, las esquinas de la caja que viaja pasan de las de la miniatura a las de la portada durante el viaje
  // (la caja recorta la foto, así lo que se ve al aterrizar ya es la forma final: nada se corta al terminar).
  // React no avisa este emparejamiento (la página anterior queda oculta, no desmontada): se toma la transición
  // activa del navegador al montar la portada.
  useLayoutEffect(() => {
    const vt = (document as Document & { activeViewTransition?: { ready: Promise<void> } }).activeViewTransition;
    if (!vt) return;
    let a: Animation | undefined;
    vt.ready
      .then(() => {
        a = document.documentElement.animate([{ borderRadius: "1rem" }, { borderRadius: HERO }], {
          duration: DURATION,
          easing: EASE,
          fill: "both",
          pseudoElement: `::view-transition-group(cover-${slug})`,
        });
      })
      .catch(() => {});
    return () => a?.cancel();
  }, [slug]);
  return (
    <ViewTransition name={`cover-${slug}`} share={share} default="none">
      <div ref={ref} className="absolute inset-0 -z-10">
        {children}
      </div>
    </ViewTransition>
  );
}
