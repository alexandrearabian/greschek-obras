import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLocale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { Photo } from "@/components/Photo";
import { Stats } from "@/components/Stats";
import { ContactSection } from "@/components/ContactSection";
import { PageHeader } from "@/components/PageHeader";
import { SplitText } from "@/components/SplitText";

export async function generateMetadata({ params }: PageProps<"/[lang]/nosotros">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].about.title, description: dict[lang].about.lead };
}

export default async function AboutPage({ params }: PageProps<"/[lang]/nosotros">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const [, , pergola, galeria] = getProjects(lang);

  return (
    <>
      <PageHeader title={t.about.title} lead={t.about.lead} />

      {/* Foto ancha + texto en dos columnas */}
      <section className="wrap pb-20 md:pb-36">
        <Photo photo={galeria.photos[2]} ratio="aspect-[3/2] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" preload />
        <div className="mt-14 grid gap-8 md:mt-20 md:grid-cols-12">
          {t.about.body.map((p) => (
            <p key={p} data-reveal className="text-lg text-muted md:col-span-5 md:even:col-start-7">
              {p}
            </p>
          ))}
        </div>
      </section>

      <section data-section={t.about.statsTitle} className="wrap">
        <div className="rounded-3xl bg-surface px-5 py-14 md:px-12 md:py-28 lg:px-16">
          <SplitText text={t.about.statsTitle} className="title text-[2.25rem] md:text-6xl" />
          <div className="mt-14 md:mt-20">
            <Stats stats={t.home.stats} />
          </div>
        </div>
      </section>

      {/* Frase con foto vertical al costado */}
      <section className="wrap grid items-center gap-10 py-20 md:grid-cols-12 md:gap-8 md:py-36">
        <blockquote data-reveal className="md:col-span-7">
          <p className="display text-[2.25rem] md:text-7xl">{t.about.quote}</p>
        </blockquote>
        <div className="md:col-span-4 md:col-start-9">
          <Photo photo={pergola.photos[3]} ratio="aspect-[2/3]" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </section>

      <ContactSection t={t} />
    </>
  );
}
