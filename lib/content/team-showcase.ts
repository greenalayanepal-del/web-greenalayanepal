import { teamPhotoUrl } from "@/lib/content/team-photo";
import type { TeamMember } from "@/lib/types/team";

export type TeamSocialKey = "github" | "linkedin" | "twitter";

export type TeamShowcaseMember = {
  id: string;
  name: string;
  title: string;
  avatar: string;
  socials: Partial<Record<TeamSocialKey, string>>;
};

function memberSocials(member: TeamMember): Partial<Record<TeamSocialKey, string>> {
  const socials: Partial<Record<TeamSocialKey, string>> = {};

  if (member.github_url) socials.github = member.github_url;
  if (member.linkedin_url) socials.linkedin = member.linkedin_url;
  if (member.twitter_url) socials.twitter = member.twitter_url;

  return socials;
}

export function toTeamShowcaseMember(member: TeamMember): TeamShowcaseMember {
  return {
    id: member.id,
    name: member.name,
    title: member.position ?? "Advisor",
    avatar: teamPhotoUrl(member),
    socials: memberSocials(member),
  };
}
