import type { Metadata } from "next";
import { meta } from "@/lib/site";
import { Contact } from "@/components/Contact";
import { View } from "@/components/View";

export const metadata: Metadata = meta("/contact", "Lester is in Berlin, eligible to work in Germany and available now.", "Contact");

export default function ContactPage() {
  return (
    <View className="mid">
      <Contact />
    </View>
  );
}
