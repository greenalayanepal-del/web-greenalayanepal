"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { thematicAreasWithStyle } from "@/lib/site";
import { cn } from "@/lib/utils";

const secondRowColStart = ["lg:col-start-2", "lg:col-start-4", "lg:col-start-6"] as const;

export function ThematicAreasGrid() {
  return (
    <div className="grid gap-[45px] sm:grid-cols-2 lg:grid-cols-8 lg:gap-[49px]">
      {thematicAreasWithStyle.map((area, index) => (
        <GlowCard
          key={area.title}
          glowColor="green"
          customSize
          glassTone="black"
          backdropOpacity={0.25}
          className={cn(
            "mx-auto min-h-[190px] w-full lg:col-span-2",
            index >= 4 && secondRowColStart[index - 4],
          )}
        >
          <article className="relative z-10 flex h-full flex-col justify-end gap-[30px]">
            <p
              aria-hidden
              className="font-display text-4xl font-bold leading-none text-white sm:text-5xl"
            >
              {area.number}
            </p>
            <h3 className="font-display text-lg font-bold leading-snug text-white">
              {area.title}
            </h3>
          </article>
        </GlowCard>
      ))}
    </div>
  );
}
