import { AboutPageContent } from "@/components/about-page-content";
import { getAdvisors } from "@/lib/content/advisors";
import { getCollaborators } from "@/lib/content/collaborators";
import { getSupportedBy } from "@/lib/content/supported-by";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Greenalaya Nepal connects environmental research, technology, and community action for conservation across Nepal.",
  path: "/about",
});

export default async function AboutPage() {
  const [
    { members: advisors, error: advisorsError },
    { members: supportedBy, error: supportedByError },
    { members: collaborators, error: collaboratorsError },
  ] = await Promise.all([getAdvisors(), getSupportedBy(), getCollaborators()]);

  return (
    <main>
      <AboutPageContent
        advisors={advisors}
        advisorsError={advisorsError}
        collaborators={collaborators}
        collaboratorsError={collaboratorsError}
        supportedBy={supportedBy}
        supportedByError={supportedByError}
      />
    </main>
  );
}
