"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EventsScroller({ events }: { events: any[] }) {
  if (!events.length) return <p className="text-[var(--color-muted)]">No upcoming events.</p>;
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory -mx-2 px-2">
      {events.map((e, i) => (
        <motion.div
          key={e.id || i}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="snap-start shrink-0 w-[clamp(280px,85vw,320px)]"
        >
          <Link href={`/events/${e.slug || e.id}`} className="group block bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-4">
              <div className="text-center shrink-0">
                <span className="font-[family-name:var(--font-accent)] text-xs uppercase text-[var(--color-green)] font-semibold">
                  {e.date ? new Date(e.date).toLocaleString("en", { month: "short" }) : "TBD"}
                </span>
                <span className="block text-2xl font-bold text-[var(--color-heading)]">
                  {e.date ? new Date(e.date).getDate() : "—"}
                </span>
              </div>
              <div className="min-w-0">
                <span className="font-[family-name:var(--font-accent)] text-[0.625rem] font-medium tracking-[0.1em] uppercase text-[var(--color-gold)] block mb-1">
                  {e.category || "EVENT"}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold leading-tight group-hover:text-[var(--color-green)] transition-colors truncate">
                  {e.title}
                </h3>
                {e.time && <p className="text-xs text-[var(--color-muted)] mt-1 flex items-center gap-1"><Calendar size={12} />{e.time}</p>}
              </div>
              <ArrowRight size={16} className="shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-green)] transition-colors mt-1" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
