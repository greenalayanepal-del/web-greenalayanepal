"use client";

import { GradientTracing } from "@/components/gradient-tracing";
import { siteConfig } from "@/lib/site";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

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
      className="h-full rounded-2xl border border-white/25 bg-white/15 px-8 py-[17px] text-center shadow-lg backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20 hover:shadow-xl dark:border-white/15 dark:bg-white/8 dark:hover:bg-white/12"
    >
      <h4 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
        {title}
      </h4>
      <p className="mt-5 text-base leading-relaxed text-black dark:text-white">{children}</p>
    </div>
  );
}

export function AboutSection() {
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
    <section id="about" className="scroll-mt-24 px-5 pt-24 pb-[calc(6rem-30px)] lg:pt-28 lg:pb-[calc(7rem-30px)]">
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
                className="rounded-3xl border border-white/25 bg-white/15 px-8 py-[2px] shadow-lg backdrop-blur-md dark:border-white/15 dark:bg-white/8 sm:px-10 sm:py-[10px]"
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#2e7d32] sm:text-2xl">
                  {siteConfig.name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-black dark:text-white">
                  We work at the intersection of nature and technology, empowering communities
                  to conserve and restore ecosystems while fostering sustainable green innovative
                  enterprises in balance with nature.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-[calc(3rem+80px)] grid items-stretch gap-[calc(1.5rem+270px)] md:grid-cols-2 md:gap-[calc(2rem+270px)] lg:mt-[calc(4rem+80px)]">
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
    </section>
  );
}
