"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Props { sermons: any[]; articles: any[] }

const tabs = [
  { label: "SERMONS", key: "sermons" },
  { label: "ARTICLES", key: "articles" },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function MediaTabs({ sermons, articles }: Props) {
  const [active, setActive] = useState<TabKey>("sermons");
  const items = active === "sermons" ? sermons.slice(0, 3) : articles.slice(0, 3);

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-6 border-b border-black/10 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`relative pb-3 font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
              active === tab.key ? "text-[var(--color-green)]" : "text-[var(--color-muted)] hover:text-[var(--color-heading)]"
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-green)]" />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={active === "sermons" ? `/sermons/${item.slug || item.id}` : `/articles/${item.slug || item.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                <div className="aspect-[16/9] bg-[var(--color-bg-alt)] relative overflow-hidden">
                  <img src={active === "sermons" ? "/images/open-bible.jpg" : "/images/books-library.jpg"} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="font-[family-name:var(--font-accent)] text-[0.625rem] font-medium tracking-[0.1em] uppercase text-[var(--color-muted)] block mb-2">
                    {active === "sermons" ? (item.scripture || "Sermon") : (item.category || "Article")}
                  </span>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold group-hover:text-[var(--color-green)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[var(--color-muted)] mt-2">
                    {item.date ? new Date(item.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }) : ""}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
