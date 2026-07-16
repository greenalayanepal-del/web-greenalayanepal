"use client";

import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  speed?: number;
};

export function Marquee({
  children,
  pauseOnHover = false,
  direction = "left",
  speed = 40,
  className,
  style,
  ...props
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", pauseOnHover && "group/marquee", className)}
      style={{ "--duration": `${speed}s`, ...style } as CSSProperties}
      {...props}
    >
      <div
        className={cn(
          "flex w-max gap-[var(--gap,1.5rem)]",
          direction === "left" && "motion-safe:animate-marquee",
          direction === "right" && "motion-safe:animate-marquee-reverse",
          pauseOnHover && "[animation-play-state:running] group-hover/marquee:[animation-play-state:paused]",
        )}
      >
        {children}
        <div aria-hidden className="flex gap-[var(--gap,1.5rem)]">
          {children}
        </div>
      </div>
    </div>
  );
}
