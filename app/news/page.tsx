import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { PageShell } from "@/components/page-shell";
import { fetchListWithFallback } from "@/lib/content/fetch-list-with-fallback";
import { seedNewsPosts } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import type { NewsPost } from "@/lib/types/news";

export const metadata = pageMetadata({
  title: "News",
  description:
    "Updates, publications, and announcements from Greenalaya Nepal.",
  path: "/news",
});

export const revalidate = 300;

async function getNews(): Promise<NewsPost[]> {
  return fetchListWithFallback<NewsPost>({
    table: "news",
    columns: "id, title, slug, excerpt, content, featured_image_url, published_at",
    orderColumn: "published_at",
    ascending: false,
    seed: seedNewsPosts,
    label: "news",
  });
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsPage() {
  const posts = await getNews();

  return (
    <PageShell
      title="News"
      description="Updates, events, and announcements from Greenalaya Nepal."
    >
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.id}>
            <ContentCard>
              <h2 className="text-xl font-semibold text-secondary-foreground">
                <Link href={`/news/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.published_at ? (
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatDate(post.published_at)}
                </p>
              ) : null}
              {post.excerpt ? (
                <p className="mt-2 text-foreground">{post.excerpt}</p>
              ) : null}
            </ContentCard>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
