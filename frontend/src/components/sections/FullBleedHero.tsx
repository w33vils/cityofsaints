"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Overline } from "@/components/ui/Overline";

interface HeroProps {
  overline?: string;
  heading: string;
  subheading?: string;
  ctas?: { label: string; href: string; variant?: "primary" | "secondary" | "secondary_light" }[];
  backgroundUrl?: string;
  subNav?: { label: string; anchor: string }[];
  compact?: boolean;
}

export function FullBleedHero({ overline, heading, subheading, ctas, backgroundUrl, subNav, compact }: HeroProps) {
  const bgStyle = backgroundUrl ? {} : { background: "var(--color-dark)" };

  return (
    <section
      className={`relative flex flex-col justify-end ${compact ? "min-h-[60vh]" : "min-h-screen"} bg-cover bg-center overflow-hidden`}
      style={bgStyle}
    >
      {backgroundUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `linear-gradient(to top, rgba(26,26,26,0.9) 0%, rgba(26,26,26,0.6) 45%, rgba(26,26,26,0.35) 100%), url(${backgroundUrl})` }}
        />
      )}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-[clamp(1rem,4vw,2rem)] pb-20">
        {overline && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}>
            <span className="inline-block font-[family-name:var(--font-accent)] text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[#5ab450] mb-5">{overline}</span>
          </motion.div>
        )}
        <motion.h1
          className="font-[family-name:var(--font-heading)] text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] mb-6 -ml-1"
          style={{ color: "#C4A265", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        >
          {heading}
        </motion.h1>
        {subheading && (
          <motion.p
            className="text-white/70 text-base max-w-lg mb-10 tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.6 }}
          >
            {subheading}
          </motion.p>
        )}
        {ctas && (
          <motion.div className="flex gap-4 flex-wrap" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.9 }}>
            {ctas.map((c) => (
              <Button key={c.label} href={c.href} variant={c.variant || "primary"}>{c.label}</Button>
            ))}
          </motion.div>
        )}
      </div>
      {subNav && (
        <div className="relative z-10 bg-[var(--color-dark)]/90 border-t border-white/10">
          <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] flex gap-4 md:gap-8 py-4 overflow-x-auto">
            {subNav.map((s) => (
              <a key={s.label} href={s.anchor} className="font-[family-name:var(--font-accent)] text-xs font-medium tracking-[0.15em] uppercase text-white/70 hover:text-[var(--color-gold)] transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
