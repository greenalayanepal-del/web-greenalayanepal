import { butterflyPublication, siteConfig, siteContact, siteLogo } from "@/lib/site";

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

function organizationLogoJsonLd() {
  return {
    "@type": "ImageObject",
    url: siteLogo.structuredData,
    width: siteLogo.width,
    height: siteLogo.height,
  };
}

/** Organization entity — powers publisher logo in Article schema and Google site-name signals. */
export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: organizationLogoJsonLd(),
    image: siteLogo.structuredData,
    description: siteConfig.description,
    email: siteContact.email,
    telephone: siteContact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pokhara",
      addressCountry: "NP",
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };
}

/** WebSite entity — primary signal Google uses for branded site name in SERPs. */
export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: ["Greenalaya", "greenalayanepal.org.np"],
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    publisher: { "@id": organizationId },
    inLanguage: "en-NP",
  };
}

/** Combined graph injected once in root layout `<head>`. */
export function rootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd()],
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    datePublished: input.datePublished ?? undefined,
    publisher: {
      "@type": "Organization",
      "@id": organizationId,
      name: siteConfig.name,
      logo: organizationLogoJsonLd(),
    },
  };
}

export function publicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: butterflyPublication.title,
    description: butterflyPublication.description,
    url: `${siteConfig.url}/resources`,
    datePublished: "2026-04-01",
    numberOfPages: butterflyPublication.pageCount,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}
