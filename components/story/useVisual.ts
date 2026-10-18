"use client";

import type { RefObject } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Q = (selector: string) => HTMLElement[];

/*
  Each chapter visual builds one GSAP timeline. With reduced motion the
  timeline is jumped to its end, so the visual still shows its final state.
*/
export function useVisual(scope: RefObject<HTMLElement | null>, build: (q: Q) => gsap.core.Timeline | void) {
  useGSAP(
    () => {
      const q = gsap.utils.selector(scope) as Q;
      const tl = build(q);
      if (tl && prefersReducedMotion()) {
        tl.repeat(0);
        tl.progress(1).pause();
      }
    },
    { scope },
  );
}
