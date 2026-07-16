import type { ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

/** About sections use frosted white glass on dark backgrounds. */
export const glassCardSurface = "border border-white/15 bg-white/8 backdrop-blur-md";
export const glassCardSurfaceHover = "hover:bg-white/12";
export const glassCardShadow = "shadow-lg";
export const glassCardShadowHover = "hover:shadow-xl";

type AboutGlassCardProps = {
  title?: string;
  children: ReactNode;
  cardRef?: Ref<HTMLDivElement>;
  className?: string;
  align?: "center" | "left";
};

export function AboutGlassCard({
  title,
  children,
  cardRef,
  className,
  align = "center",
}: AboutGlassCardProps) {
  return (
    <div
      ref={cardRef}
      className={cn(
        "h-full rounded-2xl px-5 py-4 transition hover:-translate-y-1 sm:px-8 sm:py-[17px]",
        glassCardSurface,
        glassCardSurfaceHover,
        glassCardShadow,
        glassCardShadowHover,
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {title ? (
        <h4 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
          {title}
        </h4>
      ) : null}
      <div
        className={cn(
          "text-base leading-relaxed text-white",
          title ? "mt-3 sm:mt-5" : undefined,
        )}
      >
        {children}
      </div>
    </div>
  );
}
