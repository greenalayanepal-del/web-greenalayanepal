import Link from "next/link";
import { DataError, EmptyState } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/project";

async function getProjects(): Promise<{
  projects: Project[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return {
      projects: [],
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("id, title, slug, description, image_url")
    .order("title");

  if (error) {
    return { projects: [], error: error.message };
  }

  return { projects: data ?? [], error: null };
}

export default async function ProjectsPage() {
  const { projects, error } = await getProjects();

  return (
    <PageShell
      title="Projects"
      description="Conservation and research initiatives from Greenalaya Nepal."
    >
      {error ? (
        <DataError message={error} />
      ) : projects.length === 0 ? (
        <EmptyState message="No projects yet. Add rows in Supabase → Table Editor → projects." />
      ) : (
        <ul className="mt-8 space-y-6">
          {projects.map((project) => (
            <li
              key={project.id}
              className="rounded-lg border border-neutral-200 bg-white p-5"
            >
              <h2 className="text-xl font-semibold text-emerald-900">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h2>
              {project.description ? (
                <p className="mt-2 text-neutral-700">{project.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
