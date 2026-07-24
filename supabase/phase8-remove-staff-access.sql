-- Phase 8: Remove staff/admin access
-- Run in Supabase → SQL Editor (safe to re-run)
--
-- The /admin panel and staff login have been removed from the app. This
-- drops the staff-only RLS policies and role-check function that phase3,
-- phase5, and phase7-hardening previously created, so the live database
-- matches the app. Only needed if you had already applied those phases
-- before this change — harmless to run on a fresh project too.
--
-- Content is now managed exclusively via Supabase Table Editor / Storage,
-- which use the dashboard's own privileged connection and are unaffected
-- by RLS.

do $$
declare
  t text;
  tables text[] := array['research', 'team_members', 'news', 'projects'];
begin
  foreach t in array tables
  loop
    execute format('drop policy if exists "Staff insert %I" on public.%I', t, t);
    execute format('drop policy if exists "Staff update %I" on public.%I', t, t);
    execute format('drop policy if exists "Staff delete %I" on public.%I', t, t);
  end loop;
end $$;

drop policy if exists "Staff read contact_submissions" on public.contact_submissions;
drop policy if exists "Staff read newsletter_subscribers" on public.newsletter_subscribers;

drop policy if exists "Staff upload public-assets" on storage.objects;
drop policy if exists "Staff update public-assets" on storage.objects;
drop policy if exists "Staff delete public-assets" on storage.objects;

drop function if exists public.is_staff();
