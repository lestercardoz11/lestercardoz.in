import type { Metadata } from "next";
import { meta } from "@/lib/site";
import { About } from "@/components/About";
import { View } from "@/components/View";

export const metadata: Metadata = meta("/about", "From a computer science degree to technical lead to Berlin, how Lester works, and his credentials.", "About");

export default function AboutPage() {
  return (
    <View>
      <About />
    </View>
  );
}
