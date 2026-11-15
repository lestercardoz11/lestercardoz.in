"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, still, useGSAP } from "@/lib/gsap";
import { useTrack } from "@/lib/track";

// Wraps every page. Anything marked data-in arrives in order when the page
// opens, and again when the visitor switches between full stack and ServiceNow.
export function View({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const track = useTrack();
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const items = el.querySelectorAll("[data-in]");
      if (!still() && items.length) {
        gsap.set(el, { opacity: 1, y: 0 });
        gsap.fromTo(items, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.055, clearProps: "opacity,transform" });
      }
      // From here GSAP owns the hidden state, so the stylesheet can let go.
      el.classList.add("ready");
    },
    { dependencies: [pathname, track], scope: ref },
  );

  return (
    <div key={pathname} ref={ref} className={`view ${className}`}>
      {children}
    </div>
  );
}
