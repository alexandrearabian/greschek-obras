import photos from "./photos.json";
import type { Locale } from "./i18n";

export type Photo = { src: string; w: number; h: number; alt: string; blur: string };
type Raw = { src: string; w: number; h: number; orig: string; blur: string };
type L = Record<Locale, string>;

const home: L = { es: "Vivienda unifamiliar", en: "Single-family home" };

// Nombres y descripciones PROVISORIOS (ver PENDIENTES.md). Los índices son las fotos de lib/photos.json (1 = primera).
// Las fotos de cada obra ya están elegidas y ordenadas en photos.json: la 1 es la portada.
const data: {
  slug: keyof typeof photos;
  name: string;
  type: L;
  summary: L;
  cover: number;
  photos?: number[]; // sin lista: todas en orden, salvo la portada
}[] = [
  {
    slug: "casa-laguna",
    name: "Casa Laguna",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos plantas frente a la laguna. Losas de hormigón visto con textura de encofrado de madera, carpinterías de piso a techo y una galería abierta al agua.",
      en: "Two storeys facing the lagoon. Exposed board-formed concrete slabs, floor-to-ceiling glazing and a gallery that opens onto the water.",
    },
    cover: 1,
  },
  {
    slug: "casa-patio",
    name: "Casa Patio",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Una casa blanca organizada alrededor de un patio interior con vegetación. Cocina abierta, madera clara y piscina hacia el jardín.",
      en: "A white house arranged around a planted inner courtyard. Open kitchen, light timber and a pool facing the garden.",
    },
    cover: 1,
  },
  {
    slug: "casa-pergola",
    name: "Casa Pérgola",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Volúmenes blancos bajo techos de tejas, pérgolas oscuras sobre la galería y un living revestido en madera.",
      en: "White volumes under tiled roofs, dark pergolas over the gallery and a timber-lined living room.",
    },
    cover: 1,
  },
  {
    slug: "casa-galeria",
    name: "Casa Galería",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Madera, piedra y una galería amplia con vista a la laguna. Interiores cálidos con cocina en gris oscuro y baños en mármol.",
      en: "Timber, stone and a generous gallery overlooking the lagoon. Warm interiors with a dark grey kitchen and marble bathrooms.",
    },
    cover: 1,
  },
  {
    slug: "casa-contemporanea",
    name: "Casa Contemporánea",
    type: { es: "Vivienda unifamiliar", en: "Single-family home" },
    summary: {
      es: "Dos niveles de líneas rectas y fachada limpia, rodeados de vegetación que le da privacidad. Un equilibrio entre modernidad y calma.",
      en: "Two levels of straight lines and a clean facade, surrounded by greenery that gives it privacy. A balance of modern and calm.",
    },
    cover: 1,
  },
  // Desde acá: obras nuevas del Drive del cliente (2026-11-10). Nombre y texto provisorios.
  {
    slug: "casa-marmol",
    name: "Casa Mármol",
    type: home,
    summary: {
      es: "Frente a la laguna, una casa blanca con deck de madera y una piscina larga. Adentro, mármol, grifería dorada, una cocina de frentes negros y un patio interior con espejo de agua.",
      en: "A white house facing the lagoon, with a timber deck and a long pool. Inside, marble, brass fittings, a black-fronted kitchen and an inner courtyard with a reflecting pool.",
    },
    cover: 1,
  },
  {
    slug: "casa-muelle",
    name: "Casa Muelle",
    type: home,
    summary: {
      es: "Hormigón, madera y vidrio frente al agua, con el jardín bajando hasta el muelle. Interiores revestidos en madera clara, una escalera de peldaños volados y baños de piedra.",
      en: "Concrete, timber and glass facing the water, with the garden running down to the dock. Interiors lined in light timber, a cantilevered staircase and stone bathrooms.",
    },
    cover: 1,
  },
  {
    slug: "casa-alacena",
    name: "Casa Alacena",
    type: home,
    summary: {
      es: "Una casa blanca de líneas clásicas, con una galería abierta al jardín y una parrilla de piedra. La cocina tiene alacenas iluminadas; el living, tonos claros y madera.",
      en: "A white house with classic lines, a gallery open to the garden and a stone grill. The kitchen has lit cabinets; the living room, pale tones and timber.",
    },
    cover: 1,
  },
  {
    slug: "casa-pizarra",
    name: "Casa Pizarra",
    type: home,
    summary: {
      es: "Muros de piedra pizarra, revoque blanco y un jardín frondoso alrededor. Galería con pérgola de madera, piscina frente a la laguna y una cocina con azulejos negros.",
      en: "Slate stone walls, white render and a lush garden all around. A gallery under a timber pergola, a pool facing the lagoon and a kitchen with black tiles.",
    },
    cover: 1,
  },
  {
    slug: "casa-oliva",
    name: "Casa Oliva",
    type: home,
    summary: {
      es: "Revoque verde oliva, techos de teja y una pérgola de madera en el acceso. Adentro, cerramientos de hierro negro, piso de cemento y un muro de piedra en el dormitorio.",
      en: "Olive-green render, tiled roofs and a timber pergola at the entrance. Inside, black steel partitions, polished concrete floors and a stone wall in the bedroom.",
    },
    cover: 1,
  },
  {
    slug: "casa-farol",
    name: "Casa Farol",
    type: home,
    summary: {
      es: "Una casa blanca de estilo clásico, con faroles, balcones de hierro y una puerta de madera maciza. Cocina blanca con detalles en bronce y una piscina al fondo del jardín.",
      en: "A white house in a classic style, with lanterns, iron balconies and a solid timber door. A white kitchen with brass details and a pool at the end of the garden.",
    },
    cover: 1,
  },
  {
    slug: "casa-hormigon",
    name: "Casa Hormigón",
    type: home,
    summary: {
      es: "Hormigón visto, listones de madera y grandes paños de vidrio frente a la laguna. Cielorrasos de madera, una cocina en piedra gris y una piscina desbordante sobre el deck.",
      en: "Exposed concrete, timber slats and large glass panes facing the lagoon. Timber ceilings, a grey stone kitchen and an infinity pool on the deck.",
    },
    cover: 1,
  },
  {
    slug: "casa-nogal",
    name: "Casa Nogal",
    type: home,
    summary: {
      es: "Madera cálida en pisos, muebles y revestimientos, con grandes ventanales al jardín. Cocina con isla de mármol, living con hogar y una piscina larga con borde de piedra.",
      en: "Warm timber in floors, joinery and wall panels, with large windows onto the garden. A kitchen with a marble island, a living room with a fireplace and a long pool with a stone edge.",
    },
    cover: 1,
  },
  {
    slug: "casa-brisa",
    name: "Casa Brisa",
    type: home,
    summary: {
      es: "Una casa blanca con aire de playa: deck de madera, pérgolas y una piscina hacia el jardín. Adentro, pisos de madera gastada, estantes abiertos y baños con papel de palmeras.",
      en: "A white house with a beach-house feel: a timber deck, pergolas and a pool facing the garden. Inside, weathered timber floors, open shelving and bathrooms with palm-print wallpaper.",
    },
    cover: 1,
  },
  {
    slug: "casa-roble",
    name: "Casa Roble",
    type: home,
    summary: {
      es: "Volúmenes blancos de revestimiento vertical y una puerta de roble en el acceso. Galería con parrilla, piscina en el jardín y baños con grifería dorada.",
      en: "White volumes with vertical cladding and an oak door at the entrance. A gallery with a built-in grill, a pool in the garden and bathrooms with brass fittings.",
    },
    cover: 1,
  },
  {
    slug: "casa-muro",
    name: "Casa Muro",
    type: home,
    summary: {
      es: "Muros de piedra natural y revoque blanco, con carpinterías de madera y una piscina frente a la laguna. Adentro, baños de piedra beige y una cocina con isla.",
      en: "Natural stone walls and white render, with timber window frames and a pool facing the lagoon. Inside, beige stone bathrooms and a kitchen with an island.",
    },
    cover: 1,
  },
  // Desde acá: obras del perfil de Greschek en Landhi (2026-11-09). Nombre y texto provisorios.
  {
    slug: "casa-celosia",
    name: "Casa Celosía",
    type: home,
    summary: {
      es: "Volúmenes de hormigón visto y revoque blanco frente al agua. Celosías de madera en el acceso, cielorrasos con textura de encofrado y una cocina oscura con isla de mármol.",
      en: "Exposed concrete and white render volumes facing the water. Timber screens at the entrance, board-formed concrete ceilings and a dark kitchen with a marble island.",
    },
    cover: 1,
  },
  {
    slug: "casa-blanca",
    name: "Casa Blanca",
    type: home,
    summary: {
      es: "Volúmenes blancos con pérgolas de madera, una galería con cocina exterior y piscina hacia el jardín. Adentro, pisos de madera, ventanales de marco negro y una cocina blanca con isla.",
      en: "White volumes with timber pergolas, a gallery with an outdoor kitchen and a pool facing the garden. Inside, timber floors, black-framed windows and a white kitchen with an island.",
    },
    cover: 1,
  },
  {
    slug: "casa-horizonte",
    name: "Casa Horizonte",
    type: home,
    summary: {
      es: "Una piscina desbordante que se funde con la laguna, una pérgola gris sobre el deck y volúmenes blancos. Adentro, madera clara, listones verticales y una cocina de frentes oscuros.",
      en: "An infinity pool that merges with the lagoon, a grey pergola over the deck and white volumes. Inside, light timber, vertical slats and a kitchen with dark fronts.",
    },
    cover: 15,
  },
  {
    slug: "casa-porton",
    name: "Casa Portón",
    type: home,
    summary: {
      es: "Revoque gris, faroles y un portón de madera maciza en el acceso. Una galería amplia abierta al jardín y un living luminoso con muebles de madera oscura.",
      en: "Grey render, lanterns and a solid timber double door at the entrance. A wide gallery open to the garden and a bright living room with dark timber furniture.",
    },
    cover: 2,
  },
  {
    slug: "casa-bodega",
    name: "Casa Bodega",
    type: home,
    summary: {
      es: "Interiores en gris y madera, con una pared de estantes para vinos. Galería con techo vidriado, parrilla y una piscina con deck frente a la laguna.",
      en: "Grey and timber interiors with a wall of wine shelves. A glass-roofed gallery, a built-in grill and a pool with a deck facing the lagoon.",
    },
    cover: 17,
  },
  {
    slug: "casa-madera",
    name: "Casa Madera",
    type: home,
    summary: {
      es: "Revestimientos de madera, hierro negro y azulejos blancos. Un bar a la vista en el living y un balcón con hamaca frente a la laguna.",
      en: "Timber cladding, black steel and white tiles. An open bar in the living room and a balcony with a hammock facing the lagoon.",
    },
    cover: 9,
  },
  {
    slug: "casa-travertino",
    name: "Casa Travertino",
    type: home,
    summary: {
      es: "Pisos de travertino, madera cálida y una escalera de hormigón que parece flotar. La galería se abre a una piscina con borde de piedra.",
      en: "Travertine floors, warm timber and a concrete staircase that seems to float. The gallery opens onto a pool with a stone edge.",
    },
    cover: 3,
  },
  {
    slug: "casa-lino",
    name: "Casa Lino",
    type: home,
    summary: {
      es: "Interiores claros y serenos: cortinas de lino, madera natural y blancos suaves. Cocina abierta al comedor y baños revestidos en mármol.",
      en: "Light, calm interiors: linen curtains, natural timber and soft whites. A kitchen open to the dining room and marble-clad bathrooms.",
    },
    cover: 1,
  },
  {
    slug: "casa-selva",
    name: "Casa Selva",
    type: home,
    summary: {
      es: "Revoque gris texturado, listones de madera y un jardín tropical que envuelve la casa. Galería con mesa de madera maciza y un living alrededor del hogar.",
      en: "Textured grey render, timber slats and a tropical garden wrapped around the house. A gallery with a solid timber table and a living room gathered around the fireplace.",
    },
    cover: 1,
  },
  {
    slug: "casa-terrazas",
    name: "Casa Terrazas",
    type: home,
    summary: {
      es: "Una casa blanca de carpinterías negras, con el jardín en terrazas que baja hasta la laguna. Living con hogar y vista al agua.",
      en: "A white house with black window frames and a terraced garden stepping down to the lagoon. A living room with a fireplace and views of the water.",
    },
    cover: 1,
  },
  {
    slug: "casa-lago",
    name: "Casa Lago",
    type: home,
    summary: {
      es: "Volúmenes blancos frente al lago, portones de madera y una galería con vista al agua. Living amplio con pisos de madera y baños en mármol.",
      en: "White volumes facing the lake, timber gates and a gallery overlooking the water. A generous living room with timber floors and marble bathrooms.",
    },
    cover: 5,
  },
  {
    slug: "casa-mimbre",
    name: "Casa Mimbre",
    type: home,
    summary: {
      es: "Una galería con lámparas de mimbre, deck de madera y una mesa larga para reunirse. Adentro, madera, plantas y baños con bachas de apoyo.",
      en: "A gallery with wicker lamps, a timber deck and a long table for gatherings. Inside, timber, plants and bathrooms with countertop basins.",
    },
    cover: 11,
  },
  {
    slug: "casa-piedra",
    name: "Casa Piedra",
    type: home,
    summary: {
      es: "Muros de piedra, pérgolas de madera sobre la galería y una piscina con deck frente al jardín.",
      en: "Stone walls, timber pergolas over the gallery and a pool with a deck facing the garden.",
    },
    cover: 2,
  },
  {
    slug: "casa-pinar",
    name: "Casa Pinar",
    type: home,
    summary: {
      es: "Una casa de madera entre pinos, cerca del mar. Revestimiento azul, barandas blancas y decks elevados alrededor.",
      en: "A timber house among the pines, close to the sea. Blue cladding, white railings and raised decks all around.",
    },
    cover: 2,
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
      type: p.type[lang],
      summary: p.summary[lang],
      cover: pick(p.cover),
      photos: [p.cover, ...(p.photos ?? raw.map((_, i) => i + 1).filter((i) => i !== p.cover))].map(pick),
    };
  });
}

export type Project = ReturnType<typeof getProjects>[number];

// Fuera: la 8 (duplicado de la 1) y la 23 (de menor calidad). Quedan 33 (de la 24 en adelante, de Landhi): grilla pareja de 3 columnas.
export const getRenders = (alt: string): Photo[] =>
  (photos.renders as Raw[]).filter((_, i) => i !== 7 && i !== 22).map((r) => ({ src: r.src, w: r.w, h: r.h, blur: r.blur, alt }));
