import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd } from "@/lib/json-ld";
import { faviconAssetVersion, siteConfig, siteIcons } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: siteIcons,
  openGraph: {
    type: "website",
    locale: "en_NP",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${openSans.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="icon" href={`/favicon.ico?v=${faviconAssetVersion}`} sizes="any" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`/favicon-32x32.png?v=${faviconAssetVersion}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`/favicon-16x16.png?v=${faviconAssetVersion}`}
        />
        <link
          rel="apple-touch-icon"
          href={`/apple-touch-icon.png?v=${faviconAssetVersion}`}
          sizes="180x180"
        />
      </head>
      <body className="flex min-h-full flex-col bg-white font-body text-neutral-900">
        <JsonLd data={organizationJsonLd()} />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
