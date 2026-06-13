import type { Metadata } from "next";
import { siteConfig, siteIcons } from "@/lib/site";

/** Separator between page name and site name in browser tabs. */
export const titleSeparator = " │ ";

function documentTitle(pageTitle: string) {
  return `${pageTitle}${titleSeparator}${siteConfig.name}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path = "",
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = siteConfig.ogImage.startsWith("http")
    ? siteConfig.ogImage
    : `${siteConfig.url}${siteConfig.ogImage}`;
  const fullTitle = documentTitle(title);

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    applicationName: siteConfig.name,
    icons: siteIcons,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_NP",
      url,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
