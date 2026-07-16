import { seedSupportedBy } from "@/lib/content/seed";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Collaborator } from "@/lib/types/collaborator";

function normalizeSupportedBy(members: Collaborator[]): Collaborator[] {
  return seedSupportedBy.map((seed) => {
    const existing = members.find((member) => member.slug === seed.slug);
    if (!existing) {
      return seed;
    }

    const shouldUseSeedPhoto =
      seed.photo_url &&
      (!existing.photo_url || existing.photo_url.includes("partner-logo"));

    return shouldUseSeedPhoto
      ? { ...existing, name: seed.name, position: seed.position, photo_url: seed.photo_url }
      : { ...existing, name: seed.name, position: seed.position };
  });
}

export async function getSupportedBy(): Promise<{
  members: Collaborator[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return { members: seedSupportedBy, error: null };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("supported_by")
    .select("id, name, slug, position, bio, photo_url")
    .order("name");

  if (error) {
    console.warn(
      "Could not load supported_by from Supabase. Falling back to seed data.",
      error.message,
    );
    return { members: seedSupportedBy, error: null };
  }

  const members = data ?? [];
  if (members.length === 0) {
    return { members: seedSupportedBy, error: null };
  }

  return { members: normalizeSupportedBy(members), error: null };
}
