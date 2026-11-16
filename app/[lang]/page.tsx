import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";
import { dict, isLocale } from "@/lib/i18n";
import { bySlug, getProjects, servicePhotos } from "@/lib/projects";
import { heroPhoto, site } from "@/lib/site";
import { Photo } from "@/components/Photo";
import { Button } from "@/components/Button";
import { Stats } from "@/components/Stats";
import { ContactSection } from "@/components/ContactSection";
import { SplitText } from "@/components/SplitText";
import { RollText } from "@/components/RollText";
import { ProjectCard } from "@/components/ProjectCard";
import { ServiceCards } from "@/components/ServiceCards";
import { Process } from "@/components/Process";
import { HeroVideo } from "@/components/HeroVideo";
import { ZoneMap } from "@/components/ZoneMap";

// ponytail: link a Google Maps centrado en Nordelta; cambiar si se define otra zona (PENDIENTES.md).
const mapQuery = "Nordelta, Tigre, Buenos Aires, Argentina";

// Estructura pedida por el cliente: portada, nosotros, cómo trabajamos, servicios, obras, testimonios y contacto.
export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const projects = getProjects(lang);
  const galeria = bySlug(projects, "casa-galeria");
  const photos = servicePhotos(projects);
  const [arq, obra, reforma, interior] = t.services.items;
  const steps = [
    { ...arq, photo: photos.arquitectura },
    { ...obra, photo: photos.obra },
    { ...reforma, photo: photos.refacciones },
    { ...interior, photo: photos.interiorismo },
  ];

  return (
    // Contenedor común (no sticky): al llegar al inicio desde otra página, Next sube hasta acá y no saltea la portada fija.
    // --scrub: cuánto scroll recorre el video de la portada antes de que suba el resto (0 sin video o con movimiento reducido).
    <div className={site.heroVideo ? "[--scrub:150svh] md:[--scrub:220svh] motion-reduce:[--scrub:0px]" : ""}>
      {/* Portada: queda fija y el resto de la página sube por encima, como una hoja */}
      <section className="sticky top-0 isolate flex h-svh items-center justify-center overflow-hidden">
        <div className="settle absolute inset-0 -z-10">
          <Photo photo={{ ...heroPhoto, alt: t.home.heroAlt }} sizes="100vw" fill preload reveal={false} />
          {site.heroVideo && <HeroVideo src={site.heroVideo} />}
        </div>
        {/* Dos capas: degradé general y un velo suave detrás del texto para que se lea sobre cualquier foto */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(14_18_26/0.7),rgb(14_18_26/0.35)_55%,rgb(14_18_26/0.45))]" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_50%,rgb(14_18_26/0.35),transparent)]" aria-hidden />
        <div className="hero-dim absolute inset-0 -z-10 bg-[rgb(14_18_26/0.6)] opacity-0" aria-hidden />
        <div className="hero-out wrap flex flex-col items-center pb-16 text-center text-on-photo md:pb-0">
          <SplitText as="h1" now text={t.home.title} className="display max-w-[12ch] text-[clamp(3.25rem,9vw,8.5rem)] [text-shadow:0_2px_30px_rgb(0_0_0/0.18)]" />
          <div
            className="rise mt-10 flex w-full max-w-xs flex-col gap-3 *:justify-center sm:w-auto sm:max-w-none sm:flex-row md:mt-12"
            style={{ "--d": "550ms" } as React.CSSProperties}
          >
            <Button href={`/${lang}/proyectos`} tone="photo-outline">{t.cta.projects}</Button>
            <Button href="#consulta" tone="photo">{t.cta.quote}</Button>
          </div>
        </div>
        {/* Aviso de scroll: una flecha sola que sube y baja, se va con el resto de la portada */}
        <div className="hero-out absolute inset-x-0 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] mx-auto w-fit md:bottom-28">
          <a
            href="#estudio"
            aria-label={t.home.scroll}
            className="scroll-cue rise flex size-11 items-center justify-center text-on-photo/90 drop-shadow-[0_2px_8px_rgb(0_0_0/0.4)] transition-colors hover:text-on-photo"
            style={{ "--d": "900ms" } as React.CSSProperties}
          >
            <ArrowDown size={22} weight="light" aria-hidden />
          </a>
        </div>
      </section>
      {/* Separador: mientras se recorre, la portada sigue fija y el video avanza (HeroVideo) */}
      {site.heroVideo && <div aria-hidden className="h-(--scrub)" />}

      <div className="relative z-10 rounded-t-[2rem] bg-bg shadow-[0_-24px_60px_-30px_rgb(14_18_26/0.5)]">
        {/* Nosotros: presentación, foto y números */}
        <section id="estudio" className="wrap scroll-mt-0 pt-20 md:pt-36">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <h2 data-reveal className="label text-muted">{t.nav.about}</h2>
              <p data-reveal className="title mt-5 max-w-[22ch] text-[1.75rem] leading-[1.2] md:mt-6 md:text-5xl md:leading-[1.08]">
                {t.home.intro}
              </p>
              <p data-reveal className="mt-6 max-w-[52ch] text-[17px] text-muted md:mt-8 md:text-lg">{t.about.body[1]}</p>
              <div data-reveal className="mt-8 md:mt-10">
                <Button href={`/${lang}/nosotros`} tone="outline">{t.home.aboutLink}</Button>
              </div>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <Photo photo={galeria.photos[6]} ratio="aspect-[4/5]" sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          </div>
          <div className="mt-14 md:mt-28">
            <Stats stats={t.home.stats} />
          </div>
        </section>

        {/* Cómo trabajamos */}
        <section className="wrap pt-20 md:pt-36">
          <Process t={t.services} />
        </section>

        {/* Servicios: tarjetas lado a lado, la activa se ensancha */}
        <section>
          <ServiceCards title={t.home.servicesTitle} link={t.home.servicesLink} steps={steps} lang={lang} />
        </section>

        {/* Obras: grilla con la foto principal de seis (Casa Muelle es la portada y no se repite); todas están en Proyectos */}
        <section className="wrap py-20 md:py-36">
          <div className="flex items-end justify-between gap-6">
            <SplitText text={t.home.worksTitle} className="title text-[2.25rem] md:text-6xl" />
            <Link href={`/${lang}/proyectos`} className="group hidden min-h-11 items-center gap-2 text-[15px] md:flex">
              <RollText text={t.cta.projects} />
              <ArrowRight size={16} aria-hidden className="transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {projects.filter((p) => p.slug !== "casa-muelle").slice(0, 6).map((p) => (
              <ProjectCard key={p.slug} project={p} lang={lang} heading="h3" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
            ))}
          </div>
          <div className="mt-12 md:hidden">
            <Button href={`/${lang}/proyectos`} tone="outline">{t.cta.projects}</Button>
          </div>
        </section>

        {/* Testimonios. PROVISORIO: son textos de ejemplo, cada tarjeta lo dice (PENDIENTES.md) */}
        <section className="wrap pb-20 md:pb-36">
          <SplitText text={t.testimonials.title} className="title max-w-[16ch] text-[2.25rem] md:text-6xl" />
          <ul className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 md:gap-6">
            {t.testimonials.items.map((q) => (
              <li key={q.name} data-reveal>
                <figure className="flex h-full flex-col justify-between gap-10 rounded-3xl bg-surface p-6 md:gap-16 md:p-8">
                  <blockquote className="text-[17px] leading-snug md:text-xl">{q.quote}</blockquote>
                  <figcaption className="flex items-end justify-between gap-4 border-t border-line pt-5 text-[15px]">
                    <span>
                      <span className="block font-medium">{q.name}</span>
                      <span className="block text-muted">{q.place}</span>
                    </span>
                    {t.testimonials.sample && <span className="label rounded-full border border-ink/25 px-3 py-1">{t.testimonials.sample}</span>}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>

        {/* Zona: foto grande con el mapa en una tarjeta */}
        <section className="wrap">
          <div className="relative isolate grid gap-8 overflow-hidden rounded-3xl p-5 pt-16 text-on-photo md:min-h-[85svh] md:grid-cols-12 md:items-end md:gap-10 md:p-12 lg:p-16">
            <div className="parallax absolute inset-x-0 -inset-y-[8%] -z-10">
              {/* No la portada de Casa Galería: esa ya está en la grilla de obras. Esta mira a la laguna. */}
              <Photo photo={galeria.photos[2]} sizes="(min-width: 1440px) 1360px, 100vw" fill reveal={false} />
            </div>
            <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgb(14_18_26/0.72),rgb(14_18_26/0.5)_55%,rgb(14_18_26/0.6))] md:bg-[linear-gradient(to_top_right,rgb(14_18_26/0.8),rgb(14_18_26/0.15))]" aria-hidden />
            <div className="self-center md:col-span-7 md:self-end">
              <SplitText text={t.zone.title} className="display max-w-[14ch] text-[2.75rem] md:text-7xl" />
              <p data-reveal className="mt-5 max-w-[40ch] text-[17px] text-on-photo/90 md:mt-6 md:text-lg">{t.zone.lead}</p>
              <div data-reveal className="mt-10">
                <Button href="#consulta" tone="photo">{t.cta.quote}</Button>
              </div>
            </div>
            <div data-reveal className="rounded-2xl bg-card p-2 text-ink shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)] md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
              <ZoneMap title={t.zone.mapTitle} />
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 py-3 text-[15px]">
                <span>{t.contact.zone}</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-11 items-center gap-1 text-accent"
                  style={{ "--roll": "var(--ink)" } as React.CSSProperties}
                >
                  <RollText text={t.zone.open} />
                  <ArrowUpRight size={14} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes: acordeón nativo, se abre de a una */}
        <section className="wrap py-20 md:py-36">
          <div className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <div className="md:sticky md:top-16">
                <SplitText text={t.faq.title} className="display max-w-[12ch] text-[2.75rem] md:text-7xl" />
                <p data-reveal className="mt-5 max-w-[34ch] text-[17px] text-muted md:mt-6 md:text-lg">{t.faq.lead}</p>
                <p data-reveal className="mt-8 text-[15px] text-muted">
                  {t.faq.more}{" "}
                  <a href="#consulta" className="hit group inline-block border-b border-line text-ink transition-colors duration-300 hover:border-accent">
                    <RollText text={t.faq.moreLink} />
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:col-span-7">
              {t.faq.items.map((f) => (
                <details key={f.q} name="faq" data-reveal className="faq group rounded-2xl border border-transparent bg-surface transition-[background-color,border-color] duration-500 [&:not([open]):hover]:border-line [&:not([open]):hover]:bg-[#edece7] open:border-line open:bg-card">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-2xl px-5 py-[1.125rem] text-[17px] leading-snug font-medium md:gap-6 md:text-lg tracking-tight md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
                    <span className="transition-colors duration-500 group-open:text-accent">{f.q}</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-transparent bg-bg transition-colors duration-500 [.faq:not([open]):hover_&]:border-line [.faq:not([open]):hover_&]:bg-card group-open:border-accent/25 group-open:bg-transparent group-open:text-accent">
                      <Plus size={16} aria-hidden className="transition-transform duration-500 ease-out-expo group-open:rotate-45" />
                    </span>
                  </summary>
                  <p className="max-w-[60ch] px-5 pb-5 text-[16px] text-muted md:px-7 md:pb-7 md:text-[17px]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <ContactSection t={t} />
      </div>
    </div>
  );
}
