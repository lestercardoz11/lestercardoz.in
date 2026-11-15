"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type Dispatch, type RefObject, type SetStateAction, useEffect, useEffectEvent } from "react";

gsap.registerPlugin(useGSAP);

// Every animation on the site checks this first. With reduced motion the
// markup is already in its final state, so skipping the tween is enough.
export function still() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// True while the visitor is typing, so shortcuts do not steal keystrokes.
export function typing(e: KeyboardEvent) {
  if (e.metaKey || e.ctrlKey || e.altKey) return true;
  const t = e.target as HTMLElement | null;
  return !!t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName));
}

// Content that changed after a click: each piece fades up in turn.
export function rise(targets: gsap.TweenTarget, y = 10) {
  return gsap.fromTo(targets, { opacity: 0, y }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05, clearProps: "all" });
}

// Left and right arrows step through a sequence of `count` things. Escape, if given, leaves it.
export function useArrowKeys(count: number, set: Dispatch<SetStateAction<number>>, onEscape?: () => void) {
  const escape = useEffectEvent(() => onEscape?.());
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typing(e) || e.defaultPrevented) return;
      if (e.key === "ArrowRight") set((v) => Math.min(v + 1, count - 1));
      if (e.key === "ArrowLeft") set((v) => Math.max(v - 1, 0));
      if (e.key === "Escape") escape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, set]);
}

// Calls back when the element changes size, which includes its fonts arriving.
export function useResize(ref: RefObject<HTMLElement | null>, cb: () => void) {
  const changed = useEffectEvent(cb);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const watcher = new ResizeObserver(() => changed());
    watcher.observe(el);
    return () => watcher.disconnect();
  }, [ref]);
}

export { gsap, useGSAP };
