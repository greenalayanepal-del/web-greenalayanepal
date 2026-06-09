/**
 * Verifies newsletter_subscribers exists after phase5.sql.
 * Usage: node --env-file=.env.local scripts/apply-phase5.mjs
 *
 * Table DDL must be applied once via supabase/phase5.sql in SQL Editor
 * (or Supabase CLI migrations). This script only checks connectivity.
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or run supabase/phase5.sql in the SQL Editor."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const { error } = await supabase
  .from("newsletter_subscribers")
  .select("id")
  .limit(1);

if (error) {
  if (error.code === "42P01" || error.message?.includes("does not exist")) {
    console.error(
      "Table newsletter_subscribers not found. Run supabase/phase5.sql in Supabase → SQL Editor, then re-run this script."
    );
    process.exit(1);
  }
  throw error;
}

console.log("newsletter_subscribers table is ready.");
