import { AboutPageContent } from "@/components/about-page-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Greenalaya Nepal connects environmental research, technology, and community action for conservation across Nepal.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <AboutPageContent />
    </main>
  );
}
