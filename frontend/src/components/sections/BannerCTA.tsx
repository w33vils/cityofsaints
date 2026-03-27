import { SectionReveal } from "./SectionReveal";
import { Button } from "@/components/ui/Button";

interface Props {
  heading: string;
  subheading?: string;
  cta: { label: string; href: string };
}

export function BannerCTA({ heading, subheading, cta }: Props) {
  return (
    <section className="bg-[var(--color-green)] py-16">
      <SectionReveal className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
        <h2 className="text-[clamp(1.5rem,2.5vw,2.25rem)] text-white mb-3">{heading}</h2>
        {subheading && <p className="text-white/80 mb-8 text-lg">{subheading}</p>}
        <Button href={cta.href} variant="secondary_light">{cta.label}</Button>
      </SectionReveal>
    </section>
  );
}
