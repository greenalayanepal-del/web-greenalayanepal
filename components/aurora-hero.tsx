"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraHeroProps {
  title?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  children?: ReactNode;
}

const auroraGradient = `
  repeating-linear-gradient(100deg,
    #2e7d32 10%,
    #4caf50 15%,
    #1b5e20 20%,
    #81c784 25%,
    #1976d2 30%)
`;

const auroraShimmer = `
  repeating-linear-gradient(100deg,
    rgba(46, 125, 50, 0.12) 0%,
    rgba(46, 125, 50, 0.12) 7%,
    transparent 10%,
    transparent 12%,
    rgba(76, 175, 80, 0.12) 16%),
  repeating-linear-gradient(100deg,
    #2e7d32 10%,
    #4caf50 15%,
    #1b5e20 20%,
    #81c784 25%,
    #1976d2 30%)
`;

export function AuroraHero({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  children,
}: AuroraHeroProps) {
  const titleWords = title?.split(" ") || [];

  return (
    <section
      className={cn(
        "relative flex w-full min-h-screen items-center justify-center overflow-hidden bg-background",
        className
      )}
      role="banner"
      aria-label="Hero section"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 isolate overflow-hidden opacity-40 dark:opacity-30"
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-[-100%] blur-[80px]"
          style={{
            background: auroraGradient,
            backgroundSize: "300% 100%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-[-10px] opacity-70 mix-blend-soft-light"
          style={{
            background: auroraShimmer,
            backgroundSize: "200%, 100%",
            backgroundPosition: "50% 50%, 50% 50%",
          }}
          animate={{
            backgroundPosition: [
              "50% 50%, 50% 50%",
              "100% 50%, 150% 50%",
              "50% 50%, 50% 50%",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.55)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.75)_100%)]"
        aria-hidden="true"
      />

      {children ? (
        <div className="relative z-10 isolate w-full">{children}</div>
      ) : (
        <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="mx-auto max-w-5xl"
          >
            {title && (
              <h1 className="font-display mb-8 text-5xl font-bold tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
                {titleWords.map((word, wordIndex) => (
                  <span key={wordIndex} className="mb-2 mr-4 inline-block last:mr-0">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        initial={{
                          y: 100,
                          opacity: 0,
                          filter: "blur(8px)",
                        }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          filter: "blur(0px)",
                        }}
                        transition={{
                          delay: wordIndex * 0.1 + letterIndex * 0.03,
                          type: "spring",
                          stiffness: 100,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.2 },
                        }}
                        className="inline-block cursor-default bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent"
                        style={{
                          textShadow: "0 0 24px color-mix(in srgb, var(--primary) 35%, transparent)",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </h1>
            )}

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl md:text-2xl"
              >
                {description}
              </motion.p>
            )}

            {(primaryAction || secondaryAction) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                {primaryAction && (
                  <button
                    type="button"
                    onClick={primaryAction.onClick}
                    className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:text-lg"
                    aria-label={primaryAction.label}
                  >
                    {primaryAction.label}
                  </button>
                )}

                {secondaryAction && (
                  <button
                    type="button"
                    onClick={secondaryAction.onClick}
                    className="rounded-full bg-secondary px-8 py-4 text-base font-semibold text-secondary-foreground shadow-lg transition-all duration-300 hover:bg-secondary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-background sm:text-lg"
                    aria-label={secondaryAction.label}
                  >
                    {secondaryAction.label}
                  </button>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}
