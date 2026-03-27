import { getSermons, getSermonSeries } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { SermonsClient } from "./SermonsClient";

export default async function SermonsPage() {
  const [sermons, series] = await Promise.all([
    getSermons().catch(() => ({ data: [] })),
    getSermonSeries().catch(() => ({ data: [] })),
  ]);

  return (
    <>
      <FullBleedHero
        overline="RULED BY GOD'S WORD"
        heading="Sermons"
        subheading="We preach through books of the Bible, believing that God's Word is living and active."
        backgroundUrl="/images/open-bible.jpg"
        compact
      />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SermonsClient sermons={(sermons.data as any[]) || []} series={(series.data as any[]) || []} />
        </div>
      </section>
    </>
  );
}
