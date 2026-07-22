/**
 * Create (or promote) a staff auth user (Supabase Auth) for /admin login.
 * Sets app_metadata.role = "staff", which supabase/phase7-hardening.sql RLS
 * policies require for write access. Re-run for existing users to backfill
 * the role after applying phase7.
 * Usage:
 *   STAFF_EMAIL=you@example.com STAFF_PASSWORD='...' node scripts/create-staff-user.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.STAFF_EMAIL;
const password = process.env.STAFF_PASSWORD;

if (!url || !serviceKey || !email) {
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STAFF_EMAIL (STAFF_PASSWORD required only when creating a new user)"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(targetEmail) {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find(
      (user) => user.email?.toLowerCase() === targetEmail.toLowerCase()
    );
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
  }
}

const existing = await findUserByEmail(email);

if (existing) {
  const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
    app_metadata: { ...existing.app_metadata, role: "staff" },
  });
  if (error) {
    console.error("Update user failed:", error.message);
    process.exit(1);
  }
  console.log("Staff role set for existing user:", data.user?.email);
} else {
  if (!password) {
    console.error("STAFF_PASSWORD is required to create a new user.");
    process.exit(1);
  }
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    app_metadata: { role: "staff" },
  });
  if (error) {
    console.error("Create user failed:", error.message);
    process.exit(1);
  }
  console.log("Staff user created:", data.user?.email);
}

console.log("Sign in at /admin/login");
