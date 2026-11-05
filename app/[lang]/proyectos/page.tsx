import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLocale } from "@/lib/i18n";
import { getProjects, getRenders } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { PhotoButton } from "@/components/Photo";
import { Lightbox } from "@/components/Lightbox";
import { ContactSection } from "@/components/ContactSection";
import { SplitText } from "@/components/SplitText";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/proyectos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].projects.title, description: dict[lang].projects.lead };
}

export default async function ProjectsPage({ params }: PageProps<"/[lang]/proyectos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const [first, ...rest] = getProjects(lang);
  const renders = getRenders(t.projects.renderAlt);

  return (
    <>
      <PageHeader title={t.projects.title} lead={t.projects.lead} />

      {/* La primera obra a todo el ancho, el resto en grilla pareja de 2 */}
      <section className="wrap pb-20 md:pb-36">
        <ProjectCard project={first} lang={lang} ratio="aspect-[3/2] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" />
        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      {/* En diseño: grilla de 3 columnas, mismo recorte para todas */}
      <section data-section={t.projects.rendersTitle} className="wrap">
        <div className="rounded-3xl bg-surface px-3 py-14 md:px-10 md:py-24">
          <SplitText text={t.projects.rendersTitle} className="px-2 md:px-0 title text-[2.25rem] md:text-6xl" />
          <p data-reveal className="mt-5 max-w-[48ch] px-2 text-lg text-muted md:px-0">{t.projects.rendersLead}</p>
          <Lightbox photos={renders} title={t.projects.rendersTitle} labels={t.lightbox} className="mt-10 grid grid-cols-2 gap-3 md:mt-16 md:gap-4 lg:grid-cols-3 lg:gap-6">
            {renders.map((r, i) => (
              <PhotoButton
                key={r.src}
                index={i}
                photo={r}
                caption={`${t.projects.renderCaption} ${String(i + 1).padStart(2, "0")}`}
                hint={t.projects.enlarge}
                ratio="aspect-[3/2]"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            ))}
          </Lightbox>
        </div>
      </section>

      <ContactSection t={t} />
    </>
  );
}
