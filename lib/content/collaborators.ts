import { seedCollaborators } from "@/lib/content/seed";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Collaborator } from "@/lib/types/collaborator";

export async function getCollaborators(): Promise<{
  members: Collaborator[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed collaborator data.",
    );
    return {
      members: seedCollaborators,
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("collaborators")
    .select("id, name, slug, position, bio, photo_url")
    .order("name");

  if (error) {
    console.warn(
      "Could not load collaborators from Supabase. Falling back to seed data.",
      error.message,
    );
    return { members: seedCollaborators, error: null };
  }

  const members = data ?? [];
  if (members.length === 0) {
    return { members: seedCollaborators, error: null };
  }

  return { members, error: null };
}
