import { seedTeamMembers } from "@/lib/content/seed";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types/team";

export function applySeedTeamPhoto(member: TeamMember): TeamMember {
  const seed = seedTeamMembers.find((item) => item.name === member.name);
  const seedPhoto = seed?.photo_url;
  const shouldUseSeedPhoto =
    seedPhoto &&
    (!member.photo_url ||
      member.photo_url.endsWith("/placeholder.jpg") ||
      member.photo_url.includes("/placeholder.jpg?"));

  return shouldUseSeedPhoto ? { ...member, photo_url: seedPhoto } : member;
}

function withSeedPhotos(members: TeamMember[]): TeamMember[] {
  return members.map(applySeedTeamPhoto);
}

export async function getTeamMembers(): Promise<{
  members: TeamMember[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed team data.",
    );
    return {
      members: seedTeamMembers,
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, slug, position, bio, photo_url, linkedin_url")
    .order("name");

  if (error) {
    console.warn(
      "Could not load team_members from Supabase. Falling back to seed data.",
      error.message,
    );
    return { members: seedTeamMembers, error: null };
  }

  const members = data ?? [];
  if (members.length === 0) {
    return { members: seedTeamMembers, error: null };
  }

  return { members: withSeedPhotos(members), error: null };
}

export async function getTeamMemberBySlug(
  slug: string,
): Promise<TeamMember | null> {
  const seed = seedTeamMembers.find((member) => member.slug === slug) ?? null;

  if (!isSupabaseConfigured()) {
    return seed;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, slug, position, bio, photo_url, linkedin_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return seed;
  }

  return applySeedTeamPhoto(data);
}
