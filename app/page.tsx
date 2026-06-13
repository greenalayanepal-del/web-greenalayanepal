import { HomeLanding } from "@/components/home-landing";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  siteNameTitle: true,
});

export default function Home() {
  return <HomeLanding />;
}
