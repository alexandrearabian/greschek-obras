import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Dict } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { SplitText } from "./SplitText";
import { RollText } from "./RollText";

// Cierre de todas las páginas: tarjeta azul con la consulta siempre a mano, antes del footer.
export function ContactSection({ t }: { t: Dict }) {
  return (
    <section id="consulta" className="wrap scroll-mt-6 py-6 md:py-10">
      <div className="grid gap-12 rounded-3xl bg-deep px-5 py-12 text-deep-ink md:grid-cols-12 md:px-12 md:py-24 lg:px-16">
        <div className="md:col-span-5">
          <SplitText text={t.form.title} className="title max-w-[18ch] text-[2.25rem] md:text-5xl" />
          <p data-reveal className="mt-6 max-w-[38ch] text-lg text-deep-muted">
            {t.form.lead}
          </p>
          <div data-reveal className="mt-10 flex flex-col gap-2 text-[15px]">
            <span className="text-deep-muted">{t.form.direct}</span>
            <a href={`mailto:${site.email}`} className="hit group w-fit border-b border-deep-line pb-0.5 text-lg transition-colors duration-300 hover:border-deep-ink" style={{ "--roll": "#fff" } as React.CSSProperties}>
              <RollText text={site.email} />
            </a>
            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-1 flex w-fit items-center gap-2 text-lg">
                <WhatsappLogo size={20} aria-hidden /> WhatsApp
              </a>
            )}
          </div>
        </div>
        <div data-reveal className="md:col-span-6 md:col-start-7 md:pt-3">
          <ContactForm t={t.form} services={t.services.items.map((s) => s.name)} tone="dark" />
        </div>
      </div>
    </section>
  );
}
