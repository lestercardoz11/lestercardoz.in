import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { Shell } from "@/components/Shell";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lester Cardoz, senior software engineer in Berlin",
    template: "%s | Lester Cardoz",
  },
  description:
    "Senior software engineer and hands-on technical lead in Berlin. Builds SaaS products on Java, Spring Boot, TypeScript, React and AWS, and enterprise ServiceNow.",
  authors: [{ name: "Lester Cardoz" }],
  openGraph: {
    type: "website",
    siteName: "Lester Cardoz",
    title: "Lester Cardoz, senior software engineer in Berlin",
    description: "Products from an empty repo, backends that read 5M+ bill pages, and a team of 15+ engineers.",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f4f5f8",
};

// Runs before first paint. It marks the page as scripted, so entrances can
// start hidden without a flash, and it restores the chosen version of the site
// (full stack or ServiceNow). A link with ?track=servicenow chooses it.
const BOOT = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=new URLSearchParams(location.search).get("track");if(t==="servicenow"||t==="fullstack")localStorage.setItem("track",t);d.dataset.track=localStorage.getItem("track")==="servicenow"?"servicenow":"fullstack"}catch(e){d.dataset.track="fullstack"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={bricolage.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
