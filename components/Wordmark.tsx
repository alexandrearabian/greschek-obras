import Link from "next/link";
import type { Locale } from "@/lib/i18n";

// ponytail: wordmark y marca tipográficos provisorios hasta tener el logo en vector (ver PENDIENTES.md).
export function Wordmark({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link href={`/${lang}`} className={`flex items-baseline gap-2 py-2 text-[15px] tracking-[0.24em] uppercase ${className}`}>
      <span className="font-semibold">Greschek</span>
      <span className="font-normal opacity-60">Obras</span>
    </Link>
  );
}

export function Mark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex items-center justify-center rounded-full bg-accent font-semibold text-deep-ink ${className}`}>
      G
    </span>
  );
}
