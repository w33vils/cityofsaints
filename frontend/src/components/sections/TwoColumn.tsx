import { SectionReveal } from "./SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ReactNode } from "react";

interface Props {
  overline?: string;
  heading?: string;
  body?: string;
  ctas?: { label: string; href: string }[];
  children?: ReactNode;
  reverse?: boolean;
  image?: string;
}

export function TwoColumn({ overline, heading, body, ctas, children, reverse, image }: Props) {
  return (
    <section className="py-[clamp(4rem,8vw,8rem)]">
      <div className={`max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] grid md:grid-cols-2 gap-12 items-center ${reverse ? "md:[direction:rtl] *:md:[direction:ltr]" : ""}`}>
        <SectionReveal>
          <div>
            {overline && <Overline className="mb-4 block">{overline}</Overline>}
            {heading && <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-6">{heading}</h2>}
            {body && <p className="text-[var(--color-text)] text-lg leading-relaxed mb-8">{body}</p>}
            {ctas && (
              <div className="flex gap-4 flex-wrap">
                {ctas.map((c) => <Button key={c.label} href={c.href} variant="secondary">{c.label}</Button>)}
              </div>
            )}
          </div>
        </SectionReveal>
        <SectionReveal delay={0.15}>
          {image ? (
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[var(--color-bg-alt)] relative">
              <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ) : children ? children : (
            <div className="aspect-[4/3] rounded-xl bg-[var(--color-bg-alt)]" />
          )}
        </SectionReveal>
      </div>
    </section>
  );
}