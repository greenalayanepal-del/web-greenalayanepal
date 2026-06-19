import { AboutSection } from "@/components/about-section";
import { FooterStayAhead } from "@/components/footer-stay-ahead";
import { HomeHero } from "@/components/home-hero";
import { StrategicPillarsOrbit } from "@/components/strategic-pillars-orbit";
import { ThematicAreasSection } from "@/components/thematic-areas-section";

export function HomeLanding() {
  return (
    <div className="bg-[#0a0f0a] text-foreground">
      <HomeHero />

      <AboutSection />

      <StrategicPillarsOrbit />

      <ThematicAreasSection />

      <FooterStayAhead />
    </div>
  );
}
