import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { dict, isLocale, locales } from "@/lib/i18n";
import { getProjects, type Photo as P } from "@/lib/projects";
import { Photo, PhotoButton } from "@/components/Photo";
import { Lightbox } from "@/components/Lightbox";
import { ContactSection } from "@/components/ContactSection";
import { SplitText } from "@/components/SplitText";
import { RollText } from "@/components/RollText";
import { ProjectCoverAnchor, ProjectHeroAnchor } from "@/components/ProjectCover";
import { HERO_SHADE } from "@/components/flight";

// Sitio 100% estático: cualquier URL fuera de las generadas da 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => getProjects(lang).map((p) => ({ lang, slug: p.slug })));
}

async function load(params: PageProps<"/[lang]/proyectos/[slug]">["params"]) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const projects = getProjects(lang);
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) notFound();
  return { lang, t: dict[lang], project: projects[i], next: projects[(i + 1) % projects.length] };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/proyectos/[slug]">): Promise<Metadata> {
  const { project } = await load(params);
  return { title: project.name, description: project.summary, openGraph: { images: project.cover.src } };
}

// Galería pareja: cada fila tiene una sola proporción.
// Horizontales (3:2) alternan entre una a todo el ancho y un par; verticales (2:3) siempre de a pares.
// Si hay una vertical de más, va junto al texto de la obra.
function layout(photos: P[]) {
  const L = photos.filter((p) => p.w >= p.h);
  const V = photos.filter((p) => p.w < p.h);
  const lead = V.length % 2 ? V.shift() : undefined;
  const rows: { photos: P[]; ratio: string }[] = [];
  let full = true;
  while (L.length || V.length) {
    const landscape = L.length && (rows.length % 2 === 0 || !V.length);
    if (landscape) {
      const one = full || L.length === 1;
      rows.push({ photos: one ? [L.shift()!] : [L.shift()!, L.shift()!], ratio: one ? "aspect-[3/2] md:aspect-[16/9]" : "aspect-[3/2]" });
      full = !full;
    } else rows.push({ photos: [V.shift()!, V.shift()!], ratio: "aspect-[2/3]" });
  }
  return { lead, rows };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/proyectos/[slug]">) {
  const { lang, t, project, next } = await load(params);
  const [cover, ...rest] = project.photos;
  const { lead, rows } = layout(rest);
  const index = (p: P) => project.photos.indexOf(p);
  // Texto de cada foto al pasar el mouse: el ambiente ("Casa Patio, cocina" → "Cocina").
  const room = (p: P) => {
    const r = p.alt.slice(project.name.length + 2);
    if (/^(foto|photo) \d+$/i.test(r)) return project.name; // ambiente desconocido: no "Foto 14"
    return r.charAt(0).toUpperCase() + r.slice(1);
  };

  return (
    <>
      <Lightbox photos={project.photos} title={project.name} labels={t.lightbox}>
        {/* Portada a pantalla completa: la misma foto que la tarjeta, que viaja hasta acá */}
        <section data-section={project.name} className="relative isolate flex min-h-[88svh] items-end overflow-hidden rounded-b-[2rem]">
          {/* El degradé va dentro de la foto que viaja: llega con ella, no después */}
          <ProjectHeroAnchor slug={project.slug}>
            <Photo photo={cover} sizes="100vw" fill preload reveal={false} />
            <div className="pointer-events-none absolute inset-0" style={{ background: HERO_SHADE }} aria-hidden />
          </ProjectHeroAnchor>
          <button type="button" data-lb={0} aria-label={`${project.name}: ${t.projects.photos}`} className="absolute inset-0 -z-10 cursor-zoom-in" />
          {/* Los textos entran enseguida, en su propia capa por encima de la foto que viaja (hero-text en globals.css) */}
          <div data-hero-reveal className="hero-text wrap pb-28 text-on-photo md:pb-24">
            <Link href={`/${lang}/proyectos`} className="rise group inline-flex items-center gap-2 py-2 text-[15px] text-on-photo/80" style={{ "--roll": "var(--on-photo)" } as React.CSSProperties}>
              <ArrowLeft size={16} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:-translate-x-1" />
              <RollText text={t.projects.back} />
            </Link>
            <SplitText as="h1" now text={project.name} className="display mt-4 text-[2.75rem] md:text-8xl" />
          </div>
        </section>

        {/* Texto de la obra */}
        <section className="wrap grid gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-28">
          <div className={lead ? "md:col-span-6" : "md:col-span-8"}>
            <p data-reveal className="title text-2xl md:text-4xl">{project.summary}</p>
            <dl data-reveal className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-6 sm:grid-cols-3">
              {project.location && (
                <div>
                  <dt className="text-sm text-muted">{t.projects.location}</dt>
                  <dd className="mt-1">{project.location}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-muted">{t.projects.type}</dt>
                <dd className="mt-1">{project.type}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted">{t.projects.photos}</dt>
                <dd className="mt-1 tabular-nums">{project.photos.length}</dd>
              </div>
            </dl>
          </div>
          {lead && (
            <div className="md:col-span-5 md:col-start-8">
              <PhotoButton index={index(lead)} photo={lead} caption={room(lead)} hint={t.projects.enlarge} touchCaption={false} ratio="aspect-[4/5] md:aspect-[2/3]" sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          )}
        </section>

        {/* Galería */}
        {/* Pares en dos columnas también en celular: la galería no se vuelve una tira interminable */}
        <section className="wrap flex flex-col gap-3 md:gap-8">
          {rows.map((row) => (
            <div key={row.photos[0].src} className={`grid gap-3 md:gap-8 ${row.photos.length === 2 ? "grid-cols-2" : ""}`}>
              {row.photos.map((p) => (
                <PhotoButton
                  key={p.src}
                  index={index(p)}
                  photo={p}
                  caption={room(p)}
                  hint={t.projects.enlarge}
                  ratio={row.ratio}
                  sizes={row.photos.length === 2 ? "50vw" : "(min-width: 1440px) 1360px, 100vw"}
                  touchCaption={false}
                />
              ))}
            </div>
          ))}
        </section>
      </Lightbox>

      {/* Siguiente obra */}
      <Link href={`/${lang}/proyectos/${next.slug}`} transitionTypes={["project"]} className="group wrap mt-24 block pb-24 md:mt-36 md:pb-36">
        <div data-reveal className="grid items-end gap-8 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="text-[15px] text-muted">{t.projects.next}</p>
            <p className="title mt-3 flex items-center gap-4 text-4xl md:text-6xl">
              <span className="hover-line">{next.name}</span>
              <ArrowRight size={36} weight="light" aria-hidden className="transition duration-500 ease-out-expo group-hover:translate-x-2 group-hover:text-accent" />
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <ProjectCoverAnchor slug={next.slug}>
              <Photo photo={next.cover} sizes="(min-width: 768px) 40vw, 100vw" ratio="aspect-[3/2]" reveal={false} />
            </ProjectCoverAnchor>
          </div>
        </div>
      </Link>

      <ContactSection t={t} />
    </>
  );
}
