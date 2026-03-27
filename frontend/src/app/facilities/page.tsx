import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { CenteredText } from "@/components/sections/CenteredText";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { BannerCTA } from "@/components/sections/BannerCTA";
import { AccordionFAQ } from "@/app/give/AccordionFAQ";

const faqs = [
  { question: "Can I rent the building for an event?", answer: "Yes! Our facilities are available for community events, weddings, and conferences. Contact our facilities team to learn more about availability and pricing." },
  { question: "Is the building accessible?", answer: "Yes, our facility is wheelchair accessible with ramp access and accessible restrooms." },
  { question: "Is there parking available?", answer: "We have street parking available near the building. On Sundays, there is additional parking in the adjacent lot." },
  { question: "Who do I contact for facilities inquiries?", answer: "Please email info@cityofsaints.pl or call +48 42 123 45 67 for facilities inquiries." },
];

export default function FacilitiesPage() {
  return (
    <>
      <FullBleedHero heading="Facilities" subheading="Our building in Łódź is available for church and community events." backgroundUrl="/images/office-space.jpg" compact />

      <CenteredText
        heading="Our Space"
        body="City of Saints meets at our location on ul. Piotrkowska in the heart of Łódź. Our space includes a main worship hall, classrooms, a fellowship area, and a children's wing."
      />

      <section className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Facility Features</h2>
          </SectionReveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Worship Hall", desc: "Our main space for Sunday services, seating up to 200, with full audio/visual setup." },
              { title: "Classrooms", desc: "Multiple rooms for small groups, Bible studies, and children's ministry programming." },
              { title: "Fellowship Hall", desc: "A large open space for community meals, events, and after-service fellowship." },
            ].map((f, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-[var(--color-text)]">{f.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Frequently Asked Questions</h2>
          </SectionReveal>
          <AccordionFAQ items={faqs} />
        </div>
      </section>

      <BannerCTA heading="Interested in renting our space?" subheading="Contact our team for availability and pricing." cta={{ label: "CONTACT US", href: "mailto:info@cityofsaints.pl" }} />
    </>
  );
}
