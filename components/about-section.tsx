"use client";

import {
  AboutGlassCard,
  glassCardShadow,
  glassCardSurface,
} from "@/components/about-glass-card";
import { AboutMeshBackground } from "@/components/about-mesh-background";
import { GradientTracing } from "@/components/gradient-tracing";
import { SectionFadeBridges } from "@/components/section-fade-bridges";
import { aboutPageContent, siteConfig } from "@/lib/site";
import { rafThrottle } from "@/lib/utils";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

const BG_MAX_ZOOM = 0.15;
const BG_ZOOM_SCROLL_RANGE = 500;

function useScrollDirectionZoom(sectionRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);
  const zoomRef = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    lastScrollY.current = window.scrollY;
    const sensitivity = BG_MAX_ZOOM / BG_ZOOM_SCROLL_RANGE;

    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const delta = scrollY - lastScrollY.current;
      lastScrollY.current = scrollY;

      const rect = section.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView || delta === 0) return;

      zoomRef.current = Math.min(
        BG_MAX_ZOOM,
        Math.max(0, zoomRef.current + delta * sensitivity),
      );
      setScale(1 + zoomRef.current);
    };

    const update = rafThrottle(measure);

    measure();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [sectionRef]);

  return scale;
}

type Connector = {
  left: number;
  top: number;
  width: number;
  angle: number;
};

const CONNECTOR_STRIP_HEIGHT = 24;

function connectorStripStyle(connector: Connector): CSSProperties {
  return {
    left: connector.left,
    top: connector.top - CONNECTOR_STRIP_HEIGHT / 2,
    width: connector.width,
    height: CONNECTOR_STRIP_HEIGHT,
    transform: `rotate(${connector.angle}deg)`,
    transformOrigin: "0 50%",
  };
}

function measureConnector(
  container: DOMRect,
  from: DOMRect,
  to: DOMRect,
): Connector {
  const fromX = from.left + from.width / 2 - container.left;
  const fromY = from.bottom - container.top;
  const toX = to.left + to.width / 2 - container.left;
  const toY = to.top - container.top;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const width = Math.hypot(dx, dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return { left: fromX, top: fromY, width, angle };
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgScale = useScrollDirectionZoom(sectionRef);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const [connectors, setConnectors] = useState<{
    mission: Connector | null;
    vision: Connector | null;
  }>({ mission: null, vision: null });

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const source = sourceRef.current;
      const mission = missionRef.current;
      const vision = visionRef.current;
      if (!container || !source || !mission || !vision) return;

      if (window.innerWidth < 768) {
        setConnectors({ mission: null, vision: null });
        return;
      }

      const containerRect = container.getBoundingClientRect();
      setConnectors({
        mission: measureConnector(
          containerRect,
          source.getBoundingClientRect(),
          mission.getBoundingClientRect(),
        ),
        vision: measureConnector(
          containerRect,
          source.getBoundingClientRect(),
          vision.getBoundingClientRect(),
        ),
      });
    };

    const update = rafThrottle(measure);

    measure();
    const resizeObserver = new ResizeObserver(update);
    const observedElements = [
      containerRef.current,
      sourceRef.current,
      missionRef.current,
      visionRef.current,
    ].filter((element): element is HTMLDivElement => element !== null);

    observedElements.forEach((element) => {
      resizeObserver.observe(element);
    });
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update);
    };
  }, []);

  const connectorPath = (width: number) =>
    `M0,${CONNECTOR_STRIP_HEIGHT / 2} L${width},${CONNECTOR_STRIP_HEIGHT / 2}`;

  return (
    <section
      ref={sectionRef}
      id="about"
      className="dark relative -mt-[8px] scroll-mt-24 overflow-hidden"
    >
      <AboutMeshBackground imageScale={bgScale} />
      <SectionFadeBridges targetRef={sectionRef} showTop showBottom />

      <div className="relative px-5 pt-16 pb-12 md:pt-24 md:pb-[calc(6rem-30px)] lg:pt-28 lg:pb-[calc(7rem-30px)]">
      <div ref={containerRef} className="relative mx-auto max-w-6xl">
        {(connectors.mission || connectors.vision) && (
          <div className="pointer-events-none absolute inset-0 z-[5] hidden overflow-visible md:block">
            {connectors.mission && (
              <div className="absolute" style={connectorStripStyle(connectors.mission)}>
                <GradientTracing
                  width={connectors.mission.width}
                  height={CONNECTOR_STRIP_HEIGHT}
                  path={connectorPath(connectors.mission.width)}
                  strokeWidth={2.5}
                  animationDuration={2.5}
                />
              </div>
            )}
            {connectors.vision && (
              <div className="absolute" style={connectorStripStyle(connectors.vision)}>
                <GradientTracing
                  width={connectors.vision.width}
                  height={CONNECTOR_STRIP_HEIGHT}
                  path={connectorPath(connectors.vision.width)}
                  strokeWidth={2.5}
                  animationDuration={2.5}
                />
              </div>
            )}
          </div>
        )}

        <div className="md:translate-y-[30px]">
          <div className="relative z-10 flex flex-col gap-4 md:gap-0">
            <div className="relative z-10 mx-auto w-full max-w-[548px] text-center">
              <div className="md:-mt-[70px] md:translate-x-[20px] md:translate-y-[10px]">
                <div
                  ref={sourceRef}
                  className={`rounded-2xl px-5 py-4 sm:rounded-3xl sm:px-10 sm:py-[10px] ${glassCardSurface} ${glassCardShadow}`}
                >
                  <h3 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
                    {siteConfig.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-white sm:mt-5">
                    {aboutPageContent.intro[1]}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid items-stretch gap-4 md:mt-[calc(3rem+80px)] md:grid-cols-2 md:gap-[calc(2rem+270px)] lg:mt-[calc(4rem+80px)]">
              <div className="h-full min-h-0">
                <AboutGlassCard cardRef={missionRef} title="Our Mission">
                  {aboutPageContent.leadMission}
                </AboutGlassCard>
              </div>
              <div className="h-full min-h-0">
                <AboutGlassCard cardRef={visionRef} title="Our Vision">
                  {aboutPageContent.vision}
                </AboutGlassCard>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
