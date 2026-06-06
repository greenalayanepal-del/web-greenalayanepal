/**
 * Create a staff auth user (Supabase Auth) for /admin login.
 * Usage:
 *   STAFF_EMAIL=you@example.com STAFF_PASSWORD='...' node scripts/create-staff-user.mjs
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.STAFF_EMAIL;
const password = process.env.STAFF_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error(
    "Required: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, STAFF_EMAIL, STAFF_PASSWORD"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true,
});

if (error) {
  console.error("Create user failed:", error.message);
  process.exit(1);
}

console.log("Staff user created:", data.user?.email);
console.log("Sign in at /admin/login");
