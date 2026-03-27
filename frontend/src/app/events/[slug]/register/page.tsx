import { getEvents } from "@/lib/strapi";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RegistrationForm } from "./RegistrationForm";

export default async function RegisterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getEvents().catch(() => ({ data: [] }));
  const event = (res.data as any[])?.find((e: any) => e.slug === slug || String(e.id) === slug);
  if (!event || !event.registration_required) notFound();

  return (
    <section className="py-12 pb-[clamp(4rem,8vw,8rem)]">
      <div className="max-w-[600px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <SectionReveal>
          <Link href={`/events/${slug}`} className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-green)] transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Event
          </Link>

          <Overline className="mb-2 block">{event.category || "EVENT"}</Overline>
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] mb-2">{event.title}</h1>
          <p className="text-[var(--color-muted)] mb-8">
            {event.date ? new Date(event.date).toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : ""}
            {event.time ? ` · ${event.time}` : ""}
          </p>

          <RegistrationForm
            eventId={event.id}
            eventDocumentId={event.documentId}
            eventSlug={slug}
            hasFood={event.has_food}
            offersChildcare={event.offers_childcare}
          />
        </SectionReveal>
      </div>
    </section>
  );
}
