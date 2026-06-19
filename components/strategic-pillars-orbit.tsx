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
import { SectionFadeBridges } from "@/components/section-fade-bridges";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

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

const NODE_COUNT = TIMELINE_DATA.length;

/** Max orbit radius so every node + label stays inside the square at all rotation angles. */
function computeMaxOrbitRadius(
  width: number,
  height: number,
  nodeHalfWidth: number,
  nodeHalfHeight: number,
) {
  let maxRadius = Infinity;

  for (let index = 0; index < NODE_COUNT; index += 1) {
    const angle = ((index / NODE_COUNT) * 360 * Math.PI) / 180;
    const cos = Math.abs(Math.cos(angle));
    const sin = Math.abs(Math.sin(angle));

    if (cos > 0.01) {
      maxRadius = Math.min(maxRadius, (width / 2 - nodeHalfWidth) / cos);
    }
    if (sin > 0.01) {
      maxRadius = Math.min(maxRadius, (height / 2 - nodeHalfHeight) / sin);
    }
  }

  return Number.isFinite(maxRadius) ? maxRadius : width / 2 - nodeHalfWidth;
}

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
  const [orbitRadius, setOrbitRadius] = useState(200);
  const [autoRotate, setAutoRotate] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const sectionRef = useRef<HTMLElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orbitEl = orbitRef.current;
    if (!orbitEl) return;

    const updateRadius = () => {
      const rect = orbitEl.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const isCompact = window.matchMedia("(max-width: 1023px)").matches;
      // Icon + label footprint from each node center (matches mobile/desktop classes below).
      const nodeHalfWidth = isCompact ? 52 : 44;
      const nodeHalfHeight = isCompact ? 50 : 44;
      const maxRadius = computeMaxOrbitRadius(
        rect.width,
        rect.height,
        nodeHalfWidth,
        nodeHalfHeight,
      );
      const minRadius = isCompact ? 96 : 88;
      const radiusBoost = isCompact ? 20 : 0;

      setOrbitRadius(Math.max(minRadius, maxRadius - (isCompact ? 2 : 4) + radiusBoost));
    };

    updateRadius();
    const resizeObserver = new ResizeObserver(updateRadius);
    resizeObserver.observe(orbitEl);
    window.addEventListener("resize", updateRadius);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateRadius);
    };
  }, []);

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
    const radius = orbitRadius;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.max(30, Math.round(100 + 50 * Math.cos(radian)));
    return { x, y, zIndex };
  };

  return (
    <section
      ref={sectionRef}
      id="pillars"
      className="relative -mt-[8px] scroll-mt-24 overflow-x-clip bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a] text-white lg:min-h-[720px]"
    >
      <SectionFadeBridges targetRef={sectionRef} showTop showBottom />
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

      <div className="relative z-10 mx-auto grid max-w-7xl items-center justify-items-center gap-12 px-4 py-16 sm:gap-14 lg:grid-cols-2 lg:justify-items-stretch lg:gap-16 lg:py-20">
        <header className="w-full text-center lg:text-left">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#2196f3] uppercase [-webkit-text-stroke:2px_#000] [paint-order:stroke_fill] sm:text-4xl md:text-5xl">
            Strategic Pillars
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white sm:mt-6 sm:text-lg md:text-xl lg:mx-0">
            Five interconnected pillars guide all our initiatives, ensuring holistic and sustainable
            environmental solutions for Nepal.
          </p>
        </header>

        <div
          className="relative mx-auto w-full max-w-[min(calc(100vw-2rem),26rem)] sm:max-w-[min(calc(100vw-2rem),28rem)] lg:max-w-none lg:h-[min(680px,calc(100vh-200px))] lg:min-h-[680px]"
        >
          <div
            className="relative mx-auto aspect-square w-full overflow-visible lg:h-full lg:max-h-full"
            ref={orbitRef}
            style={{ perspective: "1000px" } as CSSProperties}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2e7d32]/15"
              style={{ width: orbitRadius * 2.4, height: orbitRadius * 2.4 }}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#4caf50]/20"
              style={{ width: orbitRadius * 1.6, height: orbitRadius * 1.6 }}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#4caf50]/25"
              style={{ width: orbitRadius * 1.3, height: orbitRadius * 1.3 }}
            />

            <div className="absolute left-1/2 top-1/2 z-10 flex h-[4.75rem] w-[4.75rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#2e7d32] via-[#4caf50] to-[#1b5e20] shadow-lg shadow-[#2e7d32]/40 lg:h-16 lg:w-16">
              <div className="absolute h-[5.5rem] w-[5.5rem] animate-ping rounded-full border border-[#4caf50]/40 opacity-70 lg:h-20 lg:w-20" />
              <div
                className="absolute h-[6.25rem] w-[6.25rem] animate-ping rounded-full border border-[#2e7d32]/30 opacity-50 lg:h-24 lg:w-24"
                style={{ animationDelay: "0.5s" }}
              />
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md lg:h-8 lg:w-8">
                <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#2e7d32] to-[#1b5e20]" />
              </div>
            </div>

            {TIMELINE_DATA.map((item, index) => {
              const position = calculateNodePosition(index, TIMELINE_DATA.length);
              const isExpanded = expandedItems[item.id];
              const Icon = item.icon;
              const accent = pillarAccent[item.iconKey];
              const auraSize = 64;
              const nodeSize = 56;

              return (
                <div
                  key={item.id}
                  data-pillar-node
                  className={`absolute left-1/2 top-1/2 cursor-pointer ${
                    autoRotate ? "" : "transition-transform duration-700 ease-out"
                  }`}
                  style={{
                    transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
                    zIndex: isExpanded ? 200 : position.zIndex,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleItem(item.id);
                  }}
                >
                  <div
                    className={`relative flex flex-col items-center ${isExpanded ? "gap-4" : "gap-2.5 sm:gap-3"}`}
                  >
                    <div className="relative">
                      <div
                        className="absolute rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${accent.from}40 0%, transparent 70%)`,
                          width: `${auraSize}px`,
                          height: `${auraSize}px`,
                          left: `-${(auraSize - nodeSize) / 2}px`,
                          top: `-${(auraSize - nodeSize) / 2}px`,
                        }}
                      />

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 lg:h-12 lg:w-12 ${
                          isExpanded
                            ? "scale-150 border-[#4caf50] bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] text-white shadow-lg shadow-[#2e7d32]/40"
                            : "border-[#4caf50] bg-[#0f1410] text-[#c8e6c9] hover:scale-110 hover:border-[#81c784]"
                        }`}
                        style={!isExpanded ? { borderColor: accent.from } : undefined}
                      >
                        <Icon className="size-5 lg:size-[18px]" />
                      </div>
                    </div>

                    <div
                      className={`max-w-[6rem] text-center text-[11px] font-semibold leading-tight tracking-wide uppercase transition-all duration-300 sm:text-xs sm:tracking-wider lg:max-w-none ${
                        isExpanded ? "scale-110 text-[#81c784] sm:scale-125" : "text-[#c8e6c9]"
                      }`}
                    >
                      {item.title}
                    </div>
                  </div>

                  {isExpanded && (
                    <Card className="absolute top-full left-1/2 mt-4 w-[min(18rem,calc(100vw-2rem))] max-h-[min(16rem,50vh)] -translate-x-1/2 overflow-y-auto p-5 text-center shadow-2xl shadow-[#0a0f0a]/60">
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
