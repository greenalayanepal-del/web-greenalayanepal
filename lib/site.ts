import type { Metadata } from "next";

const faviconVersion = "5";

/** Static favicon set in /public — kept small for sub-100ms loads on every route. */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: `/favicon.ico?v=${faviconVersion}`, sizes: "any" },
    { url: `/favicon-32x32.png?v=${faviconVersion}`, sizes: "32x32", type: "image/png" },
    { url: `/favicon-16x16.png?v=${faviconVersion}`, sizes: "16x16", type: "image/png" },
  ],
  apple: [{ url: `/apple-touch-icon.png?v=${faviconVersion}`, sizes: "180x180", type: "image/png" }],
  shortcut: `/favicon.ico?v=${faviconVersion}`,
};

export const siteConfig = {
  name: "Greenalaya Nepal",
  url: "https://greenalayanepal.org.np",
  tagline: "Research & Innovation for Nature",
  description:
    "Data-driven conservation, green enterprise, and community collaboration for resilient ecosystems in Nepal.",
  ogImage: "/og-image.png",
  social: {
    facebook: "https://www.facebook.com/greenalayanepal/",
    instagram: "https://www.instagram.com/greenalayanepal/",
    linkedin: "https://www.linkedin.com/company/greenalaya-nepal/",
  },
  images: {
    hero: "/images/hero.png",
    community: "/images/community.png",
    resourcesHeader: "/images/resources-header.png",
  },
} as const;

export const strategicPillars = [
  {
    title: "People",
    description:
      "Empowering communities through education, training, and participatory conservation",
    icon: "people",
  },
  {
    title: "Technology",
    description:
      "Leveraging AI, GIS, and data systems for smart environmental monitoring",
    icon: "technology",
  },
  {
    title: "Research",
    description:
      "Conducting credible environmental research to inform evidence-based action",
    icon: "research",
  },
  {
    title: "Nature",
    description:
      "Protecting and restoring ecosystems, biodiversity, and natural resources",
    icon: "nature",
  },
  {
    title: "Collaboration",
    description:
      "Partnering with communities, organizations, and government for systemic change",
    icon: "collaboration",
  },
] as const;

export const siteContact = {
  email: "greenalayanepal@gmail.com",
  location: "Pokhara, Nepal",
  phone: "+977-9823232424",
} as const;

export const mainNavItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resources", label: "Resources" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerAboutLinks = [
  { text: "About Greenalaya", href: "/about" },
  { text: "Meet the Team", href: "/team" },
  { text: "Strategic Pillars", href: "/about#strategic-pillars" },
  { text: "Thematic Areas", href: "/about#thematic-areas" },
] as const;

export const footerWorkLinks = [
  { text: "Projects", href: "/projects" },
  { text: "Research", href: "/research" },
  { text: "Resources", href: "/resources" },
  { text: "News & Updates", href: "/news" },
] as const;

export const footerHelpfulLinks = [
  { text: "Contact Us", href: "/contact" },
  { text: "Get Involved", href: "/#get-involved" },
  { text: "Browse Resources", href: "/resources" },
  { text: "Send a Message", href: "/contact", hasIndicator: true },
] as const;

export const socialProfiles = [
  { label: "Facebook", href: siteConfig.social.facebook },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin },
] as const;

export const thematicAreas = [
  {
    title: "Emerging Environmental Issues & Research",
    description: "Addressing new and understudied challenges",
  },
  {
    title: "Conservation & Ecosystem Restoration",
    description: "Protecting and rehabilitating habitats",
  },
  {
    title: "Climate Change & Pollution Management",
    description: "Adaptation, mitigation, and reduction",
  },
  {
    title: "Innovation, Eco-Products & Circular Economy",
    description: "Linking conservation with livelihoods",
  },
  {
    title: "Environmental Technology & Data Systems",
    description: "GIS, AI, and data-driven solutions",
  },
  {
    title: "Community Conservation & Capacity Building",
    description: "Empowering local communities",
  },
  {
    title: "Environmental Policy, Governance & Ethics",
    description: "Science-based policies and advocacy",
  },
] as const;

const thematicGradients = [
  "from-[#2e7d32] to-[#1b5e20]",
  "from-[#1976d2] to-[#0d47a1]",
  "from-[#d4a574] to-[#a67c52]",
  "from-[#673ab7] to-[#512da8]",
  "from-[#00bcd4] to-[#0097a7]",
  "from-[#ff9800] to-[#f57c00]",
  "from-[#e91e63] to-[#c2185b]",
] as const;

export const thematicAreasWithStyle = thematicAreas.map((area, index) => ({
  ...area,
  gradient: thematicGradients[index],
  number: String(index + 1).padStart(2, "0"),
}));

const legacyButterflyGithubPdf =
  "https://github.com/greenalayanepal-del/greenalayanepal/raw/main/butterfly_images_of_kathmandu_valley.pdf";

export const butterflyPublication = {
  title: "Butterfly Images of Kathmandu Valley",
  slug: "butterfly-images-kathmandu-valley",
  pdfUrl:
    "https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf",
  abstract:
    "A comprehensive photographic collection documenting 174 butterfly species across the Kathmandu Valley, captured across different seasons and habitats.",
  description:
    "A comprehensive photographic collection documenting the diverse butterfly species found across the Kathmandu Valley. This visual guide showcases 174 species captured across different seasons and habitats, serving as an important reference for researchers, conservationists, and nature enthusiasts.",
  coverImage: "/images/butterfly-cover.png",
  publishedDate: "April 2026",
  pageCount: 124,
  speciesCount: 174,
} as const;

/** Maps legacy GitHub-hosted PDF links to the deployed site asset. */
export function resolvePublicationPdfUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (
    url === legacyButterflyGithubPdf ||
    url.includes("butterfly_images_of_kathmandu_valley.pdf")
  ) {
    return butterflyPublication.pdfUrl;
  }
  return url;
}
