import { siteConfig, siteContact, siteLogo } from "@/lib/site";

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
function organizationJsonLd() {
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
function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    alternateName: "Greenalaya",
    url: `${siteConfig.url}/`,
    description: siteConfig.description,
    publisher: { "@id": organizationId },
    inLanguage: "en-NP",
  };
}

/** Homepage WebPage — reinforces branded site name on the root URL. */
export function homePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteConfig.url}/#webpage`,
    url: `${siteConfig.url}/`,
    name: siteConfig.name,
    description: siteConfig.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
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

export function publicationJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string | null;
  numberOfPages?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: input.title,
    description: input.description,
    url: `${siteConfig.url}${input.path}`,
    datePublished: input.datePublished ?? undefined,
    numberOfPages: input.numberOfPages ?? undefined,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}
