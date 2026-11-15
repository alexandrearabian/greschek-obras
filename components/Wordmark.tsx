import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";

// Logo del cliente (Drive, `Greschek_Logos_Todos_v2`). Los SVG se usan como máscara (.logo y .mark en globals.css):
// el color lo pone un token, no el archivo.

// Horizontal con la brújula completa y el nombre al costado.
export function Wordmark({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link href={`/${lang}`} aria-label={site.name} className={`block w-fit ${className}`}>
      <span aria-hidden className="logo inline-block h-16 bg-accent align-top md:h-20" />
    </Link>
  );
}

// Brújula simplificada en un círculo: para tamaños chicos (píldora, pantalla de carga).
export function Mark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full bg-accent ${className}`}>
      <span className="mark size-[68%] bg-deep-ink" />
    </span>
  );
}
