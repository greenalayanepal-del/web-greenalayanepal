export const siteConfig = {
  name: "Greenalaya Nepal",
  url: "https://greenalayanepal.org.np",
  tagline: "Research & Innovation for Nature",
  description:
    "Data-driven conservation, green enterprise, and community collaboration for resilient ecosystems in Nepal.",
  ogImage: "https://greenalayanepal.org.np/logo.png",
  social: {
    facebook: "https://www.facebook.com/greenalayanepal/",
    instagram: "https://www.instagram.com/greenalayanepal/",
    linkedin: "https://www.linkedin.com/company/greenalaya-nepal/",
  },
  images: {
    hero:
      "https://image.qwenlm.ai/public_source/5ae12ba7-3c4d-4149-b96b-8228ed007dac/1ddc86efa-eaa0-4854-90de-dc2a91893eeb.png",
    community:
      "https://image.qwenlm.ai/public_source/5ae12ba7-3c4d-4149-b96b-8228ed007dac/110a8ea7b-d367-49f2-901d-b682c9b619ce.png",
    resourcesHeader:
      "https://image.qwenlm.ai/public_source/89e6e179-211a-43fd-af7b-ee62ef3d50ef/1f3305ca9-33be-4a47-9d59-83850754132a.png",
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
  coverImage:
    "https://image.qwenlm.ai/public_source/89e6e179-211a-43fd-af7b-ee62ef3d50ef/166c344f4-70be-475f-9266-cbee993fe4ee.png",
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
