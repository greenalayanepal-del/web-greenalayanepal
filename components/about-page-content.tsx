import Image from "next/image";
import Link from "next/link";

import {
  AboutGlassCard,
  glassCardShadow,
  glassCardSurface,
} from "@/components/about-glass-card";
import { HomeSectionHeader } from "@/components/home-section-header";
import {
  aboutPageContent,
  siteConfig,
  strategicPillars,
  thematicAreas,
} from "@/lib/site";

function AboutPageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a]" />

      <div className="absolute inset-0">
        <Image
          src={siteConfig.images.aboutBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50 contrast-[1.05] saturate-[1.08]"
        />
      </div>

      <div
        className="absolute inset-0 motion-reduce:opacity-90 motion-safe:animate-[hero-mesh-pulse_10s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 32%, rgba(76,175,80,0.14) 0%, transparent 68%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 72% at 50% 40%, transparent 38%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a]/70 via-transparent to-[#0f1410]" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(76,175,80,0.06)_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
    </div>
  );
}

export function AboutPageContent() {
  return (
    <div className="dark relative min-h-screen overflow-hidden bg-[#0a0f0a] text-white">
      <AboutPageBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-16 md:px-6 md:pt-28 md:pb-24">
        <HomeSectionHeader
          tag={aboutPageContent.tag}
          title={aboutPageContent.title}
          description={aboutPageContent.subtitle}
          tone="dark"
          className="mb-10 md:mb-14"
        />

        <section id="mission" className="scroll-mt-24">
          <div className="mx-auto max-w-3xl">
            <AboutGlassCard title="Our Mission">{aboutPageContent.leadMission}</AboutGlassCard>
          </div>
        </section>

        <section className="mt-12 scroll-mt-24 md:mt-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Who we are</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-white/85 sm:text-lg">
            {aboutPageContent.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-12 scroll-mt-24 md:mt-16">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Our story</h2>
          <div className="mt-6">
            <AboutGlassCard align="left">{aboutPageContent.story}</AboutGlassCard>
          </div>
        </section>

        <section id="strategic-pillars" className="mt-16 scroll-mt-24 md:mt-20">
          <HomeSectionHeader
            title={aboutPageContent.pillarsHeading}
            description={aboutPageContent.pillarsDescription}
            tone="dark"
            className="mb-8 md:mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
            {strategicPillars.map((pillar) => (
              <li key={pillar.title}>
                <AboutGlassCard title={pillar.title} align="left">
                  {pillar.description}
                </AboutGlassCard>
              </li>
            ))}
          </ul>
        </section>

        <section id="vision" className="mt-16 scroll-mt-24 md:mt-20">
          <div className="mx-auto max-w-3xl">
            <AboutGlassCard title="Our Vision">{aboutPageContent.vision}</AboutGlassCard>
          </div>
        </section>

        <section id="thematic-areas" className="mt-16 scroll-mt-24 md:mt-20">
          <HomeSectionHeader
            title={aboutPageContent.thematicHeading}
            description={aboutPageContent.thematicDescription}
            tone="dark"
            className="mb-8 md:mb-10"
          />

          <div
            className={`rounded-2xl px-5 py-6 sm:px-8 sm:py-8 ${glassCardSurface} ${glassCardShadow}`}
          >
            <ol className="space-y-4">
              {thematicAreas.map((area, index) => (
                <li
                  key={area.title}
                  className="border-b border-white/10 pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-[#2e7d32]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">{area.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
                    {area.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Explore our work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
