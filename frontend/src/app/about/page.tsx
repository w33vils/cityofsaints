import type { Metadata } from "next";
import { getTeamMembers } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about City of Saints, a Protestant evangelical church in Łódź, Poland. Our beliefs, story, team, and mission.",
};
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { CenteredText } from "@/components/sections/CenteredText";
import { TwoColumn } from "@/components/sections/TwoColumn";
import { FullBleedBanner } from "@/components/sections/FullBleedBanner";
import { BannerCTA } from "@/components/sections/BannerCTA";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { Mail } from "lucide-react";

const convictions = {
  left: ["Ruled by God's Word (Sola Scriptura)", "Christ-Centered in Focus (Solus Christus)", "Saved by Grace Alone (Sola Gratia)", "Justified through Faith Alone (Sola Fide)"],
  right: ["Committed to Covenant Community", "Gospel-Saturated in Discipleship", "Devoted to Equipping the Saints", "Relentless in Mission (Soli Deo Gloria)"],
};

const affirmation = [
  "The Bible as the inspired, inerrant, and authoritative Word of God",
  "The Trinity: one God in three persons — Father, Son, and Holy Spirit",
  "The deity and humanity of Jesus Christ",
  "Salvation by grace alone through faith alone in Christ alone",
  "The bodily resurrection of Jesus Christ",
  "The priesthood of all believers",
  "The Great Commission to make disciples of all nations",
  "The spiritual gifts of the Holy Spirit active in the church today",
  "The second coming of Jesus Christ",
  "Believer's baptism by immersion",
];

const story = [
  { heading: "How It Started", body: "City of Saints was born out of a desire to see a vibrant, Bible-believing Protestant community in Łódź — one of Poland's great cities. A small group of believers began gathering for prayer, worship, and the study of Scripture, trusting God to build His church." },
  { heading: "How We've Grown", body: "What started as a living room Bible study has grown into a church family united by a shared love for Jesus and a heart for Łódź. Through faithful teaching, genuine community, and service to the city, God has added to our number and deepened our roots." },
  { heading: "Where We're Going", body: "We believe God is doing something extraordinary in Łódź and across Poland. Our vision is to see lives transformed by the Gospel, leaders raised up to serve, and the good news of Jesus carried to every corner of our city and to the nations beyond." },
];

export default async function AboutPage() {
  const team = await getTeamMembers().catch(() => ({ data: [] }));
  const members = (team.data as any[]) || [];

  return (
    <>
      <FullBleedHero
        heading="About Us"
        backgroundUrl="/images/community-group.jpg"
        subNav={[
          { label: "MEET OUR TEAM", anchor: "#team" },
          { label: "WHAT WE BELIEVE", anchor: "#beliefs" },
        ]}
        compact
      />

      <CenteredText overline="A PROTESTANT CHURCH IN ŁÓDŹ" heading="We love God, the church, the city, and the nations." />

      <TwoColumn
        overline="WHO WE ARE"
        heading="City of Saints — Łódź"
        body="City of Saints is a Protestant evangelical church in Łódź, Poland. We are a community of Christ-followers committed to worshipping God, growing in faith through the study of Scripture, and serving the city of Łódź and beyond. In a country with a rich spiritual heritage, we seek to faithfully proclaim the Gospel and make disciples of Jesus."
        image="/images/community-women.jpg"
      />

      {/* Beliefs */}
      <section id="beliefs" className="py-[clamp(4rem,8vw,8rem)] bg-[var(--color-bg-alt)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-12">
            <Overline className="mb-4 block">WHAT WE BELIEVE</Overline>
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">Our Foundational Beliefs</h2>
          </SectionReveal>

          <SectionReveal>
            <h3 className="text-xl font-[family-name:var(--font-heading)] mb-6 text-center">Our Convictions</h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
              {[convictions.left, convictions.right].map((col, ci) => (
                <ul key={ci} className="space-y-3">
                  {col.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-[var(--color-green)] mt-2 shrink-0" />
                      <span className="text-[var(--color-text)]">{item}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal>
            <h3 className="text-xl font-[family-name:var(--font-heading)] mb-6 text-center">Affirmation of Faith</h3>
            <p className="text-center text-[var(--color-muted)] mb-6">We affirm the core Protestant evangelical beliefs:</p>
            <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {affirmation.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-lg p-4">
                  <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] mt-2 shrink-0" />
                  <span className="text-sm text-[var(--color-text)]">{item}</span>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[800px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-12">
            <Overline className="mb-4 block">OUR STORY</Overline>
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)]">How God Has Led Us</h2>
          </SectionReveal>
          <div className="relative border-l-2 border-[var(--color-green)]/20 pl-8 space-y-12">
            {story.map((s, i) => (
              <SectionReveal key={i} delay={i * 0.15}>
                <div className="relative">
                  <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 rounded-full bg-[var(--color-green)]" />
                  <h3 className="text-xl font-[family-name:var(--font-heading)] mb-3">{s.heading}</h3>
                  <p className="text-[var(--color-text)] leading-relaxed">{s.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Name */}
      <FullBleedBanner
        overline="OUR NAME"
        heading="The Meaning Behind Our Name"
        body="The name 'City of Saints' is drawn from the New Testament, where Paul addresses his letters to 'the saints' — not people who are perfect, but ordinary men and women set apart by God's grace through faith in Jesus Christ. In the Protestant tradition, every believer is a saint — called, forgiven, and empowered."
        backgroundUrl="/images/portrait-man.jpg"
      />

      {/* Scripture Quote */}
      <section className="py-[clamp(5rem,10vw,10rem)] bg-cover bg-center relative" style={{ backgroundImage: "linear-gradient(rgba(26,26,26,0.8),rgba(26,26,26,0.8)), url(/images/open-bible.jpg)" }}>
        <SectionReveal className="max-w-[900px] mx-auto px-[clamp(1rem,4vw,2rem)] text-center">
          <blockquote className="font-[family-name:var(--font-heading)] text-[clamp(1.25rem,2.5vw,2rem)] text-white italic leading-relaxed mb-6">
            &ldquo;Now to him who is able to do far more abundantly than all that we ask or think, according to the power at work within us, to him be glory in the church and in Christ Jesus throughout all generations, forever and ever. Amen.&rdquo;
          </blockquote>
          <Overline className="text-[var(--color-gold)]">EPHESIANS 3:20-21 ESV</Overline>
        </SectionReveal>
      </section>

      {/* Team Grid */}
      <section id="team" className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <SectionReveal className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] mb-4">Our Team</h2>
          </SectionReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {members.map((m, i) => (
              <SectionReveal key={m.id || i} delay={i * 0.05}>
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div className="aspect-square bg-[var(--color-bg-alt)] flex items-center justify-center text-2xl text-[var(--color-muted)]">
                    {m.name?.charAt(0) || "?"}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{m.name}</h3>
                    <p className="text-xs text-[var(--color-muted)]">{m.title}</p>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-xs text-[var(--color-green)] mt-2 hover:underline">
                        <Mail size={12} />{m.email}
                      </a>
                    )}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/team" variant="secondary">MEET OUR TEAM</Button>
          </div>
        </div>
      </section>

      <BannerCTA heading="Planning to visit?" subheading="Check out our locations to see which would be best for you!" cta={{ label: "VISIT US", href: "/visit" }} />
    </>
  );
}
