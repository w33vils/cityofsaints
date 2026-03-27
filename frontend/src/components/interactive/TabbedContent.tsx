"use client";
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab { label: string; key: string; content: ReactNode }

export function TabbedContent({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.key || "");

  return (
    <div>
      <div className="flex gap-6 border-b border-black/10 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative pb-3 whitespace-nowrap font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
              active === tab.key ? "text-[var(--color-green)]" : "text-[var(--color-muted)] hover:text-[var(--color-heading)]"
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <motion.div layoutId="tabbed-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-green)]" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tabs.find((t) => t.key === active)?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
