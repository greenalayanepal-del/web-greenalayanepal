import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { DataError } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { seedTeamMembers } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types/team";

export const metadata = pageMetadata({
  title: "Team",
  description:
    "Researchers and leaders working on conservation, research, and sustainable development at Greenalaya Nepal.",
  path: "/team",
});

async function getTeam(): Promise<{
  members: TeamMember[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed team data."
    );
    return {
      members: [],
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("team_members")
    .select("id, name, slug, position, bio, photo_url")
    .order("name");

  if (error) {
    return { members: [], error: error.message };
  }

  return { members: data ?? [], error: null };
}

export default async function TeamPage() {
  const { members, error } = await getTeam();
  const displayMembers =
    !error && members.length === 0 ? seedTeamMembers : members;

  return (
    <PageShell
      title="Team"
      description="Researchers and staff working on conservation and sustainable development."
    >
      {error ? (
        <DataError message={error} />
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {displayMembers.map((member) => (
            <li key={member.id}>
              <ContentCard>
              <h2 className="text-xl font-semibold text-secondary-foreground">
                <Link href={`/team/${member.slug}`} className="hover:underline">
                  {member.name}
                </Link>
              </h2>
              {member.position ? (
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.position}
                </p>
              ) : null}
              {member.bio ? (
                <p className="mt-2 line-clamp-3 text-foreground">
                  {member.bio}
                </p>
              ) : null}
              </ContentCard>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
