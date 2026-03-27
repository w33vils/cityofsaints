import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "secondary_light" | "ghost";

export function Button({ href, children, variant = "primary", external, className = "" }: {
  href?: string; children: ReactNode; variant?: Variant; external?: boolean; className?: string;
}) {
  const base = "inline-flex items-center gap-2 font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase px-6 py-3 rounded transition-all duration-200";
  const styles: Record<Variant, string> = {
    primary: "bg-[var(--color-green)] text-white hover:bg-[var(--color-green-light)] hover:shadow-lg hover:scale-[1.03]",
    secondary: "border-2 border-[var(--color-green)] text-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-white hover:scale-[1.03]",
    secondary_light: "border-2 border-white/80 text-white hover:bg-white/10 hover:scale-[1.03]",
    ghost: "text-[var(--color-green)] hover:bg-[var(--color-green)]/5",
  };
  const cls = `${base} ${styles[variant]} ${className}`;

  if (external && href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls}>{children}</button>;
}
