-- Run in Supabase → SQL Editor
-- Creates content tables with public read access (same pattern as projects)

create table if not exists public.research (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  abstract text,
  pdf_url text,
  published_date date,
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  position text,
  bio text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  featured_image_url text,
  published_at timestamptz default now(),
  created_at timestamptz not null default now()
);

alter table public.research enable row level security;
alter table public.team_members enable row level security;
alter table public.news enable row level security;

create policy "Public read research"
  on public.research for select
  using (true);

create policy "Public read team_members"
  on public.team_members for select
  using (true);

create policy "Public read news"
  on public.news for select
  using (true);

-- Phase 2 content migration: see phase2-migrate.sql for real org data.
-- Featured publication (from legacy GitHub Pages site):
insert into public.research (title, slug, abstract, pdf_url, published_date)
values (
  'Butterfly Images of Kathmandu Valley',
  'butterfly-images-kathmandu-valley',
  'A comprehensive photographic collection documenting diverse butterfly species across the Kathmandu Valley. This visual guide showcases 174 species captured across different seasons and habitats.',
  'https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf',
  '2026-04-01'
)
on conflict (slug) do nothing;
