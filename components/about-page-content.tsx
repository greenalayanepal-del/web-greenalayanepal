import Image from "next/image";

import { AboutPageIntro } from "@/components/about-page-intro";
import { AboutPeopleMarquee } from "@/components/about-people-marquee";
import { aboutPageContent, aboutWhatWeDo, siteConfig } from "@/lib/site";
import type { Collaborator } from "@/lib/types/collaborator";
import type { TeamMember } from "@/lib/types/team";

type AboutPageContentProps = {
  advisors: TeamMember[];
  advisorsError: string | null;
  supportedBy: Collaborator[];
  supportedByError: string | null;
  collaborators: Collaborator[];
  collaboratorsError: string | null;
};

function AboutPageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f0a] via-[#0f1610] to-[#0a0f0a]" />

      <div className="absolute inset-0">
        <Image
          src={siteConfig.images.aboutBackground}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50 contrast-[1.05] saturate-[1.08]"
        />
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

export function AboutPageContent({
  advisors,
  advisorsError,
  supportedBy,
  supportedByError,
  collaborators,
  collaboratorsError,
}: AboutPageContentProps) {
  return (
    <div className="dark relative min-h-screen overflow-hidden bg-[#0a0f0a] text-white">
      <AboutPageBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-16 md:px-6 md:pt-28 md:pb-24">
        <AboutPageIntro
          title={aboutPageContent.title}
          whatWeDo={aboutWhatWeDo}
        />
        <AboutPeopleMarquee
          direction="left"
          error={advisorsError}
          maxItems={5}
          members={advisors}
          photoSource="team"
          title="Advisors"
        />
        <AboutPeopleMarquee
          direction="left"
          error={supportedByError}
          logoUnoptimized
          logoImageSizes="160px"
          logoSizeClass="h-[140px] w-[140px] sm:h-[160px] sm:w-[160px]"
          members={supportedBy}
          loop={false}
          photoSource="collaborator"
          title="Supported by"
          variant="logo"
        />
        <AboutPeopleMarquee
          direction="right"
          error={collaboratorsError}
          members={collaborators}
          photoSource="collaborator"
          title="Collaborators"
          variant="logo"
        />
      </div>
    </div>
  );
}
