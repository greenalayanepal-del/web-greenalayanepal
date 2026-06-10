"use client";

import { HeroContent, ShaderBackground } from "@/components/shader-hero-demo";

export function HomeHero() {
  return (
    <ShaderBackground className="min-h-svh">
      <HeroContent
        primaryHref="#thematic"
        secondaryHref="#get-involved"
        className="min-h-svh pt-[4.5rem] pb-14 md:pt-20 md:pb-16"
      />
    </ShaderBackground>
  );
}
