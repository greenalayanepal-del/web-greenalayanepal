-- Phase 7: Security hardening
-- Run in Supabase -> SQL Editor (safe to re-run)
--
-- 1. Staff role check: "Staff *" policies previously granted full CRUD to
--    ANY authenticated user (`to authenticated using (true)`), relying only on
--    there being no public sign-up path in the app. This adds a real role
--    check so RLS itself enforces staff-only access, independent of app code
--    or Supabase Auth dashboard settings.
-- 2. Rate limiting: contact_submissions and newsletter_subscribers allow
--    public inserts (`to anon, authenticated with check (true)`) directly via
--    the anon key over PostgREST, bypassing any rate limiting implemented in
--    the Next.js server actions. These triggers enforce a per-IP limit at
--    the database layer, which is the only layer every insert must pass
--    through.

-- ---------------------------------------------------------------------------
-- 1. Staff role check
-- ---------------------------------------------------------------------------

-- After running this file, mark existing staff accounts with:
--   node scripts/create-staff-user.mjs (re-run is safe; it now sets the role)
-- for every STAFF_EMAIL that should have access.
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from auth.users
    where id = auth.uid()
      and raw_app_meta_data ->> 'role' = 'staff'
  );
$$;

do $$
declare
  t text;
  tables text[] := array['research', 'team_members', 'news', 'projects'];
begin
  foreach t in array tables
  loop
    execute format('drop policy if exists "Staff insert %I" on public.%I', t, t);
    execute format(
      'create policy "Staff insert %I" on public.%I for insert to authenticated with check (public.is_staff())',
      t, t
    );

    execute format('drop policy if exists "Staff update %I" on public.%I', t, t);
    execute format(
      'create policy "Staff update %I" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())',
      t, t
    );

    execute format('drop policy if exists "Staff delete %I" on public.%I', t, t);
    execute format(
      'create policy "Staff delete %I" on public.%I for delete to authenticated using (public.is_staff())',
      t, t
    );
  end loop;
end $$;

drop policy if exists "Staff read contact_submissions" on public.contact_submissions;
create policy "Staff read contact_submissions"
  on public.contact_submissions for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff read newsletter_subscribers" on public.newsletter_subscribers;
create policy "Staff read newsletter_subscribers"
  on public.newsletter_subscribers for select
  to authenticated
  using (public.is_staff());

drop policy if exists "Staff upload public-assets" on storage.objects;
create policy "Staff upload public-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'public-assets' and public.is_staff());

drop policy if exists "Staff update public-assets" on storage.objects;
create policy "Staff update public-assets"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'public-assets' and public.is_staff())
  with check (bucket_id = 'public-assets' and public.is_staff());

drop policy if exists "Staff delete public-assets" on storage.objects;
create policy "Staff delete public-assets"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'public-assets' and public.is_staff());

-- ---------------------------------------------------------------------------
-- 2. Rate limiting on public inserts
-- ---------------------------------------------------------------------------
create or replace function public.request_client_ip()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(split_part(current_setting('request.headers', true)::json ->> 'x-forwarded-for', ',', 1), ''),
    nullif(current_setting('request.headers', true)::json ->> 'cf-connecting-ip', ''),
    'unknown'
  );
$$;

alter table public.contact_submissions add column if not exists client_ip text;
alter table public.newsletter_subscribers add column if not exists client_ip text;

create or replace function public.enforce_contact_rate_limit()
returns trigger
language plpgsql
as $$
declare
  ip text := public.request_client_ip();
  recent_count int;
begin
  new.client_ip := ip;

  if ip = 'unknown' then
    return new;
  end if;

  select count(*) into recent_count
  from public.contact_submissions
  where client_ip = ip
    and created_at > now() - interval '10 minutes';

  if recent_count >= 5 then
    raise exception 'Too many submissions. Please try again later.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_contact_rate_limit on public.contact_submissions;
create trigger trg_contact_rate_limit
  before insert on public.contact_submissions
  for each row execute function public.enforce_contact_rate_limit();

create or replace function public.enforce_newsletter_rate_limit()
returns trigger
language plpgsql
as $$
declare
  ip text := public.request_client_ip();
  recent_count int;
begin
  new.client_ip := ip;

  if ip = 'unknown' then
    return new;
  end if;

  select count(*) into recent_count
  from public.newsletter_subscribers
  where client_ip = ip
    and created_at > now() - interval '1 hour';

  if recent_count >= 3 then
    raise exception 'Too many subscription attempts. Please try again later.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_newsletter_rate_limit on public.newsletter_subscribers;
create trigger trg_newsletter_rate_limit
  before insert on public.newsletter_subscribers
  for each row execute function public.enforce_newsletter_rate_limit();
