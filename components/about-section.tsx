"use client";

import { GradientTracing } from "@/components/gradient-tracing";
import { siteConfig } from "@/lib/site";
import Image from "next/image";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
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

    const update = () => {
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

    update();
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

/** About is always dark-themed — frosted white glass. */
const glassCardSurface =
  "border border-white/15 bg-white/8 backdrop-blur-md";
const glassCardSurfaceHover = "hover:bg-white/12";

const glassCardShadow = "shadow-lg";
const glassCardShadowHover = "hover:shadow-xl";

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

function AboutBackground({ imageScale }: { imageScale: number }) {
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

function GlassInfoCard({
  title,
  children,
  cardRef,
}: {
  title: string;
  children: ReactNode;
  cardRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      ref={cardRef}
      className={`h-full rounded-2xl px-8 py-[17px] text-center transition hover:-translate-y-1 ${glassCardSurface} ${glassCardSurfaceHover} ${glassCardShadow} ${glassCardShadowHover}`}
    >
      <h4 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
        {title}
      </h4>
      <p className="mt-5 text-base leading-relaxed text-white">{children}</p>
    </div>
  );
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
    const update = () => {
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

    update();
    const resizeObserver = new ResizeObserver(update);
    [containerRef.current, sourceRef.current, missionRef.current, visionRef.current].forEach(
      (element) => {
        if (element) resizeObserver.observe(element);
      },
    );
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
    <section ref={sectionRef} id="about" className="dark relative scroll-mt-24 overflow-hidden">
      <AboutBackground imageScale={bgScale} />

      <div className="relative px-5 pt-24 pb-[calc(6rem-30px)] lg:pt-28 lg:pb-[calc(7rem-30px)]">
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

        <div className="translate-y-[30px]">
          <div className="relative z-10 mx-auto max-w-[548px] text-center">
            <div className="-mt-[70px] translate-x-[20px] translate-y-[10px]">
              <div
                ref={sourceRef}
                className={`rounded-3xl px-8 py-[2px] sm:px-10 sm:py-[10px] ${glassCardSurface} ${glassCardShadow}`}
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
                  {siteConfig.name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-white">
                  We work at the intersection of nature and technology, empowering communities
                  to conserve and restore ecosystems while fostering sustainable green innovative
                  enterprises in balance with nature.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-[calc(3rem+80px)] grid items-stretch gap-8 md:grid-cols-2 md:gap-[calc(2rem+270px)] lg:mt-[calc(4rem+80px)]">
            <div className="h-full min-h-0">
              <GlassInfoCard cardRef={missionRef} title="Our Mission">
                To generate credible environmental knowledge, advance community-centered
                conservation, and catalyze innovative eco-business solutions that protect
                biodiversity, strengthen local livelihoods, and influence sustainable development
                pathways in Nepal.
              </GlassInfoCard>
            </div>
            <div className="h-full min-h-0">
              <GlassInfoCard cardRef={visionRef} title="Our Vision">
                A resilient Nepal where empowered communities conserve ecosystems and foster
                sustainable green innovative enterprises in balance with nature and technology.
              </GlassInfoCard>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
