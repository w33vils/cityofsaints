import type { Metadata } from "next";
import Image from "next/image";
import { getLocations } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { CenteredText } from "@/components/sections/CenteredText";

export const metadata: Metadata = {
  title: "Visit",
  description: "Plan your visit to City of Saints in Łódź, Poland. Find service times, locations, and what to expect on a Sunday.",
};
import { BannerCTA } from "@/components/sections/BannerCTA";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { Clock, MapPin, Mail } from "lucide-react";

const expectSections = [
  { overline: "YOU BELONG HERE", heading: "A Warm Welcome", body: "When you step into City of Saints, we hope you feel at home. Whether you're a lifelong believer or exploring faith for the first time, you are welcome here.", image: "/images/people-together.jpg" },
  { overline: "GOD STILL SPEAKS", heading: "A Message From the Bible", body: "Our worship services revolve around Jesus and the faithful teaching of God's Word. We believe the Bible is the inspired, authoritative Word of God.", cta: { label: "OUR SERMONS", href: "/media/sermons" }, image: "/images/open-bible.jpg" },
  { overline: "THE RIGHT RESPONSE", heading: "A Time of Worship", body: "Every day, we worship God through our actions. On Sundays, we come together to sing, pray, and lift up the name of Jesus through contemporary worship music.", cta: { label: "OUR MUSIC", href: "/media/music" }, image: "/images/worship-concert.jpg" },
  { overline: "GROW YOUR COMMUNITY", heading: "A Place to Connect", body: "You were made to be known by others. At City of Saints, we believe community happens best in small groups where you can build authentic relationships.", cta: { label: "GET INVOLVED", href: "/get-involved" }, image: "/images/friends-laughing.jpg" },
  { overline: "FOR ALL AGES", heading: "A Place for Families", body: "City of Saints is a place for all ages and life stages. We have dedicated ministries for kids, students, and young adults — each designed to help the next generation grow in faith.", ctas: [{ label: "KIDS", href: "/ministries/kids" }, { label: "STUDENTS", href: "/ministries/students" }], image: "/images/kids-playing.jpg" },
];

export default async function VisitPage() {
  const locations = await getLocations().catch(() => ({ data: [] }));
  const locs = (locations.data as any[]) || [];

  return (
    <>
      <FullBleedHero
        overline="WELCOME TO CITY OF SAINTS"
        heading="Join us this Sunday!"
        backgroundUrl="/images/mountain-night.jpg"
        subNav={[
          { label: "LOCATIONS & TIMES", anchor: "#locations" },
          { label: "WHAT TO EXPECT", anchor: "#expect" },
        ]}
        compact
      />

      <CenteredText
        body="We're a Protestant church existing for the supremacy of the name and purpose of Jesus Christ. City of Saints gathers in Łódź to worship, grow in community, and serve the city together."
        cta={{ label: "ABOUT US", href: "/about" }}
      />

      {/* Locations */}
      <section id="locations" className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-3">City of Saints — Łódź</h2>
            <p className="text-[var(--color-text)] text-lg">No matter where you&apos;re from, you&apos;ll find a community excited to meet you.</p>
          </SectionReveal>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {locs.map((loc, i) => (
              <SectionReveal key={loc.id || i} delay={i * 0.1} className="snap-start shrink-0 w-[min(340px,calc(100vw-3rem))]">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="aspect-[16/10] bg-[var(--color-dark)] relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">{loc.name}</div>
                  </div>
                  <div className="p-5 space-y-3">
                    <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold">{loc.name}</h3>
                    {loc.service_times?.map((st: any, j: number) => (
                      <p key={j} className="text-sm text-[var(--color-text)] flex items-center gap-2"><Clock size={14} className="text-[var(--color-green)]" />{st.label}: {st.times}</p>
                    ))}
                    {loc.address && <p className="text-sm text-[var(--color-muted)] flex items-center gap-2"><MapPin size={14} />{loc.address}, {loc.postal_code} {loc.city}</p>}
                    {loc.email && <p className="text-sm text-[var(--color-muted)] flex items-center gap-2"><Mail size={14} />{loc.email}</p>}
                    <Button href={`/locations/${loc.slug}`} variant="ghost">Learn More →</Button>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section id="expect">
        {expectSections.map((s, i) => (
          <div key={i} className={`py-[clamp(3rem,6vw,6rem)] ${i % 2 === 1 ? "bg-[var(--color-bg-alt)]" : ""}`}>
            <div className={`max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)] grid md:grid-cols-2 gap-6 md:gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl] *:md:[direction:ltr]" : ""}`}>
              <SectionReveal>
                <div>
                  <Overline className="mb-3 block">{s.overline}</Overline>
                  <h3 className="text-[clamp(1.25rem,2vw,1.75rem)] mb-4">{s.heading}</h3>
                  <p className="text-[var(--color-text)] leading-relaxed mb-6">{s.body}</p>
                  {"cta" in s && s.cta && <Button href={s.cta.href} variant="secondary">{s.cta.label}</Button>}
                  {"ctas" in s && s.ctas && <div className="flex gap-3">{s.ctas.map((c) => <Button key={c.label} href={c.href} variant="secondary">{c.label}</Button>)}</div>}
                </div>
              </SectionReveal>
              <SectionReveal delay={0.15}>
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <Image src={s.image} alt={s.heading} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              </SectionReveal>
            </div>
          </div>
        ))}
      </section>

      <BannerCTA
        heading="Want to get involved?"
        subheading="Check out upcoming opportunities to get connected!"
        cta={{ label: "GET INVOLVED", href: "/get-involved" }}
      />
    </>
  );
}
