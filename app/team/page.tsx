import Link from "next/link";
import { DataError, EmptyState } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/types/team";

async function getTeam(): Promise<{
  members: TeamMember[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return {
      members: [],
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
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

  return (
    <PageShell
      title="Team"
      description="Researchers and staff working on conservation and sustainable development."
    >
      {error ? (
        <DataError message={error} />
      ) : members.length === 0 ? (
        <EmptyState message="No team members yet. Run supabase/schema.sql in the Supabase SQL Editor." />
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2">
          {members.map((member) => (
            <li
              key={member.id}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <h2 className="text-xl font-semibold text-emerald-900">
                <Link href={`/team/${member.slug}`} className="hover:underline">
                  {member.name}
                </Link>
              </h2>
              {member.position ? (
                <p className="mt-1 text-sm font-medium text-emerald-800">
                  {member.position}
                </p>
              ) : null}
              {member.bio ? (
                <p className="mt-2 line-clamp-3 text-neutral-700">
                  {member.bio}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
