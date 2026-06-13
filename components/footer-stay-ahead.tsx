"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const involvementTabs = [
  {
    label: "Become a Volunteer",
    href: "/contact",
    variant: "cool" as const,
  },
  {
    label: "Research Internship",
    href: "/contact",
    variant: "outlineLight" as const,
  },
  {
    label: "Partner With Us",
    href: "/contact",
    variant: "outlineLight" as const,
  },
];

const carouselImages = siteConfig.images.footerCarousel;

const carouselImageAlts = [
  "Greenalaya Nepal team with butterfly research materials outdoors",
  "Greenalaya Nepal team meeting and collaboration",
  "Nature photographers documenting biodiversity in the field",
  "Greenalaya Nepal field education and conservation outreach",
] as const;

function FooterImageCarousel() {
  const [index, setIndex] = useState(0);
  const count = carouselImages.length;

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const prevIndex = (index - 1 + count) % count;
  const nextIndex = (index + 1) % count;

  return (
    <div className="ml-[15px] flex w-full items-center justify-center gap-3 sm:gap-4">
      <button
        type="button"
        onClick={prev}
        aria-label="Previous image"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div className="relative h-[220px] w-full max-w-md sm:h-[260px] lg:h-[280px]">
        <div
          aria-hidden
          className="absolute left-0 top-3 z-0 h-[88%] w-[18%] overflow-hidden rounded-2xl opacity-50"
        >
          <Image
            src={carouselImages[prevIndex]}
            alt=""
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
        <div
          aria-hidden
          className="absolute right-0 top-3 z-0 h-[88%] w-[18%] overflow-hidden rounded-2xl opacity-50"
        >
          <Image
            src={carouselImages[nextIndex]}
            alt=""
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
        <div className="relative z-10 mx-auto h-full w-[72%] overflow-hidden rounded-2xl shadow-2xl shadow-black/40 ring-1 ring-white/10">
          <Image
            src={carouselImages[index]}
            alt={carouselImageAlts[index]}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 320px, 400px"
            priority
          />
        </div>
      </div>

      <button
        type="button"
        onClick={next}
        aria-label="Next image"
        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function FooterStayAhead() {
  return (
    <section
      id="get-involved"
      className="scroll-mt-24 bg-[#0a0f0a] text-white"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center lg:text-left">
            <h2 className="text-balance font-display text-[clamp(1.35rem,6vw,2.4375rem)] font-bold tracking-tight">
              Stay ahead with {siteConfig.name}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white lg:mx-0">
              Join researchers, communities, and organizations
              <br className="sm:hidden" />
              {" "}who trust {siteConfig.name}
              <br className="sm:hidden" />
              {" "}for evidence-based conservation and environmental action across
              Nepal.
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              {involvementTabs.map((tab) => (
                <Button
                  key={tab.label}
                  asChild
                  variant={tab.variant}
                  size="pill"
                  className="w-full shrink-0 no-underline sm:w-auto"
                >
                  <Link href={tab.href}>{tab.label}</Link>
                </Button>
              ))}
            </div>
          </div>

          <FooterImageCarousel />
        </div>
      </div>
    </section>
  );
}
