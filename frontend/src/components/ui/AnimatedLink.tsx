"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export function AnimatedLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group relative inline-block text-[var(--color-green)] font-medium ${className}`}>
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[1.5px] bg-[var(--color-green)]"
        initial={{ width: "0%" }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.2 }}
      />
    </Link>
  );
}
