/**
 * Applies supabase/phase4.sql when SUPABASE_SERVICE_ROLE_KEY is set.
 * Usage: node scripts/apply-phase4.mjs
 *
 * Alternative: paste supabase/phase4.sql into Supabase → SQL Editor.
 */
import { readFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, or run supabase/phase4.sql in the SQL Editor."
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

const pdfUrl =
  "https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf";

const steps = [
  async () => {
    const { error } = await supabase
      .from("research")
      .update({ pdf_url: pdfUrl })
      .eq("slug", "butterfly-images-kathmandu-valley");
    if (error) throw error;
    console.log("Updated butterfly pdf_url");
  },
  async () => {
    const { error } = await supabase.from("team_members").upsert(
      {
        name: "Siddartha Sapkota",
        slug: "siddartha-sapkota",
        position: "Founding Board Member",
        bio: "Supports Greenalaya Nepal's governance and strategic direction, linking conservation research with community-centered environmental action across Nepal.",
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
    console.log("Upserted team member");
  },
  async () => {
    const { error } = await supabase.from("news").upsert(
      [
        {
          title: "Butterfly Images of Kathmandu Valley — publication released",
          slug: "butterfly-images-kathmandu-valley-released",
          excerpt:
            "Our photographic guide documenting 174 butterfly species in the Kathmandu Valley is now available as a free PDF.",
          content:
            "Greenalaya Nepal has published Butterfly Images of Kathmandu Valley, a visual reference documenting 174 butterfly species observed across seasons and habitats in the valley. The publication supports researchers, conservation practitioners, educators, and nature enthusiasts working on urban biodiversity in Nepal.\n\nDownload the PDF from our Resources page or the Research section.",
          published_at: "2026-04-21",
        },
        {
          title: "Greenalaya Nepal — research and innovation for nature",
          slug: "greenalaya-nepal-launch",
          excerpt:
            "We are building a national platform that connects conservation with research, technology, and sustainable enterprise.",
          content:
            "Greenalaya Nepal is a national environmental organization focused on credible science, community-centered conservation, and green enterprise. Our work spans emerging environmental research, ecosystem restoration, climate and pollution action, environmental technology, capacity building, and science-based policy.\n\nWe welcome collaborations with researchers, communities, students, and partner organizations. Reach us through the contact page to volunteer, intern, or explore partnerships.",
          published_at: "2026-04-13",
        },
      ],
      { onConflict: "slug" }
    );
    if (error) throw error;
    console.log("Upserted news posts");
  },
  async () => {
    const { error } = await supabase.from("projects").upsert(
      {
        title: "Kathmandu Valley Butterfly Documentation",
        slug: "kathmandu-valley-butterfly-documentation",
        description:
          "A field documentation initiative cataloguing butterfly diversity across the Kathmandu Valley, producing open reference material for research, education, and urban biodiversity conservation.",
      },
      { onConflict: "slug" }
    );
    if (error) throw error;
    console.log("Upserted flagship project");
  },
];

for (const step of steps) {
  await step();
}

console.log("Phase 4 content applied.");
