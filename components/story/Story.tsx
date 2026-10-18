"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { PixelBall, type BallHandle } from "@/components/hero/PixelBall";
import { Visual } from "@/components/story/Visual";
import type { Chapter } from "@/lib/content/chapters";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

type Props = {
  stream: string;
  chapters: Chapter[];
  finale: { href: string; label: string };
};

export function Story({ stream, chapters, finale }: Props) {
  const [index, setIndex] = useState(0);
  const dir = useRef(1);
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const runner = useRef<HTMLDivElement>(null);
  const ball = useRef<BallHandle>(null);
  const total = chapters.length;
  const ch = chapters[index];

  const go = useCallback(
    (next: number) => {
      const n = Math.max(0, Math.min(total - 1, next));
      const id = chapters[n].id;
      if (window.location.hash.slice(1) !== id) history.replaceState(null, "", `#${id}`);
      setIndex((cur) => {
        if (n === cur) return cur;
        dir.current = n > cur ? 1 : -1;
        return n;
      });
    },
    [total, chapters],
  );

  // Deep links: /full-stack#opex-genie opens on that chapter, and the hash follows along.
  useEffect(() => {
    const read = () => {
      const id = window.location.hash.slice(1);
      const i = chapters.findIndex((c) => c.id === id);
      if (i >= 0) go(i);
    };
    const raf = requestAnimationFrame(read);
    window.addEventListener("hashchange", read);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", read);
    };
  }, [chapters, go]);


  // Arrow keys move between chapters, like the subpage buttons on a remote.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName)) return;
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        go(index + 1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index]);

  // Swipe between chapters on touch screens. Velocity counts as much as distance.
  useEffect(() => {
    const el = root.current?.querySelector<HTMLElement>(".chapter");
    if (!el) return;
    let startX = 0, startY = 0, startT = 0, active = false;
    const down = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      active = true;
      startX = e.clientX;
      startY = e.clientY;
      startT = performance.now();
    };
    const up = (e: PointerEvent) => {
      if (!active) return;
      active = false;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const v = dx / Math.max(1, performance.now() - startT);
      if (Math.abs(dx) < Math.abs(dy) * 1.3) return;
      if (dx < -70 || v < -0.5) go(index + 1);
      else if (dx > 70 || v > 0.5) go(index - 1);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", () => (active = false));
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
    };
  }, [go, index]);

  // The chapter arrives from the side you are heading toward.
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const reduced = prefersReducedMotion();
      const parts = q(".chapter [data-part]");
      if (reduced) {
        gsap.from(parts, { opacity: 0, duration: 0.25 });
      } else {
        gsap.from(parts, {
          x: dir.current * 36,
          opacity: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
        gsap.from(q(".ch-years"), {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.3,
          ease: "steps(5)",
          clearProps: "clipPath",
        });
      }

      // Roll the ball along the touchline to this chapter.
      const t = track.current, r = runner.current;
      if (!t || !r) return;
      const to = (t.offsetWidth - r.offsetWidth) * (index / (total - 1));
      const from = gsap.getProperty(r, "x") as number;
      const radius = r.offsetWidth / 2;
      if (reduced) {
        gsap.set(r, { x: to });
        return;
      }
      let last = from;
      gsap.to(r, {
        x: to,
        duration: 0.9,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          const x = gsap.getProperty(r, "x") as number;
          ball.current?.turn(0, 0, 1, (x - last) / radius);
          last = x;
        },
      });
    },
    { scope: root, dependencies: [index] },
  );

  // Keep the runner on its dot when the window changes size.
  useEffect(() => {
    const onResize = () => {
      const t = track.current, r = runner.current;
      if (!t || !r) return;
      gsap.set(r, { x: (t.offsetWidth - r.offsetWidth) * (index / (total - 1)) });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, total]);

  const last = index === total - 1;

  return (
    <div ref={root} className="story">
      <div className="band" data-reveal suppressHydrationWarning>
        <h1>{stream}</h1>
        <p className="band-meta" aria-live="polite">
          <span className="sr-only">Chapter </span>
          {index + 1}/{total}
        </p>
      </div>

      <article className="chapter" key={ch.id} aria-labelledby={`ch-${ch.id}`}>
        <div className="ch-text">
          <p className="ch-years txt c-accent" aria-hidden>
            {ch.years}
          </p>
          <h2 className="ch-title txt" id={`ch-${ch.id}`} data-part>
            {ch.title}
          </h2>
          <p className="ch-role" data-part>
            {ch.role}
          </p>
          <div className="prose ch-story" data-part>
            {ch.story.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <dl className="ch-stats" data-part>
            {ch.stats.map((s) => (
              <div key={s.label} className="stat">
                <dt className="sr-only">{s.label}</dt>
                <dd className="stat-value txt c-accent">{s.value}</dd>
                <dd className="stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="ch-side">
          <div className="ch-visual" data-part>
            <Visual visual={ch.visual} />
          </div>
          <ul className="ch-stack txt" data-part aria-label="Stack">
            {ch.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </article>

      <nav className="touchline" aria-label="Chapters" data-reveal suppressHydrationWarning>
        <button
          type="button"
          className="tl-step txt"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label="Previous chapter"
        >
          <span aria-hidden>◀</span> <span className="tl-label">Back</span>
        </button>
        <div className="tl-track" ref={track}>
          <div className="tl-line" aria-hidden />
          <ol className="tl-dots">
            {chapters.map((c, i) => (
              <li key={c.id} style={{ left: `${(i / (total - 1)) * 100}%` }}>
                <button
                  type="button"
                  className="tl-dot"
                  data-on={i === index}
                  data-past={i < index}
                  onClick={() => go(i)}
                  aria-label={`${c.title}, ${c.years}`}
                  aria-current={i === index ? "step" : undefined}
                >
                  <span className="tl-dot-mark" aria-hidden />
                  <span className="tl-dot-label txt">{c.title}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className="tl-runner" ref={runner} aria-hidden>
            <PixelBall ref={ball} res={16} idle={false} className="tl-ball" />
          </div>
        </div>
        {last ? (
          <Link href={finale.href} className="tl-step tl-next txt" aria-label={finale.label}>
            <span className="tl-label">{finale.label}</span> <span aria-hidden>▶</span>
          </Link>
        ) : (
          <button
            type="button"
            className="tl-step tl-next txt"
            onClick={() => go(index + 1)}
            aria-label={`Next chapter: ${chapters[index + 1].title}`}
          >
            <span className="tl-label">Next: {chapters[index + 1].title}</span> <span aria-hidden>▶</span>
          </button>
        )}
      </nav>
    </div>
  );
}
