// The address of every project. It sits apart from the content so that
// proxy.ts can check an address without loading every word on the site.
// A project in lib/content.ts cannot use a slug that is not listed here.
export const SLUGS = [
  "opex-genie",
  "tacnique",
  "technical-lead",
  "telecom-orders",
  "hotel-service-map",
  "bank-security",
  "audit-tracking",
  "room-booking",
  "asset-lifecycle",
] as const;

export type Slug = (typeof SLUGS)[number];
