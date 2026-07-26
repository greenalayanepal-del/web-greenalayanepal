import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const revalidate = 3600;

const staticPaths = [
  "",
  "/about",
  "/projects",
  "/research",
  "/publications",
  "/team",
  "/news",
  "/blog",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  if (!isSupabaseConfigured()) {
    return entries;
  }

  const supabase = await createClient();
  const [projects, research, team, news] = await Promise.all([
    supabase.from("projects").select("slug, created_at"),
    supabase.from("research").select("slug, created_at"),
    supabase.from("team_members").select("slug, created_at"),
    supabase.from("news").select("slug, published_at, created_at"),
  ]);

  for (const [label, result] of [
    ["projects", projects],
    ["research", research],
    ["team_members", team],
    ["news", news],
  ] as const) {
    if (result.error) {
      console.error(`sitemap: failed to load ${label} from Supabase`, result.error.message);
    }
  }

  for (const row of projects.data ?? []) {
    entries.push({
      url: `${base}/projects/${row.slug}`,
      lastModified: row.created_at ? new Date(row.created_at) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const row of research.data ?? []) {
    entries.push({
      url: `${base}/publications/${row.slug}`,
      lastModified: row.created_at ? new Date(row.created_at) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const row of team.data ?? []) {
    entries.push({
      url: `${base}/team/${row.slug}`,
      lastModified: row.created_at ? new Date(row.created_at) : now,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  for (const row of news.data ?? []) {
    entries.push({
      url: `${base}/news/${row.slug}`,
      lastModified: new Date(row.published_at ?? row.created_at ?? now),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return entries;
}
