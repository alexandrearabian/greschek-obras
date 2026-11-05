// Texto de link que "rueda" al pasar el mouse: cada letra sube y la reemplaza una copia en el acento que entra
// desde abajo, una tras otra. Lo anima el `.group` que lo contiene (ver .roll en globals.css).
// Los lectores de pantalla leen el texto entero; las letras son decorativas.
export function RollText({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="roll">
        {[...text].map((c, i) => {
          const ch = c === " " ? " " : c;
          return (
            <span key={i} className="roll-ch" style={{ "--i": i } as React.CSSProperties}>
              <span>{ch}</span>
              <span>{ch}</span>
            </span>
          );
        })}
      </span>
    </>
  );
}
