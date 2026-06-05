import Link from "next/link";
import { DataError, EmptyState } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { NewsPost } from "@/lib/types/news";

async function getNews(): Promise<{
  posts: NewsPost[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return {
      posts: [],
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
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

  return (
    <PageShell
      title="News"
      description="Updates, events, and announcements from Greenalaya Nepal."
    >
      {error ? (
        <DataError message={error} />
      ) : posts.length === 0 ? (
        <EmptyState message="No news posts yet. Run supabase/schema.sql in the Supabase SQL Editor." />
      ) : (
        <ul className="mt-8 space-y-6">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <h2 className="text-xl font-semibold text-emerald-900">
                <Link href={`/news/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.published_at ? (
                <p className="mt-1 text-sm text-neutral-500">
                  {formatDate(post.published_at)}
                </p>
              ) : null}
              {post.excerpt ? (
                <p className="mt-2 text-neutral-700">{post.excerpt}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
