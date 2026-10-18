import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { Honours } from "@/components/Honours";

export const metadata: Metadata = {
  title: "Honours, page 500",
  description: "Results, certifications, degrees and a Springer paper: the honours board of Lester Cardoz.",
};

export default function HonoursPage() {
  return (
    <>
      <Honours />
      <Reveal />
    </>
  );
}
