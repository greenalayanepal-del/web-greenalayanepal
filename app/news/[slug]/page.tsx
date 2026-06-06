import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getSeedNewsPost } from "@/lib/content/seed";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("en-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  let post = getSeedNewsPost(slug);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select(
        "id, title, slug, excerpt, content, featured_image_url, published_at"
      )
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      post = data;
    }
  }

  if (!post) {
    notFound();
  }

  return (
    <PageShell
      title={post.title}
      description={
        post.excerpt ??
        (post.published_at
          ? (formatDate(post.published_at) ?? "News update")
          : "News update")
      }
    >
      <p className="mt-6">
        <Link href="/news" className="text-sm text-emerald-700 hover:underline">
          ← All news
        </Link>
      </p>

      {post.published_at ? (
        <p className="mt-2 text-sm text-neutral-500">
          {formatDate(post.published_at)}
        </p>
      ) : null}

      {post.content ? (
        <div className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-neutral-700">
          {post.content}
        </div>
      ) : post.excerpt ? (
        <p className="mt-6 text-lg leading-relaxed text-neutral-700">
          {post.excerpt}
        </p>
      ) : (
        <p className="mt-6 text-neutral-500">Content coming soon.</p>
      )}
    </PageShell>
  );
}
