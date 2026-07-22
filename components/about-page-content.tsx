import { AboutMeshBackground } from "@/components/about-mesh-background";
import { AboutPageIntro } from "@/components/about-page-intro";
import { AboutPeopleMarquee } from "@/components/about-people-marquee";
import { aboutPageContent, aboutWhatWeDo } from "@/lib/site";
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
