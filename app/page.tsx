import type { Metadata } from "next";
import { HomeLanding } from "@/components/home-landing";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: siteConfig.name,
    description: siteConfig.description,
    path: "/",
  }),
  title: { absolute: siteConfig.name },
};

export default function Home() {
  return <HomeLanding />;
}
