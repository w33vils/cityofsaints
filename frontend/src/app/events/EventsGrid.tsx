"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FilterBar } from "@/components/interactive/FilterBar";
import { Tag } from "@/components/ui/Overline";
import { Calendar, Clock, ArrowRight, MapPin } from "lucide-react";

function EventCard({ event, index }: { event: any; index: number }) {
  const date = event.date ? new Date(event.date) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <Link
        href={`/events/${event.slug || event.id}`}
        className="group flex items-start gap-5 bg-white rounded-xl p-6 border border-black/[0.06] shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all"
      >
        {/* Date Badge */}
        <div className="text-center shrink-0 w-14">
          <span className="font-[family-name:var(--font-accent)] text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-green)]">
            {date ? date.toLocaleString("en", { month: "short" }) : "TBD"}
          </span>
          <span className="block text-[1.5rem] font-bold text-[var(--color-heading)] leading-tight">
            {date ? date.getDate() : "—"}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            {event.category && <Tag color="gold">{event.category}</Tag>}
            {event.registration_required && (
              <span className="inline-block text-[0.6rem] font-[family-name:var(--font-accent)] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">
                Registration Required
              </span>
            )}
          </div>

          <h3 className="font-[family-name:var(--font-body)] text-[1.125rem] font-semibold leading-tight group-hover:text-[var(--color-green)] transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-muted)]">
            {event.time && (
              <span className="flex items-center gap-1">
                <Clock size={12} /> {event.time}
              </span>
            )}
            {event.location?.name && (
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {event.location.name}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <ArrowRight size={18} className="shrink-0 text-[var(--color-muted)] group-hover:text-[var(--color-green)] group-hover:translate-x-1 transition-all mt-2" />
      </Link>
    </motion.div>
  );
}

export function EventsGrid({ events, categories }: { events: any[]; categories: string[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (filters.category && e.category !== filters.category) return false;
      if (filters.type) {
        if (filters.type === "Registration" && !e.registration_required) return false;
        if (filters.type === "Open" && e.registration_required) return false;
      }
      return true;
    });
  }, [events, filters]);

  return (
    <div>
      <FilterBar
        filters={[
          { label: "TYPE", field: "category", options: categories },
          { label: "REGISTRATION", field: "type", options: ["Registration", "Open"] },
        ]}
        activeFilters={filters}
        onFilterChange={(f, v) => setFilters((p) => ({ ...p, [f]: v }))}
        onReset={() => setFilters({})}
      />

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {filtered.map((event, i) => (
            <EventCard key={event.id || event.slug || i} event={event} index={i} />
          ))}
        </div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-[var(--color-muted)] py-16 text-lg"
        >
          No events match your filters. Try resetting.
        </motion.p>
      )}
    </div>
  );
}
