import photos from "./photos.json";
import type { Locale } from "./i18n";

export type Photo = { src: string; w: number; h: number; alt: string; blur: string };
type Raw = { src: string; w: number; h: number; orig: string; blur: string };
type L = Record<Locale, string>;

// Nombres y descripciones PROVISORIOS (ver PENDIENTES.md). Los índices son las fotos de lib/photos.json (1 = primera).
const data: {
  slug: keyof typeof photos;
  name: string;
  location?: string;
  type: L;
  summary: L;
  cover: number;
  photos: number[];
}[] = [
  {
    slug: "casa-laguna",
    name: "Casa Laguna",
    location: "Santa Bárbara, Tigre",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos plantas frente a la laguna. Losas de hormigón visto con textura de encofrado de madera, carpinterías de piso a techo y una galería abierta al agua.",
      en: "Two storeys facing the lagoon. Exposed board-formed concrete slabs, floor-to-ceiling glazing and a gallery that opens onto the water.",
    },
    cover: 3,
    photos: [2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    slug: "casa-patio",
    name: "Casa Patio",
    location: "Santa Bárbara, Tigre",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Una casa blanca organizada alrededor de un patio interior con vegetación. Cocina abierta, madera clara y piscina hacia el jardín.",
      en: "A white house arranged around a planted inner courtyard. Open kitchen, light timber and a pool facing the garden.",
    },
    cover: 11,
    photos: [2, 3, 5, 6, 4, 7, 8, 9, 10, 12],
  },
  {
    slug: "casa-pergola",
    name: "Casa Pérgola",
    location: "Santa Bárbara, Tigre",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Volúmenes blancos bajo techos de tejas, pérgolas oscuras sobre la galería y un living revestido en madera.",
      en: "White volumes under tiled roofs, dark pergolas over the gallery and a timber-lined living room.",
    },
    cover: 2,
    photos: [3, 5, 4, 6, 7, 8, 9],
  },
  {
    slug: "casa-galeria",
    name: "Casa Galería",
    location: "Santa Bárbara, Tigre",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Madera, piedra y una galería amplia con vista a la laguna. Interiores cálidos con cocina en gris oscuro y baños en mármol.",
      en: "Timber, stone and a generous gallery overlooking the lagoon. Warm interiors with a dark grey kitchen and marble bathrooms.",
    },
    cover: 3,
    photos: [13, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    slug: "casa-contemporanea",
    name: "Casa Contemporánea",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos niveles de líneas rectas y fachada limpia, rodeados de vegetación que le da privacidad. Un equilibrio entre modernidad y calma.",
      en: "Two levels of straight lines and a clean facade, surrounded by greenery that gives it privacy. A balance of modern and calm.",
    },
    cover: 13,
    photos: [2, 14, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 16],
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
  [/bodega/i, { es: "bodega", en: "wine cellar" }],
  [/entrada/i, { es: "entrada", en: "entrance" }],
  [/pasillo/i, { es: "pasillo", en: "hallway" }],
];

const toPhoto = (r: Raw, name: string, lang: Locale, n: number): Photo => {
  const hit = words.find(([re]) => re.test(r.orig));
  return { src: r.src, w: r.w, h: r.h, blur: r.blur, alt: `${name}, ${hit ? hit[1][lang] : `${lang === "es" ? "foto" : "photo"} ${n}`}` };
};

export function getProjects(lang: Locale) {
  return data.map((p) => {
    const raw = photos[p.slug] as Raw[];
    const pick = (i: number) => toPhoto(raw[i - 1], p.name, lang, i);
    return {
      slug: p.slug,
      name: p.name,
      location: p.location,
      type: p.type[lang],
      summary: p.summary[lang],
      cover: pick(p.cover),
      photos: [p.cover, ...p.photos].map(pick),
    };
  });
}

export type Project = ReturnType<typeof getProjects>[number];

// Fuera: la 8 (duplicado de la 1) y la 23 (de menor calidad). Quedan 21: grilla pareja de 3 columnas.
export const getRenders = (alt: string): Photo[] =>
  (photos.renders as Raw[]).filter((_, i) => i !== 7 && i !== 22).map((r) => ({ src: r.src, w: r.w, h: r.h, blur: r.blur, alt }));
