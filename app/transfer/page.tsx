import { Reveal } from "@/components/shell/Reveal";
import type { Metadata } from "next";
import { Transfer } from "@/components/Transfer";

export const metadata: Metadata = {
  title: "Transfer desk, page 700",
  description: "Lester Cardoz, senior software engineer in Berlin, open to exciting opportunities across Germany, Dubai and the rest of the EU.",
};

export default function TransferPage() {
  return (
    <>
      <Transfer />
      <Reveal />
    </>
  );
}
