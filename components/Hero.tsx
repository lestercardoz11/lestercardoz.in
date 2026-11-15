"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { TLink } from "@/components/Shell";
import { HOME, type Track } from "@/lib/content";
import { gsap, still, useGSAP } from "@/lib/gsap";
import { useTrack } from "@/lib/track";

// Each version of the site has its own set of endings, so switching version starts the sentence again.
export function Hero() {
  const track = useTrack();
  return <Sentence key={track} track={track} />;
}

// The sentence finishes several different ways. Clicking the highlighted part
// swaps the ending, and the marker swipes across the new one.
function Sentence({ track }: { track: Track }) {
  const { hi, lines, facts } = HOME[track];
  const [i, setI] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const item = lines[i];

  const { contextSafe } = useGSAP({ scope: root });

  const next = contextSafe(() => {
    const n = (i + 1) % lines.length;
    if (still()) {
      setI(n);
      return;
    }
    gsap.to(".swap", {
      opacity: 0,
      y: -8,
      duration: 0.14,
      ease: "power1.in",
      overwrite: true,
      onComplete: () => setI(n),
    });
  });

  useGSAP(
    () => {
      if (still()) return;
      gsap.fromTo(".slot-mark", { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.5, ease: "power2.out" });
      gsap.fromTo(".swap", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.35, ease: "power3.out", stagger: 0.05, overwrite: true, clearProps: "transform" });
    },
    { dependencies: [i], scope: root },
  );

  return (
    <div className="hero" ref={root}>
      <div className="hero-hi" data-in>
        <Image src="/img/memoji.jpg" alt="" width={56} height={56} className="hero-face" priority />
        <span>{hi}</span>
      </div>

      <h1 className="hero-line" data-in>
        I{" "}
        {/* A shortcut for the mouse. The button below is the real control. */}
        <span className="slot-mark" onClick={next}>
          <span className="swap">{item.phrase}</span>
        </span>
        .
      </h1>

      <div className="hero-under" data-in>
        <button type="button" className="shuffle" onClick={next} title="Finish the sentence a different way">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
            <path d="M4 7h3.5c2 0 3.2 1 4.5 5s2.5 5 4.5 5H20M4 17h3.5c1 0 1.8-.3 2.5-1M20 7h-3.5c-1 0-1.8.3-2.5 1M17 4l3 3-3 3M17 14l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Show another
          <span className="count" aria-hidden>
            {i + 1} of {lines.length}
          </span>
        </button>
        <p className="hero-proof swap" aria-live="polite">
          {item.proof}
        </p>
        <div className="hero-cta swap">
          <TLink href={item.href} className="btn btn-solid">
            {item.cta}
          </TLink>
          <TLink href="/contact" className="btn">
            Get in touch
          </TLink>
        </div>
      </div>

      <dl className="facts" data-in>
        {facts.map((f) => (
          <div key={f.value}>
            <dt>{f.value}</dt>
            <dd>{f.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
