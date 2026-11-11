"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { InstagramLogo, List, WhatsappLogo, X } from "@phosphor-icons/react";
import type { Dict, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { buttonClass } from "./Button";
import { Mark } from "./Wordmark";
import { RollText } from "./RollText";

// Navegación en una píldora fija al centro.
// - Escritorio: marca, las secciones a la vista, idioma, WhatsApp y "Pedir presupuesto". Abajo en la portada del
//   inicio; pasado el 60% de esa pantalla, y en las demás páginas, arriba (globals.css).
// - Celular: marca, WhatsApp y el botón de menú, siempre abajo (al alcance del pulgar).
// El menú es un popover nativo (Esc, click afuera y foco los resuelve el navegador).
export function Nav({ lang, t }: { lang: Locale; t: Pick<Dict, "nav" | "menu" | "langLabel" | "cta" | "contact"> }) {
  const path = usePathname();
  const menu = useRef<HTMLDivElement>(null);
  const other: Locale = lang === "es" ? "en" : "es";
  const langHref = path.replace(/^\/(es|en)/, `/${other}`);
  const contactHref = `/${lang}/contacto`;
  // La página de contacto ya es el formulario; en las demás, el formulario está al pie (#consulta).
  const quoteHref = path === contactHref ? contactHref : "#consulta";
  const links = [
    { href: `/${lang}`, label: t.nav.home },
    { href: `/${lang}/proyectos`, label: t.nav.projects },
    { href: `/${lang}/servicios`, label: t.nav.services },
    { href: `/${lang}/nosotros`, label: t.nav.about },
    { href: contactHref, label: t.nav.contact },
  ];
  const isActive = (href: string) => path === href || (href !== `/${lang}` && path.startsWith(href + "/"));
  const close = () => menu.current?.hidePopover();
  // El logo: desde otra página lleva al inicio; ya en el inicio, sube hasta arriba.
  const toTop = (e: React.MouseEvent) => {
    close();
    if (path !== `/${lang}`) return;
    e.preventDefault();
    scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  // Escritorio: la píldora va abajo solo en la primera pantalla del inicio (el CSS solo la sube desde 64rem).
  useEffect(() => {
    const root = document.documentElement;
    const home = path === `/${lang}`;
    const onScroll = () => root.toggleAttribute("data-scrolled", !home || scrollY > innerHeight * 0.6);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, [path, lang]);

  const small = "py-1 text-muted transition-colors duration-300 hover:text-ink";

  return (
    <>
      <nav
        aria-label={t.menu}
        className="pill fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 mx-auto flex w-fit items-center gap-1 rounded-full border border-white/60 bg-[rgb(236_235_230/0.78)] p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_14px_40px_-14px_rgb(14_28_51/0.4)] backdrop-blur-xl backdrop-saturate-150"
      >
        <Link href={`/${lang}`} onClick={toTop} aria-label={`${site.name}, ${t.nav.home}`} className="rounded-full">
          <Mark className="size-11 text-[17px]" />
        </Link>

        {/* Escritorio: secciones a la vista (el inicio lo da la marca) */}
        <ul className="hidden items-center px-2 lg:flex">
          {links.slice(1).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="group flex h-11 items-center px-3 text-[15px] font-medium aria-[current=page]:text-accent"
              >
                <RollText text={l.label} />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={langHref}
          hrefLang={other}
          lang={other}
          aria-label={t.langLabel}
          className="hidden h-11 items-center px-3 text-[15px] font-medium text-muted transition-colors duration-300 hover:text-ink lg:flex"
        >
          {other.toUpperCase()}
        </Link>

        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={t.contact.whatsapp}
            className="flex h-11 min-w-36 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-medium transition-colors duration-300 hover:text-accent lg:min-w-0 lg:px-3"
          >
            <WhatsappLogo size={20} aria-hidden className="text-accent" />
            <span className="lg:hidden">{t.contact.whatsapp}</span>
          </a>
        )}

        <Link
          href={quoteHref}
          className="hidden h-11 items-center rounded-full bg-accent px-5 text-[15px] font-medium whitespace-nowrap text-deep-ink transition-colors duration-300 hover:bg-ink active:scale-[0.98] lg:inline-flex"
        >
          {t.cta.quote}
        </Link>

        {/* Celular: botón de menú, blanco sólido sobre el vidrio de la píldora, con el ícono en el acento */}
        <button
          type="button"
          popoverTarget="menu"
          className="group flex h-11 items-center gap-2.5 rounded-full border border-line/70 bg-white pr-4 pl-5 text-[15px] font-medium text-ink shadow-[0_1px_2px_rgb(14_28_51/0.08),0_6px_16px_-6px_rgb(14_28_51/0.25)] lg:hidden"
        >
          <RollText text={t.menu} />
          <List size={18} aria-hidden className="menu-open text-accent" />
          <X size={18} aria-hidden className="menu-close text-accent" />
        </button>
      </nav>

      <div id="menu" ref={menu} popover="auto" className="menu-card">
        <div className="rounded-3xl border border-line bg-card p-6 shadow-[0_24px_60px_-20px_rgb(28_31_27/0.35)] md:p-8">
          <p className="label text-muted">{t.menu}</p>
          <ul className="mt-3 grid gap-x-6 sm:mt-4 sm:grid-cols-2">
            {links.map((l, i) => (
              <li key={l.href} className="menu-link border-b border-line/70 last:border-0 sm:border-0" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={l.href}
                  onClick={close}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="group title block py-3 text-[1.75rem] aria-[current=page]:text-accent sm:py-1.5"
                >
                  <RollText text={l.label} />
                </Link>
              </li>
            ))}
          </ul>

          {/* Dos filas parejas: a la izquierda el dato, a la derecha la acción. Nada se pisa en pantallas angostas. */}
          <div className="menu-link mt-6 flex flex-col gap-1 border-t border-line pt-4 text-[15px]" style={{ "--i": links.length } as React.CSSProperties}>
            <div className="flex min-h-11 items-center justify-between gap-4">
              <a href={`mailto:${site.email}`} className={`group ${small} inline-flex min-h-11 min-w-0 items-center overflow-hidden`}>
                <RollText text={site.email} />
              </a>
              <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="-mr-2.5 flex size-11 shrink-0 items-center justify-center text-muted transition-colors hover:text-ink">
                <InstagramLogo size={20} weight="light" aria-hidden />
              </a>
            </div>
            {site.phone && (
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className={`${small} min-h-11 content-center`}>
                {site.phone}
              </a>
            )}
            <div className="flex min-h-11 items-center justify-between gap-4">
              <span className="min-w-0 truncate text-muted">{t.contact.zone}</span>
              <Link href={langHref} hrefLang={other} lang={other} onClick={close} className="group shrink-0 py-2 font-medium text-ink">
                <RollText text={t.langLabel} />
              </Link>
            </div>
          </div>

          <Link
            href={quoteHref}
            onClick={close}
            className={`menu-link mt-7 w-full justify-center ${buttonClass("accent")}`}
            style={{ "--i": links.length + 1 } as React.CSSProperties}
          >
            {t.cta.quote}
          </Link>
        </div>
      </div>
    </>
  );
}
