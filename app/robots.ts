import type { MetadataRoute } from "next";

// Mirrors the static site's robots.txt.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://faris.co.in/sitemap.xml",
  };
}
