import Link from "next/link";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { SplitText } from "./SplitText";
import { Wordmark } from "./Wordmark";
import { RollText } from "./RollText";

// Footer claro con el nombre gigante al pie, cortado por el borde, que entra letra por letra.
export function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  const nav = [
    [`/${lang}/proyectos`, t.nav.projects],
    [`/${lang}/servicios`, t.nav.services],
    [`/${lang}/nosotros`, t.nav.about],
    [`/${lang}/contacto`, t.nav.contact],
  ];
  const link = "w-fit py-2 text-[15px] text-muted transition-colors duration-300 hover:text-ink";
  return (
    <footer className="relative z-10 -mt-0.5 overflow-hidden bg-bg text-ink">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-8 pt-14 md:grid-cols-12 md:gap-12 md:pt-24">
        <div className="col-span-2 md:col-span-5">
          <Wordmark lang={lang} />
          <p className="mt-4 max-w-xs text-[15px] text-muted">{t.footer.tagline}</p>
        </div>
        {/* Celular: links en dos columnas y, debajo, email e Instagram en una fila. Escritorio: tres columnas. */}
        <nav aria-label={t.menu} className="col-span-2 grid grid-cols-2 gap-x-6 md:col-span-3 md:flex md:flex-col">
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className={`group ${link}`}>
              <RollText text={label} />
            </Link>
          ))}
        </nav>
        <div className="col-span-2 flex min-w-0 items-center justify-between gap-4 border-t border-line pt-4 md:col-span-4 md:flex-col md:items-start md:justify-start md:gap-0 md:border-0 md:pt-0">
          <div className="flex min-w-0 flex-col">
            <a href={`mailto:${site.email}`} className={`group ${link} max-w-full overflow-hidden`}>
              <RollText text={site.email} />
            </a>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={link}>
                {site.phone}
              </a>
            )}
          </div>
          <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="-mr-2.5 flex size-11 shrink-0 items-center justify-center text-muted transition-colors hover:text-ink md:mt-3 md:-ml-2.5">
            <InstagramLogo size={22} weight="light" aria-hidden />
          </a>
        </div>
      </div>
      <div className="wrap mt-12 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-line pt-6 text-[13px] text-muted md:mt-14">
        <span>© {site.name}</span>
        <span>{t.footer.rights}</span>
      </div>
      <div aria-hidden className="mt-6 select-none">
        <SplitText as="p" text="Greschek" className="-mb-[0.16em] text-center text-[18.5vw] leading-none font-light tracking-[-0.05em] text-accent uppercase" />
      </div>
    </footer>
  );
}
