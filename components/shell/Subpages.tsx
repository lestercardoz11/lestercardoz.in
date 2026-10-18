"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// The tabs only show when the page is paged, so their visibility is the mode.
const isPaged = (tabs: HTMLElement | null) => !!tabs && getComputedStyle(tabs).display !== "none";

export type Panel = { id: string; label: string; className?: string; node: ReactNode };

/*
  A page that is one spread on a big screen, and Teletext subpages on a small one.
  Each page's stylesheet decides, with a media query, when its panels stop fitting
  side by side. Below that, the tabs appear and only one panel shows at a time.
*/
export function Subpages({ name, panels, className }: { name: string; panels: Panel[]; className: string }) {
  const [on, setOn] = useState(0);
  const tabs = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const total = panels.length;

  const go = (next: number) => {
    const n = (next + total) % total;
    if (n === on) return;
    setOn(n);
  };

  // A new subpage arrives the way a chapter does, from the side you are heading toward.
  const last = useRef(on);
  useEffect(() => {
    const prev = last.current;
    last.current = on;
    if (prev === on) return;
    const dir = on > prev ? 1 : -1;
    const el = root.current?.querySelector<HTMLElement>(`[data-panel="${on}"]`);
    if (!el || !isPaged(tabs.current)) return;
    root.current?.closest(".txt-main")?.scrollTo({ top: 0 });
    if (prefersReducedMotion()) {
      gsap.from(el, { opacity: 0, duration: 0.2 });
    } else {
      gsap.from(el, { x: dir * 32, opacity: 0, duration: 0.45, ease: "power3.out", clearProps: "transform,opacity" });
    }
  }, [on]);

  // Arrow keys turn the subpages, but only when the page is showing them.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (!isPaged(tabs.current)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setOn((cur) => Math.min(total - 1, cur + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setOn((cur) => Math.max(0, cur - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <div ref={root} className={`subpages ${className}`} data-on={on}>
      <nav ref={tabs} className="subtabs" aria-label={`${name}, subpages`}>
        {panels.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className="subtab txt"
            aria-pressed={i === on}
            aria-controls={`sp-${p.id}`}
            onClick={() => go(i)}
          >
            <span className="subtab-num">
              {i + 1}/{total}
            </span>{" "}
            {p.label}
          </button>
        ))}
        <button type="button" className="sp-next txt" onClick={() => go(on + 1)}>
          {on === total - 1 ? `Back to ${panels[0].label}` : `Next: ${panels[on + 1].label}`} <span aria-hidden>▶</span>
        </button>
      </nav>
      {panels.map((p, i) => (
        <div key={p.id} id={`sp-${p.id}`} className={`sp-panel ${p.className ?? ""}`} data-panel={i} data-on={i === on}>
          {p.node}
        </div>
      ))}
    </div>
  );
}
