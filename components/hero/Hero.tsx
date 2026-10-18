"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { PixelBall, type BallHandle } from "@/components/hero/PixelBall";
import { gsap, prefersReducedMotion, SCRAMBLE_CHARS, SplitText, useGSAP } from "@/lib/gsap";
import { PAGES } from "@/lib/pages";

const VERDICTS: [number, string][] = [
  [25, "World class."],
  [15, "Proper touch."],
  [8, "Tidy."],
  [3, "Not bad."],
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const ball = useRef<BallHandle>(null);
  const [keepy, setKeepy] = useState({ streak: 0, best: 0, verdict: "", touched: false });

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const roll = q(".ball-roll")[0] as HTMLElement;
      const reduced = prefersReducedMotion();
      let seen = false;
      try {
        seen = sessionStorage.getItem("intro-seen") === "1";
        sessionStorage.setItem("intro-seen", "1");
      } catch {}

      gsap.set(q(".hero-reveal"), { autoAlpha: 1 });
      if (reduced) {
        gsap.set(q(".crt-on"), { display: "none" });
        return;
      }

      const split = SplitText.create(q(".hero-lede"), { type: "lines", mask: "lines" });
      const size = roll.offsetWidth;
      const slot = roll.getBoundingClientRect();
      const startX = window.innerWidth - slot.left + size * 0.6;

      const tl = gsap.timeline({ defaults: { ease: "steps(5)" } });

      if (!seen) {
        // Power on: a single bright line, then the picture opens out of it.
        tl.set(q(".crt-on"), { display: "block" })
          .fromTo(q(".crt-line"), { scaleX: 0 }, { scaleX: 1, duration: 0.22, ease: "power2.out" })
          .to(q(".crt-line"), { scaleY: 400, opacity: 0, duration: 0.32, ease: "power3.in" })
          .to(q(".crt-on"), { opacity: 0, duration: 0.2, ease: "none" }, "-=0.12")
          .set(q(".crt-on"), { display: "none" });
      } else {
        tl.set(q(".crt-on"), { display: "none" });
      }

      tl.from(
        q(".ch"),
        {
          clipPath: "inset(100% 0% 0% 0%)",
          color: "#45e3ff",
          duration: 0.3,
          stagger: 0.05,
          clearProps: "clipPath",
        },
        seen ? 0 : "-=0.05",
      );

      // The ball arrives like a pass from the right wing: in the air, two bounces, into the O.
      const roll0 = { x: startX, last: startX };
      tl.fromTo(
        roll,
        { x: startX },
        {
          x: 0,
          duration: 1.25,
          ease: "power3.out",
          onUpdate() {
            const x = gsap.getProperty(roll, "x") as number;
            const v = (x - roll0.last) / (1 / 60);
            roll0.last = x;
            ball.current?.spin(0, 0, v / (size / 2));
          },
        },
        "-=0.55",
      );
      tl.fromTo(
        roll,
        { y: -size * 1.9 },
        {
          keyframes: [
            { y: 0, duration: 0.42, ease: "power2.in" },
            { y: -size * 0.7, duration: 0.3, ease: "power2.out" },
            { y: 0, duration: 0.3, ease: "power2.in" },
            { y: -size * 0.18, duration: 0.14, ease: "power2.out" },
            { y: 0, duration: 0.14, ease: "power2.in" },
          ],
        },
        "<",
      );

      tl.from(split.lines, { yPercent: 100, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.55")
        .from(q(".hero-sub, .hero-actions > *"), { y: 18, autoAlpha: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" }, "-=0.35")
        .from(q(".idx-row"), { clipPath: "inset(0% 100% 0% 0%)", duration: 0.3, stagger: 0.06, clearProps: "clipPath" }, "<")
        .add(() => {
          q(".idx-num").forEach((el, i) => {
            gsap.to(el, {
              duration: 0.5,
              delay: i * 0.05,
              scrambleText: { text: el.textContent ?? "", chars: SCRAMBLE_CHARS, speed: 0.6 },
            });
          });
        }, "<")
        .from(q(".keepy"), { autoAlpha: 0, y: 10, duration: 0.4, ease: "power3.out" }, "-=0.1");

      // Any key or click hurries the intro along instead of making you wait.
      const hurry = () => tl.timeScale(3.5);
      window.addEventListener("keydown", hurry, { once: true });
      root.current?.addEventListener("pointerdown", hurry, { once: true });
      return () => {
        window.removeEventListener("keydown", hurry);
        split.revert();
      };
    },
    { scope: root },
  );

  const onKeepy = (streak: number, best: number, ended: boolean) => {
    if (!ended) {
      setKeepy((k) => ({ ...k, streak, best: Math.max(best, k.best), verdict: "", touched: true }));
      return;
    }
    const verdict = VERDICTS.find(([n]) => streak >= n)?.[1] ?? "";
    setKeepy((k) => ({ ...k, streak: 0, best, verdict: verdict ? `${streak} in a row. ${verdict}` : "" }));
  };

  return (
    <section ref={root} className="hero" aria-labelledby="hero-name">
      <h1 id="hero-name" className="sr-only">
        Lester Cardoz, senior software engineer
      </h1>

      <div className="hero-name txt" aria-hidden>
        <div className="name-line">
          {"LESTER".split("").map((c, i) => (
            <span className="ch" key={i}>
              {c}
            </span>
          ))}
        </div>
        <div className="name-line">
          {"CARD".split("").map((c, i) => (
            <span className="ch" key={i}>
              {c}
            </span>
          ))}
          <span className="ball-slot">
            <span className="ball-roll">
              <PixelBall
                ref={ball}
                mode="hero"
                res={60}
                className="ball-body"
                label="A pixel football. Tap it for keepy-uppies, drag it to spin."
                onKeepy={onKeepy}
              />
            </span>
          </span>
          <span className="ch">Z</span>
        </div>
      </div>

      <div className="hero-copy">
        <p className="hero-lede hero-reveal">
          Senior software engineer in Berlin. I build full-stack products and enterprise ServiceNow platforms, and I own
          them from the first requirement to the night they break.
        </p>
        <p className="hero-sub hero-reveal">Coder by trade, footballer at heart.</p>
        <div className="hero-actions hero-reveal">
          <Link href="/full-stack" className="btn" data-accent="red">
            Start with full-stack
          </Link>
          <Link href="/servicenow" className="btn" data-accent="green">
            Start with ServiceNow
          </Link>
        </div>
      </div>

      <nav className="hero-index" aria-label="Index of pages">
        {PAGES.slice(1).map((p) => (
          <Link key={p.num} href={p.path} className="idx-row" data-accent={p.accent}>
            <span className="idx-num txt">{p.num}</span>
            <span className="idx-text">
              <span className="idx-title txt">{p.title}</span>
              <span className="idx-blurb">{p.blurb}</span>
            </span>
          </Link>
        ))}
      </nav>

      <div className="keepy txt hero-reveal" aria-live="polite">
        <button type="button" className="keepy-btn" onClick={() => ball.current?.kick()}>
          {keepy.touched ? "Keepy-uppies" : "Tap the ball for keepy-uppies"}
        </button>
        {keepy.touched ? <span className="c-yellow">{keepy.streak}</span> : null}
        {keepy.touched || keepy.best > 0 ? (
          <span className="keepy-best">
            Best <span className="c-yellow">{keepy.best}</span>
          </span>
        ) : null}
        {keepy.verdict ? <span className="c-green keepy-verdict">{keepy.verdict}</span> : null}
      </div>

      <div className="crt-on" aria-hidden>
        <div className="crt-line" />
      </div>
    </section>
  );
}
