import Link from "next/link";
import { Reveal } from "@/components/shell/Reveal";

export default function NotFound() {
  return (
    <div className="lost">
      <p className="lost-num" data-reveal>
        404
      </p>
      <p data-reveal>This page is not in service. Teletext would make you wait for it to come round again. You can skip that.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} data-reveal>
        <Link href="/" className="btn" data-accent="yellow">
          Back to the index, page 100
        </Link>
      </div>
      <Reveal />
    </div>
  );
}
