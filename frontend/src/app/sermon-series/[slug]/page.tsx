import { getSermonSeries, getSermons } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Tag } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SeriesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [seriesRes, sermonsRes] = await Promise.all([
    getSermonSeries().catch(() => ({ data: [] })),
    getSermons().catch(() => ({ data: [] })),
  ]);
  const series = (seriesRes.data as any[])?.find((s: any) => s.slug === slug || String(s.id) === slug);
  if (!series) notFound();

  const sermons = (sermonsRes.data as any[])?.filter((s: any) => s.series?.id === series.id || s.series?.documentId === series.documentId) || [];

  return (
    <>
      <FullBleedHero heading={series.title} subheading={typeof series.description === "string" ? series.description : undefined} compact backgroundUrl="/images/open-bible.jpg" />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal>
            <h2 className="text-xl font-[family-name:var(--font-heading)] mb-6">Sermons in this Series</h2>
            <div className="space-y-3">
              {sermons.map((s: any, i: number) => (
                <Link key={s.id || i} href={`/sermons/${s.slug || s.id}`} className="group flex items-center gap-4 p-4 bg-white rounded-xl hover:shadow-md transition-all">
                  <span className="text-sm text-[var(--color-muted)] w-24 shrink-0">{s.date ? new Date(s.date).toLocaleDateString("en", { month: "short", day: "numeric" }) : ""}</span>
                  <span className="font-semibold group-hover:text-[var(--color-green)] transition-colors flex-1">{s.title}</span>
                  <span className="text-xs text-[var(--color-muted)]">{s.scripture}</span>
                </Link>
              ))}
              {sermons.length === 0 && <p className="text-[var(--color-muted)]">No sermons in this series yet.</p>}
            </div>
          </SectionReveal>
          <div className="mt-8"><Button href="/media/sermons" variant="secondary">← All Sermons</Button></div>
        </div>
      </section>
    </>
  );
}
