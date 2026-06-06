-- Phase 3: Contact form, storage, staff write access
-- Run in Supabase → SQL Editor (safe to re-run where noted)

-- ---------------------------------------------------------------------------
-- Projects table (referenced in app; may already exist from earlier setup)
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'projects' and policyname = 'Public read projects'
  ) then
    create policy "Public read projects"
      on public.projects for select
      using (true);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Contact submissions
-- ---------------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(trim(email)) between 3 and 254),
  subject text check (subject is null or char_length(subject) <= 200),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'contact_submissions'
      and policyname = 'Public insert contact_submissions'
  ) then
    create policy "Public insert contact_submissions"
      on public.contact_submissions for insert
      to anon, authenticated
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public' and tablename = 'contact_submissions'
      and policyname = 'Staff read contact_submissions'
  ) then
    create policy "Staff read contact_submissions"
      on public.contact_submissions for select
      to authenticated
      using (true);
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- Staff write policies (invite staff via Supabase Auth → Users)
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
  tables text[] := array['research', 'team_members', 'news', 'projects'];
begin
  foreach t in array tables
  loop
    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = 'Staff insert ' || t
    ) then
      execute format(
        'create policy "Staff insert %I" on public.%I for insert to authenticated with check (true)',
        t, t
      );
    end if;

    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = 'Staff update ' || t
    ) then
      execute format(
        'create policy "Staff update %I" on public.%I for update to authenticated using (true) with check (true)',
        t, t
      );
    end if;

    if not exists (
      select 1 from pg_policies
      where schemaname = 'public' and tablename = t and policyname = 'Staff delete ' || t
    ) then
      execute format(
        'create policy "Staff delete %I" on public.%I for delete to authenticated using (true)',
        t, t
      );
    end if;
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Storage: public-assets bucket for PDFs and images
-- Upload via Supabase Dashboard → Storage, then set pdf_url / photo_url to:
--   https://<project-ref>.supabase.co/storage/v1/object/public/public-assets/<path>
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'public-assets',
  'public-assets',
  true,
  52428800,
  array[
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Public read public-assets'
  ) then
    create policy "Public read public-assets"
      on storage.objects for select
      to public
      using (bucket_id = 'public-assets');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Staff upload public-assets'
  ) then
    create policy "Staff upload public-assets"
      on storage.objects for insert
      to authenticated
      with check (bucket_id = 'public-assets');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Staff update public-assets'
  ) then
    create policy "Staff update public-assets"
      on storage.objects for update
      to authenticated
      using (bucket_id = 'public-assets')
      with check (bucket_id = 'public-assets');
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage' and tablename = 'objects'
      and policyname = 'Staff delete public-assets'
  ) then
    create policy "Staff delete public-assets"
      on storage.objects for delete
      to authenticated
      using (bucket_id = 'public-assets');
  end if;
end $$;
