"use client";

import { useRef } from "react";
import { gsap, still, useGSAP, useResize } from "@/lib/gsap";

type Props = {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: { id: string; label: string }[];
  vertical?: boolean;
  numbered?: boolean;
  // Set when the control swaps a panel (real tabs). Without it, this is a
  // group of toggle buttons, which is what a filter or a stepper is.
  panelId?: string;
};

export const tabId = (panelId: string, id: string) => `${panelId}-tab-${id}`;

// One segmented control for the whole site. The marker slides to the chosen
// option, and the arrow keys, Home and End move between options.
export function Tabs({ label, value, onChange, options, vertical = false, numbered = false, panelId }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  const place = (animate: boolean) => {
    const on = ref.current?.querySelector<HTMLElement>("[data-on]");
    const mark = ref.current?.querySelector<HTMLElement>(".tabs-mark");
    if (!on || !mark) return;
    const to = { x: on.offsetLeft, y: on.offsetTop, width: on.offsetWidth, height: on.offsetHeight };
    if (animate && !still()) gsap.to(mark, { ...to, duration: 0.4, ease: "power3.out", overwrite: true });
    else gsap.set(mark, to);
  };

  useGSAP(
    () => {
      place(!first.current);
      first.current = false;
    },
    { dependencies: [value, options.length], scope: ref },
  );
  useResize(ref, () => place(false));

  const onKey = (e: React.KeyboardEvent) => {
    const i = options.findIndex((o) => o.id === value);
    const last = options.length - 1;
    const fwd = vertical ? "ArrowDown" : "ArrowRight";
    const back = vertical ? "ArrowUp" : "ArrowLeft";
    const n = e.key === fwd ? Math.min(i + 1, last) : e.key === back ? Math.max(i - 1, 0) : e.key === "Home" ? 0 : e.key === "End" ? last : -1;
    if (n < 0) return;
    e.preventDefault();
    e.stopPropagation();
    if (n === i) return;
    onChange(options[n].id);
    requestAnimationFrame(() => ref.current?.querySelector<HTMLElement>("[data-on]")?.focus());
  };

  return (
    <div
      className={`tabs ${vertical ? "tabs-v" : ""}`}
      role={panelId ? "tablist" : "group"}
      aria-label={label}
      aria-orientation={panelId ? (vertical ? "vertical" : "horizontal") : undefined}
      ref={ref}
      onKeyDown={onKey}
    >
      <span className="tabs-mark" aria-hidden />
      {options.map((o, i) => {
        const on = o.id === value;
        const a11y = panelId
          ? { role: "tab", id: tabId(panelId, o.id), "aria-selected": on, "aria-controls": panelId, tabIndex: on ? 0 : -1 }
          : { "aria-pressed": on };
        return (
          <button key={o.id} type="button" className="tab" data-on={on || undefined} onClick={() => onChange(o.id)} {...a11y}>
            {numbered && (
              <span className="tab-num" aria-hidden>
                {i + 1}
              </span>
            )}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
