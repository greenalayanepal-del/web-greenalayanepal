import { seedAdvisors } from "@/lib/content/seed";
import type { TeamMember } from "@/lib/types/team";

export async function getAdvisors(): Promise<{
  members: TeamMember[];
  error: string | null;
}> {
  return { members: seedAdvisors, error: null };
}
