import type { Metadata } from "next";
import { Skills } from "@/components/Skills";
import { View } from "@/components/View";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Skills",
  description: "Java, Spring Boot, TypeScript, Node.js, React, Next.js, Angular, PostgreSQL, AWS and ServiceNow.",
};

// The skills page only needs each project's name, for its "See it in" links.
const NAMES = Object.fromEntries(PROJECTS.map((p) => [p.slug, p.name]));

export default function SkillsPage() {
  return (
    <View>
      <Skills names={NAMES} />
    </View>
  );
}
