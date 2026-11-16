import { SplitText } from "./SplitText";

// Encabezado de las páginas internas: mismo tamaño, márgenes y entrada en todas.
export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <section className="wrap pt-32 pb-12 md:pt-44 md:pb-24">
      <SplitText as="h1" now text={title} className="display max-w-[16ch] text-[2.75rem] md:text-8xl" />
      {lead && (
        <p className="rise mt-6 max-w-[44ch] text-lg text-muted md:mt-8 md:text-xl" style={{ "--d": "350ms" } as React.CSSProperties}>
          {lead}
        </p>
      )}
    </section>
  );
}
