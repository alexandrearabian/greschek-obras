import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const tones = {
  accent: "bg-accent text-deep-ink hover:bg-ink",
  outline: "border border-ink/25 text-ink hover:border-ink",
  photo: "bg-on-photo text-ink hover:bg-white",
  // Vidrio esmerilado sobre la foto: desenfoca lo que hay detrás y tiene un brillo suave por dentro.
  "photo-outline":
    "border border-white/40 bg-white/25 text-on-photo backdrop-blur-lg shadow-[inset_0_1px_0_rgb(255_255_255/0.3),inset_0_-10px_24px_-14px_rgb(255_255_255/0.35),0_8px_24px_-12px_rgb(0_0_0/0.4)] hover:bg-white/20",
  light: "bg-deep-ink text-deep hover:bg-white",
};

export type Tone = keyof typeof tones;

export const buttonClass = (tone: Tone = "accent") =>
  `group inline-flex h-12 items-center gap-3 rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition-colors duration-300 active:scale-[0.98] ${tones[tone]}`;

export function Button({ href, tone = "accent", children }: { href: string; tone?: Tone; children: React.ReactNode }) {
  return (
    <Link href={href} className={buttonClass(tone)}>
      {children}
      <ArrowRight size={16} aria-hidden className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
    </Link>
  );
}
