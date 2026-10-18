import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { Story } from "@/components/story/Story";
import { FULL_STACK } from "@/lib/content/chapters";

export const metadata: Metadata = {
  title: "Full-stack, page 200",
  description: "From a Springer paper to Tacnique and Opex Genie: the full-stack career of Lester Cardoz, one chapter at a time.",
};

export default function FullStackPage() {
  return (
    <>
      <Story stream="Full-stack" chapters={FULL_STACK} finale={{ href: "/servicenow", label: "Now the ServiceNow story" }} />
      <Reveal />
    </>
  );
}
