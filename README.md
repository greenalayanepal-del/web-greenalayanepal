# Greenalaya Nepal

Public website for [Greenalaya Nepal](https://greenalayanepal.org.np) — research, conservation, and green enterprise in Nepal.

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript, Supabase (Postgres, Storage), optional Resend for contact alerts.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public anon key for data + auth |
| `SUPABASE_SERVICE_ROLE_KEY` | Scripts only | `apply-phase4.mjs`, `update-butterfly-db-url.mjs` |
| `RESEND_API_KEY` | Optional | Email staff on contact form submit |
| `CONTACT_NOTIFY_EMAIL` | Optional | Recipient for contact alerts |
| `CONTACT_FROM_EMAIL` | Optional | Sender for Resend |

Never commit `.env.local` or expose the service role key in the browser.

## Supabase setup

Run SQL files in order in **Supabase → SQL Editor**:

1. [`supabase/schema.sql`](supabase/schema.sql) — base tables (`research`, `team_members`, `news`)
2. [`supabase/phase2-migrate.sql`](supabase/phase2-migrate.sql) — legacy content from GitHub Pages
3. [`supabase/phase3.sql`](supabase/phase3.sql) — projects, contact form, storage
4. [`supabase/phase4.sql`](supabase/phase4.sql) — content seeds, PDF URL sync
5. [`supabase/phase5.sql`](supabase/phase5.sql) — newsletter subscribers
6. [`supabase/phase6.sql`](supabase/phase6.sql) — `collaborators` and `supported_by` tables for the About page marquee
7. [`supabase/phase7-hardening.sql`](supabase/phase7-hardening.sql) — DB-level rate limiting on contact/newsletter inserts
8. [`supabase/phase9-team-linkedin.sql`](supabase/phase9-team-linkedin.sql) — `linkedin_url` column on `team_members`

There is no staff/admin login — all content is edited directly in Supabase Table Editor (see below). If you previously applied an older version of phase3/phase5/phase7 that added staff RLS policies and an `is_staff()` function, run [`supabase/phase8-remove-staff-access.sql`](supabase/phase8-remove-staff-access.sql) once to drop them.

One-off: [`supabase/phase3-butterfly-url.sql`](supabase/phase3-butterfly-url.sql) (or `node scripts/update-butterfly-db-url.mjs`) points the butterfly publication's `pdf_url` at the deployed asset — run after uploading the PDF.

### Contact email alerts

After deploying with Resend configured:

```bash
node scripts/setup-contact-alerts.mjs
```

## Content management (Supabase Studio)

This project uses **Supabase Table Editor** as the CMS — there is no in-app content editor or admin panel. Edit tables directly in the Supabase dashboard.

| Table | Public page | Notes |
|-------|-------------|-------|
| `research` | `/research` | Publications; set `pdf_url` for downloads |
| `team_members` | `/team` | `slug` must be URL-safe |
| `news` | `/news` | `published_at` controls sort order |
| `projects` | `/projects` | Thematic and field initiatives |
| `contact_submissions` | — | View in Supabase Table Editor |
| `newsletter_subscribers` | — | View in Supabase Table Editor |

**Upload assets:** Supabase → Storage → `public-assets` bucket. Use [`lib/storage.ts`](lib/storage.ts) URL helper in content rows.

**PDFs:** Host under `public/publications/` or Storage; update `pdf_url` in `research`.

When tables are empty locally, the site shows **seed fallbacks** from [`lib/content/seed.ts`](lib/content/seed.ts) for team, news, research, and projects.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test:e2e` | Playwright smoke tests |
| `npm run db:apply-phase4` | Seed team, news, projects (needs service role in `.env.local`) |
| `npm run db:check-phase5` | Verify `newsletter_subscribers` table exists |

## Deployment

Deploy to Vercel (or similar) with the same env vars. Set production URL in [`lib/site.ts`](lib/site.ts) (`siteConfig.url`).

Verify after deploy:

- `/sitemap.xml` and `/robots.txt` load
- Contact form saves to `contact_submissions`
- Butterfly PDF opens from `/publications`

## Project structure

```
app/           Pages (App Router)
components/    UI components
lib/           Site config, Supabase clients, server actions, seeds
public/        Static assets (logo, images, publications PDF)
supabase/      SQL migrations
scripts/       Phase apply, contact alerts, favicon generation
tests/e2e/     Playwright smoke tests
```
