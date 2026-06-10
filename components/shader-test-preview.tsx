"use client";

import { HeroContent, ShaderBackground } from "@/components/shader-hero-demo";

export function ShaderTestPreview() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0f0a]">
      <ShaderBackground pinBackground className="min-h-screen">
        <HeroContent className="min-h-screen" />
      </ShaderBackground>
    </div>
  );
}
