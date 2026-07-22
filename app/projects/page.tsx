import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { PageShell } from "@/components/page-shell";
import { fetchListWithFallback } from "@/lib/content/fetch-list-with-fallback";
import { seedProjects } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import type { Project } from "@/lib/types/project";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Conservation, climate action, environmental technology, and community programs led by Greenalaya Nepal.",
  path: "/projects",
});

export const revalidate = 300;

async function getProjects(): Promise<Project[]> {
  return fetchListWithFallback<Project>({
    table: "projects",
    columns: "id, title, slug, description, image_url",
    orderColumn: "title",
    seed: seedProjects,
    label: "projects",
  });
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageShell
      title="Our Work"
      description="Thematic focus areas guiding Greenalaya Nepal's conservation, research, and innovation programs."
    >
      <ul className="mt-8 space-y-6">
        {projects.map((project) => (
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
    </PageShell>
  );
}
