import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";
import { Photo } from "./Photo";
import { ProjectCoverAnchor } from "./ProjectCover";

// Todas las tarjetas con el mismo recorte: la grilla queda pareja aunque las fotos no lo sean.
// Al hover el nombre pasa al azul y se subraya. Al abrirla, la portada viaja a la página de la obra (flight.ts).
export function ProjectCard({ project, lang, sizes, ratio = "aspect-[3/2]" }: { project: Project; lang: Locale; sizes: string; ratio?: string }) {
  return (
    <Link href={`/${lang}/proyectos/${project.slug}`} transitionTypes={["project"]} className="group block">
      <div>
        <ProjectCoverAnchor slug={project.slug}>
          <Photo photo={project.cover} sizes={sizes} ratio={ratio} />
        </ProjectCoverAnchor>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-medium tracking-tight">
              <span className="hover-line">{project.name}</span>
            </h2>
            <p className="mt-1 text-[15px] text-muted">{[project.location, project.type].filter(Boolean).join(", ")}</p>
          </div>
          <ArrowUpRight size={20} weight="light" aria-hidden className="mt-1 shrink-0 text-muted transition duration-500 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
        </div>
      </div>
    </Link>
  );
}
