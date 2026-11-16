import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLocale } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { ContactSection } from "@/components/ContactSection";
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

  return (
    <>
      <PageHeader title={t.projects.title} lead={t.projects.lead} />

      {/* La primera obra a todo el ancho, el resto en grilla pareja de 2 */}
      <section className="wrap pb-14 md:pb-26">
        <ProjectCard project={first} lang={lang} ratio="aspect-[3/2] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" />
        <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} sizes="(min-width: 768px) 50vw, 100vw" />
          ))}
        </div>
      </section>

      <ContactSection t={t} />
    </>
  );
}
