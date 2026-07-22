import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { getSeedNewsPost } from "@/lib/content/seed";
import { articleJsonLd } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const revalidate = 300;

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadNewsPost(slug: string) {
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

  return post;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadNewsPost(slug);

  if (!post) {
    return pageMetadata({
      title: "News",
      description: "News update from Greenalaya Nepal",
      path: `/news/${slug}`,
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt ?? "News update from Greenalaya Nepal",
    path: `/news/${post.slug}`,
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

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await loadNewsPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt ?? "News update from Greenalaya Nepal",
          path: `/news/${post.slug}`,
          datePublished: post.published_at,
        })}
      />
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
        <Link href="/news" className="text-sm text-primary hover:underline">
          ← All news
        </Link>
      </p>

      {post.published_at ? (
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDate(post.published_at)}
        </p>
      ) : null}

      {post.content ? (
        <div className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-foreground">
          {post.content}
        </div>
      ) : post.excerpt ? (
        <p className="mt-6 text-lg leading-relaxed text-foreground">
          {post.excerpt}
        </p>
      ) : (
        <p className="mt-6 text-muted-foreground">Content coming soon.</p>
      )}
      </PageShell>
    </>
  );
}
