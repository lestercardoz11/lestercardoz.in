"use client";

import { useEffect, useImperativeHandle, useRef } from "react";

/*
  A 32-panel football drawn per pixel. Each screen pixel is projected onto
  the sphere, rotated into ball space, and assigned to the nearest panel
  centre (12 pentagons at the icosahedron's vertices, 20 hexagons at its
  face centres). Lighting is quantised with a 4x4 Bayer matrix, so the ball
  is dithered like an 8-bit sprite rather than smoothly shaded.
*/

const PHI = (1 + Math.sqrt(5)) / 2;
const ICO_V: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const ICO_F = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1],
];

const norm = (v: number[]) => {
  const l = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / l, v[1] / l, v[2] / l];
};

const CENTRES: number[][] = [
  ...ICO_V.map(norm),
  ...ICO_F.map(([a, b, c]) =>
    norm([0, 1, 2].map((k) => ICO_V[a][k] + ICO_V[b][k] + ICO_V[c][k])),
  ),
];
const CX = Float32Array.from(CENTRES.map((c) => c[0]));
const CY = Float32Array.from(CENTRES.map((c) => c[1]));
const CZ = Float32Array.from(CENTRES.map((c) => c[2]));
// Pentagons are smaller than hexagons; this bias puts the seam where a real ball has it.
const BIAS = Float32Array.from(CENTRES.map((_, i) => (i < 12 ? -0.024 : 0)));

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

const hex = (h: string) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const WHITE_RAMP = ["#5b6aa0", "#b4bfe0", "#ffffff"].map(hex);
const NAVY_RAMP = ["#060c22", "#132257", "#2c469c"].map(hex);
const SEAM = hex("#0a1233");
const OUTLINE = hex("#03071a");

const L = norm([-0.5, -0.62, 0.62]);

type Mat = Float64Array;

function rotate(m: Mat, ax: number, ay: number, az: number, angle: number) {
  // m = A(axis, angle) * m, axis in view space
  const c = Math.cos(angle), s = Math.sin(angle), t = 1 - c;
  const a = [
    t * ax * ax + c, t * ax * ay - s * az, t * ax * az + s * ay,
    t * ax * ay + s * az, t * ay * ay + c, t * ay * az - s * ax,
    t * ax * az - s * ay, t * ay * az + s * ax, t * az * az + c,
  ];
  const r = new Float64Array(9);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      r[i * 3 + j] = a[i * 3] * m[j] + a[i * 3 + 1] * m[3 + j] + a[i * 3 + 2] * m[6 + j];
  m.set(r);
}

function orthonormalise(m: Mat) {
  const x = norm([m[0], m[3], m[6]]);
  let y = [m[1], m[4], m[7]];
  const d = x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
  y = norm([y[0] - d * x[0], y[1] - d * x[1], y[2] - d * x[2]]);
  const z = [x[1] * y[2] - x[2] * y[1], x[2] * y[0] - x[0] * y[2], x[0] * y[1] - x[1] * y[0]];
  m[0] = x[0]; m[3] = x[1]; m[6] = x[2];
  m[1] = y[0]; m[4] = y[1]; m[7] = y[2];
  m[2] = z[0]; m[5] = z[1]; m[8] = z[2];
}

export type BallHandle = {
  /** Set the angular velocity in rad/s, in view space (x right, y down, z toward you). */
  spin: (wx: number, wy: number, wz: number) => void;
  /** Turn the ball by an angle now, around a view-space axis. */
  turn: (ax: number, ay: number, az: number, angle: number) => void;
  /** Keepy-uppy from the keyboard: a kick through the middle of the ball. */
  kick: () => void;
};

type Props = {
  res?: number;
  className?: string;
  /** "hero" adds keepy-uppy physics, drag to spin and the pull toward the cursor. */
  mode?: "hero" | "plain";
  idle?: boolean;
  label?: string;
  onKeepy?: (streak: number, best: number, ended: boolean) => void;
  ref?: React.Ref<BallHandle>;
};

export function PixelBall({ res = 56, className, mode = "plain", idle = true, label, onKeepy, ref }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    m: (() => {
      const m = new Float64Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);
      rotate(m, 1, 0, 0, 0.5);
      rotate(m, 0, 1, 0, 0.3);
      return m;
    })(),
    w: [0, 0, 0] as number[],
    idleW: [0.12, 0.55, 0] as number[],
    // keepy-uppy
    x: 0, y: 0, vx: 0, vy: 0, squash: 0,
    streak: 0, best: 0,
    dragging: false, lastX: 0, lastY: 0, lastT: 0, moved: 0,
    reduced: false,
    visible: true,
  });
  const kickRef = useRef<(hx: number) => void>(() => {});
  const onKeepyRef = useRef(onKeepy);
  useEffect(() => {
    onKeepyRef.current = onKeepy;
  }, [onKeepy]);

  useImperativeHandle(ref, () => ({
    spin: (wx, wy, wz) => {
      state.current.w = [wx, wy, wz];
    },
    turn: (ax, ay, az, angle) => {
      const l = Math.hypot(ax, ay, az) || 1;
      rotate(state.current.m, ax / l, ay / l, az / l, angle);
    },
    kick: () => kickRef.current((Math.random() - 0.5) * 0.4),
  }));

  useEffect(() => {
    const canvas = canvasRef.current!;
    const body = bodyRef.current!;
    const ctx = canvas.getContext("2d")!;
    const N = res;
    const img = ctx.createImageData(N, N);
    const data = img.data;
    const s = state.current;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (mode === "hero") {
      try {
        s.best = Number(localStorage.getItem("keepy-best") || 0) || 0;
      } catch {}
    }

    const seamW = 1.15 / N;
    const ring = 1 + 2.4 / N;

    const draw = () => {
      const m = s.m;
      let p = 0;
      for (let py = 0; py < N; py++) {
        const sy = ((py + 0.5) / N) * 2 - 1;
        for (let px = 0; px < N; px++, p += 4) {
          const sx = ((px + 0.5) / N) * 2 - 1;
          const r2 = sx * sx + sy * sy;
          if (r2 > 1) {
            if (r2 <= ring * ring) {
              data[p] = OUTLINE[0]; data[p + 1] = OUTLINE[1]; data[p + 2] = OUTLINE[2]; data[p + 3] = 255;
            } else data[p + 3] = 0;
            continue;
          }
          const sz = Math.sqrt(1 - r2);
          const qx = m[0] * sx + m[3] * sy + m[6] * sz;
          const qy = m[1] * sx + m[4] * sy + m[7] * sz;
          const qz = m[2] * sx + m[5] * sy + m[8] * sz;
          let best = -9, second = -9, bi = 0;
          for (let i = 0; i < 32; i++) {
            const d = qx * CX[i] + qy * CY[i] + qz * CZ[i] + BIAS[i];
            if (d > best) {
              second = best; best = d; bi = i;
            } else if (d > second) second = d;
          }
          let col: number[];
          if (best - second < seamW) col = SEAM;
          else {
            const light = sx * L[0] + sy * L[1] + sz * L[2];
            const l = Math.min(1, 0.22 + 0.9 * Math.max(0, light));
            const t = BAYER[(py & 3) * 4 + (px & 3)];
            const lvl = Math.max(0, Math.min(2, Math.floor(l * 2.6 + t - 0.35)));
            col = bi < 12 ? NAVY_RAMP[lvl] : WHITE_RAMP[lvl];
          }
          data[p] = col[0]; data[p + 1] = col[1]; data[p + 2] = col[2]; data[p + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    let raf = 0;
    let last = performance.now();
    let frame = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // Off screen there is nothing to draw, unless the ball is mid-air and still has to come down.
      if (!s.visible && s.y === 0 && s.vy === 0) return;

      // Spin decays toward the idle spin, like a ball losing pace on grass.
      if (!s.dragging) {
        const target = idle && !s.reduced ? s.idleW : [0, 0, 0];
        const k = 1 - Math.exp(-dt * 1.1);
        for (let i = 0; i < 3; i++) s.w[i] += (target[i] - s.w[i]) * k;
      }
      const speed = Math.hypot(s.w[0], s.w[1], s.w[2]);
      if (speed > 1e-4) rotate(s.m, s.w[0] / speed, s.w[1] / speed, s.w[2] / speed, speed * dt);
      if (++frame % 120 === 0) orthonormalise(s.m);

      if (mode === "hero") {
        const size = body.offsetWidth || 200;
        const g = size * 9;
        const airborne = s.y < 0 || s.vy < 0;
        if (airborne) {
          s.vy += g * dt;
          s.y += s.vy * dt;
          s.x += s.vx * dt;
          const lim = size * 1.6;
          if (Math.abs(s.x) > lim) {
            s.x = Math.sign(s.x) * lim;
            s.vx *= -0.6;
          }
          if (s.y >= 0 && s.vy > 0) {
            s.y = 0;
            s.squash = Math.min(0.2, s.vy / (size * 22));
            if (s.streak > 0) {
              s.best = Math.max(s.best, s.streak);
              try {
                localStorage.setItem("keepy-best", String(s.best));
              } catch {}
              onKeepyRef.current?.(s.streak, s.best, true);
              s.streak = 0;
            }
            s.vy = s.vy > size * 1.2 ? -s.vy * 0.34 : 0;
          }
        } else {
          // On the ground, roll back into the slot with a critically damped spring.
          const k = 60, c = 2 * Math.sqrt(k);
          s.vx += (-k * s.x - c * s.vx) * dt;
          s.x += s.vx * dt;
          if (Math.abs(s.vx) > 1) s.w[2] = s.vx / (size / 2);
        }
        s.squash *= Math.exp(-dt * 14);
        body.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) scale(${1 + s.squash * 0.5}, ${1 - s.squash})`;
      }
      draw();
    };
    draw();
    raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting;
    });
    io.observe(canvas);

    let detach = () => {};
    if (mode === "hero") {
      const doKick = (hx: number) => {
        const size = body.offsetWidth || 200;
        const g = size * 9;
        // Rise as high as feels good, but never out of the top of the screen.
        // The screen may be zoomed on large displays, so convert from viewport pixels to layout pixels.
        const rect = body.getBoundingClientRect();
        const room = (rect.top - 80) * (size / (rect.width || size));
        const h = Math.max(size * 0.4, Math.min(size * (1.25 + Math.random() * 0.35), room));
        s.vy = -Math.sqrt(2 * g * h);
        s.vx = -hx * size * 1.6 + (Math.random() - 0.5) * size * 0.3;
        s.w = [-7 - Math.random() * 3, hx * 9, hx * 5];
        s.streak += 1;
        onKeepyRef.current?.(s.streak, s.best, false);
      };
      kickRef.current = doKick;
      const kick = (e: PointerEvent) => {
        e.preventDefault();
        body.setPointerCapture(e.pointerId);
        const r = body.getBoundingClientRect();
        doKick(Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2))));
        s.dragging = true;
        s.moved = 0;
        s.lastX = e.clientX;
        s.lastY = e.clientY;
        s.lastT = performance.now();
      };
      const move = (e: PointerEvent) => {
        // Pull toward the cursor: the ball leans and rolls toward wherever you point.
        if (!s.dragging) {
          const r = body.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
          const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
          s.idleW = [-dy * 2.2 + 0.08, dx * 2.2 + 0.25, 0];
          return;
        }
        const now = performance.now();
        const dx = e.clientX - s.lastX;
        const dy = e.clientY - s.lastY;
        const dts = Math.max(0.008, (now - s.lastT) / 1000);
        s.moved += Math.abs(dx) + Math.abs(dy);
        const radius = body.getBoundingClientRect().width / 2 || 1;
        const angle = Math.hypot(dx, dy) / radius;
        if (angle > 0) rotate(s.m, -dy / Math.hypot(dx, dy), dx / Math.hypot(dx, dy), 0, angle);
        // Keep the release velocity so the spin carries on after you let go.
        s.w = [(-dy / radius) / dts, (dx / radius) / dts, s.w[2]];
        s.lastX = e.clientX;
        s.lastY = e.clientY;
        s.lastT = now;
      };
      const up = () => {
        s.dragging = false;
      };
      body.addEventListener("pointerdown", kick);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      window.addEventListener("pointercancel", up);
      detach = () => {
        body.removeEventListener("pointerdown", kick);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        window.removeEventListener("pointercancel", up);
      };
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      detach();
    };
  }, [res, mode, idle]);

  return (
    <div
      ref={bodyRef}
      className={className}
      style={{ touchAction: mode === "hero" ? "none" : undefined, willChange: mode === "hero" ? "transform" : undefined }}
      role={mode === "hero" ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <canvas
        ref={canvasRef}
        width={res}
        height={res}
        style={{ width: "100%", height: "100%", imageRendering: "pixelated" }}
      />
    </div>
  );
}
