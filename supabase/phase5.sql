-- Phase 5: Newsletter subscribers
-- Run in Supabase → SQL Editor (safe to re-run)

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(trim(email)) between 3 and 254),
  created_at timestamptz not null default now(),
  unique (email)
);

alter table public.newsletter_subscribers enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'newsletter_subscribers'
      and policyname = 'Public insert newsletter_subscribers'
  ) then
    create policy "Public insert newsletter_subscribers"
      on public.newsletter_subscribers for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;
