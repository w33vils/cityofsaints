import { getArticles } from "@/lib/strapi";
import { articleSchema } from "@/lib/schema";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const res = await getArticles().catch(() => ({ data: [] }));
  const a = (res.data as any[])?.find((a: any) => a.slug === slug || String(a.id) === slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt || `Article from City of Saints` };
}
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getArticles().catch(() => ({ data: [] }));
  const article = (res.data as any[])?.find((a: any) => a.slug === slug || String(a.id) === slug);
  if (!article) notFound();

  return (
    <div className="pt-8 pb-[clamp(4rem,8vw,8rem)]">
      <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
        <SectionReveal>
          <Link href="/media/articles" className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-green)] mb-8">
            <ArrowLeft size={16} /> Back to Articles
          </Link>
          {article.category && <Overline className="mb-2 block">{article.category}</Overline>}
          <h1 className="text-[clamp(2rem,4vw,3rem)] mb-4">{article.title}</h1>
          <div className="flex gap-4 text-sm text-[var(--color-muted)] mb-10">
            {article.date && <span className="flex items-center gap-1"><Calendar size={14} />{new Date(article.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" })}</span>}
            {(article.author?.name || article.author) && <span className="flex items-center gap-1"><User size={14} />{article.author?.name || article.author}</span>}
          </div>
          <div className="prose prose-lg max-w-none text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
            {article.body || ""}
          </div>
          <div className="mt-12 pt-8 border-t border-black/10">
            <Button href="/media/articles" variant="secondary">← All Articles</Button>
          </div>
        </SectionReveal>
      </div>
    </div>
  );
}
