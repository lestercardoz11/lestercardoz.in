"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, Flip, ScrambleTextPlugin, SplitText);

// Teletext drew a page row by row, so most reveals use stepped easing.
export const TXT_STEPS = "steps(5)";
export const SCRAMBLE_CHARS = "▖▗▘▙▚▛▜▝▞▟█0123456789";

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, useGSAP, Flip, SplitText };
