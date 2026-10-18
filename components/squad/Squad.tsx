"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DitherImage } from "@/components/ui/DitherImage";
import { FORMATIONS, PLAYERS } from "@/lib/content/squad";
import { Flip, gsap, prefersReducedMotion, SCRAMBLE_CHARS, useGSAP } from "@/lib/gsap";

type Key = keyof typeof FORMATIONS;

export function Squad() {
  const [formation, setFormation] = useState<Key>("fullstack");
  const [selected, setSelected] = useState(9); // slot index; the striker starts on the ball
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const f = FORMATIONS[formation];
  const player = PLAYERS[f.slots[selected].id];

  const switchTo = (key: Key) => {
    if (key === formation) return;
    // Record where every slot stands before the team re-forms.
    flipState.current = Flip.getState(root.current!.querySelectorAll(".slot"));
    setFormation(key);
  };

  // The eleven slots keep their identity, so Flip can run each one to its new position.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    if (prefersReducedMotion()) return;
    Flip.from(state, { duration: 0.9, ease: "power3.inOut", stagger: 0.025 });
    root.current!.querySelectorAll<HTMLElement>(".slot-name").forEach((el) => {
      gsap.fromTo(el, { scrambleText: { text: " " } }, {
        duration: 0.8,
        scrambleText: { text: el.dataset.name ?? "", chars: SCRAMBLE_CHARS, speed: 0.6 },
      });
    });
  }, [formation]);

  // A pass: the ball travels to whoever you pick.
  useGSAP(
    () => {
      const ball = root.current!.querySelector<HTMLElement>(".pitch-ball")!;
      const slot = f.slots[selected];
      if (prefersReducedMotion()) {
        gsap.set(ball, { left: `${slot.x}%`, top: `${slot.y}%` });
        return;
      }
      gsap.to(ball, { left: `${slot.x}%`, top: `${slot.y}%`, duration: 0.55, ease: "power2.out", overwrite: true });
      gsap.fromTo(".profile-panel [data-part]", { x: 18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power3.out" });
    },
    { scope: root, dependencies: [selected, formation] },
  );

  return (
    <div ref={root} className="squad">
      <div className="band" data-reveal suppressHydrationWarning>
        <h1>The squad</h1>
        <p className="band-meta">
          {f.name}, {f.shape}
        </p>
      </div>

      <div className="squad-grid">
        <div className="pitch-wrap" data-reveal suppressHydrationWarning>
          <div className="pitch" role="group" aria-label={`${f.name} in a ${f.shape}`}>
            <span className="pm pm-half" aria-hidden />
            <span className="pm pm-circle" aria-hidden />
            <span className="pm pm-box pm-box-top" aria-hidden />
            <span className="pm pm-box pm-box-bottom" aria-hidden />
            <span className="pm pm-six pm-six-top" aria-hidden />
            <span className="pm pm-six pm-six-bottom" aria-hidden />
            {f.slots.map((s, i) => {
              const p = PLAYERS[s.id];
              return (
                <button
                  key={i}
                  type="button"
                  className="slot"
                  data-flip-id={`slot-${i}`}
                  data-on={i === selected}
                  style={{ left: `${s.x}%`, top: `${s.y}%` }}
                  onClick={() => setSelected(i)}
                  aria-pressed={i === selected}
                  aria-label={`${p.shirt}, ${p.name}, ${p.position}`}
                >
                  <span className="shirt txt" aria-hidden>
                    {p.shirt}
                  </span>
                  <span className="slot-name txt" data-name={p.name}>
                    {p.name}
                  </span>
                </button>
              );
            })}
            <span className="pitch-ball" data-flip-id="ball" aria-hidden />
          </div>
        </div>

        <div className="squad-side">
          <div className="formation-switch" role="group" aria-label="Pick the eleven" data-reveal suppressHydrationWarning>
            {(Object.keys(FORMATIONS) as Key[]).map((k) => (
              <button
                key={k}
                type="button"
                className="fs-btn txt"
                data-on={k === formation}
                aria-pressed={k === formation}
                onClick={() => switchTo(k)}
              >
                {FORMATIONS[k].name}
                <span className="fs-shape">{FORMATIONS[k].shape}</span>
              </button>
            ))}
          </div>

          <section className="profile-panel" aria-live="polite" data-reveal suppressHydrationWarning>
            <div className="pp-head" data-part>
              <span className="pp-shirt txt">{player.shirt}</span>
              <div>
                <h2 className="pp-name txt">{player.name}</h2>
                <p className="pp-pos">{player.position}</p>
              </div>
            </div>
            <p className="pp-plays" data-part>
              {player.plays}
            </p>
            <ul className="pp-caps txt" data-part aria-label="Where it has played">
              {player.caps.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <div className="bench" data-reveal suppressHydrationWarning>
            <p className="bench-title txt">On the bench</p>
            <ul className="bench-list txt">
              {f.bench.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>

          <figure className="squad-photo" data-reveal suppressHydrationWarning>
            <DitherImage
              src="/pictures/squad.jpg"
              alt="A vintage team photograph of a football squad in white shirts, dithered"
              ramp="yellow"
              pixel={3}
              focus={[50, 35]}
              className="squad-photo-img"
            />
            <figcaption>Not the actual squad.</figcaption>
          </figure>
        </div>
      </div>
    </div>
  );
}
