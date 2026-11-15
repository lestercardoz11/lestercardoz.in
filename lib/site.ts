// Set NEXT_PUBLIC_SITE_URL when deploying somewhere other than the main domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lestercardoz.in").replace(/\/$/, "");

export const CONTACT = {
  email: "lesterxcardoz@gmail.com",
  linkedin: "https://www.linkedin.com/in/lestercardoz11",
  github: "https://github.com/lestercardoz11",
};

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
