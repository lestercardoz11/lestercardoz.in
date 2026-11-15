import type { Metadata } from "next";

// Set NEXT_PUBLIC_SITE_URL when deploying somewhere other than the main domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lestercardoz.in").replace(/\/$/, "");

export const CONTACT = {
  email: "lesterxcardoz@gmail.com",
  linkedin: "https://www.linkedin.com/in/lestercardoz11",
  github: "https://github.com/lestercardoz11",
};

export const NAME = "Lester Cardoz";
export const SITE_TITLE = `${NAME}, senior software engineer in Berlin`;
export const SITE_DESCRIPTION =
  "Senior software engineer and hands-on technical lead in Berlin. Builds SaaS products on Java, Spring Boot, TypeScript, React and AWS, and enterprise ServiceNow.";

// The part of a link preview that is the same on every page.
// The picture is named here because a page that describes itself would
// otherwise lose the one drawn by app/opengraph-image.tsx.
export const OG: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  siteName: NAME,
  locale: "en_GB",
  images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE }],
};

// What one page tells search engines and link previews about itself: its own
// title and description, and its one true address. Leave the title out for home.
export function meta(path: string, description: string, title?: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { ...OG, url: path, title: title ? `${title} • ${NAME}` : SITE_TITLE, description },
  };
}

// The dock. The number is the keyboard shortcut.
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
