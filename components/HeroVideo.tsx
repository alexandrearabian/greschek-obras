"use client";

import { useEffect, useRef } from "react";

// Video de la portada (del terreno a la casa terminada) que avanza con el scroll: nunca se reproduce solo.
// Recorre el alto del separador que sigue a la portada (--scrub, en la página de inicio) y en el último tramo se
// funde: queda la foto real de abajo. Lo generado es solo el proceso; la casa final es la foto (PENDIENTES.md).
// El scroll es el del navegador: acá solo se lee su posición.
export function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current!;
    const spacer = v.closest("section")!.nextElementSibling as HTMLElement;
    let raf = 0;
    const draw = () => {
      raf = 0;
      const p = Math.min(1, Math.max(0, scrollY / (spacer.offsetHeight || 1)));
      v.style.opacity = String(Math.min(1, (1 - p) / 0.08));
      if (!v.duration) return;
      // Sin encimar pedidos: si todavía está buscando el cuadro anterior, se reintenta en el próximo.
      if (v.seeking) raf = requestAnimationFrame(draw);
      else v.currentTime = p * (v.duration - 0.05);
    };
    const onScroll = () => void (raf ||= requestAnimationFrame(draw));
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    v.addEventListener("loadedmetadata", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      v.removeEventListener("loadedmetadata", onScroll);
    };
  }, []);

  // Con movimiento reducido no hay separador ni video: se ve la foto.
  return (
    <video
      ref={ref}
      src={src}
      poster={src.replace(/\.mp4$/, ".jpg")}
      muted
      playsInline
      preload="auto"
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 size-full object-cover motion-reduce:hidden"
    />
  );
}
