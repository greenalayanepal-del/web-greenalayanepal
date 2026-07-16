-- Phase 4: Content seed, PDF URL sync, optional flagship project
-- Run in Supabase → SQL Editor (safe to re-run)

-- 1. Butterfly PDF URL (hosted on production site)
update public.research
set pdf_url = 'https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf'
where slug = 'butterfly-images-kathmandu-valley';

-- 2. Team
insert into public.team_members (name, slug, position, bio, photo_url)
values (
  'Siddartha Sapkota',
  'siddartha-sapkota',
  NULL,
  'Supports Greenalaya Nepal''s governance and strategic direction, linking conservation research with community-centered environmental action across Nepal.',
  '/images/team/siddartha-sapkota.jpg'
)
on conflict (slug) do update set
  name = excluded.name,
  position = excluded.position,
  bio = excluded.bio,
  photo_url = excluded.photo_url;

-- 3. News
insert into public.news (title, slug, excerpt, content, published_at)
values
  (
    'Butterfly Images of Kathmandu Valley — publication released',
    'butterfly-images-kathmandu-valley-released',
    'Our photographic guide documenting 174 butterfly species in the Kathmandu Valley is now available as a free PDF.',
    'Greenalaya Nepal has published Butterfly Images of Kathmandu Valley, a visual reference documenting 174 butterfly species observed across seasons and habitats in the valley. The publication supports researchers, conservation practitioners, educators, and nature enthusiasts working on urban biodiversity in Nepal.

Download the PDF from our Publications page or the Research section.',
    '2026-04-21'
  ),
  (
    'Greenalaya Nepal — research and innovation for nature',
    'greenalaya-nepal-launch',
    'We are building a national platform that connects conservation with research, technology, and sustainable enterprise.',
    'Greenalaya Nepal is a national environmental organization focused on credible science, community-centered conservation, and green enterprise. Our work spans emerging environmental research, ecosystem restoration, climate and pollution action, environmental technology, capacity building, and science-based policy.

We welcome collaborations with researchers, communities, students, and partner organizations. Reach us through the contact page to volunteer, intern, or explore partnerships.',
    '2026-04-13'
  )
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  content = excluded.content,
  published_at = excluded.published_at;

-- 4. Flagship field project (concrete initiative beyond thematic pillars)
insert into public.projects (title, slug, description)
values (
  'Kathmandu Valley Butterfly Documentation',
  'kathmandu-valley-butterfly-documentation',
  'A field documentation initiative cataloguing butterfly diversity across the Kathmandu Valley, producing open reference material for research, education, and urban biodiversity conservation.'
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description;
