"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FilterBar } from "@/components/interactive/FilterBar";
import { Tag } from "@/components/ui/Overline";
import { Calendar, User, BookOpen } from "lucide-react";

type View = "sermons" | "series";

export function SermonsClient({ sermons, series }: { sermons: any[]; series: any[] }) {
  const [view, setView] = useState<View>("sermons");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const uniqueBooks = useMemo(() => [...new Set(sermons.map((s) => s.book).filter(Boolean))], [sermons]);
  const uniquePreachers = useMemo(() => [...new Set(sermons.map((s) => s.preacher?.name || s.preacher).filter(Boolean))], [sermons]);

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      if (filters.book && s.book !== filters.book) return false;
      if (filters.format && s.format !== filters.format) return false;
      return true;
    });
  }, [sermons, filters]);

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-4 mb-6">
        {(["sermons", "series"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`relative pb-2 font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase ${
              view === v ? "text-[var(--color-green)]" : "text-[var(--color-muted)]"
            }`}
          >
            {v === "sermons" ? "SERMONS" : "SERMON SERIES"}
            {view === v && <motion.div layoutId="sermon-toggle" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-green)]" />}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === "sermons" ? (
          <motion.div key="sermons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FilterBar
              filters={[
                { label: "Book", field: "book", options: uniqueBooks },
                { label: "Format", field: "format", options: ["Audio", "Video", "Audio & Video"] },
              ]}
              activeFilters={filters}
              onFilterChange={(f, v) => setFilters((p) => ({ ...p, [f]: v }))}
              onReset={() => setFilters({})}
            />
            <div className="space-y-3">
              {filtered.map((s, i) => (
                <motion.div key={s.id || i} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link href={`/sermons/${s.slug || s.id}`} className="group flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md hover:scale-[1.01] transition-all">
                    <span className="text-sm text-[var(--color-muted)] w-24 shrink-0">{s.date ? new Date(s.date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }) : ""}</span>
                    {s.book && <Tag color="green">{s.book}</Tag>}
                    <span className="font-semibold group-hover:text-[var(--color-green)] transition-colors flex-1">{s.title}</span>
                    <span className="text-xs text-[var(--color-muted)] hidden md:block">{s.scripture}</span>
                    <span className="text-xs font-[family-name:var(--font-accent)] uppercase tracking-wider text-[var(--color-green)]">VIEW</span>
                  </Link>
                </motion.div>
              ))}
              {filtered.length === 0 && <p className="text-center text-[var(--color-muted)] py-12">No sermons match your filters.</p>}
            </div>
          </motion.div>
        ) : (
          <motion.div key="series" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s, i) => (
              <motion.div key={s.id || i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Link href={`/sermon-series/${s.slug || s.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="aspect-[16/9] bg-[var(--color-dark)] relative overflow-hidden">
                    <img src="/images/open-bible.jpg" alt="" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute inset-0 flex items-center justify-center text-white font-[family-name:var(--font-heading)] text-lg font-semibold px-4 text-center" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{s.title}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg group-hover:text-[var(--color-green)] transition-colors">{s.title}</h3>
                    {s.is_current && <Tag color="gold">Current Series</Tag>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
