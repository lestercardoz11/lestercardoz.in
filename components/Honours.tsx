"use client";

import { useRef } from "react";
import { Subpages } from "@/components/shell/Subpages";
import { ART, Mosaic } from "@/components/ui/Mosaic";
import { HONOURS, RESULTS } from "@/lib/content/honours";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const fmt = (n: number) => n.toLocaleString("en-GB");

export function Honours() {
  const root = useRef<HTMLDivElement>(null);

  // The scores come in like a vidiprinter: each number counts up to full time.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".result-count").forEach((el, i) => {
        const target = Number(el.dataset.count);
        const c = { n: 0 };
        gsap.to(c, {
          n: target,
          duration: 1.1,
          delay: 0.25 + i * 0.08,
          ease: "steps(12)",
          onUpdate: () => {
            el.textContent = fmt(Math.round(c.n));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className="page-inner" style={{ display: "contents" }}>
      <div className="band" data-reveal suppressHydrationWarning>
        <h1>Honours</h1>
        <p className="band-meta">Results and the cabinet</p>
      </div>
      <Subpages
        name="Honours"
        className="honours-grid"
        panels={[
          {
            id: "results",
            label: "Results",
            node: (
              <section aria-labelledby="results-title">
                <h2 id="results-title" className="sec-title" data-reveal suppressHydrationWarning>
                  Results
                </h2>
                <ol className="results">
                  {RESULTS.map((r) => (
                    <li key={r.label} className="result" data-reveal suppressHydrationWarning>
                      <span className="result-num txt">
                        {r.pre}
                        <span className="result-count" data-count={r.count} suppressHydrationWarning>
                          {fmt(r.count)}
                        </span>
                        {r.post}
                      </span>
                      <span className="result-label">{r.label}</span>
                      <span className="result-where txt">{r.where}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ),
          },
          {
            id: "cabinet",
            label: "The cabinet",
            node: (
              <section aria-labelledby="cabinet-title">
                <h2 id="cabinet-title" className="sec-title" data-reveal suppressHydrationWarning>
                  The cabinet
                </h2>
                <ul className="cabinet">
                  {HONOURS.map((h) => (
                    <li key={h.title} className="honour" data-reveal suppressHydrationWarning>
                      <Mosaic rows={[...ART[h.kind]]} className="honour-art" />
                      <span className="honour-year txt">{h.year}</span>
                      <h3 className="honour-title">{h.title}</h3>
                      <p className="honour-detail">{h.detail}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ),
          },
        ]}
      />
    </div>
  );
}
