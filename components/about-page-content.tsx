import Link from "next/link";

import { AboutMeshBackground } from "@/components/about-mesh-background";
import { AboutPageIntro } from "@/components/about-page-intro";
import { AboutPeopleMarquee } from "@/components/about-people-marquee";
import { aboutPageContent, aboutWhatWeDo, contactHref } from "@/lib/site";
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
      <AboutMeshBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 pt-24 pb-16 md:px-6 md:pt-28 md:pb-24">
        <AboutPageIntro
          title={aboutPageContent.title}
          whatWeDo={aboutWhatWeDo}
        />
        <AboutPeopleMarquee
          id="advisors"
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

        <div className="mx-auto mt-16 max-w-3xl text-center lg:mt-24">
          <h2 className="font-display text-3xl font-bold uppercase text-white lg:text-4xl">
            Partner organizations
          </h2>
          <p className="mt-4 text-white/70">
            We collaborate with universities, NGOs, and community groups on research,
            restoration, and capacity-building initiatives. Partner highlights will
            appear here soon.
          </p>
          <Link
            href={contactHref("partner")}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#2e7d32] to-[#1b5e20] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Partner with us
          </Link>
        </div>
      </div>
    </div>
  );
}
