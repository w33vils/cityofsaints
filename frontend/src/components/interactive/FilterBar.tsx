"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";

interface Filter { label: string; field: string; options: string[] }

interface Props {
  filters: Filter[];
  activeFilters: Record<string, string>;
  onFilterChange: (field: string, value: string) => void;
  onReset: () => void;
}

export function FilterBar({ filters, activeFilters, onFilterChange, onReset }: Props) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const hasActive = Object.values(activeFilters).some(Boolean);

  return (
    <div className="flex items-center gap-3 flex-wrap mb-8">
      <SlidersHorizontal size={16} className="text-[var(--color-muted)]" />
      {filters.map((f) => (
        <div key={f.field} className="relative">
          <button
            onClick={() => setOpenDropdown(openDropdown === f.field ? null : f.field)}
            className={`px-4 py-2 rounded-full text-xs font-[family-name:var(--font-accent)] font-medium tracking-wider uppercase border transition-all ${
              activeFilters[f.field]
                ? "bg-[var(--color-green)] text-white border-[var(--color-green)]"
                : "border-black/10 text-[var(--color-text)] hover:border-[var(--color-green)]"
            }`}
          >
            {activeFilters[f.field] || f.label}
          </button>
          <AnimatePresence>
            {openDropdown === f.field && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-black/5 py-2 z-20 min-w-[180px]"
              >
                <button
                  onClick={() => { onFilterChange(f.field, ""); setOpenDropdown(null); }}
                  className="block w-full text-left px-4 py-2 text-sm text-[var(--color-muted)] hover:bg-black/5"
                >
                  All
                </button>
                {f.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { onFilterChange(f.field, opt); setOpenDropdown(null); }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-black/5 ${
                      activeFilters[f.field] === opt ? "text-[var(--color-green)] font-semibold" : "text-[var(--color-text)]"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      {hasActive && (
        <button onClick={onReset} className="flex items-center gap-1 px-3 py-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-green)]">
          <X size={14} /> Reset
        </button>
      )}
    </div>
  );
}
