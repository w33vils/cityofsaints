import type { Metadata } from "next";
import { getEvents } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { EventsGrid } from "./EventsGrid";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events at City of Saints in Łódź. Registration, community gatherings, retreats, and more.",
};

export default async function EventsPage() {
  const res = await getEvents().catch(() => ({ data: [] }));
  const events = (res.data as any[]) || [];

  // Extract unique filter options from event data
  const categories = [...new Set(events.map((e) => e.category).filter(Boolean))];

  return (
    <>
      <FullBleedHero
        overline="UPCOMING"
        heading="Events"
        subheading="See what's coming up at City of Saints. Filter below to find something for you!"
        backgroundUrl="/images/people-together.jpg"
        compact
      />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <EventsGrid events={events} categories={categories} />
        </div>
      </section>
    </>
  );
}
