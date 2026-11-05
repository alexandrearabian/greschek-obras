import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/proyectos", "/servicios", "/nosotros", "/contacto", ...getProjects("es").map((p) => `/proyectos/${p.slug}`)];
  return locales.flatMap((l) => paths.map((p) => ({ url: `${site.url}/${l}${p}` })));
}
