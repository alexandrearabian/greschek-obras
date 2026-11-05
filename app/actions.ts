"use server";

import { site } from "@/lib/site";

export type ContactState = { status: "idle" | "ok" | "error"; values?: Record<string, string> };

const fields = ["name", "email", "phone", "service", "message", "page"] as const;

// Envía la consulta por email con Resend (https://resend.com). Variables de entorno:
// RESEND_API_KEY (obligatoria en producción), CONTACT_TO (default: site.email), CONTACT_FROM.
export async function sendContact(_: ContactState, form: FormData): Promise<ContactState> {
  if (form.get("company")) return { status: "ok" }; // campo trampa: solo lo completan bots

  const v = Object.fromEntries(fields.map((k) => [k, String(form.get(k) ?? "").trim().slice(0, 5000)])) as Record<
    (typeof fields)[number],
    string
  >;
  if (!v.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email) || !v.message) return { status: "error", values: v };

  const head = [
    `Nombre: ${v.name}`,
    `Email: ${v.email}`,
    v.phone && `Teléfono: ${v.phone}`,
    v.service && `Servicio: ${v.service}`,
    `Página: ${v.page}`,
  ];
  const text = `${head.filter(Boolean).join("\n")}\n\n${v.message}`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[contacto] RESEND_API_KEY no configurada. Consulta recibida:\n${text}`);
      return { status: "ok" };
    }
    console.error("[contacto] Falta RESEND_API_KEY");
    return { status: "error", values: v };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Web Greschek <onboarding@resend.dev>",
      to: process.env.CONTACT_TO ?? site.email,
      reply_to: v.email,
      subject: `Consulta web: ${v.name}${v.service ? ` (${v.service})` : ""}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("[contacto] Resend respondió", res.status, await res.text());
    return { status: "error", values: v };
  }
  return { status: "ok" };
}
