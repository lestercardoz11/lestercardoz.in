import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/content";
import { NAV, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...NAV.map((n) => ({ url: `${SITE_URL}${n.href === "/" ? "" : n.href}`, changeFrequency: "monthly" as const, priority: n.href === "/" ? 1 : 0.8 })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
