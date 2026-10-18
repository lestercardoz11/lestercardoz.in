"use client";

import { useRef, useState } from "react";
import { Subpages } from "@/components/shell/Subpages";
import { DitherImage } from "@/components/ui/DitherImage";
import { ART, Mosaic } from "@/components/ui/Mosaic";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

const PRINCIPLES = [
  "Accountable for the result.",
  "I own the solution design.",
  "Perfect, whenever time allows.",
  "The last line of defence.",
  "New tech? I learn it on the job.",
];

const ROUTINE = [
  "Understand the issue.",
  "Find the root cause.",
  "Troubleshoot where it is needed.",
  "Work on the fix.",
  "Deliver the fix.",
  "Finish it with tests.",
];

export function DressingRoom() {
  const [flipped, setFlipped] = useState(false);
  const inner = useRef<HTMLDivElement>(null);

  // A sticker turned over by hand: a spring with a little overshoot, because you flicked it.
  const turn = () => {
    const next = !flipped;
    setFlipped(next);
    const el = inner.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { rotationY: next ? 180 : 0 });
      return;
    }
    gsap.to(el, { rotationY: next ? 180 : 0, duration: 0.8, ease: "back.out(1.4)", overwrite: true });
  };

  return (
    <>
      <div className="band" data-reveal suppressHydrationWarning>
        <h1>Dressing room</h1>
        <p className="band-meta">How I play</p>
      </div>
      <Subpages
        name="Dressing room"
        className="dressing"
        panels={[
          {
            id: "sticker",
            label: "The sticker",
            className: "dr-col-1",
            node: (
              <div data-reveal suppressHydrationWarning>
                <button type="button" className="sticker" onClick={turn} aria-pressed={flipped} aria-label="Player sticker. Turn it over.">
                  <div className="sticker-inner" ref={inner}>
                    <div className="sticker-face" aria-hidden={flipped}>
                      <DitherImage
                        src="/pictures/memoji.jpg"
                        alt="Lester's Memoji, pixelated like a sticker"
                        ramp="navy"
                        pixel={5}
                        focus={[50, 45]}
                        zoom={1.45}
                        contrast={1.6}
                        className="sticker-photo"
                      />
                      <p className="sticker-name">Lester Cardoz</p>
                      <div className="sticker-meta">
                        <span>Full-stack, ServiceNow</span>
                        <span>Berlin</span>
                      </div>
                    </div>
                    <div className="sticker-face sticker-back" aria-hidden={!flipped}>
                      <h3>On the back</h3>
                      <dl>
                        <dt>Based</dt>
                        <dd>Berlin, since 2026</dd>
                        <dt>Former</dt>
                        <dd>Ajackus, Jul 2020 to Aug 2026</dd>
                        <dt>Debut</dt>
                        <dd>.NET intern, Oman, 2018</dd>
                        <dt>Positions</dt>
                        <dd>Full-stack, backend, frontend, ServiceNow</dd>
                        <dt>Languages</dt>
                        <dd>English C2. German, learning.</dd>
                        <dt>Kit bag</dt>
                        <dd>Claude Code, IntelliJ, VS Code, Postman, Figma</dd>
                        <dt>Supports</dt>
                        <dd>Tottenham Hotspur</dd>
                      </dl>
                      <Mosaic rows={[...ART.cockerel]} className="sticker-cockerel" label="A pixel cockerel standing on a ball" />
                    </div>
                  </div>
                </button>
                <p className="sticker-hint">Tap the sticker to turn it over</p>
              </div>
            ),
          },
          {
            id: "talk",
            label: "Team talk",
            className: "dr-col-2",
            node: (
              <>
                <h2 className="sec-title" data-reveal suppressHydrationWarning>
                  Team talk
                </h2>
                <ul className="talk" data-reveal suppressHydrationWarning>
                  {PRINCIPLES.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <h2 className="sec-title routine-title" data-reveal suppressHydrationWarning>
                  The routine when it breaks
                </h2>
                <ol className="routine" data-reveal suppressHydrationWarning>
                  {ROUTINE.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ol>
                <p className="dr-note" data-reveal suppressHydrationWarning>
                  I work async first and talk live when it helps. I make sure a requirement is understood before I build it,
                  and I push back only when a request falls outside what was agreed.
                </p>
              </>
            ),
          },
          {
            id: "terrace",
            label: "On the terrace",
            className: "dr-col-3",
            node: (
              <div className="dr-terrace" data-reveal suppressHydrationWarning>
                <figure className="keeper">
                  <DitherImage
                    src="/pictures/keeper.jpg"
                    alt="A goalkeeper diving full stretch to save a shot under floodlights, dithered"
                    ramp="cyan"
                    pixel={3}
                    focus={[45, 50]}
                    className="keeper-img"
                  />
                  <figcaption>Full stretch under the floodlights. Some days the job needs exactly that.</figcaption>
                </figure>
                <div>
                  <p className="terrace">
                    Football is the other half. I play whenever I can, and I follow Spurs through every high and every low,
                    which turns out to be good training for production incidents.
                  </p>
                  <p className="motto">Audere est facere. To dare is to do.</p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </>
  );
}
