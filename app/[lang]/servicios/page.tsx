import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { dict, isLocale } from "@/lib/i18n";
import { getProjects, servicePhotos, type Photo as P } from "@/lib/projects";
import { Photo } from "@/components/Photo";
import { ContactSection } from "@/components/ContactSection";
import { PageHeader } from "@/components/PageHeader";
import { SplitText } from "@/components/SplitText";
import { ServicePhotoAnchor } from "@/components/ServiceCards";
import { Process } from "@/components/Process";

export async function generateMetadata({ params }: PageProps<"/[lang]/servicios">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].services.title, description: dict[lang].services.lead };
}

type Item = (typeof dict)["es"]["services"]["items"][number];

function Service({ item, label, photo, flip }: { item: Item; label: string; photo: P; flip?: boolean }) {
  return (
    <section id={item.id} className="wrap grid scroll-mt-24 items-center gap-10 pb-24 md:grid-cols-12 md:gap-8 md:pb-36">
      <div className={`md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}>
        <ViewTransition name={`service-${item.id}`} share="morph" default="none">
          <ServicePhotoAnchor id={item.id}>
            <Photo photo={photo} ratio="aspect-[3/2]" sizes="(min-width: 768px) 58vw, 100vw" reveal={false} className="rounded-3xl!" />
          </ServicePhotoAnchor>
        </ViewTransition>
      </div>
      <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-9"}`}>
        <SplitText text={item.name} className="title text-[2.25rem] md:text-5xl" />
        <div data-reveal>
        <p className="mt-5 text-lg text-muted">{item.body}</p>
        <p className="mt-10 text-sm text-muted">{label}</p>
        <ul className="mt-3 border-t border-line">
          {item.includes.map((i) => (
            <li key={i} className="border-b border-line py-3">{i}</li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/servicios">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];
  const [arq, obra, reforma, interior] = t.services.items;
  const photos = servicePhotos(getProjects(lang));

  return (
    <>
      <PageHeader title={t.services.title} lead={t.services.lead} />

      <Service item={arq} label={t.services.includesLabel} photo={photos.arquitectura} />
      <Service item={obra} label={t.services.includesLabel} photo={photos.obra} flip />
      <Service item={interior} label={t.services.includesLabel} photo={photos.interiorismo} />

      {/* Refacciones: foto a todo el ancho con el texto debajo, rompe el ida y vuelta */}
      <section id={reforma.id} className="wrap scroll-mt-24">
        <div className="rounded-3xl bg-surface p-4 pb-16 md:p-6 md:pb-24">
          <ViewTransition name={`service-${reforma.id}`} share="morph" default="none">
            <ServicePhotoAnchor id={reforma.id}>
              <Photo photo={photos.refacciones} ratio="aspect-[3/2] md:aspect-[21/9]" sizes="(min-width: 1440px) 1360px, 100vw" reveal={false} className="rounded-3xl!" />
            </ServicePhotoAnchor>
          </ViewTransition>
          <div className="mt-12 grid gap-10 px-2 md:mt-16 md:grid-cols-12 md:gap-8 md:px-6">
            <SplitText text={reforma.name} className="title text-[2.25rem] md:col-span-5 md:text-5xl" />
            <div data-reveal className="md:col-span-6 md:col-start-7">
              <p className="text-lg text-muted">{reforma.body}</p>
              <ul className="mt-8 border-t border-line">
                {reforma.includes.map((i) => (
                  <li key={i} className="border-b border-line py-3">{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-20 md:py-36">
        <Process t={t.services} />
      </section>

      <ContactSection t={t} />
    </>
  );
}
