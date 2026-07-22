import Image from "next/image";

import { siteConfig } from "@/lib/site";

export function AboutMeshBackground({ imageScale = 1 }: { imageScale?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a]" />

      <div
        className="absolute inset-0 origin-top transition-transform duration-150 ease-out will-change-transform motion-reduce:transform-none"
        style={{ transform: `scale(${imageScale.toFixed(4)})` }}
      >
        <div className="relative h-full w-full">
          <Image
            src={siteConfig.images.aboutBackground}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-50 contrast-[1.05] saturate-[1.08]"
          />
        </div>
      </div>

      <div
        className="absolute inset-0 motion-reduce:opacity-90 motion-safe:animate-[hero-mesh-pulse_10s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 32%, rgba(76,175,80,0.14) 0%, transparent 68%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 72% at 50% 40%, transparent 38%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a]/70 via-transparent to-[#0f1410]" />

      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(76,175,80,0.06)_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
    </div>
  );
}
