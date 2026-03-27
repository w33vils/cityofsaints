import type { Metadata } from "next";
import { getGivePage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the mission of City of Saints in Łódź. Give online via bank transfer, card, or BLIK.",
};
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { Landmark, CreditCard, Smartphone, FileCheck, TrendingUp, ShieldCheck } from "lucide-react";
import { AccordionFAQ } from "./AccordionFAQ";

const iconMap: Record<string, any> = { Landmark, CreditCard, Smartphone, FileCheck, TrendingUp, ShieldCheck };

export default async function GivePage() {
  const givePage = await getGivePage().catch(() => ({ data: null }));
  const g = givePage.data as any;

  const primaryMethods = g?.primary_methods || [
    { icon: "Landmark", label: "Bank Transfer (Przelew)", fee: "Free", recommended: true },
    { icon: "CreditCard", label: "Debit/Credit Card", fee: "Small processing fee" },
    { icon: "Smartphone", label: "BLIK / Online Payment", fee: "Varies by provider" },
  ];

  const otherMethods = g?.other_methods || [
    { icon: "FileCheck", label: "Cash / Envelope", body: "You can give in person during any Sunday service." },
    { icon: "TrendingUp", label: "Standing Order (Zlecenie stałe)", body: "Set up a recurring transfer through your bank." },
    { icon: "ShieldCheck", label: "International Transfer", body: "Contact us for IBAN and SWIFT details." },
  ];

  const faqs = g?.faqs || [
    { question: "How can I set up a recurring gift?", answer: "Set up a standing order (zlecenie stałe) through your bank." },
    { question: "Will I receive a confirmation?", answer: "Yes, all electronic gifts receive an automatic email confirmation." },
    { question: "Can I give in a currency other than PLN?", answer: "Yes! Contact info@cityofsaints.pl for IBAN/SWIFT details." },
    { question: "How is the budget managed?", answer: "Our elders oversee the church budget with full transparency." },
  ];

  return (
    <>
      <FullBleedHero
        heading="Give"
        backgroundUrl="/images/giving-hands.jpg"
        subNav={[
          { label: "GIVE NOW", anchor: "#ways" },
          { label: "FAQS", anchor: "#faqs" },
        ]}
        compact
      />

      {/* Why We Give */}
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-12">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Why We Give</h2>
          </SectionReveal>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <SectionReveal>
              <h3 className="text-lg font-[family-name:var(--font-heading)] mb-3">Why Give?</h3>
              <p className="text-[var(--color-text)] leading-relaxed">{g?.why_give || "Giving is an act of worship and obedience to God. Scripture teaches us that everything we have belongs to God, and we are stewards of His resources. Generous giving reflects a heart transformed by the Gospel (2 Corinthians 9:7)."}</p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h3 className="text-lg font-[family-name:var(--font-heading)] mb-3">Why Give to City of Saints?</h3>
              <p className="text-[var(--color-text)] leading-relaxed">{g?.why_give_to_us || "Your giving directly supports the ministry and mission of City of Saints in Łódź. From Sunday worship services to community outreach, youth programs, and missions — every złoty helps advance the Kingdom of God."}</p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Ways to Give */}
      <section id="ways" className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-3">Ways to Give</h2>
            <p className="text-[var(--color-text)]">We recommend setting up recurring gifts. All amounts are in Polish Złoty (PLN).</p>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {primaryMethods.map((m: any, i: number) => {
              const Icon = iconMap[m.icon] || Landmark;
              return (
                <SectionReveal key={i} delay={i * 0.1}>
                  <div className={`bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all ${m.recommended ? "ring-2 ring-[var(--color-green)]" : ""}`}>
                    {m.recommended && <Overline className="text-[var(--color-green)] mb-2 block">RECOMMENDED</Overline>}
                    <Icon size={32} className="mx-auto mb-4 text-[var(--color-green)]" />
                    <h3 className="font-semibold text-lg mb-2">{m.label}</h3>
                    <p className="text-sm text-[var(--color-muted)] mb-4">{m.fee}</p>
                    <Button href={g?.give_url || "#"} external variant="primary">GIVE NOW</Button>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal>
            <h3 className="text-lg font-[family-name:var(--font-heading)] text-center mb-6">Other Ways to Give</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {otherMethods.map((m: any, i: number) => {
                const Icon = iconMap[m.icon] || FileCheck;
                return (
                  <div key={i} className="bg-white rounded-xl p-5 flex items-start gap-4">
                    <Icon size={24} className="text-[var(--color-gold)] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{m.label}</h4>
                      <p className="text-sm text-[var(--color-muted)]">{m.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* What Giving Supports */}
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <SectionReveal className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
          <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-4">What Giving Supports</h2>
          <p className="text-[var(--color-text)] text-lg leading-relaxed">
            Your giving supports the mission of City of Saints — from weekly worship services and children&apos;s ministry to outreach initiatives across Łódź and mission partnerships around the world.
          </p>
        </SectionReveal>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Frequently Asked Questions</h2>
          </SectionReveal>
          <AccordionFAQ items={faqs} />
        </div>
      </section>
    </>
  );
}
