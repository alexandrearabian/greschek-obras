/*
  Reglas del viaje de fotos entre páginas (las mismas para servicios y obras):
  - Click: lo hace React con una View Transition. El origen lleva el nombre de transición solo durante el viaje
    (Next deja la página anterior montada y oculta, y dos fotos con el mismo nombre a la vez rompen las transiciones).
  - Atrás / adelante del navegador: React no empareja las fotos (al medir, la otra todavía está fuera de pantalla
    porque el scroll se restaura después). Lo hacemos a mano: cada lado anota dónde está su foto en pantalla y, al
    reaparecer el otro, una copia vuela desde ahí (`flyInto`).
  - Siempre: una sola foto que viaja (sin fundido entre dos recortes), esquinas que cambian durante el viaje,
    y el degradé y los textos de destino aparecen con un fundido, nunca de golpe.
*/

export const SHADE = "linear-gradient(to top, rgb(14 18 26 / 0.78), rgb(14 18 26 / 0.35) 40%, rgb(14 18 26 / 0) 70%)";
// Degradé de la portada de cada obra: va dentro de la foto que viaja, así llega con ella y no después.
export const HERO_SHADE = "linear-gradient(to top, rgb(14 18 26 / 0.7), rgb(14 18 26 / 0.05) 50%, rgb(14 18 26 / 0.35))";
export const EASE = "cubic-bezier(0.32, 0.72, 0, 1)";
export const DURATION = 650;

let traversedAt = -Infinity;
if (typeof window !== "undefined") addEventListener("popstate", () => (traversedAt = performance.now()));
/** La navegación actual vino del botón atrás/adelante del navegador. */
export const traversed = () => performance.now() - traversedAt < 1500;
export const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Qué foto está "abierta" en cada grupo (servicio, obra) y dónde se vio por última vez cada lado.
const openedIn: Record<string, string | null> = {};
const rects = new Map<string, DOMRect>();
export const opened = (group: string) => openedIn[group] ?? null;
export const open = (group: string, id: string, from?: Element | null) => {
  openedIn[group] = id;
  if (from) rects.set(`${group}:from`, from.getBoundingClientRect());
};
export const recall = (key: string) => rects.get(key);

/** Anota la posición en pantalla de `read()` mientras se scrollea. Devuelve la limpieza (para useEffect). */
export function track(key: string, read: () => Element | null | undefined) {
  const since = performance.now();
  const save = () => {
    // Si hubo atrás/adelante después de que esta página empezó a anotar, esta página se está yendo: lo que
    // scrollea ahora es la restauración de la otra página, no el usuario. Queda la última posición real.
    if (traversedAt > since) return;
    const el = read();
    if (el) rects.set(key, el.getBoundingClientRect());
  };
  save();
  addEventListener("scroll", save, { passive: true });
  addEventListener("resize", save);
  return () => {
    removeEventListener("scroll", save);
    removeEventListener("resize", save);
  };
}

type Fly = {
  /** Esquinas al salir y al llegar. */
  radius: [string, string];
  /** Opacidad del degradé durante el vuelo [inicio, fin]; sin esto, no lleva degradé. */
  shade?: [number, number];
  /** Qué degradé lleva (por defecto el de las tarjetas). */
  veil?: string;
  /** Elementos ocultos hasta que la copia aterriza. */
  hide: HTMLElement[];
  /** Elementos que aparecen con un fundido al aterrizar (textos, degradés). */
  reveal?: HTMLElement[];
};

/**
  Hace volar una copia de la foto desde `from` hasta `el`. Espera a que `el` esté en pantalla y quieto (el scroll
  se restaura después del render). Devuelve la limpieza.
  ponytail: tope de ~20 frames de espera; si no aparece, se muestra sin animar.
*/
export function flyInto(el: HTMLElement, from: DOMRect, { radius, shade, veil: veilBg = SHADE, hide, reveal = [] }: Fly) {
  // Si al irse la foto de origen ya no se veía (se había scrolleado más abajo), no hay viaje: se vuelve normal.
  if (from.bottom <= 0 || from.top >= innerHeight) return;
  const hidden = [...hide, ...reveal];
  hidden.forEach((h) => (h.style.opacity = "0"));
  const restore = () => hidden.forEach((h) => (h.style.opacity = ""));
  let raf = 0;
  let frames = 0;
  let lastTop = NaN;
  let fly: HTMLDivElement | undefined;
  let cancelled = false;
  const wait = () => {
    const to = el.getBoundingClientRect();
    const visible = to.bottom > 0 && to.top < innerHeight;
    if (!(visible && to.top === lastTop) && ++frames < 20) {
      lastTop = to.top;
      raf = requestAnimationFrame(wait);
      return;
    }
    const src = el.querySelector("img")?.currentSrc;
    if (!visible || !src) return restore();
    fly = document.createElement("div");
    fly.style.cssText = `position:fixed;left:0;top:0;z-index:35;pointer-events:none;overflow:hidden;background:center/cover url("${src}")`;
    const opts = { duration: DURATION, easing: EASE, fill: "forwards" as const };
    if (shade) {
      const veil = document.createElement("div");
      veil.style.cssText = `position:absolute;inset:0;background:${veilBg}`;
      fly.append(veil);
      veil.animate([{ opacity: shade[0] }, { opacity: shade[1] }], opts);
    }
    document.body.append(fly);
    const box = (b: DOMRect, r: string) => ({ transform: `translate(${b.left}px, ${b.top}px)`, width: `${b.width}px`, height: `${b.height}px`, borderRadius: r });
    fly
      .animate([box(from, radius[0]), box(to, radius[1])], opts)
      .finished.then(() => {
        if (cancelled) return;
        hide.forEach((h) => (h.style.opacity = ""));
        fly?.remove();
        reveal.forEach((h) => {
          h.style.opacity = "";
          h.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: "ease-out" });
        });
      })
      .catch(() => {});
  };
  raf = requestAnimationFrame(wait);
  return () => {
    cancelled = true;
    cancelAnimationFrame(raf);
    restore();
    fly?.remove();
  };
}
