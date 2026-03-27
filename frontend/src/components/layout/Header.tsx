"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { MegaNavPanel, megaPanels, type PanelKey } from "./MegaNavPanel";

const navItems = [
  { label: "Visit", href: "/visit" },
  { label: "About", panel: "about" as PanelKey },
  { label: "Get Involved", panel: "get_involved" as PanelKey },
  { label: "Media", panel: "media" as PanelKey },
  { label: "Ministries", panel: "ministries" as PanelKey },
  { label: "Give", href: "/give" },
];

/* Simple shield/cross mark — geometric, minimal */
function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <path d="M14 2L4 7v7c0 6.075 4.25 11.425 10 12.75 5.75-1.325 10-6.675 10-12.75V7L14 2z" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-[var(--color-green)]" />
      <line x1="14" y1="8" x2="14" y2="20" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-green)]" />
      <line x1="9" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.5" className="text-[var(--color-green)]" />
    </svg>
  );
}

export function Header() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/5"
      onMouseLeave={() => setActivePanel(null)}
    >
      <div className="max-w-[1440px] mx-auto px-[clamp(1rem,4vw,2rem)] flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <LogoMark />
          <span className="font-[family-name:var(--font-heading)] text-[1.1rem] font-semibold text-[var(--color-heading)] group-hover:text-[var(--color-green)] transition-colors">
            City of Saints
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-[0.85rem] font-medium text-[var(--color-text)] hover:text-[var(--color-green)] transition-colors rounded-md hover:bg-black/[0.03]"
                onMouseEnter={() => setActivePanel(null)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                className={`px-4 py-2 text-[0.85rem] font-medium transition-colors rounded-md ${
                  activePanel === item.panel
                    ? "text-[var(--color-green)] bg-black/[0.03]"
                    : "text-[var(--color-text)] hover:text-[var(--color-green)] hover:bg-black/[0.03]"
                }`}
                onMouseEnter={() => setActivePanel(item.panel!)}
              >
                {item.label}
              </button>
            )
          )}
        </nav>

        {/* Mobile toggle */}
        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mega Nav Panel (Desktop) — Light background */}
      <AnimatePresence mode="wait">
        {activePanel && (
          <>
            <motion.div
              key="overlay"
              className="fixed inset-0 top-16 bg-black/20 -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              key={activePanel}
              className="absolute left-0 right-0 top-full bg-white border-t border-black/5 shadow-xl"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onMouseLeave={() => setActivePanel(null)}
            >
              <MegaNavPanel panelKey={activePanel} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-white z-50 lg:hidden overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <nav className="p-6 space-y-1">
              {navItems.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-[var(--color-heading)] border-b border-black/5 hover:text-[var(--color-green)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  );
                }
                const panel = megaPanels[item.panel!];
                return (
                  <details key={item.label} className="border-b border-black/5">
                    <summary className="py-3 text-lg font-medium text-[var(--color-heading)] cursor-pointer hover:text-[var(--color-green)]">
                      {item.label}
                    </summary>
                    <div className="pb-4 pl-4 space-y-2">
                      {panel.columns.map((col) =>
                        col.links.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block py-1.5 text-[var(--color-text)] hover:text-[var(--color-green)]"
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))
                      )}
                    </div>
                  </details>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
