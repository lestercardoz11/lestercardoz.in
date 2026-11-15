import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { View } from "@/components/View";
import { CONTACT, meta, NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = meta("/", SITE_DESCRIPTION);

// Tells search engines who the site is about, and that the LinkedIn and GitHub
// profiles belong to the same person.
const PERSON = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Person",
  name: NAME,
  url: SITE_URL,
  jobTitle: "Senior software engineer",
  address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
  sameAs: [CONTACT.linkedin, CONTACT.github],
}).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <View className="mid">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: PERSON }} />
      <Hero />
    </View>
  );
}
