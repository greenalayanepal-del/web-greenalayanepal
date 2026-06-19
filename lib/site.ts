import type { Metadata } from "next";

const faviconVersion = "9";

/** Static favicon set in /public — kept small for sub-100ms loads on every route. */
export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    // List 48×48 PNG first — Google’s preferred explicit size; /favicon.ico remains the default fetch path.
    { url: `/favicon-48x48.png?v=${faviconVersion}`, sizes: "48x48", type: "image/png" },
    { url: `/favicon.png?v=${faviconVersion}`, sizes: "512x512", type: "image/png" },
    { url: `/favicon.ico?v=${faviconVersion}`, sizes: "any", type: "image/x-icon" },
    { url: `/icon-192.png?v=${faviconVersion}`, sizes: "192x192", type: "image/png" },
    { url: `/icon-512.png?v=${faviconVersion}`, sizes: "512x512", type: "image/png" },
    { url: `/favicon-32x32.png?v=${faviconVersion}`, sizes: "32x32", type: "image/png" },
    { url: `/favicon-16x16.png?v=${faviconVersion}`, sizes: "16x16", type: "image/png" },
  ],
  apple: [{ url: `/apple-touch-icon.png?v=${faviconVersion}`, sizes: "180x180", type: "image/png" }],
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
    aboutBackground: "/images/about-rings.png",
    foundationBackground: "/images/foundation-background.png",
    resourcesHeader: "/images/resources-header.png",
    thematicAreasBackground: "/images/thematic-areas-background.png",
    footerCarousel: [
      "/images/footer-carousel-1.png",
      "/images/footer-carousel-2.png",
      "/images/footer-carousel-3.png",
      "/images/footer-carousel-4.png",
    ] as const,
  },
} as const;

/** Square logo URLs for structured data (absolute) and favicon discovery. */
export const siteLogo = {
  path: "/icon-512.png",
  width: 512,
  height: 512,
  structuredData: `${siteConfig.url}/icon-512.png`,
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
  email: "info@greenalayanepal.org.np",
  location: "Pokhara, Nepal",
  phone: "+977-9864835254",
} as const;

export const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/resources", label: "Resources" },
  { href: "/team", label: "Team" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerAboutLinks = [
  { text: "About Greenalaya Nepal", href: "/about" },
  { text: "Advisors & Partners", href: "/team" },
  { text: "Team", href: "/team" },
] as const;

export const footerWorkLinks = [
  { text: "Projects", href: "/projects" },
  { text: "Research", href: "/research" },
  { text: "Publications", href: "/research" },
] as const;

export const footerMediaLinks = [
  { text: "Blog", href: "/news" },
  { text: "News", href: "/news" },
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

export const thematicAreasWithStyle = thematicAreas.map((area, index) => ({
  ...area,
  number: String(index + 1).padStart(2, "0"),
}));

const legacyButterflyGithubPdf =
  "https://github.com/greenalayanepal-del/greenalayanepal/raw/main/butterfly_images_of_kathmandu_valley.pdf";

export const butterflyPublication = {
  title: "Butterfly Images of Kathmandu Valley",
  slug: "butterfly-images-kathmandu-valley",
  pdfUrl: "/publications/butterfly_images_of_kathmandu_valley.pdf",
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
