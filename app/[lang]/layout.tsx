import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/albert-sans";
import { dict, isLocale, locales } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Mark } from "@/components/Wordmark";
import { Motion } from "@/components/Motion";
import "../globals.css";

// Sitio 100% estático: cualquier URL fuera de las generadas da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = { themeColor: "#f3f2ee", colorScheme: "light" };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = dict[lang];
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    alternates: { languages: { "es-AR": "/es", en: "/en" } },
    openGraph: { siteName: site.name, locale: lang === "es" ? "es_AR" : "en_US", images: "/obras/casa-laguna/03.webp" },
  };
}

// Corre antes de pintar: si el logo de carga ya se vio en esta sesión, no se repite; y fuera del inicio
// la píldora ya arranca arriba (sin verla saltar desde abajo al hidratar).
const seen = `var d=document.documentElement;try{sessionStorage.seen?d.dataset.seen="":sessionStorage.seen=1}catch(e){}if(!/^\\/(es|en)\\/?$/.test(location.pathname))d.dataset.scrolled=""`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];

  return (
    <html lang={lang === "es" ? "es-AR" : "en"} className="antialiased" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: seen }} />
        <div className="intro" aria-hidden>
          <div className="flex flex-col items-center gap-5">
            <Mark className="size-14" />
            <span className="flex items-baseline gap-2 text-[15px] tracking-[0.24em] uppercase">
              <span className="font-semibold">Greschek</span>
              <span className="opacity-60">Obras</span>
            </span>
            <span className="h-px w-24 bg-line">
              <span className="intro-bar block h-full bg-accent" />
            </span>
          </div>
        </div>
        <a href="#main" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
          {t.skip}
        </a>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer lang={lang} t={t} />
        <Nav lang={lang} t={{ nav: t.nav, menu: t.menu, langLabel: t.langLabel, cta: t.cta, contact: t.contact }} />
        <Motion />
      </body>
    </html>
  );
}
