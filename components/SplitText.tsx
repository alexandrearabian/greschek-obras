import { Fragment } from "react";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Anima al cargar la página (títulos que ya se ven arriba). Si no, anima al entrar en pantalla. */
  now?: boolean;
  /** Retraso extra en ms (solo con `now`). */
  delay?: number;
};

// Título que entra letra por letra: cada letra llega desenfocada, en un orden algo salteado.
// Los lectores de pantalla leen el texto entero; las letras sueltas son decorativas.
export function SplitText({ text, as: Tag = "h2", className = "", now = false, delay }: Props) {
  let n = 0;
  return (
    <Tag
      data-reveal={now ? undefined : ""}
      data-split=""
      className={`split ${now ? "split-now" : ""} ${className}`}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(" ").map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 && " "}
            <span className="w">
              {[...word].map((ch, ci) => {
                const i = n++;
                // Avanza de izquierda a derecha con un salto pseudoaleatorio fijo (igual en servidor y cliente).
                const c = i * 12 + ((i * 37) % 11) * 26;
                return (
                  <span key={ci} className="ch" style={{ "--c": `${c}ms` } as React.CSSProperties}>
                    {ch}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
