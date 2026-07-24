-- Phase 7: Security hardening
-- Run in Supabase -> SQL Editor (safe to re-run)
--
-- Rate limiting: contact_submissions and newsletter_subscribers allow
-- public inserts (`to anon, authenticated with check (true)`) directly via
-- the anon key over PostgREST, bypassing any rate limiting implemented in
-- the Next.js server actions. These triggers enforce a per-IP limit at
-- the database layer, which is the only layer every insert must pass
-- through.
--
-- Staff/admin access has been removed from this project (see
-- supabase/phase8-remove-staff-access.sql if phase7's staff-role policies
-- were applied previously and need to be dropped).

-- ---------------------------------------------------------------------------
-- Rate limiting on public inserts
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
