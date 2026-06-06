/**
 * One-off: updates research.pdf_url in Supabase when SUPABASE_SERVICE_ROLE_KEY is set.
 * Usage: SUPABASE_SERVICE_ROLE_KEY=... node scripts/update-butterfly-db-url.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const pdfUrl =
  "https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf";

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to run this script."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);
const { error } = await supabase
  .from("research")
  .update({ pdf_url: pdfUrl })
  .eq("slug", "butterfly-images-kathmandu-valley");

if (error) {
  console.error("Update failed:", error.message);
  process.exit(1);
}

console.log("Updated butterfly research pdf_url to", pdfUrl);
