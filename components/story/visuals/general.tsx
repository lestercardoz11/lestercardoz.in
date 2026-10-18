"use client";

import { useEffect, useRef, useState } from "react";
import { useVisual } from "@/components/story/useVisual";
import { DitherImage, type Ramp } from "@/components/ui/DitherImage";
import { gsap, SCRAMBLE_CHARS } from "@/lib/gsap";

/* The thesis: a bearing's vibration signal, with faults flagged by three models. */
export function ScopeVisual() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [faults, setFaults] = useState(0);
  const [votes, setVotes] = useState([0, 0, 0]);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const W = 180, H = 84;
    cv.width = W;
    cv.height = H;
    const styles = getComputedStyle(cv);
    const accent = styles.getPropertyValue("--accent").trim() || "#ff5a4e";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const buf: { y: number; fault: boolean }[] = [];
    let t = 0;
    let count = 0;
    const sample = () => {
      t++;
      const base = Math.sin(t * 0.35) * 7 + Math.sin(t * 1.3) * 3 + (Math.random() - 0.5) * 5;
      const fault = t % 64 === 0;
      return { y: fault ? base + (Math.random() > 0.5 ? 1 : -1) * (24 + Math.random() * 8) : base, fault };
    };
    for (let i = 0; i < W; i++) buf.push(sample());

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#1c2f72";
      for (let x = 0; x < W; x += 10) ctx.fillRect(x, H / 2, 1, 1);
      let prev = Math.round(H / 2 + buf[0].y);
      for (let x = 0; x < W; x++) {
        const y = Math.round(H / 2 + buf[x].y);
        const top = Math.min(prev, y), bottom = Math.max(prev, y);
        ctx.fillStyle = buf[x].fault ? "#ffe14d" : accent;
        ctx.fillRect(x, top, 1, bottom - top + 1);
        if (buf[x].fault) {
          ctx.fillStyle = "#ffe14d";
          ctx.fillRect(x - 3, 4, 7, 3);
          ctx.fillRect(x, 7, 1, H - 14);
        }
        prev = y;
      }
    };

    draw();
    if (reduced) return;
    let raf = 0, last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 40) return;
      last = now;
      buf.shift();
      const s = sample();
      buf.push(s);
      if (s.fault) {
        count++;
        setFaults(count);
        setVotes((v) => v.map((n, i) => (Math.random() > 0.15 || i === 2 ? n + 1 : n)));
      }
      draw();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="vis vis-scope">
      <div className="vis-row">
        <span className="vis-title">Vibration signal</span>
        <span className="vis-cap">
          Faults flagged <span className="c-yellow">{faults}</span>
        </span>
      </div>
      <canvas ref={canvas} className="scope-canvas" aria-label="An animated vibration signal with fault spikes marked in yellow" role="img" />
      <ul className="scope-models">
        {["Random Forest", "ANN", "Autoencoder"].map((m, i) => (
          <li key={m}>
            <span>{m}</span>
            <span className="scope-votes" aria-hidden>
              {Array.from({ length: 12 }, (_, k) => (
                <i key={k} data-on={k < votes[i] % 13} />
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

type PhotoProps = { src: string; alt: string; caption: string; ramp?: Ramp; focus?: [number, number]; zoom?: number };

export function PhotoVisual({ src, alt, caption, ramp = "navy", focus, zoom }: PhotoProps) {
  return (
    <figure className="vis vis-photo">
      <DitherImage src={src} alt={alt} ramp={ramp} pixel={3} focus={focus} zoom={zoom} className="photo-fill" />
      <figcaption className="vis-cap photo-cap">{caption}</figcaption>
    </figure>
  );
}

/* Mumbai to Berlin, received from the TV tower. */
export function RouteVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(q(".route-fill"), { scaleX: 0 }, { scaleX: 1, duration: 2.2, ease: "steps(22)" })
      .fromTo(q(".route-plane"), { left: "0%" }, { left: "100%", duration: 2.2, ease: "steps(22)" }, "<")
      .from(q(".route-arrive"), { autoAlpha: 0, duration: 0.2, ease: "steps(2)" });
    return tl;
  });
  return (
    <figure ref={root} className="vis vis-photo vis-route">
      <DitherImage
        src="/pictures/berlin.jpg"
        alt="The Berlin TV tower above the rooftops at blue hour, dithered"
        ramp="navy"
        pixel={3}
        focus={[50, 30]}
        className="photo-fill"
      />
      <div className="route-bar txt" aria-label="Flight from Mumbai to Berlin, August 2026">
        <span>BOM</span>
        <span className="route-track">
          <span className="route-fill" />
          <span className="route-plane" aria-hidden />
        </span>
        <span>BER</span>
        <span className="route-arrive c-yellow">Aug 2026</span>
      </div>
      <figcaption className="vis-cap photo-cap">Berlin TV tower. Now broadcasting from here.</figcaption>
    </figure>
  );
}

const JAVA = ["Customer c = repo.findById(id);", 'c.setStatus("active");', "repo.save(c);", ""];
const GLIDE = ["var gr = new GlideRecord('incident');", "gr.get(sysId);", "gr.setValue('state', 2);", "gr.update();"];

/* The switch: the same idea in Java and then in Glide, on a 1960s mainframe. */
export function MorphVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const lines = q(".morph-line");
    const label = q(".morph-lang")[0];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 0.8 });
    const to = (set: string[], name: string) => {
      tl.to(label, { duration: 0.4, scrambleText: { text: name, chars: SCRAMBLE_CHARS } });
      lines.forEach((el, i) => {
        tl.to(el, { duration: 0.7, scrambleText: { text: set[i] || " ", chars: SCRAMBLE_CHARS, speed: 0.5 } }, i === 0 ? "<" : "<0.12");
      });
    };
    to(GLIDE, "Glide");
    tl.to({}, { duration: 2.2 });
    to(JAVA, "Java");
    return tl;
  });
  return (
    <div ref={root} className="vis vis-morph">
      <DitherImage
        src="/pictures/mainframe.jpg"
        alt="A 1960s computer room with tape drive cabinets, dithered"
        ramp="green"
        pixel={3}
        focus={[50, 58]}
        className="morph-photo"
      />
      <div className="morph-code">
        <p className="morph-head">
          <span className="morph-lang c-accent">Java</span>
        </p>
        <pre>
          <code>
            {JAVA.map((l, i) => (
              <span key={i} className="morph-line">
                {l || " "}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <p className="vis-cap photo-cap">A 1960s computer room.</p>
    </div>
  );
}
