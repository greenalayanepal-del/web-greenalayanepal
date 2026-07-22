import { HeroBackground, HeroContent } from "@/components/home-hero-background";

export function HomeHero() {
  return (
    <HeroBackground className="min-h-svh">
      <HeroContent
        primaryHref="#thematic"
        secondaryHref="#get-involved"
        className="min-h-svh pt-[4.5rem] pb-14 md:pt-20 md:pb-16"
      />
    </HeroBackground>
  );
}
