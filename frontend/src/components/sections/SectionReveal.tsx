"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type RevealStyle = "up" | "left" | "right" | "scale" | "none";

export function SectionReveal({ children, className = "", delay = 0, style = "up" }: {
  children: ReactNode; className?: string; delay?: number; style?: RevealStyle;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants: Record<RevealStyle, { initial: any; animate: any }> = {
    up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 } },
    none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
  };

  const v = variants[style];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={inView ? v.animate : v.initial}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
