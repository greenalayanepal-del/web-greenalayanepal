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

-- Optional sample rows (safe to re-run: uses ON CONFLICT)
insert into public.research (title, slug, abstract, published_date)
values (
  'Nepal Wetlands Assessment',
  'nepal-wetlands-assessment',
  'A baseline assessment of wetland ecosystems and conservation priorities in Nepal.',
  '2026-01-15'
)
on conflict (slug) do nothing;

insert into public.team_members (name, slug, position, bio)
values (
  'Ram Joshi',
  'ram-joshi',
  'Research Lead',
  'Leads field research on biodiversity monitoring and community-based conservation.'
)
on conflict (slug) do nothing;

insert into public.news (title, slug, excerpt, content, published_at)
values (
  'World Environment Day 2026',
  'world-environment-day-2026',
  'Greenalaya Nepal joined local communities for wetland restoration activities.',
  'On World Environment Day 2026, our team worked with community partners to restore wetland habitats and raise awareness about climate resilience.',
  '2026-06-05'
)
on conflict (slug) do nothing;
