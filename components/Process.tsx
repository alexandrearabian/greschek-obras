import type { Dict } from "@/lib/i18n";
import { SplitText } from "./SplitText";

// Cómo trabajamos: cinco pasos en fila, la línea de cada uno se dibuja al entrar.
export function Process({ t }: { t: Dict["services"] }) {
  return (
    <>
      <SplitText text={t.processTitle} className="title text-[2.25rem] md:text-6xl" />
      <ol className="mt-14 grid gap-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-5 lg:gap-8">
        {t.process.map((s, i) => (
          <li key={s.name} data-reveal className="draw-line relative pt-6">
            <span className="text-sm text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-medium tracking-tight">{s.name}</h3>
            <p className="mt-2 text-[15px] text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
