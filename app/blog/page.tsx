import { PageShell } from "@/components/page-shell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Stories, insights, and reflections from Greenalaya Nepal's conservation and research work.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <PageShell
      title="Blog"
      description="Stories, insights, and reflections from our work across Nepal."
    >
      <p className="mt-8 text-foreground">New posts will appear here soon.</p>
    </PageShell>
  );
}
