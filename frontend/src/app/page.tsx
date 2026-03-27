import { getSermons, getCurrentSeries, getEvents, getArticles } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { TwoColumn } from "@/components/sections/TwoColumn";
import { FullBleedBanner } from "@/components/sections/FullBleedBanner";
import { BannerCTA } from "@/components/sections/BannerCTA";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import dynamic from "next/dynamic";

const EventsScroller = dynamic(() => import("./EventsScroller").then(m => ({ default: m.EventsScroller })));
const MediaTabs = dynamic(() => import("./MediaTabs").then(m => ({ default: m.MediaTabs })));

export default async function HomePage() {
  const [sermons, currentSeries, events, articles] = await Promise.all([
    getSermons().catch(() => ({ data: [] })),
    getCurrentSeries().catch(() => null),
    getEvents().catch(() => ({ data: [] })),
    getArticles().catch(() => ({ data: [] })),
  ]);
  const latestSermon = (sermons.data as any[])?.[0];

  return (
    <>
      <FullBleedHero
        heading="City of Saints"
        subheading="A Protestant church in Łódź, Poland — gathering to love God, the church, the city, and the nations."
        ctas={[
          { label: "VISIT", href: "/visit", variant: "primary" },
          { label: "GET INVOLVED", href: "/get-involved", variant: "secondary_light" },
        ]}
        backgroundUrl="/images/hero-worship.jpg"
      />

      {latestSermon && (
        <section className="-mt-12 relative z-10">
          <SectionReveal className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 md:flex md:items-center md:gap-6">
              <div className="w-16 h-16 rounded-lg bg-[var(--color-green)]/10 flex items-center justify-center shrink-0 mb-4 md:mb-0">
                <svg viewBox="0 0 24 24" fill="var(--color-green)" className="w-7 h-7"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div>
                <Overline className="mb-1 block">CURRENT SERMON SERIES</Overline>
                <h3 className="text-xl font-[family-name:var(--font-heading)]">{currentSeries?.title || latestSermon.title}</h3>
                <p className="text-sm text-[var(--color-muted)] mt-1">Watch the latest sermon</p>
              </div>
            </div>
          </SectionReveal>
        </section>
      )}

      <TwoColumn
        overline="WHO WE ARE"
        heading="We're a Protestant church in Łódź, gathering to love God, the church, the city, and the nations."
        ctas={[{ label: "VISIT", href: "/visit" }, { label: "ABOUT US", href: "/about" }]}
        image="/images/community-women.jpg"
      />

      <section className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal>
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <Overline className="mb-2 block">WHAT&apos;S HAPPENING</Overline>
                <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Upcoming Events</h2>
              </div>
              <Button href="/events" variant="ghost">VIEW ALL EVENTS →</Button>
            </div>
          </SectionReveal>
          <EventsScroller events={(events.data as any[]) || []} />
        </div>
      </section>

      {currentSeries && (
        <FullBleedBanner
          overline="CURRENT SERMON SERIES"
          heading={currentSeries.title}
          body={typeof currentSeries.description === "string" ? currentSeries.description : "Explore the current teaching series."}
          cta={{ label: "EXPLORE SERIES", href: `/sermon-series/${currentSeries.slug}` }}
          backgroundUrl="/images/open-bible.jpg"
        />
      )}

      <TwoColumn
        heading="You are welcome here."
        body="Are you new to faith? Have you been following Jesus for a while? Or are you somewhere in between? Whether you speak Polish or English, come learn about Jesus alongside us!"
        ctas={[{ label: "VISIT", href: "/visit" }, { label: "GET INVOLVED", href: "/get-involved" }]}
        reverse
        image="/images/community-group.jpg"
      />

      <section className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <Overline className="mb-4 block">LATEST FROM MEDIA</Overline>
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] max-w-xl mx-auto">Content exploring Christian living, theology, and biblical encouragement.</h2>
          </SectionReveal>
          <MediaTabs sermons={(sermons.data as any[]) || []} articles={(articles.data as any[]) || []} />
        </div>
      </section>

      <BannerCTA heading="Planning to visit?" subheading="Find out what to expect on a Sunday at City of Saints." cta={{ label: "PLAN YOUR VISIT", href: "/visit" }} />
    </>
  );
}
