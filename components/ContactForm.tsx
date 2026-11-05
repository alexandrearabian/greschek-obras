"use client";

import { useActionState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { sendContact, type ContactState } from "@/app/actions";
import type { Dict } from "@/lib/i18n";
import { site } from "@/lib/site";
import { buttonClass } from "./Button";

// Dos variantes de color: sobre fondo claro (página de contacto) y sobre el bloque azul (cierre de cada página).
const themes = {
  light: {
    label: "text-muted",
    input: "border-line text-ink placeholder:text-muted/70 focus:border-ink focus:shadow-[0_1px_0_0_var(--ink)]",
    chip: "border-line hover:border-ink peer-checked:border-accent peer-checked:bg-accent peer-checked:text-deep-ink",
    button: buttonClass("accent"),
    error: "text-[#9b3b2a]",
  },
  dark: {
    label: "text-deep-muted",
    input: "border-deep-line text-deep-ink placeholder:text-deep-muted/70 focus:border-deep-ink focus:shadow-[0_1px_0_0_var(--deep-ink)]",
    chip: "border-deep-line hover:border-deep-ink peer-checked:border-deep-ink peer-checked:bg-deep-ink peer-checked:text-deep",
    button: buttonClass("light"),
    error: "text-[#f0b9a8]",
  },
};

export function ContactForm({ t, services, tone = "light" }: { t: Dict["form"]; services: string[]; tone?: keyof typeof themes }) {
  const page = usePathname();
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  const v = state.values ?? {};
  const c = themes[tone];
  const input = `mt-1 w-full border-0 border-b bg-transparent px-0 py-3 text-lg outline-none transition-[border-color,box-shadow] duration-300 user-invalid:border-[#c4553e] ${c.input}`;
  const label = `block text-sm ${c.label}`;

  if (state.status === "ok")
    return (
      <div className="form-done" role="status">
        <p className="title text-4xl">{t.doneTitle}</p>
        <p className={`mt-4 text-lg ${c.label}`}>{t.doneBody}</p>
      </div>
    );

  return (
    <form action={action} className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
      <input type="hidden" name="page" value={page} />
      {/* Trampa para bots: invisible para personas y lectores de pantalla. */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div>
        <label htmlFor="cf-name" className={label}>{t.name}</label>
        <input id="cf-name" name="name" required autoComplete="name" defaultValue={v.name} className={input} />
      </div>
      <div>
        <label htmlFor="cf-email" className={label}>{t.email}</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" defaultValue={v.email} className={input} />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={label}>{t.service}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {[...services, t.other].map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="service" value={s} defaultChecked={v.service === s} className="peer sr-only" />
              <span className={`inline-flex h-11 items-center rounded-full border px-4 text-[15px] transition-colors duration-300 select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent ${c.chip}`}>
                {s}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>{t.message}</label>
        <p id="cf-message-hint" className={`mt-1 text-sm opacity-80 ${c.label}`}>{t.messageHint}</p>
        <textarea id="cf-message" name="message" required rows={3} aria-describedby="cf-message-hint" defaultValue={v.message} className={`${input} field-sizing-content min-h-24 resize-none`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="cf-phone" className={label}>
          {t.phone} ({t.optional})
        </label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" defaultValue={v.phone} className={`${input} sm:max-w-[calc(50%-1rem)]`} />
      </div>

      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button type="submit" disabled={pending} aria-busy={pending} className={`${c.button} disabled:cursor-wait`}>
          <span className={pending ? "animate-pulse" : ""}>{pending ? t.sending : t.submit}</span>
          <ArrowRight size={16} aria-hidden className={`transition-transform duration-500 ease-out-expo ${pending ? "translate-x-1" : "group-hover:translate-x-1"}`} />
        </button>
        {state.status === "error" && (
          <p role="alert" className={`form-done text-[15px] ${c.error}`}>
            {t.error}{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4">
              {site.email}
            </a>
          </p>
        )}
      </div>
    </form>
  );
}
