"use client";

import { useRef } from "react";
import { HomeSectionHeader } from "@/components/home-section-header";
import { SectionFadeBridges } from "@/components/section-fade-bridges";
import { ThematicAreasGrid } from "@/components/thematic-areas-grid";
import { siteConfig } from "@/lib/site";

export function ThematicAreasSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="thematic"
      className="relative -mt-[8px] scroll-mt-24 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a] px-4 pt-10 pb-16 sm:px-5 sm:pt-12 sm:pb-20 lg:px-5 lg:pt-[62px] lg:pb-[102px]"
    >
      <SectionFadeBridges targetRef={sectionRef} showTop showBottom />
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage: `url('${siteConfig.images.thematicAreasBackground}')`,
          }}
        />
        <div
          className="absolute inset-0 motion-reduce:opacity-75 motion-safe:animate-[hero-mesh-pulse_10s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 72% 68% at 50% 42%, rgba(76,175,80,0.10) 0%, transparent 68%)",
          }}
        />
        <div className="absolute top-1/4 left-1/4 h-80 w-80 rounded-full bg-[#2e7d32]/6 blur-3xl" />
        <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#4caf50]/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(76,175,80,0.04)_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl lg:-mt-10">
        <HomeSectionHeader
          title="Thematic Areas"
          tone="dark"
          outlinedTitle
          className="lg:mb-[54px]"
        />
        <ThematicAreasGrid />
      </div>
    </section>
  );
}
