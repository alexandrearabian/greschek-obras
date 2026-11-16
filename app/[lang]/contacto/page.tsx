import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, EnvelopeSimple, InstagramLogo, Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { dict, isLocale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { PageHeader } from "@/components/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/contacto">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: dict[lang].contact.title, description: dict[lang].contact.lead };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contacto">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = dict[lang];

  // Solo se muestran los canales que tienen dato en lib/site.ts.
  const channels = [
    { label: t.contact.email, value: site.email, href: `mailto:${site.email}?subject=${encodeURIComponent(t.contact.mailSubject)}`, Icon: EnvelopeSimple },
    whatsappUrl && { label: t.contact.whatsapp, value: "WhatsApp", href: whatsappUrl, Icon: WhatsappLogo },
    site.phone && { label: t.contact.phone, value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}`, Icon: Phone },
    { label: "Instagram", value: "@greschek_obras", href: site.instagram, Icon: InstagramLogo },
  ].filter(Boolean) as { label: string; value: string; href: string; Icon: typeof InstagramLogo }[];

  return (
    <>
      <PageHeader title={t.contact.title} lead={t.contact.lead} />

      <section className="wrap grid gap-20 pb-24 md:grid-cols-12 md:gap-8 md:pb-36">
        <div className="rise md:col-span-7" style={{ "--d": "240ms" } as React.CSSProperties}>
          <ContactForm t={t.form} services={t.services.items.map((s) => s.name)} />
        </div>

        <aside className="rise md:col-span-4 md:col-start-9" style={{ "--d": "320ms" } as React.CSSProperties}>
          <h2 className="text-sm text-muted">{t.contact.social}</h2>
          <ul className="mt-3 border-t border-line">
            {channels.map(({ label, value, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 border-b border-line py-5 transition-colors duration-300 hover:text-accent"
                >
                  <Icon size={22} weight="light" aria-hidden className="shrink-0" />
                  <span className="min-w-0 flex-1 break-words">
                    <span className="sr-only">{label}: </span>
                    {value}
                  </span>
                  <ArrowUpRight size={16} weight="light" aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-sm text-muted">{t.contact.zoneLabel}</h2>
          <p className="mt-2 text-lg">{site.address || t.contact.zone}</p>
        </aside>
      </section>
    </>
  );
}
