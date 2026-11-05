"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import type { Photo } from "@/lib/projects";

type Labels = { close: string; prev: string; next: string };

// Envuelve una galería. Cualquier botón hijo con data-lb={índice} abre el visor en esa foto.
// <dialog> nativo: Esc cierra, el foco queda adentro y vuelve al botón al cerrar.
export function Lightbox({
  photos,
  title,
  labels,
  children,
  ...rest
}: { photos: Photo[]; title?: string; labels: Labels; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const dialog = useRef<HTMLDialogElement>(null);
  const startX = useRef<number | null>(null);
  const swiped = useRef(false);
  const frame = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  // Las fotos del visor se montan recién la primera vez que se abre: antes no se descarga nada.
  const [used, setUsed] = useState(false);
  const n = photos.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  // La actual y sus vecinas: las vecinas quedan cargadas e invisibles para pasar sin espera.
  const shown = used ? [...new Set([(i - 1 + n) % n, i, (i + 1) % n])] : [];

  function open(e: React.MouseEvent) {
    const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-lb]");
    if (!btn) return;
    setI(Number(btn.dataset.lb));
    setUsed(true);
    dialog.current?.showModal();
  }

  // Click fuera de la foto (fondo, barras, bordes vacíos de object-contain) cierra el visor.
  function closeOutside(e: React.MouseEvent) {
    if (swiped.current) return; // el gesto de deslizar no cuenta como click
    if ((e.target as HTMLElement).closest("button") || !frame.current) return;
    const box = frame.current.getBoundingClientRect();
    const p = photos[i];
    const s = Math.min(box.width / p.w, box.height / p.h);
    const x = box.left + (box.width - p.w * s) / 2;
    const y = box.top + (box.height - p.h * s) / 2;
    const inside = e.clientX >= x && e.clientX <= x + p.w * s && e.clientY >= y && e.clientY <= y + p.h * s;
    if (!inside) dialog.current?.close();
  }

  return (
    <div {...rest} className={rest.className} onClick={open}>
      {children}
      <dialog
        ref={dialog}
        aria-label={title}
        className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-[#0e121a]/97 p-0 text-on-photo backdrop:bg-transparent"
        onClick={closeOutside}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between gap-6 px-5 md:px-10">
            <p className="text-[15px] tabular-nums" aria-live="polite">
              {i + 1} / {n}
            </p>
            {title && <p className="truncate text-sm text-on-photo/70">{title}</p>}
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="-mr-3 flex size-11 items-center justify-center transition-opacity hover:opacity-70"
            >
              <X size={26} weight="light" aria-hidden />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>

          <div
            className="lightbox-stage relative flex-1 touch-pan-y"
            onPointerDown={(e) => {
              startX.current = e.clientX;
              swiped.current = false;
            }}
            onPointerUp={(e) => {
              if (startX.current === null) return;
              const dx = e.clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 50) {
                swiped.current = true;
                go(dx < 0 ? 1 : -1);
              }
            }}
          >
            <div ref={frame} className="absolute inset-x-0 inset-y-2 md:inset-x-24 md:inset-y-6">
              {shown.map((k) => (
                <Image
                  key={photos[k].src}
                  src={photos[k].src}
                  alt={k === i ? photos[k].alt : ""}
                  fill
                  sizes="100vw"
                  loading="eager"
                  placeholder="blur"
                  blurDataURL={photos[k].blur}
                  draggable={false}
                  className={`object-contain transition-opacity duration-500 ease-out select-none ${k === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
            {n > 1 && (
              <>
                <NavButton label={labels.prev} onClick={() => go(-1)} className="left-2 md:left-6">
                  <ArrowLeft size={22} weight="light" aria-hidden />
                </NavButton>
                <NavButton label={labels.next} onClick={() => go(1)} className="right-2 md:right-6">
                  <ArrowRight size={22} weight="light" aria-hidden />
                </NavButton>
              </>
            )}
          </div>
          <div className="h-6 shrink-0 md:h-10" />
        </div>
      </dialog>
    </div>
  );
}

function NavButton({ label, onClick, className, children }: { label: string; onClick: () => void; className: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-on-photo/25 transition-colors hover:border-on-photo/70 sm:flex ${className}`}
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
