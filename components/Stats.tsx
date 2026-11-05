import type { Dict } from "@/lib/i18n";
import { Count } from "./Count";

// Una sola fila sobre una línea (también en celular): los números cuentan al entrar en pantalla.
export function Stats({ stats }: { stats: Dict["home"]["stats"] }) {
  return (
    <dl className="grid grid-cols-3 gap-4 border-t border-line pt-8 sm:gap-8 md:pt-10">
      {stats.map((s) => (
        <div key={s.label} data-reveal className="flex flex-col-reverse justify-end gap-2">
          <dt className="text-sm leading-snug text-muted md:text-base">{s.label}</dt>
          <dd className="display text-[2.5rem] sm:text-6xl md:text-7xl">
            <Count value={s.value} prefix={s.prefix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
