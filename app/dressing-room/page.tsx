import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { DressingRoom } from "@/components/DressingRoom";

export const metadata: Metadata = {
  title: "Dressing room, page 600",
  description: "How Lester Cardoz works: accountability, solution design, the last line of defence, and a lot of football.",
};

export default function DressingRoomPage() {
  return (
    <>
      <DressingRoom />
      <Reveal />
    </>
  );
}
