import Link from "next/link";
import type { ReactNode } from "react";
import { AboutSection } from "@/components/about-section";
import { HomeHero } from "@/components/home-hero";
import { StrategicPillarsOrbit } from "@/components/strategic-pillars-orbit";
import { siteConfig, thematicAreasWithStyle } from "@/lib/site";

function SectionTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-[#2e7d32] shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-white/10 dark:text-[#81c784] ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

function SectionHeader({
  tag,
  title,
  description,
}: {
  tag: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      <SectionTag>{tag}</SectionTag>
      <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#2e7d32] to-[#1b5e20]" />
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

export function HomeLanding() {
  return (
    <div className="bg-background text-foreground">
      <HomeHero />

      <AboutSection />

      <StrategicPillarsOrbit />

      <section id="thematic" className="scroll-mt-24 px-5 py-24 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            tag="What We Do"
            title="Thematic Areas of Focus"
            description="Seven key thematic areas drive our work, addressing emerging environmental challenges through innovation, research, and community engagement."
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {thematicAreasWithStyle.map((area, index) => (
              <article
                key={area.title}
                className={`overflow-hidden rounded-3xl border border-border bg-card shadow-md transition hover:-translate-y-2 hover:shadow-xl ${
                  index === 6 ? "lg:col-start-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-gradient-to-br ${area.gradient} p-8 text-left text-white`}
                >
                  <div className="pointer-events-none absolute -right-1/2 -top-1/2 h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                  <div className="relative">
                    <div className="mb-4 text-4xl font-bold opacity-30">{area.number}</div>
                    <h3 className="font-display text-xl font-bold leading-snug">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/90">{area.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="text-sm font-semibold text-[#2e7d32] hover:underline"
            >
              View all focus areas →
            </Link>
          </div>
        </div>
      </section>

      <section
        id="get-involved"
        className="scroll-mt-24 bg-cover bg-center px-5 py-28 text-center text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.65) 100%), url('${siteConfig.images.community}')`,
        }}
      >
        <div className="relative mx-auto max-w-3xl">
          <h2 className="font-display text-4xl font-bold drop-shadow-lg sm:text-5xl">
            Join Our Movement
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/95 sm:text-xl">
            Whether you&apos;re a researcher, community member, student, or
            organization, there are many ways to contribute to Nepal&apos;s environmental
            resilience.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1"
            >
              Become a Volunteer
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border-2 border-white/50 bg-white/15 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/25"
            >
              Research Internship
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-full border-2 border-white/50 bg-white/15 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/25"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
