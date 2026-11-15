import photos from "./photos.json";
import type { Locale } from "./i18n";

export type Photo = { src: string; w: number; h: number; alt: string; blur: string };
type Raw = { src: string; w: number; h: number; orig: string; blur: string };
type L = Record<Locale, string>;

const home: L = { es: "Vivienda unifamiliar", en: "Single-family home" };

// Nombres y descripciones PROVISORIOS (ver PENDIENTES.md).
// Son las 18 casas del Drive del cliente (`_seleccion_web`): 12 fotos cada una, elegidas y ordenadas por ellos; la 1 es la principal.
// El orden de esta lista es el de la grilla de Proyectos.
const data: {
  slug: keyof typeof photos;
  name: string;
  type: L;
  summary: L;
}[] = [
  {
    slug: "casa-galeria",
    name: "Casa Galería",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Madera, piedra y una galería amplia con vista a la laguna. Interiores cálidos con cocina en gris oscuro y baños en mármol.",
      en: "Timber, stone and a generous gallery overlooking the lagoon. Warm interiors with a dark grey kitchen and marble bathrooms.",
    },
  },
  {
    slug: "casa-muelle",
    name: "Casa Muelle",
    type: home,
    summary: {
      es: "Hormigón, madera y vidrio frente al agua, con el jardín bajando hasta el muelle. Interiores revestidos en madera clara, una escalera de peldaños volados y baños de piedra.",
      en: "Concrete, timber and glass facing the water, with the garden running down to the dock. Interiors lined in light timber, a cantilevered staircase and stone bathrooms.",
    },
  },
  {
    slug: "casa-marmol",
    name: "Casa Mármol",
    type: home,
    summary: {
      es: "Frente a la laguna, una casa blanca con deck de madera y una piscina larga. Adentro, mármol, grifería dorada, una cocina de frentes negros y un patio interior con espejo de agua.",
      en: "A white house facing the lagoon, with a timber deck and a long pool. Inside, marble, brass fittings, a black-fronted kitchen and an inner courtyard with a reflecting pool.",
    },
  },
  {
    slug: "casa-contemporanea",
    name: "Casa Contemporánea",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos niveles de líneas rectas y fachada limpia, rodeados de vegetación que le da privacidad. Un equilibrio entre modernidad y calma.",
      en: "Two levels of straight lines and a clean facade, surrounded by greenery that gives it privacy. A balance of modern and calm.",
    },
  },
  {
    slug: "casa-hormigon",
    name: "Casa Hormigón",
    type: home,
    summary: {
      es: "Hormigón visto, listones de madera y grandes paños de vidrio frente a la laguna. Cielorrasos de madera, una cocina en piedra gris y una piscina desbordante sobre el deck.",
      en: "Exposed concrete, timber slats and large glass panes facing the lagoon. Timber ceilings, a grey stone kitchen and an infinity pool on the deck.",
    },
  },
  {
    slug: "casa-oliva",
    name: "Casa Oliva",
    type: home,
    summary: {
      es: "Revoque verde oliva, techos de teja y una pérgola de madera en el acceso. Adentro, cerramientos de hierro negro, piso de cemento y un muro de piedra en el dormitorio.",
      en: "Olive-green render, tiled roofs and a timber pergola at the entrance. Inside, black steel partitions, polished concrete floors and a stone wall in the bedroom.",
    },
  },
  {
    slug: "casa-laguna",
    name: "Casa Laguna",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos plantas frente a la laguna. Losas de hormigón visto con textura de encofrado de madera, carpinterías de piso a techo y una galería abierta al agua.",
      en: "Two storeys facing the lagoon. Exposed board-formed concrete slabs, floor-to-ceiling glazing and a gallery that opens onto the water.",
    },
  },
  {
    slug: "casa-pizarra",
    name: "Casa Pizarra",
    type: home,
    summary: {
      es: "Muros de piedra pizarra, revoque blanco y un jardín frondoso alrededor. Galería con pérgola de madera, piscina frente a la laguna y una cocina con azulejos negros.",
      en: "Slate stone walls, white render and a lush garden all around. A gallery under a timber pergola, a pool facing the lagoon and a kitchen with black tiles.",
    },
  },
  {
    slug: "casa-patio",
    name: "Casa Patio",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Una casa blanca organizada alrededor de un patio interior con vegetación. Cocina abierta, madera clara y piscina hacia el jardín.",
      en: "A white house arranged around a planted inner courtyard. Open kitchen, light timber and a pool facing the garden.",
    },
  },
  {
    slug: "casa-pergola",
    name: "Casa Pérgola",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Volúmenes blancos bajo techos de tejas, pérgolas oscuras sobre la galería y un living revestido en madera.",
      en: "White volumes under tiled roofs, dark pergolas over the gallery and a timber-lined living room.",
    },
  },
  {
    slug: "casa-farol",
    name: "Casa Farol",
    type: home,
    summary: {
      es: "Una casa blanca de estilo clásico, con faroles, balcones de hierro y una puerta de madera maciza. Cocina blanca con detalles en bronce y una piscina al fondo del jardín.",
      en: "A white house in a classic style, with lanterns, iron balconies and a solid timber door. A white kitchen with brass details and a pool at the end of the garden.",
    },
  },
  {
    slug: "casa-blanca",
    name: "Casa Blanca",
    type: home,
    summary: {
      es: "Volúmenes blancos con pérgolas de madera, una galería con cocina exterior y piscina hacia el jardín. Adentro, pisos de madera, ventanales de marco negro y una cocina blanca con isla.",
      en: "White volumes with timber pergolas, a gallery with an outdoor kitchen and a pool facing the garden. Inside, timber floors, black-framed windows and a white kitchen with an island.",
    },
  },
  {
    slug: "casa-brisa",
    name: "Casa Brisa",
    type: home,
    summary: {
      es: "Una casa blanca con aire de playa: deck de madera, pérgolas y una piscina hacia el jardín. Adentro, pisos de madera gastada, estantes abiertos y baños con papel de palmeras.",
      en: "A white house with a beach-house feel: a timber deck, pergolas and a pool facing the garden. Inside, weathered timber floors, open shelving and bathrooms with palm-print wallpaper.",
    },
  },
  {
    slug: "casa-celosia",
    name: "Casa Celosía",
    type: home,
    summary: {
      es: "Volúmenes de hormigón visto y revoque blanco frente al agua. Celosías de madera en el acceso, cielorrasos con textura de encofrado y una cocina oscura con isla de mármol.",
      en: "Exposed concrete and white render volumes facing the water. Timber screens at the entrance, board-formed concrete ceilings and a dark kitchen with a marble island.",
    },
  },
  {
    slug: "casa-roble",
    name: "Casa Roble",
    type: home,
    summary: {
      es: "Volúmenes blancos de revestimiento vertical y una puerta de roble en el acceso. Galería con parrilla, piscina en el jardín y baños con grifería dorada.",
      en: "White volumes with vertical cladding and an oak door at the entrance. A gallery with a built-in grill, a pool in the garden and bathrooms with brass fittings.",
    },
  },
  {
    slug: "casa-alacena",
    name: "Casa Alacena",
    type: home,
    summary: {
      es: "Una casa blanca de líneas clásicas, con una galería abierta al jardín y una parrilla de piedra. La cocina tiene alacenas iluminadas; el living, tonos claros y madera.",
      en: "A white house with classic lines, a gallery open to the garden and a stone grill. The kitchen has lit cabinets; the living room, pale tones and timber.",
    },
  },
  {
    slug: "casa-nogal",
    name: "Casa Nogal",
    type: home,
    summary: {
      es: "Madera cálida en pisos, muebles y revestimientos, con grandes ventanales al jardín. Cocina con isla de mármol, living con hogar y una piscina larga con borde de piedra.",
      en: "Warm timber in floors, joinery and wall panels, with large windows onto the garden. A kitchen with a marble island, a living room with a fireplace and a long pool with a stone edge.",
    },
  },
  {
    slug: "casa-muro",
    name: "Casa Muro",
    type: home,
    summary: {
      es: "Muros de piedra natural y revoque blanco, con carpinterías de madera y una piscina frente a la laguna. Adentro, baños de piedra beige y una cocina con isla.",
      en: "Natural stone walls and white render, with timber window frames and a pool facing the lagoon. Inside, beige stone bathrooms and a kitchen with an island.",
    },
  },
];

const words: [RegExp, L][] = [
  [/contrafrente/i, { es: "contrafrente", en: "rear facade" }],
  [/fachada|frente/i, { es: "fachada", en: "facade" }],
  [/living/i, { es: "living", en: "living room" }],
  [/cocina/i, { es: "cocina", en: "kitchen" }],
  [/quincho/i, { es: "quincho", en: "outdoor pavilion" }],
  [/toilette/i, { es: "toilette", en: "powder room" }],
  [/baño/i, { es: "baño", en: "bathroom" }],
  [/cuarto/i, { es: "dormitorio principal", en: "main bedroom" }],
  [/dormitorio/i, { es: "dormitorio", en: "bedroom" }],
  [/comedor/i, { es: "comedor", en: "dining room" }],
  [/jardín/i, { es: "jardín", en: "garden" }],
  [/piscina/i, { es: "piscina", en: "pool" }],
  [/terraza/i, { es: "terraza", en: "terrace" }],
  [/bodega/i, { es: "bodega", en: "wine cellar" }],
  [/entrada/i, { es: "entrada", en: "entrance" }],
  [/pasillo/i, { es: "pasillo", en: "hallway" }],
  [/vestidor/i, { es: "vestidor", en: "walk-in closet" }],
  [/escalera/i, { es: "escalera", en: "staircase" }],
  [/galería/i, { es: "galería", en: "gallery" }],
  [/patio/i, { es: "patio", en: "courtyard" }],
  [/detalle/i, { es: "detalle", en: "detail" }],
  [/hall/i, { es: "hall", en: "hall" }],
  [/estar/i, { es: "estar", en: "family room" }],
  [/parrilla/i, { es: "parrilla", en: "barbecue" }],
  [/playroom/i, { es: "playroom", en: "playroom" }],
  [/escritorio/i, { es: "escritorio", en: "study" }],
  [/vajillero/i, { es: "vajillero", en: "china cabinet" }],
];

const toPhoto = (r: Raw, name: string, lang: Locale, n: number): Photo => {
  const hit = words.find(([re]) => re.test(r.orig));
  return { src: r.src, w: r.w, h: r.h, blur: r.blur, alt: `${name}, ${hit ? hit[1][lang] : `${lang === "es" ? "foto" : "photo"} ${n}`}` };
};

export function getProjects(lang: Locale) {
  return data.map((p) => {
    const all = (photos[p.slug] as Raw[]).map((r, i) => toPhoto(r, p.name, lang, i + 1));
    return { slug: p.slug, name: p.name, type: p.type[lang], summary: p.summary[lang], cover: all[0], photos: all };
  });
}

export type Project = ReturnType<typeof getProjects>[number];

// Para elegir fotos sueltas en las páginas sin depender del orden de la lista.
export const bySlug = (list: Project[], slug: Project["slug"]) => list.find((p) => p.slug === slug)!;

// Fotos de los cuatro servicios: las mismas en el inicio y en Servicios (la foto viaja de una página a la otra).
export const servicePhotos = (list: Project[]) => ({
  arquitectura: bySlug(list, "casa-hormigon").cover,
  obra: bySlug(list, "casa-galeria").photos[3], // quincho
  refacciones: bySlug(list, "casa-patio").photos[3], // comedor
  interiorismo: bySlug(list, "casa-pergola").photos[3], // living
});
