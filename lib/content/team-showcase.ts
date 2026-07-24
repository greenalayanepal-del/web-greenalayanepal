import { teamPhotoUrl } from "@/lib/content/team-photo";
import type { TeamMember } from "@/lib/types/team";

export type TeamShowcaseMember = {
  id: string;
  name: string;
  title: string | null;
  avatar: string;
  linkedinUrl?: string | null;
};

export function toTeamShowcaseMember(member: TeamMember): TeamShowcaseMember {
  return {
    id: member.id,
    name: member.name,
    title: member.position,
    avatar: teamPhotoUrl(member),
    linkedinUrl: member.linkedin_url,
  };
}
