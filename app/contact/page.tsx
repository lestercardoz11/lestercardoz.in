import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { View } from "@/components/View";

export const metadata: Metadata = {
  title: "Contact",
  description: "Lester is in Berlin, eligible to work in Germany and available now.",
};

export default function ContactPage() {
  return (
    <View className="mid">
      <Contact />
    </View>
  );
}
