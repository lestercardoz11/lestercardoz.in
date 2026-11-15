import type { Metadata } from "next";
import { About } from "@/components/About";
import { View } from "@/components/View";

export const metadata: Metadata = {
  title: "About",
  description: "From a computer science degree to technical lead to Berlin, how Lester works, and his credentials.",
};

export default function AboutPage() {
  return (
    <View>
      <About />
    </View>
  );
}
