import type { MetadataRoute } from "next";
import { SEO } from "@/data/portfolio";
import { getAllProjectSlugs } from "@/data/projects";
import { getAllStorySlugs } from "@/data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SEO.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/#about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#stack`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/#experience`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/stories`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const storyRoutes: MetadataRoute.Sitemap = getAllStorySlugs().map((slug) => ({
    url: `${base}/stories/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...storyRoutes];
}
