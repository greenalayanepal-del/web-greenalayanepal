-- Point butterfly publication PDF at the deployed site asset (after public/publications upload)
-- Run in Supabase → SQL Editor

update public.research
set pdf_url = 'https://greenalayanepal.org.np/publications/butterfly_images_of_kathmandu_valley.pdf'
where slug = 'butterfly-images-kathmandu-valley';
