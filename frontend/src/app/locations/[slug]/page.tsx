import { getLocations, getTeamMembers, getMinistries } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [locRes, teamRes, minRes] = await Promise.all([
    getLocations().catch(() => ({ data: [] })),
    getTeamMembers().catch(() => ({ data: [] })),
    getMinistries().catch(() => ({ data: [] })),
  ]);
  const location = (locRes.data as any[])?.find((l: any) => l.slug === slug || String(l.id) === slug);
  if (!location) notFound();

  const teamMembers = (teamRes.data as any[]) || [];
  const ministries = (minRes.data as any[]) || [];

  return (
    <>
      <FullBleedHero heading={location.name} compact backgroundUrl="/images/mountain-night.jpg" />

      {/* Info Bar */}
      <section className="bg-[var(--color-bg-alt)] border-b border-black/5">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] py-8 grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">Service Times</h3>
            {location.service_times?.map((st: any, i: number) => (
              <p key={i} className="flex items-center gap-2 text-sm mb-1"><Clock size={14} className="text-[var(--color-green)]" /><strong>{st.label}:</strong> {st.times}</p>
            ))}
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">Address</h3>
            <p className="flex items-start gap-2 text-sm"><MapPin size={14} className="text-[var(--color-green)] mt-0.5" />{location.address}{location.postal_code ? `, ${location.postal_code}` : ""} {location.city}</p>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)] mb-3">Contact</h3>
            {location.email && <p className="flex items-center gap-2 text-sm mb-1"><Mail size={14} className="text-[var(--color-green)]" />{location.email}</p>}
            {location.phone && <p className="flex items-center gap-2 text-sm"><Phone size={14} className="text-[var(--color-green)]" />{location.phone}</p>}
          </div>
        </div>
      </section>

      {/* Description */}
      {location.description && (
        <section className="py-[clamp(4rem,8vw,8rem)]">
          <SectionReveal className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
            <div className="text-[var(--color-text)] text-lg leading-relaxed whitespace-pre-wrap">{location.description}</div>
          </SectionReveal>
        </section>
      )}

      {/* Map */}
      {location.google_maps_embed && (
        <section className="bg-[var(--color-bg-alt)] py-8">
          <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
            <div className="rounded-xl overflow-hidden aspect-[16/7]" dangerouslySetInnerHTML={{ __html: location.google_maps_embed }} />
          </div>
        </section>
      )}

      {/* Staff */}
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="mb-10"><h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Our Team</h2></SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((m: any, i: number) => (
              <SectionReveal key={m.id || i} delay={i * 0.05}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-square bg-[var(--color-bg-alt)] flex items-center justify-center text-2xl text-[var(--color-muted)]">{m.name?.charAt(0)}</div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{m.name}</h3>
                    <p className="text-xs text-[var(--color-muted)]">{m.title}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ministries */}
      <section className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="mb-10"><h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Ministries at {location.name}</h2></SectionReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {ministries.map((m: any, i: number) => (
              <SectionReveal key={m.id || i} delay={i * 0.08}>
                <Link href={`/ministries/${m.slug || m.id}`} className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg group-hover:text-[var(--color-green)] transition-colors">{m.name}</h3>
                  {m.tagline && <p className="text-sm text-[var(--color-muted)] mt-1">{m.tagline}</p>}
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
