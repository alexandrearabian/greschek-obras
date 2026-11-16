<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Greschek Obras: guía para agentes

Sitio de un estudio de arquitectura y construcción (Nordelta y alrededores). Next.js 16 App Router, 100% estático
(SSG, `dynamicParams = false`), React 19, Tailwind v4. Español (es-AR) por defecto, inglés en `/en`.
Código y comentarios en español rioplatense; textos del sitio solo en `lib/i18n.ts`.

## Comandos

```bash
npm run dev      # http://localhost:3000 → /es
npm run lint     # tiene que quedar sin errores ni warnings
npx tsc --noEmit
npm run build    # todas las rutas tienen que salir estáticas (●)
```

## Dónde está cada cosa

- `lib/i18n.ts`: todos los textos (es y en, mismo esquema `Dict`). Nunca texto suelto en componentes.
- `lib/site.ts`: contacto, redes, números y la portada (`heroPhoto`, `heroVideo`). Campo vacío = no se muestra.
- `lib/projects.ts` + `lib/photos.json` + `public/obras/<slug>/`: las 18 obras y sus 12 fotos (con medidas y blur),
  en el orden que eligió el cliente; la 01 es la principal.
- `app/globals.css`: tokens de color, utilidades (`wrap`, `display`, `title`, `label`) y TODA la animación CSS.
- `components/flight.ts`: reglas de las fotos que viajan entre páginas (leer antes de tocar transiciones).
- `PENDIENTES.md`: lo que falta del cliente. Lo provisorio del sitio sale de ahí.

## Reglas de diseño

- Tema claro único. Fondo piedra `--bg`, acento azul `--accent`, bloque oscuro `--deep`. Colores solo por token.
- Una sola familia (Albert Sans). Títulos con `display`/`title`; nada de mayúsculas en títulos.
- Esquinas: fotos `rounded-2xl`, tarjetas grandes `rounded-3xl`, botones en píldora.
- Espaciado vertical entre secciones: `pt-20 md:pt-36` / `py-20 md:py-36`, sin duplicar padding entre vecinas.
- Mobile tiene que verse tan intencional como escritorio: probar a 390 px. Nada puede ensanchar la página.

## Reglas de movimiento

- Una curva (`--ease-out-expo`), entradas cortas. Todo con alternativa para `prefers-reduced-motion`.
- No se toca el scroll del navegador (nada de scroll suave ni secciones fijas que secuestren el scroll).
  Única excepción, pedida por el cliente: el video de la portada avanza con el scroll (`HeroVideo`). El scroll sigue
  siendo el nativo: solo se lee su posición, y con movimiento reducido queda la foto fija.
- Títulos: `<SplitText>` (letra por letra). Links de texto: `<RollText>` dentro de un `.group`.
- Fotos que abren otra página: siempre por `flight.ts`:
  - click → View Transition de React; el origen lleva el nombre de transición solo durante el viaje
    (Next deja la página anterior montada y oculta; dos nombres iguales a la vez rompen las transiciones);
  - atrás/adelante → vuelo manual (`flyInto`), solo si la foto de origen se veía al irse;
  - una sola foto viaja (sin fundido entre recortes), las esquinas cambian durante el viaje, el degradé viaja
    con la foto y los textos aparecen enseguida en su propia capa.
- Hover de fotos de galería: se oscurece la mitad de abajo de la señalada con su texto (`PhotoButton caption`).
  Nunca oscurecer las demás.

## Accesibilidad

- Toda imagen con `alt` (decorativas `alt=""`). Controles con nombre accesible. Un `h1` por página, sin saltos.
- Áreas de toque de 44 px (`min-h-11`, o `.hit` para links en línea).
- Lo que cambia solo (autoplay de servicios) se pausa con hover y foco, y se detiene tras una vuelta.

## Antes de terminar un cambio

`npm run lint`, `npx tsc --noEmit` y `npm run build` limpios. Si se tocó algo visual, mirarlo en el navegador
a 1440 y a 390 px. No dejar código de depuración (`window.__...`, `console.log`).
Si se reemplazó una foto sin cambiarle el nombre, borrar `.next/cache/images`: si no, en local se sigue viendo la vieja.
