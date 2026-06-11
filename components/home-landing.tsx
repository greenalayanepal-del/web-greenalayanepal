import Link from "next/link";
import type { ReactNode } from "react";
import { AboutSection } from "@/components/about-section";
import { HomeHero } from "@/components/home-hero";
import {
  siteConfig,
  strategicPillars,
  thematicAreasWithStyle,
} from "@/lib/site";

const pillarIconGradients = [
  "from-[#2e7d32] to-[#1b5e20]",
  "from-[#1976d2] to-[#0d47a1]",
  "from-[#d4a574] to-[#a67c52]",
  "from-[#4caf50] to-[#2e7d32]",
  "from-[#2196f3] to-[#1976d2]",
] as const;

function PillarIcon({ type }: { type: (typeof strategicPillars)[number]["icon"] }) {
  const paths: Record<(typeof strategicPillars)[number]["icon"], ReactNode> = {
    people: (
      <path
        fill="currentColor"
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
      />
    ),
    technology: (
      <path
        fill="currentColor"
        d="M4 6h16v12H4V6Zm2 2v8h12V8H6Zm2 2h8v4H8v-4Z"
      />
    ),
    research: (
      <path
        fill="currentColor"
        d="M9 3h6v2h-1v3.17A5 5 0 0 1 18 13v6H6v-6a5 5 0 0 1 4-4.83V5H9V3Zm2 4.58V5h2v2.58A3 3 0 0 0 11 11v6h2v-6a3 3 0 0 0-2-3.42Z"
      />
    ),
    nature: (
      <path
        fill="currentColor"
        d="M12 3c-1.5 2.5-4 4.5-4 8a4 4 0 0 0 8 0c0-3.5-2.5-5.5-4-8Zm0 14a6 6 0 0 1-6-6c0-2.2 1.2-4 2.6-5.8C10.2 7.8 11 9.2 12 11c1-1.8 1.8-3.2 3.4-5.8C16.8 7 18 8.8 18 11a6 6 0 0 1-6 6Z"
      />
    ),
    collaboration: (
      <path
        fill="currentColor"
        d="M16 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-8 0a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.67 0-8 1.34-8 4v2h9.1a5.9 5.9 0 0 1 .9-3.1 6 6 0 0 1 1.1-1.9H8Zm8 0a5.9 5.9 0 0 0-4.3 1.8A5.9 5.9 0 0 0 11 19H24v-2c0-2.66-5.33-4-8-4Z"
      />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden>
      {paths[type]}
    </svg>
  );
}

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

      <section
        id="pillars"
        className="scroll-mt-24 bg-gradient-to-b from-neutral-100 to-white px-5 py-24 lg:py-28"
      >
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            tag="Our Foundation"
            title="Core Strategic Pillars"
            description="Five interconnected pillars guide all our initiatives, ensuring holistic and sustainable environmental solutions for Nepal."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {strategicPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-sm transition hover:-translate-y-3 hover:shadow-xl"
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#2e7d32] to-[#1b5e20] transition group-hover:scale-x-100" />
                <div
                  className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${pillarIconGradients[index]} text-white shadow-lg`}
                >
                  <PillarIcon type={pillar.icon} />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
