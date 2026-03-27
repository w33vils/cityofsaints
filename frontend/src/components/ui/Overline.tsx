export function Overline({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`font-[family-name:var(--font-accent)] text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[var(--color-green)] ${className}`}>
      {children}
    </span>
  );
}

export function Tag({ children, color = "green" }: { children: React.ReactNode; color?: "green" | "gold" }) {
  const bg = color === "gold" ? "bg-[var(--color-gold)]/10 text-[var(--color-gold)]" : "bg-[var(--color-green)]/10 text-[var(--color-green)]";
  return (
    <span className={`inline-block font-[family-name:var(--font-accent)] text-[0.6875rem] font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full ${bg}`}>
      {children}
    </span>
  );
}
