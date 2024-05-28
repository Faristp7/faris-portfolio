import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/contact", "portfolio"],
      disallow: [],
    },
    sitemap: "https://faris.website/sitemap.xml",
  };
}
