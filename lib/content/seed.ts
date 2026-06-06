import type { NewsPost } from "@/lib/types/news";
import type { TeamMember } from "@/lib/types/team";

/** Shown when Supabase has no rows yet. Mirrors supabase/phase4.sql. */
export const seedTeamMembers: TeamMember[] = [
  {
    id: "seed-siddartha-sapkota",
    name: "Siddartha Sapkota",
    slug: "siddartha-sapkota",
    position: "Founding Board Member",
    bio: "Supports Greenalaya Nepal's governance and strategic direction, linking conservation research with community-centered environmental action across Nepal.",
    photo_url: null,
  },
];

export function getSeedTeamMember(slug: string): TeamMember | null {
  return seedTeamMembers.find((member) => member.slug === slug) ?? null;
}

export function getSeedNewsPost(slug: string): NewsPost | null {
  return seedNewsPosts.find((post) => post.slug === slug) ?? null;
}

export const seedNewsPosts: NewsPost[] = [
  {
    id: "seed-butterfly-publication",
    title: "Butterfly Images of Kathmandu Valley — publication released",
    slug: "butterfly-images-kathmandu-valley-released",
    excerpt:
      "Our photographic guide documenting 174 butterfly species in the Kathmandu Valley is now available as a free PDF.",
    content:
      "Greenalaya Nepal has published Butterfly Images of Kathmandu Valley, a visual reference documenting 174 butterfly species observed across seasons and habitats in the valley. The publication supports researchers, conservation practitioners, educators, and nature enthusiasts working on urban biodiversity in Nepal.\n\nDownload the PDF from our Resources page or the Research section.",
    featured_image_url: null,
    published_at: "2026-04-21T00:00:00.000Z",
  },
  {
    id: "seed-org-launch",
    title: "Greenalaya Nepal — research and innovation for nature",
    slug: "greenalaya-nepal-launch",
    excerpt:
      "We are building a national platform that connects conservation with research, technology, and sustainable enterprise.",
    content:
      "Greenalaya Nepal is a national environmental organization focused on credible science, community-centered conservation, and green enterprise. Our work spans emerging environmental research, ecosystem restoration, climate and pollution action, environmental technology, capacity building, and science-based policy.\n\nWe welcome collaborations with researchers, communities, students, and partner organizations. Reach us through the contact page to volunteer, intern, or explore partnerships.",
    featured_image_url: null,
    published_at: "2026-04-13T00:00:00.000Z",
  },
];
