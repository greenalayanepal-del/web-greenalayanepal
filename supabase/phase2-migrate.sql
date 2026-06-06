-- Phase 2: Replace placeholder content with data from the old GitHub Pages site
-- Safe to re-run (deletes known sample slugs, then upserts real content)

delete from public.news
where slug in ('world-environment-day-2026');

delete from public.team_members
where slug in ('ram-joshi');

delete from public.research
where slug in ('nepal-wetlands-assessment');

delete from public.projects
where slug in ('wetland-conservation');

insert into public.research (title, slug, abstract, pdf_url, published_date)
values (
  'Butterfly Images of Kathmandu Valley',
  'butterfly-images-kathmandu-valley',
  'A comprehensive photographic collection documenting diverse butterfly species across the Kathmandu Valley. This visual guide showcases 174 species captured across different seasons and habitats, serving as an important reference for researchers, conservationists, and nature enthusiasts.',
  'https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf',
  '2026-04-01'
)
on conflict (slug) do update set
  title = excluded.title,
  abstract = excluded.abstract,
  pdf_url = excluded.pdf_url,
  published_date = excluded.published_date;

insert into public.projects (title, slug, description)
values
  (
    'Emerging Environmental Issues & Research',
    'emerging-environmental-issues-research',
    'Addressing new and understudied environmental challenges through credible science and field inquiry.'
  ),
  (
    'Conservation & Ecosystem Restoration',
    'conservation-ecosystem-restoration',
    'Protecting and rehabilitating habitats to restore biodiversity and ecosystem function.'
  ),
  (
    'Climate Change & Pollution Management',
    'climate-change-pollution-management',
    'Supporting adaptation, mitigation, and pollution reduction for climate-resilient communities.'
  ),
  (
    'Innovation, Eco-Products & Circular Economy',
    'innovation-eco-products-circular-economy',
    'Linking conservation with livelihoods through green enterprise and circular economy models.'
  ),
  (
    'Environmental Technology & Data Systems',
    'environmental-technology-data-systems',
    'Applying GIS, AI, and data systems for smarter environmental monitoring and decision-making.'
  ),
  (
    'Community Conservation & Capacity Building',
    'community-conservation-capacity-building',
    'Empowering local communities through participatory conservation, training, and stewardship.'
  ),
  (
    'Environmental Policy, Governance & Ethics',
    'environmental-policy-governance-ethics',
    'Advancing science-based policies, governance, and ethical standards for sustainable development.'
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description;
