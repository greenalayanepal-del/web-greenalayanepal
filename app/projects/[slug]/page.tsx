import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getSeedProject } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadProject(slug: string) {
  let project = getSeedProject(slug);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("id, title, slug, description, image_url")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      project = data;
    }
  }

  return project;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) {
    return pageMetadata({
      title: "Projects",
      description: "Greenalaya Nepal project",
      path: `/projects/${slug}`,
    });
  }

  return pageMetadata({
    title: project.title,
    description: project.description ?? "Greenalaya Nepal project",
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await loadProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <PageShell title={project.title} description="Greenalaya Nepal project">
      <p className="mt-6">
        <Link
          href="/projects"
          className="text-sm text-emerald-700 hover:underline"
        >
          ← All projects
        </Link>
      </p>

      {project.description ? (
        <p className="mt-6 text-lg leading-relaxed text-neutral-700">
          {project.description}
        </p>
      ) : (
        <p className="mt-6 text-neutral-500">No description yet.</p>
      )}
    </PageShell>
  );
}
