"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FilterBar } from "@/components/interactive/FilterBar";
import { Mail } from "lucide-react";

export function TeamGrid({ members, roles, divisions }: { members: any[]; roles: string[]; divisions: string[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (filters.role && m.role !== filters.role) return false;
      if (filters.division && m.division !== filters.division) return false;
      return true;
    });
  }, [members, filters]);

  return (
    <div>
      <FilterBar
        filters={[
          { label: "Role", field: "role", options: roles },
          { label: "Division", field: "division", options: divisions },
        ]}
        activeFilters={filters}
        onFilterChange={(f, v) => setFilters((p) => ({ ...p, [f]: v }))}
        onReset={() => setFilters({})}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((m, i) => (
          <motion.div key={m.id || i} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
              <div className="aspect-square bg-[var(--color-bg-alt)] flex items-center justify-center text-3xl text-[var(--color-muted)]">{m.name?.charAt(0) || "?"}</div>
              <div className="p-4">
                <h3 className="font-semibold text-sm">{m.name}</h3>
                <p className="text-xs text-[var(--color-muted)]">{m.title}</p>
                {m.role && <span className="inline-block mt-2 text-[0.625rem] font-[family-name:var(--font-accent)] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--color-green)]/10 text-[var(--color-green)]">{m.role}</span>}
                {m.email && <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-xs text-[var(--color-green)] mt-2"><Mail size={12} />{m.email}</a>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-[var(--color-muted)] py-12">No team members match your filters.</p>}
    </div>
  );
}
