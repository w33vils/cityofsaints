import Link from "next/link";
import { Globe, Heart, Play } from "lucide-react";

const footerColumns = [
  {
    title: "About",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" },
      { label: "Beliefs", href: "/about#beliefs" },
      { label: "Facilities", href: "/facilities" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Events", href: "/events" },
      { label: "Classes", href: "/get-involved#classes" },
      { label: "Groups", href: "/get-involved#groups" },
      { label: "Volunteer", href: "/get-involved#volunteer" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Sermons", href: "/media/sermons" },
      { label: "Articles", href: "/media/articles" },
      { label: "Music", href: "/media/music" },
      { label: "Podcasts", href: "/media/podcasts" },
    ],
  },
  {
    title: "Ministries",
    links: [
      { label: "Kids", href: "/ministries/kids" },
      { label: "Students", href: "/ministries/students" },
      { label: "Young Adults", href: "/ministries/young-adults" },
      { label: "Marriage", href: "/ministries/marriage" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] text-[var(--color-on-dark)]">
      {/* Follow Us */}
      <div className="border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">Follow Us</h3>
          <div className="flex gap-4">
            {[
              { icon: Globe, label: "Facebook" },
              { icon: Heart, label: "Instagram" },
              { icon: Play, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--color-gold)] transition-colors" aria-label={label}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Link Columns */}
      <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-[family-name:var(--font-heading)] text-sm font-semibold mb-4" style={{ color: "#C4A265" }}>{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/70 hover:text-[var(--color-gold)] transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--color-on-dark-muted)]">
          <p>© {new Date().getFullYear()} City of Saints. All rights reserved.</p>
          <p>A Protestant church in Łódź, Poland</p>
        </div>
      </div>
    </footer>
  );
}
