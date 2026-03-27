import { FullBleedHero } from "@/components/sections/FullBleedHero";
import { CenteredText } from "@/components/sections/CenteredText";

export default function MediaSubPage({ title, description, bgImage }: { title: string; description: string; bgImage: string }) {
  return (
    <>
      <FullBleedHero heading={title} subheading={description} backgroundUrl={bgImage} compact />
      <CenteredText heading="Coming Soon" body="We're working on bringing you this content. Check back soon!" cta={{ label: "BROWSE SERMONS", href: "/media/sermons" }} />
    </>
  );
}
