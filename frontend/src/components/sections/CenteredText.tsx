import { SectionReveal } from "./SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";

interface Props {
  overline?: string;
  heading?: string;
  body?: string;
  cta?: { label: string; href: string };
  dark?: boolean;
}

export function CenteredText({ overline, heading, body, cta, dark }: Props) {
  return (
    <section className={`py-[clamp(4rem,8vw,8rem)] ${dark ? "bg-[var(--color-dark)] text-[var(--color-on-dark)]" : ""}`}>
      <SectionReveal className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
        {overline && <Overline className={`mb-4 block ${dark ? "text-[var(--color-gold)]" : ""}`}>{overline}</Overline>}
        {heading && <h2 className={`text-[clamp(1.75rem,3vw,2.75rem)] mb-6 ${dark ? "text-white" : ""}`}>{heading}</h2>}
        {body && <p className={`text-lg leading-relaxed mb-8 ${dark ? "text-[var(--color-on-dark-muted)]" : "text-[var(--color-text)]"}`}>{body}</p>}
        {cta && <Button href={cta.href} variant={dark ? "secondary_light" : "secondary"}>{cta.label}</Button>}
      </SectionReveal>
    </section>
  );
}
