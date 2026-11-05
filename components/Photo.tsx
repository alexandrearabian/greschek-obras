import Image from "next/image";
import { ArrowsOut } from "@phosphor-icons/react/dist/ssr";
import type { Photo as P } from "@/lib/projects";

type Props = {
  photo: P;
  sizes: string;
  /** Recorte fijo, ej. "aspect-[3/2]". Sin ratio ni fill, usa la proporción original. */
  ratio?: string;
  /** Ocupa el contenedor (el padre define el tamaño). */
  fill?: boolean;
  className?: string;
  preload?: boolean;
  reveal?: boolean;
};

// Foto con espacio reservado (sin saltos), placeholder desenfocado mientras carga y entrada al hacer scroll.
export function Photo({ photo, sizes, ratio, fill = false, className = "", preload = false, reveal = true }: Props) {
  return (
    <div
      data-reveal={reveal ? "" : undefined}
      className={`relative overflow-hidden bg-surface ${fill ? "h-full w-full" : `rounded-2xl ${ratio ?? ""}`} ${className}`}
      style={fill || ratio ? undefined : { aspectRatio: `${photo.w} / ${photo.h}` }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        blurDataURL={photo.blur}
        className="object-cover"
      />
    </div>
  );
}

// Foto que abre el visor (<Lightbox>) en la posición `index`.
// Con `caption`: al pasar el mouse se oscurece la mitad de abajo y aparece el texto (en táctil, siempre).
// `touchCaption`: en pantallas táctiles (sin hover) el texto queda siempre visible; en grillas densas conviene apagarlo.
export function PhotoButton({ index, className = "", caption, hint, touchCaption = true, ...props }: Props & { index: number; caption?: string; hint?: string; touchCaption?: boolean }) {
  return (
    <button
      type="button"
      data-lb={index}
      aria-haspopup="dialog"
      className={`group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl ${props.fill ? "h-full" : ""} ${className}`}
    >
      <Photo {...props} />
      {caption && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex h-1/2 items-end justify-between gap-4 bg-[linear-gradient(to_top,rgb(14_18_26/0.78),rgb(14_18_26/0.35)_45%,transparent)] p-3 text-left text-on-photo opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 sm:p-5 md:p-6 ${touchCaption ? "[@media(hover:none)]:opacity-100" : ""}`}
        >
          <span className="translate-y-2 text-[13px] font-medium transition-transform duration-700 sm:text-[15px] [@media(hover:none)]:translate-y-0 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">{caption}</span>
          {hint && (
            <span className="hidden translate-y-2 items-center gap-1.5 text-sm text-on-photo/80 sm:flex transition-transform delay-75 duration-700 ease-out-expo group-hover:translate-y-0 group-focus-visible:translate-y-0">
              {hint}
              <ArrowsOut size={14} aria-hidden />
            </span>
          )}
        </span>
      )}
    </button>
  );
}
