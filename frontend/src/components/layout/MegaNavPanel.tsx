"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart, Users, BookOpen, Mic, Music, FileText, Download, Video,
  Baby, Backpack, GraduationCap, Flower2, Mountain, HeartHandshake, HandHeart,
  MapPin, Building2, CalendarDays, UserPlus, Globe, Compass,
  Church, ArrowRight,
} from "lucide-react";

export type PanelKey = "about" | "get_involved" | "media" | "ministries";

interface PanelLink { label: string; href: string; description?: string; icon?: any; external?: boolean }
interface PanelColumn { title: string; links: PanelLink[] }
interface PanelData { columns: PanelColumn[]; wide?: boolean }

export const megaPanels: Record<PanelKey, PanelData> = {
  about: {
    wide: true,
    columns: [
      {
        title: "About",
        links: [
          { label: "About Us", href: "/about", description: "Our story, beliefs & mission", icon: Heart },
          { label: "Our Team", href: "/team", description: "Meet our leadership & staff", icon: Users },
          { label: "Facilities", href: "/facilities", description: "Building rentals & info", icon: Building2 },
          { label: "Łódź Centrum", href: "/locations/lodz-centrum", icon: MapPin, description: "ul. Piotrkowska 104" },
        ],
      },
    ],
  },
  get_involved: {
    wide: true,
    columns: [
      {
        title: "Get Involved",
        links: [
          { label: "Classes", href: "/get-involved#classes", icon: BookOpen, description: "Bible studies & courses" },
          { label: "Events", href: "/events", icon: CalendarDays, description: "Upcoming events" },
          { label: "Groups", href: "/get-involved#groups", icon: Users, description: "Small group community" },
          { label: "Mission Trips", href: "/get-involved#mission-trips", icon: Globe, description: "Go to the nations" },
          { label: "Volunteer", href: "/get-involved#volunteer", icon: UserPlus, description: "Serve with us" },
        ],
      },
    ],
  },
  media: {
    wide: true,
    columns: [
      {
        title: "Media",
        links: [
          { label: "Sermons", href: "/media/sermons", icon: Mic, description: "Weekly messages" },
          { label: "Sermon Series", href: "/media/sermons?view=series", icon: BookOpen },
          { label: "Articles", href: "/media/articles", icon: FileText, description: "Faith & theology" },
          { label: "Videos", href: "/media/videos", icon: Video },
          { label: "Music", href: "/media/music", icon: Music },
          { label: "Podcasts", href: "/media/podcasts", icon: Mic },
          { label: "Resources", href: "/media/resources", icon: Download },
        ],
      },
    ],
  },
  ministries: {
    wide: true,
    columns: [
      {
        title: "Ministries",
        links: [
          { label: "Kids", href: "/ministries/kids", icon: Baby },
          { label: "Students", href: "/ministries/students", icon: Backpack },
          { label: "Young Adults", href: "/ministries/young-adults", icon: GraduationCap },
          { label: "Women\u2019s", href: "/ministries/womens", icon: Flower2 },
          { label: "Men\u2019s", href: "/ministries/mens", icon: Mountain },
          { label: "Marriage", href: "/ministries/marriage", icon: HeartHandshake },
          { label: "Recovery", href: "/ministries/recovery", icon: HandHeart },
        ],
      },
    ],
  },
};

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.03 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

export function MegaNavPanel({ panelKey }: { panelKey: PanelKey }) {
  const panel = megaPanels[panelKey];

  // Flatten all links for "wide" panels (displayed as a grid)
  const allLinks = panel.columns.flatMap((col) => col.links);
  const isWide = panel.wide && panel.columns.length === 1;

  return (
    <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-8">
      {isWide ? (
        /* Grid layout for single-column panels (Get Involved, Media) */
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {allLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.div key={link.href} variants={fadeUp}>
                <Link
                  href={link.href}
                  className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[var(--color-bg-alt)] transition-all duration-150"
                >
                  {Icon && (
                    <span className="w-9 h-9 rounded-lg bg-[var(--color-green)]/[0.07] group-hover:bg-[var(--color-green)]/[0.14] flex items-center justify-center shrink-0 transition-colors">
                      <Icon size={17} className="text-[var(--color-green)]" />
                    </span>
                  )}
                  <div>
                    <span className="text-sm font-medium text-[var(--color-heading)] group-hover:text-[var(--color-green)] transition-colors">
                      {link.label}
                    </span>
                    {link.description && (
                      <span className="block text-xs text-[var(--color-muted)] leading-snug">{link.description}</span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        /* Multi-column layout for About, Ministries */
        <motion.div
          className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {panel.columns.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h3 className="font-[family-name:var(--font-accent)] text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-[var(--color-muted)] mb-4">
                {col.title}
              </h3>
              <div className="space-y-0.5">
                {col.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-lg hover:bg-[var(--color-bg-alt)] transition-all duration-150"
                    >
                      {Icon && (
                        <span className="w-8 h-8 rounded-md bg-[var(--color-green)]/[0.07] group-hover:bg-[var(--color-green)]/[0.14] flex items-center justify-center shrink-0 transition-colors">
                          <Icon size={15} className="text-[var(--color-green)]" />
                        </span>
                      )}
                      <div>
                        <span className="text-sm font-medium text-[var(--color-heading)] group-hover:text-[var(--color-green)] transition-colors">
                          {link.label}
                        </span>
                        {link.description && (
                          <span className="block text-xs text-[var(--color-muted)] leading-snug">{link.description}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
