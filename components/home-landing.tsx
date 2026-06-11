import Link from "next/link";
import type { ReactNode } from "react";
import { AboutSection } from "@/components/about-section";
import { HomeHero } from "@/components/home-hero";
import { StrategicPillarsOrbit } from "@/components/strategic-pillars-orbit";
import { ThematicAreasGrid } from "@/components/thematic-areas-grid";
import { siteConfig } from "@/lib/site";

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
  tone = "light",
  outlinedTitle = false,
}: {
  tag?: ReactNode;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  outlinedTitle?: boolean;
}) {
  const isDark = tone === "dark";

  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {tag ? <SectionTag>{tag}</SectionTag> : null}
      <h2
        className={
          outlinedTitle
            ? "font-display text-4xl font-bold tracking-tight text-[#4caf50] uppercase [-webkit-text-stroke:1px_#000] [paint-order:stroke_fill] md:text-5xl"
            : `font-display text-3xl font-bold sm:text-4xl lg:text-5xl ${
                isDark ? "text-white" : "text-foreground"
              }`
        }
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-6 text-lg leading-relaxed ${
            isDark ? "text-white/65" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function HomeLanding() {
  return (
    <div className="bg-background text-foreground">
      <HomeHero />

      <AboutSection />

      <StrategicPillarsOrbit />

      <section
        id="thematic"
        className="relative scroll-mt-24 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a] px-5 pt-14 pb-24 lg:pt-[72px] lg:pb-28"
      >
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
        <div className="relative z-10 mx-auto -mt-[30px] max-w-6xl">
          <SectionHeader title="Thematic Areas" tone="dark" outlinedTitle />
          <ThematicAreasGrid />
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
