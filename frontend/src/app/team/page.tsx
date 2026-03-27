import { getTeamMembers } from "@/lib/strapi";
import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { SectionReveal } from "@/components/sections/SectionReveal";
import { TeamGrid } from "./TeamGrid";

export default async function TeamPage() {
  const res = await getTeamMembers().catch(() => ({ data: [] }));
  const members = (res.data as any[]) || [];
  const roles = [...new Set(members.map((m) => m.role).filter(Boolean))];
  const divisions = [...new Set(members.map((m) => m.division).filter(Boolean))];

  return (
    <>
      <FullBleedHero heading="Our Team" subheading="Meet the leaders and staff of City of Saints." backgroundUrl="/images/community-group.jpg" compact />
      <section className="py-[clamp(4rem,8vw,8rem)]">
        <div className="max-w-[1280px] mx-auto px-[clamp(1rem,4vw,2rem)]">
          <TeamGrid members={members} roles={roles} divisions={divisions} />
        </div>
      </section>
    </>
  );
}
