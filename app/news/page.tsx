import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { DataError } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { seedNewsPosts } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types/news";

export const metadata = pageMetadata({
  title: "News",
  description:
    "Updates, publications, and announcements from Greenalaya Nepal.",
  path: "/news",
});

async function getNews(): Promise<{
  posts: NewsPost[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed news data."
    );
    return {
      posts: seedNewsPosts,
      error: null,
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("news")
    .select(
      "id, title, slug, excerpt, content, featured_image_url, published_at"
    )
    .order("published_at", { ascending: false });

  if (error) {
    return { posts: [], error: error.message };
  }

  return { posts: data ?? [], error: null };
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
  const { posts, error } = await getNews();
  const displayPosts = !error && posts.length === 0 ? seedNewsPosts : posts;

  return (
    <PageShell
      title="News"
      description="Updates, events, and announcements from Greenalaya Nepal."
    >
      {error ? (
        <DataError message={error} />
      ) : (
        <ul className="mt-8 space-y-6">
          {displayPosts.map((post) => (
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
      )}
    </PageShell>
  );
}
