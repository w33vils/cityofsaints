import { getArticles } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Tag } from "@/components/ui/Overline";
import Link from "next/link";

export default async function ArticlesPage() {
  const res = await getArticles().catch(() => ({ data: [] }));
  const articles = (res.data as any[]) || [];

  return (
    <>
      <FullBleedHero heading="Articles" subheading="Exploring Christian living, theology, and biblical encouragement." backgroundUrl="/images/books-library.jpg" compact />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <SectionReveal key={a.id || i} delay={i * 0.05}>
                <Link href={`/articles/${a.slug || a.id}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="aspect-[16/9] bg-[var(--color-bg-alt)] relative overflow-hidden">
                    <img src="/images/books-library.jpg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    {a.category && <Tag color="green">{a.category}</Tag>}
                    <h3 className="font-[family-name:var(--font-heading)] text-lg mt-2 group-hover:text-[var(--color-green)] transition-colors">{a.title}</h3>
                    {a.excerpt && <p className="text-sm text-[var(--color-muted)] mt-2 line-clamp-2">{a.excerpt}</p>}
                    <p className="text-xs text-[var(--color-muted)] mt-3">{a.date ? new Date(a.date).toLocaleDateString("en", { month: "long", day: "numeric", year: "numeric" }) : ""}</p>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
