"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/*
  Draws the page in row by row, the way a Teletext set received it.
  It renders inside each page, after the content, so its effect runs once
  that content has hydrated and never touches server HTML React still owns.
*/
export function Reveal() {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    const page = ref.current?.closest(".page");
    if (!page) return;
    const rows = Array.from(page.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!rows.length) return;
    if (prefersReducedMotion()) {
      gsap.from(rows, { opacity: 0, duration: 0.3, stagger: 0.02 });
      return;
    }
    gsap.from(rows, {
      clipPath: "inset(0% 0% 100% 0%)",
      y: 10,
      duration: 0.34,
      ease: "steps(4)",
      stagger: 0.05,
      delay: 0.06,
      clearProps: "clipPath,transform",
    });
  });
  return <span ref={ref} hidden />;
}
