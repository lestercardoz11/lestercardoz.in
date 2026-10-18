"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16 - 0.5);

const RAMPS = {
  navy: ["#050a1f", "#132257", "#2a4296", "#8796cf", "#ffffff"],
  red: ["#0b1538", "#5a2350", "#c8423f", "#ff8a7f", "#ffffff"],
  green: ["#0b1538", "#145a4f", "#2fb36a", "#9af0bd", "#ffffff"],
  yellow: ["#0b1538", "#5b5a3a", "#d6b93a", "#ffe98a", "#ffffff"],
  cyan: ["#0b1538", "#155f7a", "#2fb6d6", "#a5f1ff", "#ffffff"],
  magenta: ["#0b1538", "#5a2368", "#d04fb4", "#ffb0ea", "#ffffff"],
} as const;

export type Ramp = keyof typeof RAMPS;

const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];

type Props = {
  src: string;
  alt: string;
  ramp?: Ramp;
  /** Final pixel size in CSS pixels. */
  pixel?: number;
  /** Where to anchor the crop, as object-position percentages. */
  focus?: [number, number];
  /** Crop in further than cover, for scans with borders. */
  zoom?: number;
  contrast?: number;
  className?: string;
};

/*
  An archival photograph received over Teletext: cropped like object-fit: cover,
  ordered-dithered into five tones of the page colour, and drawn in big pixels.
  When it scrolls into view the signal "tunes in" from coarse to fine.
*/
export function DitherImage({ src, alt, ramp = "navy", pixel = 3, focus = [50, 50], zoom = 1, contrast = 1.25, className }: Props) {
  const [fx, fy] = focus;
  const box = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = box.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext("2d", { willReadFrequently: true })!;
    const colours = RAMPS[ramp].map(hex);
    const img = new Image();
    let ready = false;
    let current = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { px: reduced ? pixel : 18 };

    const render = (px: number) => {
      if (!ready) return;
      const bw = el.clientWidth, bh = el.clientHeight;
      if (!bw || !bh) return;
      const w = Math.max(8, Math.round(bw / px));
      const h = Math.max(8, Math.round(bh / px));
      cv.width = w;
      cv.height = h;
      // cover crop
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * zoom;
      const dw = img.naturalWidth * scale, dh = img.naturalHeight * scale;
      const dx = (w - dw) * (fx / 100), dy = (h - dh) * (fy / 100);
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, dx, dy, dw, dh);
      const data = ctx.getImageData(0, 0, w, h);
      const d = data.data;
      const n = colours.length - 1;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          let l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
          l = (Math.pow(l, 0.9) - 0.5) * contrast + 0.52;
          const v = Math.max(0, Math.min(n, Math.round(l * n + BAYER[(y & 3) * 4 + (x & 3)])));
          const c = colours[v];
          d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
        }
      }
      ctx.putImageData(data, 0, 0);
      current = px;
    };

    let tween: gsap.core.Tween | null = null;
    const tuneTo = (target: number, duration: number) => {
      tween?.kill();
      tween = gsap.to(state, {
        px: target,
        duration,
        ease: "steps(6)",
        onUpdate: () => {
          const p = Math.round(state.px);
          if (p !== current) render(p);
        },
      });
    };

    let seen = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && ready && !seen) {
        seen = true;
        if (reduced) render(pixel);
        else tuneTo(pixel, 0.9);
      }
    });

    img.onload = () => {
      ready = true;
      render(Math.round(state.px));
      io.observe(el);
    };
    img.src = src;

    const ro = new ResizeObserver(() => render(Math.round(state.px)));
    ro.observe(el);

    const enter = () => !reduced && tuneTo(Math.max(2, pixel - 1), 0.25);
    const leave = () => !reduced && tuneTo(pixel, 0.25);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);

    return () => {
      tween?.kill();
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, [src, ramp, pixel, fx, fy, zoom, contrast]);

  return (
    <div ref={box} className={className} style={{ position: "relative", overflow: "hidden" }}>
      <canvas
        ref={canvas}
        role="img"
        aria-label={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", imageRendering: "pixelated" }}
      />
    </div>
  );
}
