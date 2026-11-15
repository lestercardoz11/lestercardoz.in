import type { Metadata } from "next";
import { meta } from "@/lib/site";
import { View } from "@/components/View";
import { type Card, WorkIndex } from "@/components/WorkIndex";
import { PROJECTS } from "@/lib/content";

export const metadata: Metadata = meta("/work", "Opex Genie, Tacnique, leading a team of 15+ engineers, and hands-on enterprise ServiceNow.", "Work");

const CARDS: Card[] = PROJECTS.map(({ slug, tracks, name, what, period, metric }) => ({ slug, tracks, name, what, period, metric }));

export default function Work() {
  return (
    <View>
      <WorkIndex cards={CARDS} />
    </View>
  );
}
