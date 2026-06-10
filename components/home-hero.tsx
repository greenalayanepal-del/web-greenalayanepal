"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraHero } from "@/components/aurora-hero";
import { siteConfig } from "@/lib/site";

function AnimatedLetters({
  text,
  className,
  delayOffset = 0,
}: {
  text: string;
  className?: string;
  delayOffset?: number;
}) {
  return (
    <>
      {text.split("").map((letter, index) => (
        <motion.span
          key={`${text}-${index}`}
          initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            delay: delayOffset + index * 0.025,
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
          className={className}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </>
  );
}

export function HomeHero() {
  return (
    <AuroraHero className="min-h-[calc(100vh-5rem)] px-5 pt-20 text-center lg:min-h-[calc(100vh-6.25rem)] lg:pt-24">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-background/20 px-6 py-2.5 text-sm font-semibold text-foreground backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
          {siteConfig.tagline}
        </motion.div>

        <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
          <span className="inline-block text-foreground">
            <AnimatedLetters text="Building a " delayOffset={0.1} />
          </span>
          <span className="inline-block bg-gradient-to-br from-[#81c784] via-[#4caf50] to-[#2e7d32] bg-clip-text text-transparent">
            <AnimatedLetters text="Resilient Nepal" delayOffset={0.35} />
          </span>
          <span className="mt-2 inline-block text-foreground">
            <AnimatedLetters text="Through Data-Driven Conservation" delayOffset={0.7} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          Greenalaya Nepal leverages research, technological innovation, and green
          enterprise to deliver data-driven solutions for resilient ecosystems
          through collaboration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="#thematic"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-10 py-4 text-sm font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Explore Our Work
          </Link>
          <Link
            href="#get-involved"
            className="inline-flex items-center gap-3 rounded-full border-2 border-primary/40 bg-background/40 px-10 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-background/60"
          >
            Join as Citizen Scientist
          </Link>
        </motion.div>
      </div>

      <Link
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition hover:text-foreground"
        aria-label="Scroll to about section"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8 animate-bounce" aria-hidden>
          <path fill="currentColor" d="M12 16.5 6 10.5l1.4-1.4 4.6 4.6 4.6-4.6L18 10.5z" />
        </svg>
      </Link>
    </AuroraHero>
  );
}
