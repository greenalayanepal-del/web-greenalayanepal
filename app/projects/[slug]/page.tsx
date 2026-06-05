import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isSupabaseConfigured()) {
    notFound();
  }

  const supabase = await createClient();
  const { data: project, error } = await supabase
    .from("projects")
    .select("id, title, slug, description, image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !project) {
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
