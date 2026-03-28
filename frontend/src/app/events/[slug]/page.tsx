import { getEvents } from "@/lib/strapi";
import { eventSchema } from "@/lib/schema";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Tag } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = await getEvents().catch(() => ({ data: [] }));
  const event = (res.data as any[])?.find((e: any) => e.slug === slug || String(e.id) === slug);
  if (!event) return {};
  return {
    title: event.title,
    description: typeof event.description === "string" ? event.description.slice(0, 160) : `Event at City of Saints`,
    openGraph: { title: event.title, type: "website" },
  };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getEvents().catch(() => ({ data: [] }));
  const event = (res.data as any[])?.find((e: any) => e.slug === slug || String(e.id) === slug);
  if (!event) notFound();

  const date = event.date ? new Date(event.date) : null;
  const endDate = event.end_date ? new Date(event.end_date) : null;
  const deadline = event.registration_deadline ? new Date(event.registration_deadline) : null;

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema(event)) }} />
      {/* Hero */}
      <section
        className="relative min-h-[50vh] flex items-end bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.3) 60%, rgba(26,26,26,0.1) 100%), url(/images/people-together.jpg)`,
        }}
      >
        <div className="max-w-[1280px] mx-auto w-full px-[clamp(1rem,4vw,2rem)] pb-12 pt-24">
          <SectionReveal>
            <Link href="/events" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-[var(--color-gold)] transition-colors mb-6">
              <ArrowLeft size={16} /> All Events
            </Link>
            <div className="flex items-center gap-3 mb-4">
              {event.category && <Tag color="gold">{event.category}</Tag>}
              {event.registration_required && (
                <span className="text-[0.6rem] font-[family-name:var(--font-accent)] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                  Registration Required
                </span>
              )}
            </div>
            <h1
              className="font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-4"
              style={{ color: "#C4A265", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
            >
              {event.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-white/70 text-sm">
              {date && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  {date.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                  {endDate && ` — ${endDate.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}`}
                </span>
              )}
              {event.time && <span className="flex items-center gap-2"><Clock size={16} /> {event.time}</span>}
              {event.location?.name && <span className="flex items-center gap-2"><MapPin size={16} /> {event.location.name}</span>}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Content */}
      <section className="py-[clamp(3rem,6vw,6rem)]">
        <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          {/* Description */}
          <SectionReveal>
            <div className="text-[var(--color-text)] text-lg leading-relaxed whitespace-pre-wrap mb-10">
              {typeof event.description === "string" ? event.description : ""}
            </div>
          </SectionReveal>

          {/* Registration CTA or Info Banner */}
          {event.registration_required ? (
            <SectionReveal delay={0.1}>
              <div className="bg-[var(--color-green)]/5 border border-[var(--color-green)]/20 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <Users size={28} className="text-[var(--color-green)] shrink-0 mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-[family-name:var(--font-heading)] mb-2">Register for this event</h2>
                    <p className="text-[var(--color-text)] mb-1">Spaces are limited. Register below to reserve your spot.</p>
                    {event.max_attendees && (
                      <p className="text-sm text-[var(--color-muted)] mb-1">
                        <strong>{event.max_attendees}</strong> spots available
                      </p>
                    )}
                    {deadline && (
                      <p className="text-sm text-[var(--color-muted)] mb-4">
                        Registration deadline: <strong>{deadline.toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</strong>
                      </p>
                    )}
                    <Button href={`/events/${event.slug || event.id}/register`} variant="primary">
                      REGISTER NOW
                    </Button>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <SectionReveal delay={0.1}>
              <div className="bg-[var(--color-green)]/5 border border-[var(--color-green)]/20 rounded-xl p-8">
                <div className="flex items-center gap-4">
                  <CheckCircle size={28} className="text-[var(--color-green)] shrink-0" />
                  <div>
                    <h2 className="text-xl font-[family-name:var(--font-heading)] mb-1">No registration needed</h2>
                    <p className="text-[var(--color-text)]">Just show up! Everyone is welcome.</p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-black/10">
            <Button href="/events" variant="secondary">← All Events</Button>
          </div>
        </div>
      </section>
    </>
  );
}
