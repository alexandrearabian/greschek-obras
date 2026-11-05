"use client";

import { useEffect, useRef } from "react";

// Número que cuenta desde 0 cuando entra en pantalla. El HTML ya trae el valor final
// (SEO, sin JS, lectores de pantalla); solo se anima si todavía no se vio.
export function Count({ value, prefix = "" }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < innerHeight) return;
    el.textContent = prefix + "0";
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / 1800, 1);
          const eased = 1 - Math.pow(2, -10 * p); // misma curva que --ease-out-expo
          el.textContent = prefix + Math.round(value * (p === 1 ? 1 : eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix]);

  return (
    <>
      <span className="sr-only">{prefix + value}</span>
      <span ref={ref} aria-hidden className="tabular-nums">
        {prefix + value}
      </span>
    </>
  );
}
