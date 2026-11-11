# Pendientes: lo que necesitamos de Greschek

Todo lo que está marcado como provisorio en el sitio sale de acá. Cuando llegue cada dato, se carga en `lib/site.ts`, `lib/i18n.ts` o `lib/projects.ts`.

Última respuesta del cliente: 2026-11-05.

## Del Drive del cliente (recibido 2026-11-10)
18 carpetas, una por casa, con las fotos profesionales en resolución original (~2.300 fotos). Se sumó al sitio:
- 11 obras nuevas, con 9 a 23 fotos elegidas cada una (sin fotos con chicos)
- Fotos originales nuevas para 7 obras que ya estaban (reemplazan las copias de Landhi)
- Decisión 2026-11-10: **las obras no muestran barrio**. Se sacó la ubicación de las tarjetas, la ficha y los datos.
  La sección Zona y la pregunta frecuente siguen nombrando los barrios donde trabajan (es la zona de servicio, no el de cada casa)

| Carpeta del Drive | Obra en el sitio |
| --- | --- |
| Santa Barbara Habas | Casa Laguna |
| Santa Barbara 121 | Casa Patio |
| Santa Barbara 122 | Casa Pérgola |
| Santa Barbara 749 | Casa Galería |
| El encuentro | Casa Contemporánea |
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
- [ ] Casa Muro: solo 9 fotos, todas verticales y de celular. ¿Hay más o mejores?
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
Son 30. Los nombres son **provisorios** y los inventamos nosotros a partir de las fotos (el sitio no muestra barrios).
Origen de cada una: las del Drive, en la tabla de arriba; las que solo están en Landhi (fotos de menor calidad):

| Sitio | Landhi |
| --- | --- |
| Casa Horizonte | Santa Barbara (1459) |
| Casa Portón | Pacheco Golf (2409) |
| Casa Bodega | Santa Barbara (1462) |
| Casa Madera | Barbarita (1372) |
| Casa Travertino | El Golf, Nordelta (1460) |
| Casa Lino | Castaños, Nordelta (1461) |
| Casa Selva | Los Sauces, Nordelta (2410) |
| Casa Terrazas | Lagos del Golf, Nordelta (2414) |
| Casa Lago | Nordelta (1157) |
| Casa Mimbre | Tigre (1156) |
| Casa Piedra | Santa Barbara (1153) |
| Casa Pinar | Costa Esmeralda (1154) |
| Renders | Villanueva (1155), Nordelta (1158, 2415), Albanueva (2411, Rincón de Milberg) |

- [ ] Nombre real de cada obra (o confirmar los provisorios)
- [ ] Fotos originales de las 12 que solo están en Landhi
- [x] Las de Santa Bárbara son casas distintas (confirmado con Landhi)
- [ ] Renders: ponerles nombre por proyecto (Villanueva, Nordelta, Albanueva) en vez de "Anteproyecto 07"
- [ ] Por cada obra: año, m² cubiertos, plazo de obra, y qué servicio se hizo. _Esperando_
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
- [x] Más obras: ahora son 30 (Landhi + Drive)
- [ ] Una cara en "Quiénes somos": fundador o equipo, historia y al menos un testimonio
- [ ] Email con dominio propio (@greschek-obras.com) en vez de Gmail
- [ ] Logo en vector para reemplazar la "G" de la píldora

Del sitio (podemos hacerlo nosotros):
- [ ] Bajar el movimiento: sacar las letras partidas de los títulos de sección y de los links (`SplitText`/`RollText`); dejar el viaje de fotos y el título de la portada. `RollText` duplica cada letra en el DOM (copiar el email puede traer letras de más)
- [ ] Los números (28 / +430 / +180) salen como "0" en el HTML hasta que corre el script: renderizar el valor final y animar desde ahí
- [ ] Casa Laguna no tiene tarjeta en el inicio (es la foto de portada y no se repite): sumar un link chico en la portada ("Casa Laguna →") o aceptarlo
- [ ] Mismo orden de servicios en Inicio y en Servicios (Interiorismo es 4º en uno y 3º en el otro); en el inicio las tarjetas de servicio no tienen descripción
- [x] "Nordelta y alrededores" se repite 4 veces en la sección Zona: el texto ahora nombra los barrios
- [ ] Renders: alt y títulos genéricos ("Imagen 3D de anteproyecto", "Anteproyecto 07"); la página Proyectos repite la foto de portada del inicio
- [ ] Formulario: el teléfono va después del mensaje (subirlo, o pedir WhatsApp); los campos se ven poco sobre el bloque azul
- [ ] Botón "Ver proyectos" de vidrio sobre la foto de portada: poco contraste
- [ ] Etiquetas de los números muy chicas (~13 px)
- [ ] JSON-LD `LocalBusiness` para búsquedas locales
