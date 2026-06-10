import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getSeedTeamMember } from "@/lib/content/seed";
import { pageMetadata } from "@/lib/seo";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

type PageProps = {
  params: Promise<{ slug: string }>;
};

async function loadTeamMember(slug: string) {
  let member = getSeedTeamMember(slug);

  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("team_members")
      .select("id, name, slug, position, bio, photo_url")
      .eq("slug", slug)
      .maybeSingle();

    if (!error && data) {
      member = data;
    }
  }

  return member;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = await loadTeamMember(slug);

  if (!member) {
    return pageMetadata({
      title: "Team",
      description: "Greenalaya Nepal team member",
      path: `/team/${slug}`,
    });
  }

  return pageMetadata({
    title: member.name,
    description: member.position ?? "Greenalaya Nepal team member",
    path: `/team/${member.slug}`,
  });
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const member = await loadTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <PageShell
      title={member.name}
      description={member.position ?? "Greenalaya Nepal team member"}
    >
      <p className="mt-6">
        <Link href="/team" className="text-sm text-emerald-700 hover:underline">
          ← All team members
        </Link>
      </p>

      {member.photo_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo_url}
          alt={member.name}
          className="mt-6 h-48 w-48 rounded-lg object-cover"
        />
      ) : null}

      {member.bio ? (
        <p className="mt-6 text-lg leading-relaxed text-neutral-700">
          {member.bio}
        </p>
      ) : (
        <p className="mt-6 text-neutral-500">Bio coming soon.</p>
      )}
    </PageShell>
  );
}
