"use client";
import { TabbedContent } from "@/components/interactive/TabbedContent";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Tag } from "@/components/ui/Overline";
import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

function ClassCard({ cls }: { cls: any }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-[family-name:var(--font-heading)] text-base font-semibold">{cls.title}</h3>
        {cls.type && <Tag color="green">{cls.type}</Tag>}
      </div>
      {cls.description && <p className="text-sm text-[var(--color-text)] line-clamp-2 mb-3">{typeof cls.description === "string" ? cls.description : ""}</p>}
      <div className="space-y-1 text-xs text-[var(--color-muted)]">
        {cls.time && <p className="flex items-center gap-1"><Clock size={12} />{cls.time}</p>}
        {cls.start_date && <p className="flex items-center gap-1"><Calendar size={12} />{new Date(cls.start_date).toLocaleDateString("en", { month: "short", day: "numeric" })}{cls.end_date ? ` — ${new Date(cls.end_date).toLocaleDateString("en", { month: "short", day: "numeric" })}` : ""}</p>}
        {cls.frequency && <span className="inline-block px-2 py-0.5 bg-[var(--color-gold)]/10 text-[var(--color-gold)] rounded-full text-[0.625rem] uppercase tracking-wider">{cls.frequency}</span>}
      </div>
    </div>
  );
}

function PlaceholderTab({ title, description, linkHref, linkLabel }: { title: string; description: string; linkHref?: string; linkLabel?: string }) {
  return (
    <div className="text-center py-16">
      <h3 className="text-xl font-[family-name:var(--font-heading)] mb-3">{title}</h3>
      <p className="text-[var(--color-muted)] mb-6">{description}</p>
      {linkHref && (
        <Link href={linkHref} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-green)] text-white rounded font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[var(--color-green-light)] transition-colors">
          {linkLabel || "Learn More"} →
        </Link>
      )}
    </div>
  );
}

export function GetInvolvedTabs({ classes, ministries }: { classes: any[]; ministries: any[] }) {
  return (
    <TabbedContent
      tabs={[
        {
          label: "CLASSES",
          key: "classes",
          content: (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((cls, i) => <ClassCard key={cls.id || i} cls={cls} />)}
              {classes.length === 0 && <p className="text-[var(--color-muted)] col-span-full text-center py-8">No classes currently available.</p>}
            </div>
          ),
        },
        {
          label: "EVENTS",
          key: "events",
          content: <PlaceholderTab title="Upcoming Events" description="See what's coming up at City of Saints." linkHref="/events" linkLabel="View All Events" />,
        },
        {
          label: "GROUPS",
          key: "groups",
          content: <PlaceholderTab title="Small Groups" description="Small groups meet throughout the week across Łódź. Contact us to find one near you." linkHref="mailto:info@cityofsaints.pl" linkLabel="Contact Us" />,
        },
        {
          label: "MISSION TRIPS",
          key: "mission-trips",
          content: <PlaceholderTab title="Mission Trips" description="We send short-term mission teams each summer. Check back for upcoming opportunities." linkHref="mailto:info@cityofsaints.pl" linkLabel="Get in Touch" />,
        },
        {
          label: "VOLUNTEER",
          key: "volunteer",
          content: (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministries.map((m, i) => (
                <Link key={m.id || i} href={`/ministries/${m.slug || m.id}`} className="group block bg-white rounded-xl p-5 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <h3 className="font-[family-name:var(--font-heading)] text-base group-hover:text-[var(--color-green)] transition-colors">{m.name}</h3>
                  {m.tagline && <p className="text-sm text-[var(--color-muted)] mt-1">{m.tagline}</p>}
                </Link>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
