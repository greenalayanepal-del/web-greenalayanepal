"use client";

import { siteConfig, strategicPillars } from "@/lib/site";
import {
  FlaskConical,
  Leaf,
  Monitor,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type PillarIconKey = (typeof strategicPillars)[number]["icon"];

type TimelineItem = {
  id: number;
  title: string;
  content: string;
  icon: LucideIcon;
  iconKey: PillarIconKey;
};

const pillarIcons: Record<PillarIconKey, LucideIcon> = {
  people: User,
  technology: Monitor,
  research: FlaskConical,
  nature: Leaf,
  collaboration: Users,
};

const pillarAccent: Record<PillarIconKey, { from: string; to: string }> = {
  people: { from: "#2e7d32", to: "#1b5e20" },
  technology: { from: "#1976d2", to: "#0d47a1" },
  research: { from: "#d4a574", to: "#a67c52" },
  nature: { from: "#4caf50", to: "#2e7d32" },
  collaboration: { from: "#2196f3", to: "#1976d2" },
};

const TIMELINE_DATA: TimelineItem[] = strategicPillars.map((pillar, index) => ({
  id: index + 1,
  title: pillar.title,
  content: pillar.description,
  icon: pillarIcons[pillar.icon],
  iconKey: pillar.icon,
}));

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-[#4caf50]/25 bg-[#161c17]/95 text-white shadow-lg shadow-[#0a0f0a]/50 backdrop-blur-lg ${className}`}
    >
      {children}
    </div>
  );
}

export function StrategicPillarsOrbit() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  const centerViewOnNode = (nodeId: number) => {
    const nodeIndex = TIMELINE_DATA.findIndex((item) => item.id === nodeId);
    const totalNodes = TIMELINE_DATA.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(270 - targetAngle);
  };

  const hasExpanded = Object.values(expandedItems).some(Boolean);

  const collapseExpanded = useCallback(() => {
    setExpandedItems({});
    setAutoRotate(true);
  }, []);

  useEffect(() => {
    if (!hasExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("[data-pillar-node]")) return;
      collapseExpanded();
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [hasExpanded, collapseExpanded]);

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key, 10) !== id) newState[parseInt(key, 10)] = false;
      });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        setAutoRotate(true);
      }
      return newState;
    });
  };

  useEffect(() => {
    if (!autoRotate) return;

    const rotationTimer = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
    }, 50);

    return () => clearInterval(rotationTimer);
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    return { x, y, zIndex };
  };

  return (
    <section
      id="pillars"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a] text-white lg:min-h-[720px]"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${siteConfig.images.foundationBackground}')` }}
          aria-hidden
        />
        <div
          className="absolute inset-0 motion-reduce:opacity-90 motion-safe:animate-[hero-mesh-pulse_10s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 70% 65% at 72% 45%, rgba(76,175,80,0.16) 0%, transparent 68%)",
          }}
        />
        <div className="absolute top-1/3 left-0 h-80 w-80 rounded-full bg-[#2e7d32]/10 blur-3xl" />
        <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-[#4caf50]/12 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(76,175,80,0.06)_0%,transparent_50%,rgba(0,0,0,0.2)_100%)]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-12 lg:py-20">
        <header className="translate-y-5 text-center lg:text-left">
          <h2 className="font-display text-4xl font-bold tracking-tight text-[#2196f3] uppercase [-webkit-text-stroke:2px_#000] [paint-order:stroke_fill] md:text-5xl">
            Strategic Pillars
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-white md:text-xl lg:mx-0">
            Five interconnected pillars guide all our initiatives, ensuring holistic and sustainable
            environmental solutions for Nepal.
          </p>
        </header>

        <div
          className="relative flex h-[min(520px,70vw)] w-full translate-y-[35px] items-center justify-center sm:h-[min(580px,65vw)] lg:h-[min(640px,calc(100vh-200px))]"
          ref={containerRef}
        >
          <div
            className="relative flex h-full w-full max-w-lg items-center justify-center lg:max-w-none"
            ref={orbitRef}
            style={{ perspective: "1000px" }}
          >
            <div className="absolute h-[520px] w-[520px] rounded-full border border-[#2e7d32]/15" />
            <div className="absolute h-[420px] w-[420px] rounded-full border border-[#4caf50]/20" />
            <div className="absolute h-[320px] w-[320px] rounded-full border border-dashed border-[#4caf50]/25" />

            <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2e7d32] via-[#4caf50] to-[#1b5e20] shadow-lg shadow-[#2e7d32]/40">
              <div className="absolute h-20 w-20 animate-ping rounded-full border border-[#4caf50]/40 opacity-70" />
              <div
                className="absolute h-24 w-24 animate-ping rounded-full border border-[#2e7d32]/30 opacity-50"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-md">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20]" />
              </div>
            </div>

            {TIMELINE_DATA.map((item, index) => {
              const position = calculateNodePosition(index, TIMELINE_DATA.length);
              const isExpanded = expandedItems[item.id];
              const Icon = item.icon;
              const accent = pillarAccent[item.iconKey];
              const auraSize = 56;

              return (
                <div
                  key={item.id}
                  data-pillar-node
                  className={`absolute cursor-pointer ${
                    autoRotate ? "" : "transition-transform duration-700 ease-out"
                  }`}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    zIndex: isExpanded ? 200 : position.zIndex,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <div
                    className={`relative flex flex-col items-center ${isExpanded ? "gap-5" : "gap-3"}`}
                  >
                    <div className="relative">
                      <div
                        className="absolute rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${accent.from}40 0%, transparent 70%)`,
                          width: `${auraSize}px`,
                          height: `${auraSize}px`,
                          left: `-${(auraSize - 40) / 2}px`,
                          top: `-${(auraSize - 40) / 2}px`,
                        }}
                      />

                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                          isExpanded
                            ? "scale-150 border-[#4caf50] bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white shadow-lg shadow-[#2e7d32]/40"
                            : "border-[#4caf50] bg-[#0f1410] text-[#c8e6c9] hover:scale-110 hover:border-[#81c784]"
                        }`}
                        style={!isExpanded ? { borderColor: accent.from } : undefined}
                      >
                        <Icon size={18} />
                      </div>
                    </div>

                    <div
                      className={`text-center text-xs font-semibold tracking-wider whitespace-nowrap uppercase transition-all duration-300 ${
                        isExpanded ? "scale-125 text-[#81c784]" : "text-[#c8e6c9]"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>

                  {isExpanded && (
                    <Card className="absolute top-full left-1/2 mt-4 w-72 -translate-x-1/2 overflow-visible p-5 text-center shadow-2xl shadow-[#0a0f0a]/60">
                      <div
                        className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2"
                        style={{
                          background: `linear-gradient(to bottom, ${accent.from}, transparent)`,
                        }}
                      />
                      <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                      <p className="mt-3 text-base leading-relaxed text-white/80">{item.content}</p>
                    </Card>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
