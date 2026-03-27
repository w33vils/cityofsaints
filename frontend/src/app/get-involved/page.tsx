import { getClasses, getMinistries } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { GetInvolvedTabs } from "./GetInvolvedTabs";

export default async function GetInvolvedPage() {
  const [classesRes, ministriesRes] = await Promise.all([
    getClasses().catch(() => ({ data: [] })),
    getMinistries().catch(() => ({ data: [] })),
  ]);

  return (
    <>
      <FullBleedHero heading="Get Involved" subheading="There are so many ways to get connected at City of Saints." backgroundUrl="/images/community-women.jpg" compact />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <GetInvolvedTabs classes={(classesRes.data as any[]) || []} ministries={(ministriesRes.data as any[]) || []} />
        </div>
      </section>
    </>
  );
}
