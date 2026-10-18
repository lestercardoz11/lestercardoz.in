export type Accent = "ink" | "red" | "green" | "yellow" | "cyan" | "magenta";

export type TxtPage = {
  num: number;
  path: string;
  title: string;
  blurb: string;
  accent: Accent;
};

export const PAGES: TxtPage[] = [
  { num: 100, path: "/", title: "Kick-off", blurb: "The index", accent: "ink" },
  {
    num: 200,
    path: "/full-stack",
    title: "Full-stack",
    blurb: "Tacnique, Opex Genie and leading the build",
    accent: "red",
  },
  {
    num: 300,
    path: "/servicenow",
    title: "ServiceNow",
    blurb: "From developer to technical lead",
    accent: "green",
  },
  {
    num: 400,
    path: "/squad",
    title: "The squad",
    blurb: "My skills, picked as a starting eleven",
    accent: "yellow",
  },
  {
    num: 500,
    path: "/honours",
    title: "Honours",
    blurb: "Results, certificates and degrees",
    accent: "magenta",
  },
  {
    num: 600,
    path: "/dressing-room",
    title: "Dressing room",
    blurb: "How I work, and the football",
    accent: "ink",
  },
  {
    num: 700,
    path: "/transfer",
    title: "Transfer desk",
    blurb: "Germany, Dubai and the rest of the EU",
    accent: "cyan",
  },
];

// Fastext: the four coloured keys at the bottom of every Teletext page.
export const FASTEXT: { key: Exclude<Accent, "ink" | "magenta">; num: number }[] = [
  { key: "red", num: 200 },
  { key: "green", num: 300 },
  { key: "yellow", num: 400 },
  { key: "cyan", num: 700 },
];

export function pageByPath(path: string) {
  return PAGES.find((p) => p.path === path);
}

export function pageByNum(num: number) {
  return PAGES.find((p) => p.num === num);
}

// Set NEXT_PUBLIC_SITE_URL when deploying somewhere other than the main domain.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lestercardoz.in").replace(/\/$/, "");

export const CONTACT = {
  email: "lesterxcardoz@gmail.com",
  linkedin: "https://www.linkedin.com/in/lestercardoz11",
  github: "https://github.com/lestercardoz11",
};
