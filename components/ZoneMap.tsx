"use client";

import { useEffect, useRef } from "react";
import type { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

// ponytail: mapa provisorio con teselas gratuitas de OpenFreeMap (sin clave, uso comercial permitido).
// Reemplazar más adelante (PENDIENTES.md). Sin gestos: no le roba el scroll a la página.
// Centrado en Nordelta, con zoom suficiente para ver los barrios de alrededor.
const center: [number, number] = [-58.645, -34.405];

export function ZoneMap({ title }: { title: string }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let map: Map | undefined;
    let dead = false;
    // La librería (~200 KB) se baja recién cuando el mapa está por entrar en pantalla.
    const io = new IntersectionObserver(
      async ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const ml = await import("maplibre-gl");
        if (dead) return;
        ml.setWorkerUrl(new URL("maplibre-gl/dist/maplibre-gl-worker.mjs", import.meta.url).href);
        map = new ml.Map({
          container: el,
          style: "https://tiles.openfreemap.org/styles/positron",
          center,
          zoom: 10.6,
          interactive: false,
          attributionControl: { compact: true },
        });
        map.on("style.load", () => {
          // Tonos de la paleta: tierra como el fondo del sitio, agua en un azul apagado.
          map?.setPaintProperty("background", "background-color", "#f1f0ec");
          map?.setPaintProperty("water", "fill-color", "#d3dde8");
        });
        // La atribución compacta arranca abierta y solo se cierra al mover el mapa (que acá no se mueve):
        // queda el botón "i", que la abre al tocarlo.
        map.on("load", () => el.querySelector(".maplibregl-ctrl-attrib")?.classList.remove("maplibregl-compact-show"));
        const pin = document.createElement("span");
        pin.className = "map-pin";
        new ml.Marker({ element: pin }).setLngLat(center).addTo(map);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => {
      dead = true;
      io.disconnect();
      map?.remove();
    };
  }, []);

  return <div ref={box} role="img" aria-label={title} className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#f1f0ec]" />;
}
