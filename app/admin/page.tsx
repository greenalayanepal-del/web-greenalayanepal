import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSignOutButton } from "@/components/admin-sign-out-button";
import { ContentCard } from "@/components/content-card";
import { PageShell } from "@/components/page-shell";
import { storageBucket } from "@/lib/storage";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/lib/types/contact";

export const metadata = {
  title: "Staff dashboard",
  robots: { index: false, follow: false },
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-NP", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function supabaseStudioUrl() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const match = base.match(/https:\/\/([^.]+)\.supabase\.co/);
  if (!match) return "https://supabase.com/dashboard";
  return `https://supabase.com/dashboard/project/${match[1]}`;
}

async function getSubmissions(): Promise<{
  items: ContactSubmission[];
  error: string | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("id, name, email, subject, message, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return { items: [], error: error.message };
  }

  return { items: data ?? [], error: null };
}

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <PageShell title="Staff dashboard" description="Supabase is not configured.">
        <p className="mt-8 text-sm text-muted-foreground">
          Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
          enable the admin area.
        </p>
      </PageShell>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { items, error } = await getSubmissions();
  const studio = supabaseStudioUrl();

  return (
    <PageShell
      title="Staff dashboard"
      description={`Signed in as ${user.email}`}
    >
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <AdminSignOutButton />
        <Link
          href="/"
          className="text-sm text-primary hover:underline"
        >
          View public site
        </Link>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-secondary-foreground">
          Manage content
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Edit research, news, team, and projects in Supabase Table Editor, or
          upload PDFs and images to Storage.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          <li>
            <a
              href={`${studio}/editor`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-card p-4 text-sm font-medium text-secondary-foreground hover:border-primary"
            >
              Table Editor →
            </a>
          </li>
          <li>
            <a
              href={`${studio}/storage/buckets/${storageBucket}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-border bg-card p-4 text-sm font-medium text-secondary-foreground hover:border-primary"
            >
              Storage ({storageBucket}) →
            </a>
          </li>
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          After uploading a PDF to Storage, copy its public URL into the{" "}
          <code className="rounded bg-muted px-1">pdf_url</code> field on
          the research row. Use folders like{" "}
          <code className="rounded bg-muted px-1">publications/</code> and{" "}
          <code className="rounded bg-muted px-1">images/</code>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-secondary-foreground">
          Contact inquiries
        </h2>
        {error ? (
          <p className="mt-4 text-sm text-red-700">
            Could not load submissions: {error}
          </p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No messages yet. Submissions from the contact form will appear here.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id}>
                <ContentCard className="p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <time className="text-xs text-muted-foreground">
                    {formatDate(item.created_at)}
                  </time>
                </div>
                <p className="mt-1 text-sm">
                  <a
                    href={`mailto:${item.email}`}
                    className="text-primary hover:underline"
                  >
                    {item.email}
                  </a>
                </p>
                {item.subject && (
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {item.subject}
                  </p>
                )}
                <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
                  {item.message}
                </p>
                </ContentCard>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
