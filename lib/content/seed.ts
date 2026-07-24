import type { Collaborator } from "@/lib/types/collaborator";
import type { NewsPost } from "@/lib/types/news";
import type { Project } from "@/lib/types/project";
import type { Research } from "@/lib/types/research";
import type { TeamMember } from "@/lib/types/team";
import { butterflyPublication } from "@/lib/site";

/** Shown when Supabase has no rows yet. Mirrors supabase/phase4.sql. */
export const seedTeamMembers: TeamMember[] = [
  {
    id: "seed-nabin-sapkota",
    name: "Nabin Sapkota",
    slug: "nabin-sapkota",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
    linkedin_url: "https://www.linkedin.com/in/nabin1sapkota/",
  },
  {
    id: "seed-binit-timalsina",
    name: "Binit Timalsina",
    slug: "binit-timalsina",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-siddhartha-sapkota",
    name: "Siddhartha Sapkota",
    slug: "siddhartha-sapkota",
    position: null,
    bio: "Supports Greenalaya Nepal's governance and strategic direction, linking conservation research with community-centered environmental action across Nepal.",
    photo_url: "/images/team/siddartha-sapkota.jpg",
  },
  {
    id: "seed-binay-dhakal",
    name: "Binay Dhakal",
    slug: "binay-dhakal",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-nirjal-sapkota",
    name: "Nirjal Sapkota",
    slug: "nirjal-sapkota",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-shreejana-bajracharya",
    name: "Shreejana Bajracharya",
    slug: "shreejana-bajracharya",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-rajib-sedhain",
    name: "Rajib Sedhain",
    slug: "rajib-sedhain",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-sarita-pokhrel",
    name: "Sarita Pokhrel",
    slug: "sarita-pokhrel",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-aashish-shrestha",
    name: "Aashish Shrestha",
    slug: "aashish-shrestha",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-negma-shakya",
    name: "Negma Shakya",
    slug: "negma-shakya",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-madhav-upadhya",
    name: "Madhav Upadhya",
    slug: "madhav-upadhya",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-pritam-thapa",
    name: "Pritam Thapa",
    slug: "pritam-thapa",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
];

/**
 * Scientific advisors shown on About and /advisors — a separate roster from
 * the team page, kept independent so the two lists never overlap.
 */
export const seedAdvisors: TeamMember[] = [
  {
    id: "seed-mahendra-singh-limbu",
    name: "Mahendra Singh Limbu",
    slug: "mahendra-singh-limbu",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-ruman-shrestha",
    name: "Ruman Shrestha",
    slug: "ruman-shrestha",
    position: null,
    bio: null,
    photo_url: "/images/team/team-group.png",
  },
  {
    id: "seed-prasanna-shrestha",
    name: "Prasanna Shrestha",
    slug: "prasanna-shrestha",
    position: null,
    bio: null,
    photo_url: "/images/team/prasanna-shrestha.jpg",
  },
];

export function getSeedTeamMember(slug: string): TeamMember | null {
  return seedTeamMembers.find((member) => member.slug === slug) ?? null;
}

/** Shown when Supabase supported_by table has no rows yet. */
export const seedSupportedBy: Collaborator[] = [
  {
    id: "seed-idea-wild",
    name: "IDEA WILD",
    slug: "idea-wild",
    position: "Conservation partner",
    bio: null,
    photo_url: "/images/collaborators/supported-idea-wild.png",
  },
  {
    id: "seed-ncsc",
    name: "Nature Conservation and Study Centre",
    slug: "nature-conservation-study-centre",
    position: "Conservation partner",
    bio: null,
    photo_url: "/images/collaborators/supported-ncsc.png",
  },
];

/** Shown when Supabase collaborators table has no rows yet. */
export const seedCollaborators: Collaborator[] = [
  {
    id: "seed-nast",
    name: "Nepal Academy of Science and Technology",
    slug: "nepal-academy-science-technology",
    position: "Science & policy",
    bio: null,
    photo_url: "/images/collaborators/partner-logo.png",
  },
];

export function getSeedNewsPost(slug: string): NewsPost | null {
  return seedNewsPosts.find((post) => post.slug === slug) ?? null;
}

export const seedResearch: Research[] = [
  {
    id: "seed-butterfly-research",
    title: butterflyPublication.title,
    slug: butterflyPublication.slug,
    abstract: butterflyPublication.abstract,
    pdf_url: butterflyPublication.pdfUrl,
    published_date: "2026-04-01",
  },
];

export const seedProjects: Project[] = [
  {
    id: "seed-butterfly-project",
    title: "Kathmandu Valley Butterfly Documentation",
    slug: "kathmandu-valley-butterfly-documentation",
    description:
      "A field documentation initiative cataloguing butterfly diversity across the Kathmandu Valley, producing open reference material for research, education, and urban biodiversity conservation.",
    image_url: null,
  },
  {
    id: "seed-conservation",
    title: "Conservation & Ecosystem Restoration",
    slug: "conservation-ecosystem-restoration",
    description:
      "Protecting and rehabilitating habitats to restore biodiversity and ecosystem function.",
    image_url: null,
  },
];

export function getSeedProject(slug: string): Project | null {
  return seedProjects.find((project) => project.slug === slug) ?? null;
}

export const seedNewsPosts: NewsPost[] = [
  {
    id: "seed-butterfly-publication",
    title: "Butterfly Images of Kathmandu Valley — publication released",
    slug: "butterfly-images-kathmandu-valley-released",
    excerpt:
      "Our photographic guide documenting 174 butterfly species in the Kathmandu Valley is now available as a free PDF.",
    content:
      "Greenalaya Nepal has published Butterfly Images of Kathmandu Valley, a visual reference documenting 174 butterfly species observed across seasons and habitats in the valley. The publication supports researchers, conservation practitioners, educators, and nature enthusiasts working on urban biodiversity in Nepal.\n\nDownload the PDF from our Publications page or the Research section.",
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
