# Pendientes: lo que necesitamos de Greschek

Todo lo que está marcado como provisorio en el sitio sale de acá. Cuando llegue cada dato, se carga en `lib/site.ts`, `lib/i18n.ts` o `lib/projects.ts`.

Última respuesta del cliente: 2026-11-05.

## Datos de contacto
- [ ] Teléfono y WhatsApp: **van a sacar una línea de WhatsApp nueva**. Cuando la tengan, cargarla en `site.phone` y `site.whatsapp` (el botón aparece solo)
- [ ] Dirección de oficina, si la quieren mostrar
- [x] Instagram (@greschek_obras) activo
- [x] Facebook inactivo: se sacó del sitio (menú, footer y contacto)

## Obras
Los nombres actuales son **provisorios** y los inventamos nosotros a partir de las fotos: Casa Laguna, Casa Patio, Casa Pérgola, Casa Galería y Casa Contemporánea.
- [ ] Nombre real de cada obra (o confirmar los provisorios). _Esperando un Drive con carpetas_
- [ ] Confirmar que las 4 de Santa Bárbara son casas distintas
- [ ] Ubicación de Casa Contemporánea
- [ ] Por cada obra: barrio, año, m² cubiertos, plazo de obra, y qué servicio se hizo. _Esperando_
- [ ] Revisar las descripciones (las escribimos mirando las fotos)
- [ ] Fotos de refacciones (tienen 180 y no se muestra ninguna). _Esperando_
- [x] Renders "En diseño": son propios y se pueden publicar

## Servicios
El cliente sumó: dirección de obra y construcción, anteproyecto, proyecto ejecutivo e interiorismo. Quedaron así:
- Proyecto de arquitectura: anteproyecto e imágenes 3D, proyecto ejecutivo, asesoramiento en materiales
- Proyecto y obra: anteproyecto y proyecto ejecutivo, dirección de obra y construcción, coordinación de gremios, llave en mano
- Refacciones y ampliaciones (sin cambios)
- Interiorismo (nuevo)
- [ ] Revisar los textos de Interiorismo (los escribimos nosotros) y que los 4 servicios estén bien así
- [ ] ¿"Dirección de obra y construcción" también se ofrece sola, sobre un proyecto de otro estudio? Si es así, pasa a ser un servicio aparte
- [ ] Validar los 5 pasos del proceso: Primera reunión, Propuesta, Proyecto, Obra, Entrega

## Inicio (textos nuevos, escritos por nosotros)
- [ ] Revisar las 5 preguntas frecuentes y sus respuestas (`faq` en `lib/i18n.ts`)
- [x] Zona: Nordelta. Todo el sitio dice "Nordelta y alrededores" (títulos, textos, metadatos y mapa)
- [ ] **Mapa provisorio**: es MapLibre con teselas gratuitas de OpenFreeMap. Cambiarlo más adelante (por un mapa propio o una ilustración)

## Quiénes somos
- [ ] Historia: quién fundó la empresa, cómo empezó en 1998 y los hitos importantes. _Esperando_
- [ ] Equipo: nombres, roles y fotos (si quieren mostrarlo). _Esperando_
- [ ] Testimonios de clientes (nombre y barrio) o link a reseñas de Google. _Esperando_
- [ ] Notas de prensa o publicaciones, si hay

## Marca
- [ ] Logo en vector (SVG, AI o PDF). _Esperando que se lo manden al cliente_. Mientras tanto queda el wordmark tipográfico y la "G" provisoria
- [ ] Favicon (sale del logo)

## Fotos
- [ ] Fotos originales en alta y nombre del fotógrafo. _Esperando_
- [ ] Fotos de obras en proceso y del equipo trabajando (suman mucho en "Proyecto y obra")

## Técnico y cuentas
- [ ] Acceso al dominio greschek-obras.com (DNS). _El cliente nos avisa quién lo maneja_
- [ ] Cuenta de hosting (propuesta: Vercel). ¿A nombre de quién?
- [ ] Formulario de contacto: ya está en todas las páginas. Para que envíe mails hace falta una cuenta de Resend (o la integración de Resend en Vercel) y cargar `RESEND_API_KEY`. Para mandar desde @greschek-obras.com hay que verificar el dominio en Resend (`CONTACT_FROM`). Confirmar a qué email llegan las consultas (`CONTACT_TO`)
- [ ] Analytics: ¿hay Google Analytics u otro en el sitio actual?
- [ ] Edición de contenido: si el cliente va a cargar obras por su cuenta, sumamos un CMS. Por ahora todo vive en archivos del repo
- [ ] Revisar las traducciones al inglés
- [ ] Política de privacidad y términos (el sitio actual los linkea)
