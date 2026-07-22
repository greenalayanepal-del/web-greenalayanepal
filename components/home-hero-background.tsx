"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SectionFadeBridges } from "@/components/section-fade-bridges";
import {
  computeParallaxTransform,
  PARALLAX_INITIAL_TRANSFORM,
} from "@/lib/scroll-parallax";
import { aboutPageContent, siteConfig } from "@/lib/site";
import { cn, rafThrottle } from "@/lib/utils";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeDown = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0 },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const heroButtonClass =
  "inline-flex min-h-12 items-center justify-center rounded-full px-8 text-[calc(18px-2px)] font-semibold no-underline transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none lg:text-[18px]";

const HERO_ACCENT = "text-[#7dd87f]";
const HERO_HEADLINE_MOBILE =
  "max-md:whitespace-nowrap max-md:text-[21px]";
const HERO_HEADLINE_TABLET =
  "md:max-lg:whitespace-nowrap md:max-lg:text-[24px]";
const HERO_HEADLINE_LINE_1_DESKTOP =
  "lg:text-[clamp(calc(2.25rem-10px),calc(6.2vw-10px),calc(4.25rem-10px))]";
const HERO_HEADLINE_LINE_2_DESKTOP = "lg:text-[clamp(2rem,6.2vw,68px)]";

function HeroHeadline() {
  return (
    <motion.h1
      className="font-display w-full text-balance"
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.85, ease: easeOut, delay: 0.35 }}
    >
      <span
        className={cn(
          "block font-bold leading-[1.08] tracking-[-0.03em] text-white/88",
          HERO_HEADLINE_MOBILE,
          HERO_HEADLINE_TABLET,
          HERO_HEADLINE_LINE_1_DESKTOP,
        )}
      >
        Building a <span className={HERO_ACCENT}>Resilient Nepal</span> Through
      </span>
      <span
        className={cn(
          "mt-4 block font-bold leading-[1.08] tracking-[-0.03em] text-white md:mt-5",
          HERO_HEADLINE_MOBILE,
          HERO_HEADLINE_TABLET,
          HERO_HEADLINE_LINE_2_DESKTOP,
        )}
      >
        <span className={HERO_ACCENT}>Data-Driven</span> Conservation
      </span>
    </motion.h1>
  );
}

function HeroOverlays() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,15,10,0.22) 0%, rgba(10,15,10,0.38) 38%, rgba(10,15,10,0.85) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 85% 60% at 50% 52%, rgba(0,0,0,0.6) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[3] motion-reduce:opacity-80 animate-[hero-mesh-pulse_8s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(76,175,80,0.08) 0%, transparent 50%)",
        }}
      />
    </>
  );
}

function HeroParallaxImage() {
  const [transform, setTransform] = useState(PARALLAX_INITIAL_TRANSFORM);

  useEffect(() => {
    const update = rafThrottle(() => {
      const viewportScale = window.visualViewport?.scale ?? 1;
      setTransform(computeParallaxTransform(window.scrollY, viewportScale));
    });

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  return (
    <Image
      src={siteConfig.images.communityHero}
      alt="Greenalaya Nepal team gathered outdoors for a group photo"
      fill
      priority
      quality={92}
      className="object-cover object-center opacity-[0.72] contrast-[1.06] saturate-[1.08] brightness-[1.04] transition-transform duration-150 ease-out will-change-transform"
      style={{ transform }}
      sizes="100vw"
    />
  );
}

export function HeroBackground({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className={cn("relative bg-[#0a0f0a]", className ?? "min-h-screen")}
    >
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#0a0f0a]">
        <HeroParallaxImage />
        <HeroOverlays />
      </div>

      <SectionFadeBridges targetRef={sectionRef} showTop={false} showBottom />

      <div className={cn("relative z-10 flex flex-col", className ?? "min-h-screen")}>
        {children}
      </div>
    </section>
  );
}

type HeroContentProps = {
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
};

export function HeroContent({
  primaryHref = siteConfig.url,
  secondaryHref = "/#get-involved",
  className,
}: HeroContentProps = {}) {
  const primaryExternal = primaryHref.startsWith("http");

  const scrollTarget = primaryHref.startsWith("#") ? primaryHref : "#thematic";

  return (
    <div
      className={cn(
        "relative flex min-h-full flex-col items-center justify-center px-5 text-center sm:px-8 md:px-12",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-4xl translate-y-[18px]">
        <motion.p
          className="mb-[31px] inline-flex items-center rounded-full border border-white/15 bg-black/40 px-5 py-2.5 text-[calc(17px-3px)] font-medium text-white/90 backdrop-blur-sm md:mb-[39px] md:px-6 lg:text-[17px]"
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: easeOut, delay: 0.15 }}
        >
          <span className="font-display text-[calc(1.125rem-3px)] font-semibold tracking-tight text-white lg:text-lg">
            {siteConfig.tagline}
          </span>
        </motion.p>

        <div className="mb-[31px] md:mb-[39px]">
          <HeroHeadline />
        </div>

        <motion.p
          className="mx-auto mb-[39px] max-w-2xl text-pretty text-[calc(19px-2px)] leading-[1.75] text-white/82 md:mb-[47px] md:max-lg:text-[calc(21px-2px)] md:leading-[1.8] lg:max-w-3xl lg:text-[21px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75, ease: easeOut, delay: 0.5 }}
        >
          {aboutPageContent.heroDescription}
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-[15px] sm:gap-[19px]"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.75, ease: easeOut, delay: 0.62 }}
          id="shader-hero-cta"
        >
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <Link
              href={primaryHref}
              {...(primaryExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                heroButtonClass,
                "bg-[#2e7d32] text-white shadow-[0_4px_24px_rgba(46,125,50,0.35)] hover:bg-[#256d28] hover:shadow-[0_6px_28px_rgba(46,125,50,0.45)]",
              )}
            >
              Explore Our Work
            </Link>
            <Link
              href={secondaryHref}
              className={cn(
                heroButtonClass,
                "border border-white/35 bg-white/8 text-white backdrop-blur-sm hover:border-[#4caf50]/60 hover:bg-white/12",
              )}
            >
              Get Involved
            </Link>
          </div>

          <Link
            href={scrollTarget}
            className="inline-flex translate-y-[17px] text-white/45 no-underline transition-colors duration-200 hover:text-white/75"
            aria-label="Scroll to explore our work"
          >
            <ChevronDown
              aria-hidden
              className="h-5 w-5 motion-reduce:animate-none animate-[hero-chevron-bounce_2s_ease-in-out_infinite]"
            />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
