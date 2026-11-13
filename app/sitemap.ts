import type { MetadataRoute } from "next";

// Mirrors the static site's sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://faris.co.in",
      lastModified: "2026-11-11",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
