import { SectionReveal } from "./SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";

interface Props {
  overline?: string;
  heading: string;
  body?: string;
  cta?: { label: string; href: string };
  backgroundUrl?: string;
}

export function FullBleedBanner({ overline, heading, body, cta, backgroundUrl }: Props) {
  return (
    <section
      className="relative py-[clamp(5rem,10vw,10rem)] bg-cover bg-center"
      style={backgroundUrl ? { backgroundImage: `linear-gradient(rgba(26,26,26,0.78), rgba(26,26,26,0.78)), url(${backgroundUrl})` } : { background: "var(--color-dark)" }}
    >
      <SectionReveal className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
        {overline && <span className="inline-block font-[family-name:var(--font-accent)] text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#5ab450] mb-4">{overline}</span>}
        <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-6" style={{ color: "#C4A265" }}>{heading}</h2>
        {body && <p className="text-white/60 text-lg max-w-[800px] mx-auto leading-relaxed mb-8">{body}</p>}
        {cta && <Button href={cta.href} variant="secondary_light">{cta.label}</Button>}
      </SectionReveal>
    </section>
  );
}
