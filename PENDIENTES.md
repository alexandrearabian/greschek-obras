# Pendientes: lo que necesitamos de Greschek

Todo lo que está marcado como provisorio en el sitio sale de acá. Cuando llegue cada dato, se carga en `lib/site.ts`, `lib/i18n.ts` o `lib/projects.ts`.

Última respuesta del cliente: 2026-11-15 (cambios charlados con Santi).

## Cambios pedidos por el cliente (2026-11-15)
Pedido: portada animada con el scroll (del terreno a la casa terminada), grilla de obras con su foto principal y una página
por obra con sus 12 fotos, y la estructura nosotros / cómo trabajamos / servicios / testimonios / contacto, con WhatsApp
siempre visible. Hecho en el sitio:
- [x] Obras: quedan **las 18 casas del Drive**, cada una con las 12 fotos que eligió el cliente (carpeta `_seleccion_web`,
  en su orden; la 1 es la principal). Se sacaron las 12 que solo estaban en Landhi y los renders "En diseño"
  (siguen en git, commit `b78a251`, por si se quieren recuperar)
- [x] Inicio: portada, nosotros (con los números), cómo trabajamos, servicios, obras (6 + link a todas), testimonios,
  zona, preguntas frecuentes y contacto. Zona y preguntas no estaban en el pedido: se dejaron; sacarlas si el cliente no las quiere
- [x] WhatsApp: en la píldora de navegación, fija en todas las páginas (ahora con el texto también en escritorio ancho)
- [ ] **Video de la portada: falta generarlo.** El sitio ya lo reproduce con el scroll; hoy muestra la foto fija de Casa Muelle.
  1. Generar un clip de 5 a 8 s, 16:9, cámara fija, sin cortes: empieza en el terreno vacío y termina en la casa.
     El **último cuadro tiene que ser `material/hero-ultimo-cuadro.jpg`** (la foto real, 3840×2160; `material/` no se sube a git).
     La casa final es la obra real: lo generado es solo el proceso
  2. Prepararlo (todos los cuadros clave, para que el scroll no salte) y sacar el primer cuadro:
     `ffmpeg -i clip.mp4 -an -vf scale=1920:-2 -c:v libx264 -g 1 -crf 24 -pix_fmt yuv420p -movflags +faststart public/hero/obra.mp4`
     `ffmpeg -i public/hero/obra.mp4 -frames:v 1 public/hero/obra.jpg`
  3. Cargar `heroVideo: "/hero/obra.mp4"` en `lib/site.ts`. Probarlo en un iPhone real (Safari es el más delicado con video)
- [ ] **Testimonios: son textos de ejemplo** y cada tarjeta dice "Ejemplo". No publicar así: cargar los reales en
  `testimonials` de `lib/i18n.ts` y dejar `sample` vacío (o sacar la sección)
- [ ] **38 fotos están en baja (1400 px)**: el conector del Drive no baja archivos de más de 10 MB y se usó la copia chica de
  `_vistas`. Hay que bajar los originales a mano desde `_seleccion_web` y reemplazarlas:
  Casa Muro (las 12), Casa Roble (01 a 06, 09, 11, 12), Casa Brisa (01, 03, 04, 06, 07, 08, 11, 12), Casa Alacena (01, 02, 05, 08, 12),
  Casa Laguna (01, 04, 05) y Casa Muelle (08). Al reemplazar una foto con el mismo nombre, borrar `.next/cache/images`
- [x] Logo: tomado del Drive (`_seleccion_web/Greschek Logos./Greschek_Logos_Todos_v2`). El horizontal nuevo
  (`03_Horizontal_Brujula_Completa`) va en el footer; la brújula simplificada de `02_Evolucion` va en la píldora, la
  pantalla de carga y el ícono del navegador. Decidir con el cliente: el azul de la marca es `#00156B` y el del sitio
  (`--accent`) es `#163a6b`; el logo usa el del sitio

## Del Drive del cliente (recibido 2026-11-10; selección de 12 fotos por casa, 2026-11-13)
18 carpetas, una por casa, con las fotos profesionales en resolución original (~2.300 fotos). El 2026-11-13 el cliente sumó
`_seleccion_web`: 12 fotos elegidas por casa, 3 suplentes, la principal de cada una y `seleccion.csv` con el motivo de cada elección.
El sitio usa esa selección tal cual.
- Decisión 2026-11-10: **las obras no muestran barrio**. Se sacó la ubicación de las tarjetas, la ficha y los datos.
  La sección Zona y la pregunta frecuente siguen nombrando los barrios donde trabajan (es la zona de servicio, no el de cada casa)

| Carpeta del Drive | Obra en el sitio |
| --- | --- |
| Santa Barbara Habas | Casa Laguna |
| Santa Barbara 121 | Casa Patio |
| Santa Barbara 122 | Casa Pérgola |
| Santa Barbara 749 | Casa Galería |
| El encuentro (en `_seleccion_web`: "Casa sin identificar (en El Encuentro)") | Casa Contemporánea |
| Yacht 1 | Casa Celosía |
| Armanino SB | Casa Blanca |
| Virazon Gilda | Casa Mármol (nueva) |
| Puentes medica | Casa Muelle (nueva) |
| Hernan 561 SB | Casa Alacena (nueva) |
| Sofi SB | Casa Pizarra (nueva) |
| Los Cardos | Casa Oliva (nueva) |
| El Encuentro | Casa Farol (nueva) |
| Yacht 2 Puma | Casa Hormigón (nueva) |
| Santa Barbara 827 | Casa Nogal (nueva) |
| San Marco Rulo | Casa Brisa (nueva) |
| Carpinchos 316 | Casa Roble (nueva) |
| Santa Ana | Casa Muro (nueva) |

- [ ] Nombres y descripciones de las 11 nuevas son provisorios (los escribimos mirando las fotos)
- [ ] Casa Muro: las 12 fotos son verticales (la tarjeta de la grilla recorta la principal a horizontal)
- [ ] Casa Celosía: casi todas sus fotos son de ~2000 px. ¿Hay originales?
- [ ] Sin usar: 15 videos cortos de celular de Casa Farol (recorridos de 3 a 6 s; pueden servir como loops) y 26 fotos HEIC
- [ ] No hay fotos de obra en proceso en el Drive (ver "Fotos")

## Del perfil de Landhi (landhi.com.ar/greschekobras, revisado 2026-11-09)
Se sumó al sitio: 14 obras nuevas (de 21 publicadas), fotos extra de Galería, Contemporánea y Pérgola, 12 renders nuevos,
"empresa familiar", "proyecto, dirección y administración de obra", "asesoramiento en la elección
de gremios y proveedores" y el arquitecto José Cunzo (Quiénes somos). No se sumó (decidir con el cliente):
- [ ] La cuenta de Landhi está a nombre de **Nano Greschek**. ¿Es el fundador? ¿Lo nombramos en Quiénes somos?
- [ ] Rol de **José Cunzo** y si quiere aparecer con nombre (hoy sí aparece, tomado de Landhi)
- [ ] Landhi lista como web **www.greschekobras.com** (sin guion) y el sitio usa greschek-obras.com: ¿cuál es el dominio?
- [ ] Landhi da como dirección "Barrio Cerrado Santa Bárbara, Troncos del Talar". No la mostramos: ¿es oficina o una casa?
- [ ] En Landhi el link de Instagram está roto (`instagram.com/https://greschek_obras.com`) y sigue el Facebook inactivo: avisarle al cliente
- [ ] Se descartaron 10 fotos de Landhi de menos de 1000 px (entre ellas dos fachadas de Casa Madera y una de Casa Celosía). Muchas otras son de celular (1024 a 2048 px): pedir originales

## Datos de contacto
- [ ] **WhatsApp: hoy hay un número INVENTADO (`5491100000000`) en `site.whatsapp`**, para que el sitio ya funcione como si la línea existiera (botón en la píldora, footer, bloque de consulta, página de contacto y la pregunta frecuente de presupuesto). Van a sacar una línea nueva: cuando la tengan, reemplazar ese número en `lib/site.ts`. **No publicar el sitio con el número inventado.**
- [ ] Si esa línea también atiende llamadas, cargarla además en `site.phone` (formato visible, ej. "+54 9 11 1234 5678")
- [ ] Dirección de oficina, si la quieren mostrar
- [x] Instagram (@greschek_obras) activo
- [x] Facebook inactivo: se sacó del sitio (menú, footer y contacto)

## Obras
Son 18, las del Drive. Los nombres son **provisorios** y los inventamos nosotros a partir de las fotos (el sitio no muestra barrios).
Origen de cada una: la tabla de arriba. Las 12 que solo estaban en Landhi y los renders se sacaron el 2026-11-15.

- [ ] Nombre real de cada obra (o confirmar los provisorios)
- [x] Las de Santa Bárbara son casas distintas (confirmado con Landhi)
- [ ] Por cada obra: año, m² cubiertos, plazo de obra, y qué servicio se hizo. _Esperando_
- [ ] Revisar las descripciones (las escribimos mirando las fotos)
- [ ] Fotos de refacciones (tienen 180 y no se muestra ninguna). _Esperando_

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
- [ ] Testimonios de clientes (nombre y barrio) o link a reseñas de Google. _Esperando_. La sección ya está en el inicio con textos de ejemplo
- [ ] Notas de prensa o publicaciones, si hay

## Marca
- [x] Logo en vector: llegó por Drive y ya está en el sitio (ver arriba)
- [x] Favicon (sale del logo)

## Fotos
- [x] Fotos originales en alta: llegaron por Drive para 18 obras (faltan las 12 que solo están en Landhi)
- [ ] Nombre del fotógrafo (para darle crédito)
- [ ] Fotos de obras en proceso y del equipo trabajando (suman mucho en "Proyecto y obra"). **No vinieron en el Drive**.
  Idealmente una misma casa desde el terreno vacío hasta terminada, siempre desde el mismo ángulo: con eso se arma la portada
  animada que construye la casa al hacer scroll

## Técnico y cuentas
- [ ] Acceso al dominio greschek-obras.com (DNS). _El cliente nos avisa quién lo maneja_
- [ ] Cuenta de hosting (propuesta: Vercel). ¿A nombre de quién?
- [ ] Formulario de contacto: ya está en todas las páginas. Para que envíe mails hace falta una cuenta de Resend (o la integración de Resend en Vercel) y cargar `RESEND_API_KEY`. Para mandar desde @greschek-obras.com hay que verificar el dominio en Resend (`CONTACT_FROM`). Confirmar a qué email llegan las consultas (`CONTACT_TO`)
- [ ] Analytics: ¿hay Google Analytics u otro en el sitio actual?
- [ ] Edición de contenido: si el cliente va a cargar obras por su cuenta, sumamos un CMS. Por ahora todo vive en archivos del repo
- [ ] Revisar las traducciones al inglés
- [ ] Política de privacidad y términos (el sitio actual los linkea)

## Del audit de UX (2026-11-05): lo que falta
Ya hecho: las obras terminadas van con fotos grandes en el inicio (los renders quedaron de apoyo, 4 miniaturas); la píldora muestra las secciones, idioma, WhatsApp y "Pedir presupuesto" en escritorio, y en celular queda siempre abajo con WhatsApp a mano.

Bloquea el lanzamiento:
- [ ] `RESEND_API_KEY` en producción. Sin la clave, **en producción el formulario responde error a todas las consultas** (en desarrollo finge que se envió, así que no se nota)
- [ ] El número de WhatsApp real (ver arriba)

Depende del cliente (sin esto el sitio afirma más de lo que muestra):
- [ ] Datos reales por obra: año, m², plazo y qué servicio se hizo. Hoy la ficha solo dice tipo y cantidad de fotos
- [x] Obras: 18, todas con fotos profesionales del Drive
- [ ] Una cara en "Quiénes somos": fundador o equipo, historia y al menos un testimonio
- [ ] Email con dominio propio (@greschek-obras.com) en vez de Gmail
- [x] Logo en vector para reemplazar la "G" de la píldora

Del sitio (podemos hacerlo nosotros):
- [ ] Bajar el movimiento: sacar las letras partidas de los títulos de sección y de los links (`SplitText`/`RollText`); dejar el viaje de fotos y el título de la portada. `RollText` duplica cada letra en el DOM (copiar el email puede traer letras de más)
- [ ] Los números (28 / +430 / +180) salen como "0" en el HTML hasta que corre el script: renderizar el valor final y animar desde ahí
- [ ] Casa Muelle no tiene tarjeta en el inicio (es la foto de portada y no se repite): sumar un link chico en la portada ("Casa Muelle →") o aceptarlo
- [ ] Mismo orden de servicios en Inicio y en Servicios (Interiorismo es 4º en uno y 3º en el otro); en el inicio las tarjetas de servicio no tienen descripción
- [x] "Nordelta y alrededores" se repite 4 veces en la sección Zona: el texto ahora nombra los barrios
- [ ] Formulario: el teléfono va después del mensaje (subirlo, o pedir WhatsApp); los campos se ven poco sobre el bloque azul
- [ ] Botón "Ver proyectos" de vidrio sobre la foto de portada: poco contraste
- [ ] Etiquetas de los números muy chicas (~13 px)
- [ ] JSON-LD `LocalBusiness` para búsquedas locales
