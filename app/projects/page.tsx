import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { DataError } from "@/components/data-status";
import { PageShell } from "@/components/page-shell";
import { seedProjects } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { Project } from "@/lib/types/project";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Conservation, climate action, environmental technology, and community programs led by Greenalaya Nepal.",
  path: "/projects",
});

async function getProjects(): Promise<{
  projects: Project[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Falling back to seed projects data."
    );
    return {
      projects: [],
      error: null,
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
  const displayProjects =
    !error && projects.length === 0 ? seedProjects : projects;

  return (
    <PageShell
      title="Our Work"
      description="Thematic focus areas guiding Greenalaya Nepal's conservation, research, and innovation programs."
    >
      {error ? (
        <DataError message={error} />
      ) : (
        <ul className="mt-8 space-y-6">
          {displayProjects.map((project) => (
            <li key={project.id}>
              <ContentCard>
              <h2 className="text-xl font-semibold text-secondary-foreground">
                <Link
                  href={`/projects/${project.slug}`}
                  className="hover:underline"
                >
                  {project.title}
                </Link>
              </h2>
              {project.description ? (
                <p className="mt-2 text-foreground">{project.description}</p>
              ) : null}
              </ContentCard>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
