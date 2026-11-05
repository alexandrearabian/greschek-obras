# Greschek Obras

Sitio web de Greschek Obras: arquitectura y construcción en Nordelta y alrededores.
Next.js 16 (App Router, 100% estático) + Tailwind v4. Español en `/es`, inglés en `/en`.

```bash
npm install
npm run dev     # http://localhost:3000 → redirige a /es
npm run build   # build de producción
npm run lint
```

## Dónde está cada cosa

- `lib/site.ts`: contacto, redes y números (campo vacío = no se muestra)
- `lib/i18n.ts`: todos los textos, en español (es-AR) e inglés
- `lib/projects.ts`: obras (nombre, ubicación, descripción, qué fotos y en qué orden)
- `lib/photos.json` + `public/obras/<slug>/`: fotos con sus medidas
- `PENDIENTES.md`: datos que faltan del cliente
- `AGENTS.md`: convenciones de diseño, movimiento y accesibilidad (para personas y agentes)

Las URLs del sitio anterior (`/services`, `/about`, `/contact`, `/proyectos/...`) redirigen a las nuevas (ver `next.config.ts`).

## Deploy (Vercel)

1. Subir el repo a GitHub e importarlo en Vercel (framework: Next.js, sin configuración extra).
2. Cargar las variables de entorno de `.env.example` en Project → Settings → Environment Variables:
   - `RESEND_API_KEY` (**obligatoria**: sin ella el formulario de contacto no envía en producción)
   - `CONTACT_TO` y `CONTACT_FROM` (opcionales; para enviar desde @greschek-obras.com hay que verificar el dominio en Resend)
3. Conectar el dominio `greschek-obras.com` (Project → Domains) y apuntar el DNS según indique Vercel.

Para desarrollo local, copiar `.env.example` a `.env.local`. Sin `RESEND_API_KEY`, las consultas se imprimen en la consola.
