import { getMinistries } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { CenteredText } from "@/components/sections/CenteredText";
import { TwoColumn } from "@/components/sections/TwoColumn";
import { BannerCTA } from "@/components/sections/BannerCTA";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { AccordionFAQ } from "@/app/give/AccordionFAQ";
import { notFound } from "next/navigation";

const ministryImages: Record<string, string> = {
  kids: "/images/kids-playing.jpg",
  students: "/images/friends-laughing.jpg",
  "young-adults": "/images/community-group.jpg",
  womens: "/images/community-women.jpg",
  mens: "/images/mens-outdoors.jpg",
  marriage: "/images/marriage-couple.jpg",
  recovery: "/images/people-together.jpg",
};

export default async function MinistryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await getMinistries().catch(() => ({ data: [] }));
  const ministry = (res.data as any[])?.find((m: any) => m.slug === slug || String(m.id) === slug);
  if (!ministry) notFound();

  const bgImage = ministryImages[slug] || "/images/community-group.jpg";

  return (
    <>
      <FullBleedHero
        heading={`${ministry.name} Ministry`}
        subheading={ministry.tagline}
        backgroundUrl={bgImage}
        subNav={[
          { label: "GET INVOLVED", anchor: "#get-involved" },
          { label: "FAQS", anchor: "#faqs" },
        ]}
        compact
      />

      <CenteredText
        overline={`${ministry.name} MINISTRY`}
        heading={ministry.tagline || `Welcome to ${ministry.name} Ministry`}
      />

      <TwoColumn
        heading={`What is ${ministry.name} Ministry?`}
        body={typeof ministry.description === "string" ? ministry.description : `Learn about our ${ministry.name} ministry at City of Saints.`}
        image={bgImage}
      />

      {/* What We Do */}
      {ministry.what_we_do && ministry.what_we_do.length > 0 && (
        <section className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
          <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
            <SectionReveal className="text-center mb-10">
              <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">What We Do</h2>
            </SectionReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ministry.what_we_do.map((block: any, i: number) => (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg mb-3">{block.heading}</h3>
                    <p className="text-[var(--color-text)] text-sm leading-relaxed">{block.body}</p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Get Involved */}
      <section id="get-involved" className="py-[clamp(4rem,8vw,8rem)]">
        <SectionReveal className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-4">Get Involved</h2>
          <p className="text-[var(--color-text)] text-lg mb-8">Interested in {ministry.name} Ministry? We&apos;d love to have you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            {ministry.volunteer_url && <a href={ministry.volunteer_url} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-green)] text-white rounded font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[var(--color-green-light)] transition-colors">Apply to Volunteer</a>}
            {ministry.email && <a href={`mailto:${ministry.email}`} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--color-green)] text-[var(--color-green)] rounded font-[family-name:var(--font-accent)] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[var(--color-green)] hover:text-white transition-colors">Contact Us</a>}
          </div>
        </SectionReveal>
      </section>

      {/* FAQs */}
      {ministry.faqs && ministry.faqs.length > 0 && (
        <section id="faqs" className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
          <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
            <SectionReveal className="text-center mb-10">
              <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Frequently Asked Questions</h2>
            </SectionReveal>
            <AccordionFAQ items={ministry.faqs} />
          </div>
        </section>
      )}

      <BannerCTA
        heading={ministry.cta_text || `Join ${ministry.name} Ministry`}
        cta={{ label: "CONTACT US", href: ministry.email ? `mailto:${ministry.email}` : "/about" }}
      />
    </>
  );
}
