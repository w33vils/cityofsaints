import { getSermons } from "@/lib/strapi";
import { sermonSchema } from "@/lib/schema";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { AudioPlayer } from "@/components/interactive/AudioPlayer";
import { Calendar, User, BookOpen, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = await getSermons().catch(() => ({ data: [] }));
  const s = (res.data as any[])?.find((s: any) => s.slug === slug || String(s.id) === slug);
  if (!s) return {};
  return { title: s.title, description: s.scripture || `Sermon from City of Saints` };
}
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SermonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getSermons().catch(() => ({ data: [] }));
  const sermon = (res.data as any[])?.find((s: any) => s.slug === slug || String(s.id) === slug);
  if (!sermon) notFound();

  return (
    <div className="pt-8 pb-[clamp(4rem,8vw,8rem)]">
      <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <SectionReveal>
          <Link href="/media/sermons" className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-green)] mb-8">
            <ArrowLeft size={16} /> Back to Sermons
          </Link>

          <Overline className="mb-2 block">{sermon.scripture || "SERMON"}</Overline>
          <h1 className="text-[clamp(2rem,4vw,3rem)] mb-4">{sermon.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--color-muted)] mb-8">
            {sermon.date && <span className="flex items-center gap-1"><Calendar size={14} />{new Date(sermon.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span>}
            {(sermon.preacher?.name || sermon.preacher) && <span className="flex items-center gap-1"><User size={14} />{sermon.preacher?.name || sermon.preacher}</span>}
            {sermon.book && <span className="flex items-center gap-1"><BookOpen size={14} />{sermon.book}</span>}
          </div>

          {sermon.audio_url && <div className="mb-8"><AudioPlayer src={sermon.audio_url} title={sermon.title} /></div>}

          {sermon.video_url && (
            <div className="mb-8 aspect-video rounded-xl overflow-hidden bg-black">
              <iframe src={sermon.video_url} className="w-full h-full" allowFullScreen />
            </div>
          )}

          {sermon.notes && (
            <div className="prose prose-lg max-w-none mt-8">
              <h3 className="text-lg font-[family-name:var(--font-heading)]">Sermon Notes</h3>
              <div className="text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">{sermon.notes}</div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-black/10">
            <Button href="/media/sermons" variant="secondary">← All Sermons</Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
