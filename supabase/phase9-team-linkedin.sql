-- Phase 9: LinkedIn on team profiles
-- Run in Supabase → SQL Editor (safe to re-run)
--
-- The Our Team page shows one social link per member: LinkedIn. Add the
-- column so it can be set per row in Table Editor.

alter table public.team_members
  add column if not exists linkedin_url text;
