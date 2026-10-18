import type { Metadata, Viewport } from "next";
import { Archivo, Jersey_10 } from "next/font/google";
import { Fastext } from "@/components/shell/Fastext";
import { TeletextHeader } from "@/components/shell/TeletextHeader";
import { SITE_URL } from "@/lib/pages";
import "./globals.css";

const jersey = Jersey_10({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jersey",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Lester Cardoz, senior software engineer in Berlin",
    template: "%s | Lester Cardoz",
  },
  description:
    "Senior software engineer in Berlin. Full-stack products like Opex Genie and Tacnique, and enterprise ServiceNow, told as a Teletext service.",
  authors: [{ name: "Lester Cardoz" }],
  openGraph: {
    type: "website",
    siteName: "LESTERFAX",
    title: "Lester Cardoz, senior software engineer in Berlin",
    description: "Full-stack and ServiceNow, one Teletext page at a time.",
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

// Scale the set up on screens larger than 1600 by 960, so a 4K display shows the same page, bigger.
const SCALE = `(function(){var d=document.documentElement;function f(){var z=Math.max(1,Math.min(innerWidth/1600,innerHeight/960));d.style.setProperty("--z",z.toFixed(3))}f();addEventListener("resize",f)})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jersey.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCALE }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="crt">
          <div className="screen">
            <TeletextHeader />
            <main className="txt-main" id="main" tabIndex={-1}>
              {children}
            </main>
            <Fastext />
          </div>
        </div>
      </body>
    </html>
  );
}
