-- Phase 6: Collaborators table for About page marquee
-- Run in Supabase → SQL Editor (safe to re-run)

create table if not exists public.collaborators (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position text,
  bio text,
  photo_url text,
  created_at timestamptz not null default now()
);

alter table public.collaborators enable row level security;

drop policy if exists "Public read collaborators" on public.collaborators;
create policy "Public read collaborators"
  on public.collaborators for select
  using (true);

create table if not exists public.supported_by (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position text,
  bio text,
  photo_url text,
  created_at timestamptz not null default now()
);

alter table public.supported_by enable row level security;

drop policy if exists "Public read supported_by" on public.supported_by;
create policy "Public read supported_by"
  on public.supported_by for select
  using (true);

-- Seed collaborators (uses partner-logo.png in public/images/collaborators/)
insert into public.collaborators (name, slug, position, photo_url)
values
  ('National Trust for Nature Conservation', 'national-trust-nature-conservation', 'Conservation partner', '/images/collaborators/partner-logo.png'),
  ('Community Forest User Group', 'community-forest-user-group', 'Community programs', '/images/collaborators/partner-logo.png'),
  ('Nepal Academy of Science and Technology', 'nepal-academy-science-technology', 'Science & policy', '/images/collaborators/partner-logo.png')
on conflict (slug) do update set
  name = excluded.name,
  position = excluded.position,
  photo_url = excluded.photo_url;

insert into public.supported_by (name, slug, position, photo_url)
values
  ('IDEA WILD', 'idea-wild', 'Conservation partner', '/images/collaborators/supported-idea-wild.png'),
  ('Nature Conservation and Study Centre', 'nature-conservation-study-centre', 'Conservation partner', '/images/collaborators/supported-ncsc.png')
on conflict (slug) do update set
  name = excluded.name,
  position = excluded.position,
  photo_url = excluded.photo_url;
