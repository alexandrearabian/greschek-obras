"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Comportamientos globales, sin markup:
// 1. Revela los [data-reveal] al entrar en pantalla, escalonando los que entran juntos.
//    Lo que ya se ve al cargar no se toca (sin JS, todo queda visible).
// 2. Después del logo de carga, las entradas dejan de esperarlo (navegar entre páginas no lo repite).
export function Motion() {
  const path = usePathname();

  useEffect(() => {
    // ponytail: 3 s cubre logo + entradas de la portada; si se alargan, subir este número.
    const t = setTimeout(() => (document.documentElement.dataset.seen = ""), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not(.in)")].filter(
      (el) => el.getBoundingClientRect().top > innerHeight,
    );
    els.forEach((el) => el.classList.add("pre"));

    const io = new IntersectionObserver(
      (entries) => {
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--rd", `${Math.min(i, 5) * 80}ms`);
            el.classList.replace("pre", "in");
            io.unobserve(el);
          });
      },
      // Margen fijo y chico: lo último de la página (el nombre gigante del footer) también llega a entrar.
      { rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

  return null;
}
