"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { pageByPath } from "@/lib/pages";

let noiseUrl: string | null = null;
function noise() {
  if (noiseUrl) return noiseUrl;
  const c = document.createElement("canvas");
  c.width = c.height = 80;
  const ctx = c.getContext("2d")!;
  const img = ctx.createImageData(80, 80);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() > 0.5 ? 255 : 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 90;
  }
  ctx.putImageData(img, 0, 0);
  noiseUrl = c.toDataURL();
  return noiseUrl;
}

// Every navigation remounts this, so each new page is "received" the Teletext way:
// a burst of static. Each page draws its own rows in with <Reveal />.
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const accent = pageByPath(pathname)?.accent ?? "red";
  const ref = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const flash = flashRef.current;
      if (!flash || pathname === "/" || prefersReducedMotion()) return;
      flash.style.backgroundImage = `url(${noise()})`;
      gsap.fromTo(
        flash,
        { opacity: 0.55, backgroundPosition: "0px 0px" },
        { opacity: 0, backgroundPosition: "37px 91px", duration: 0.22, ease: "steps(4)" },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="page" data-accent={accent}>
      {children}
      <div ref={flashRef} className="static-flash" aria-hidden />
    </div>
  );
}
