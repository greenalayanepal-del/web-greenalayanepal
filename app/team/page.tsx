import { DataError } from "@/components/data-status";
import { ModernTeamShowcase } from "@/components/modern-team-showcase";
import { getTeamMembers } from "@/lib/content/team";
import { toTeamShowcaseMember } from "@/lib/content/team-showcase";
import { pageMetadata } from "@/lib/seo";

const TEAM_TAGLINE =
  "Researchers and leaders working on conservation, research, and sustainable development at Greenalaya Nepal.";

export const metadata = pageMetadata({
  title: "Team",
  description: TEAM_TAGLINE,
  path: "/team",
});

export const revalidate = 300;

export default async function TeamPage() {
  const { members, error } = await getTeamMembers();

  return (
    <>
      {error ? (
        <div className="px-5 pt-28">
          <div className="mx-auto max-w-6xl">
            <DataError message={error} />
          </div>
        </div>
      ) : null}
      <ModernTeamShowcase
        tagline={TEAM_TAGLINE}
        teamMembers={members.map(toTeamShowcaseMember)}
      />
    </>
  );
}
