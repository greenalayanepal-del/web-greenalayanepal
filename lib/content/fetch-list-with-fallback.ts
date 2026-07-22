import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type FetchListWithFallbackOptions<Item> = {
  table: string;
  columns: string;
  orderColumn: string;
  ascending?: boolean;
  seed: Item[];
  label: string;
};

/**
 * Fetches a public content list from Supabase, falling back to seed data
 * whenever Supabase isn't configured, the query errors, or the table is
 * empty. Content pages on this site are public-facing, so showing seed
 * content is always preferable to a broken/empty page from a transient
 * database blip.
 */
export async function fetchListWithFallback<Item>({
  table,
  columns,
  orderColumn,
  ascending = true,
  seed,
  label,
}: FetchListWithFallbackOptions<Item>): Promise<Item[]> {
  if (!isSupabaseConfigured()) {
    console.warn(
      `Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed ${label} data.`,
    );
    return seed;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .order(orderColumn, { ascending });

  if (error) {
    console.warn(
      `Could not load ${label} from Supabase. Falling back to seed data.`,
      error.message,
    );
    return seed;
  }

  const items = (data ?? []) as Item[];
  if (items.length === 0) {
    return seed;
  }

  return items;
}
