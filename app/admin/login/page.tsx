import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin-login-form";
import { PageShell } from "@/components/page-shell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata = {
  title: "Staff login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      redirect("/admin");
    }
  }

  return (
    <PageShell
      title="Staff login"
      description="Sign in to view contact inquiries and manage site content."
    >
      {!isSupabaseConfigured() ? (
        <p className="mt-8 text-sm text-neutral-600">
          Supabase is not configured. Add environment variables to enable staff
          access.
        </p>
      ) : (
        <div className="mt-8">
          <AdminLoginForm />
          <p className="mt-6 text-center text-sm text-neutral-500">
            <Link href="/" className="text-emerald-800 hover:underline">
              Back to site
            </Link>
          </p>
        </div>
      )}
    </PageShell>
  );
}
