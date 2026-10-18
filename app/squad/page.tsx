import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { Squad } from "@/components/squad/Squad";

export const metadata: Metadata = {
  title: "The squad, page 400",
  description: "Lester Cardoz's skills picked as two starting elevens: a full-stack 4-3-3 and a ServiceNow 4-4-2.",
};

export default function SquadPage() {
  return (
    <>
      <Squad />
      <Reveal />
    </>
  );
}
