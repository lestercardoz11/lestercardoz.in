import type { MetadataRoute } from "next";
import { PAGES, SITE_URL } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({
    url: `${SITE_URL}${p.path === "/" ? "" : p.path}`,
    changeFrequency: "monthly",
    priority: p.path === "/" ? 1 : 0.7,
  }));
}
