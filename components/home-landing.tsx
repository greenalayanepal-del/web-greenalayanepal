import type { ReactNode } from "react";
import { AboutSection } from "@/components/about-section";
import { FooterStayAhead } from "@/components/footer-stay-ahead";
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
    <div className="mx-auto mb-5 max-w-3xl text-center sm:mb-6 lg:mb-16">
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
        className="relative scroll-mt-24 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a] px-4 pt-10 pb-16 sm:px-5 sm:pt-12 sm:pb-20 lg:px-5 lg:pt-[72px] lg:pb-28"
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
        <div className="relative z-10 mx-auto max-w-6xl lg:-mt-[30px]">
          <SectionHeader title="Thematic Areas" tone="dark" outlinedTitle />
          <ThematicAreasGrid />
        </div>
      </section>

      <FooterStayAhead />
    </div>
  );
}
