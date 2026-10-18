"use client";

import { useEffect, useRef, useState } from "react";
import { useVisual } from "@/components/story/useVisual";
import { gsap } from "@/lib/gsap";

/* Audit framework: a request moves through its statuses, with a notification at each step. */
const STATES = ["Open", "Extension granted", "Returned as partial", "Closed"];

export function StatesVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const nodes = q(".st-node");
    const pings = q(".st-ping");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 0.4 });
    tl.set(nodes, { backgroundColor: "#1c2f72", color: "#ffffff" }).set(pings, {
      autoAlpha: 0,
      y: 0,
    });
    const logs = q(".st-log li");
    tl.set(logs, { autoAlpha: 0 });
    nodes.forEach((n, i) => {
      tl.to(
        n,
        {
          backgroundColor: "#3ee07f",
          color: "#132257",
          duration: 0.1,
          ease: "steps(1)",
        },
        i === 0 ? "+=0.2" : "+=0.55",
      );
      if (logs[i])
        tl.fromTo(
          logs[i],
          { autoAlpha: 0, x: -12 },
          { autoAlpha: 1, x: 0, duration: 0.3, ease: "steps(3)" },
          "<",
        );
      if (pings[i])
        tl.fromTo(
          pings[i],
          { autoAlpha: 1, y: 0 },
          { autoAlpha: 0, y: -22, duration: 0.9, ease: "steps(6)" },
          "<",
        );
      if (i > 0)
        tl.to(
          nodes[i - 1],
          {
            backgroundColor: "#1c2f72",
            color: "#ffffff",
            duration: 0.1,
            ease: "steps(1)",
          },
          "<",
        );
    });
    tl.from(
      q(".lvl"),
      { autoAlpha: 0.2, duration: 0.1, stagger: 0.25, ease: "steps(1)" },
      "-=1.2",
    );
    return tl;
  });
  return (
    <div ref={root} className="vis vis-states">
      <p className="vis-title">Audit request statuses</p>
      <ol className="st-flow txt">
        {STATES.map((s) => (
          <li key={s} className="st-step">
            <span className="st-node">{s}</span>
            <span className="st-ping c-yellow" aria-hidden>
              Notified
            </span>
          </li>
        ))}
      </ol>
      <ul className="st-log">
        {STATES.map((st) => (
          <li key={st}>
            <span className="txt c-yellow">Event</span> Status set to{" "}
            {st.toLowerCase()}. Owner and reviewer notified.
          </li>
        ))}
      </ul>
      <p className="vis-title st-sub">Who can bulk-assign level 4</p>
      <ul className="levels txt">
        {[1, 2, 3, 4].map((l) => (
          <li key={l} className="lvl" data-can={l === 3}>
            <span>Level {l}</span>
            <span className="lvl-mark">{l === 3 ? "Yes" : "No"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Service mapping, drawn like a tactics board. Duplicates merge as the CMDB is normalised. */
const NODES: {
  id: string;
  label: string;
  x: number;
  y: number;
  kind?: "dup" | "entry";
}[] = [
  { id: "url", label: "Entry URL", x: 10, y: 50, kind: "entry" },
  { id: "app", label: "Web app", x: 36, y: 50 },
  { id: "host", label: "App server", x: 36, y: 16 },
  { id: "api", label: "Backend API", x: 66, y: 22 },
  { id: "db", label: "Shared DB", x: 66, y: 56 },
  { id: "dup", label: "Shared DB (dup)", x: 82, y: 71, kind: "dup" },
  { id: "idp", label: "Identity provider", x: 66, y: 86 },
];
const EDGES: [string, string, string][] = [
  ["url", "app", "entry"],
  ["app", "host", "runs_on"],
  ["app", "api", "depends_on"],
  ["app", "db", "depends_on"],
  ["app", "idp", "depends_on"],
  ["api", "db", "depends_on"],
];
const pos = (id: string) => NODES.find((n) => n.id === id)!;

export function MapVisual() {
  const root = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = board.current!;
    const ro = new ResizeObserver(() =>
      setSize({ w: el.clientWidth, h: el.clientHeight }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useVisual(root, (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.3 });
    tl.set(q(".mp-dup"), { left: "82%", top: "71%", autoAlpha: 1 })
      .set(q(".mp-clean"), { autoAlpha: 0 })
      .from(q(".mp-node"), {
        scale: 0,
        duration: 0.25,
        stagger: 0.12,
        ease: "steps(3)",
      })
      .fromTo(
        q(".mp-edge"),
        { strokeDashoffset: 100 },
        { strokeDashoffset: 0, duration: 0.6, stagger: 0.2, ease: "steps(6)" },
        "-=0.6",
      )
      .to(
        q(".mp-dup"),
        { left: "66%", top: "56%", duration: 0.7, ease: "steps(7)" },
        "+=0.8",
      )
      .to(q(".mp-dup"), { autoAlpha: 0, duration: 0.1 })
      .to(q(".mp-clean"), { autoAlpha: 1, duration: 0.2, ease: "steps(2)" })
      .to({}, { duration: 2.4 });
    return tl;
  });

  const px = (id: string) => ({
    x: (pos(id).x / 100) * size.w,
    y: (pos(id).y / 100) * size.h,
  });
  return (
    <div ref={root} className="vis vis-map">
      <div ref={board} className="mp-board">
        <svg className="mp-lines" width={size.w} height={size.h} aria-hidden>
          {EDGES.map(([a, b, rel]) => {
            const p1 = px(a),
              p2 = px(b);
            return (
              <g key={a + b}>
                <line
                  className="mp-edge"
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  pathLength={100}
                  strokeDasharray="100"
                />
                {rel !== "entry" ? (
                  <text
                    className="mp-rel"
                    x={(p1.x + p2.x) / 2}
                    y={(p1.y + p2.y) / 2 - 6}
                    textAnchor="middle"
                  >
                    {rel}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
        {NODES.map((n) => (
          <span
            key={n.id}
            className={`mp-node txt ${n.kind === "dup" ? "mp-dup" : ""} ${n.kind === "entry" ? "mp-entry" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            {n.label}
          </span>
        ))}
      </div>
      <p className="mp-clean txt c-green">Duplicate CI merged</p>
      <p className="vis-cap mp-legend">
        A service map, drawn the way it was agreed with the service owners
      </p>
    </div>
  );
}

/* Vulnerability Response: findings from two scanners correlated to the right CIs. */
const FINDINGS = [
  { src: "Tenable", id: "VIT0041", sev: "Critical", ci: 0 },
  { src: "Prisma", id: "VIT0042", sev: "High", ci: 2 },
  { src: "Tenable", id: "VIT0043", sev: "High", ci: 1 },
  { src: "Prisma", id: "VIT0044", sev: "Medium", ci: 3 },
  { src: "Tenable", id: "VIT0045", sev: "Stale", ci: -1 },
];
const CIS = ["app-web-01", "db-core-02", "k8s-node-07", "api-gw-03"];

export function ScannerVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const rows = q(".sc-find");
    const links = q(".sc-link");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 0.3 });
    tl.set(q(".sc-stale"), { textDecoration: "none", autoAlpha: 1 })
      .set(q(".sc-count"), { textContent: "Correlating" })
      .from(rows, {
        x: -30,
        autoAlpha: 0,
        duration: 0.3,
        stagger: 0.18,
        ease: "steps(4)",
      })
      .fromTo(
        links,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.4,
          stagger: 0.35,
          ease: "steps(6)",
        },
        "+=0.2",
      )
      .to(
        q(".sc-stale"),
        { textDecoration: "line-through", duration: 0.05 },
        "+=0.3",
      )
      .to(q(".sc-stale"), { autoAlpha: 0.3, duration: 0.4, ease: "steps(4)" })
      .set(q(".sc-count"), { textContent: "4 correlated, 1 stale cleared" });
    return tl;
  });
  return (
    <div ref={root} className="vis vis-scan">
      <div className="vis-row">
        <span className="vis-title">Vulnerable items to CIs</span>
        <span className="vis-cap sc-count">Correlating</span>
      </div>
      <ul className="sc-list">
        {FINDINGS.map((f) => (
          <li
            key={f.id}
            className={`sc-find txt ${f.ci < 0 ? "sc-stale" : ""}`}
          >
            <span className={f.src === "Tenable" ? "c-cyan" : "c-magenta"}>
              {f.src}
            </span>
            <span>{f.id}</span>
            <span
              className={
                f.sev === "Critical"
                  ? "c-red"
                  : f.sev === "Stale"
                    ? ""
                    : "c-yellow"
              }
            >
              {f.sev}
            </span>
            <span className="sc-link c-green">
              {f.ci >= 0 ? `▶ ${CIS[f.ci]}` : "no CI, closed"}
            </span>
          </li>
        ))}
      </ul>
      <p className="vis-cap">
        Illustration. Item numbers and CI names are made up.
      </p>
    </div>
  );
}

/* Telecom instances: clones from Prod, SSO switched on, admin roles stripped back. */
const ENVS = ["Dev", "QA", "Test"];

export function InstancesVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.3 });
    tl.set(q(".in-sso"), {
      backgroundColor: "#1c2f72",
      color: "#c3cbe6",
      textContent: "Password",
    })
      .set(q(".in-role"), { autoAlpha: 1, scale: 1 })
      .fromTo(
        q(".in-clone"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, stagger: 0.25, ease: "steps(5)" },
      )
      .to(
        q(".in-sso"),
        {
          backgroundColor: "#3ee07f",
          color: "#132257",
          textContent: "Azure AD SSO",
          duration: 0.05,
          stagger: 0.3,
        },
        "+=0.2",
      )
      .to(
        q(".in-role.extra"),
        {
          autoAlpha: 0,
          scale: 0.6,
          duration: 0.2,
          stagger: 0.12,
          ease: "steps(2)",
        },
        "+=0.3",
      )
      .fromTo(
        q(".in-patch"),
        { backgroundColor: "#0b1538", color: "#c3cbe6" },
        {
          backgroundColor: "#ffe14d",
          color: "#132257",
          duration: 0.05,
          stagger: 0.18,
        },
        "+=0.2",
      );
    return tl;
  });
  const roles = (n: number) =>
    Array.from({ length: n }, (_, i) => (
      <span key={i} className={`in-role ${i > 0 ? "extra" : ""}`}>
        admin
      </span>
    ));
  return (
    <div ref={root} className="vis vis-inst">
      <div className="in-prod">
        <span className="vis-title">Prod</span>
        <span className="in-sso txt">Password</span>
        <span className="in-roles">{roles(4)}</span>
      </div>
      <div className="in-envs">
        {ENVS.map((e) => (
          <div key={e} className="in-env">
            <span className="in-clone" aria-hidden />
            <span className="vis-title">{e}</span>
            <span className="in-sso txt">Password</span>
            <span className="in-roles">{roles(e === "Test" ? 3 : 1)}</span>
            <span className="in-patches txt">
              <span className="in-patch">Washington</span>
              <span className="in-patch">Xanadu</span>
            </span>
          </div>
        ))}
      </div>
      <p className="vis-cap">
        Clones from Prod, SSO on every instance, non-SSO admin roles removed,
        patches scheduled.
      </p>
    </div>
  );
}

/* Workplace: five double bookings, then the rule, then one. */
const BOOKINGS: { d: number; h: number; clash?: [number, number] }[] = [
  { d: 0, h: 0 },
  { d: 0, h: 2, clash: [0, 4] },
  { d: 1, h: 1 },
  { d: 1, h: 3, clash: [1, 5] },
  { d: 2, h: 0, clash: [2, 2] },
  { d: 2, h: 4 },
  { d: 3, h: 2 },
  { d: 3, h: 1, clash: [3, 4] },
  { d: 4, h: 3 },
  { d: 4, h: 0, clash: [4, 5] },
];

export function BookingsVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const clashes = q(".bk-clash");
    const grid = q(".bk-grid")[0];
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2, delay: 0.3 });
    tl.set(clashes, { x: 0, y: 0, backgroundColor: "#ff5a4e" })
      .set(q(".bk-count"), { textContent: "5" })
      .from(q(".bk"), {
        scale: 0,
        duration: 0.2,
        stagger: 0.05,
        ease: "steps(2)",
      })
      .to(q(".bk-rule"), { autoAlpha: 1, duration: 0.1 }, "+=0.6");
    clashes.forEach((c, i) => {
      const b = BOOKINGS.filter((x) => x.clash)[i];
      if (i === clashes.length - 1) return; // one clash is left for a person to resolve
      const cellW = grid.offsetWidth / 5,
        cellH = grid.offsetHeight / 6;
      tl.to(
        c,
        {
          x: (b.clash![0] - b.d) * cellW,
          y: (b.clash![1] - b.h) * cellH,
          backgroundColor: "#3ee07f",
          duration: 0.4,
          ease: "steps(4)",
        },
        "+=0.15",
      ).to(q(".bk-count"), { textContent: String(4 - i), duration: 0.01 }, "<");
    });
    tl.to(q(".bk-done"), { autoAlpha: 1, duration: 0.1 }, "+=0.2")
      .to({}, { duration: 2 })
      .set([q(".bk-rule"), q(".bk-done")], { autoAlpha: 0 });
    return tl;
  });
  return (
    <div ref={root} className="vis vis-book">
      <div className="vis-row">
        <span className="vis-title">Room bookings this week</span>
        <span className="vis-cap">
          Double bookings <span className="bk-count txt c-yellow">5</span>
        </span>
      </div>
      <div className="bk-head txt" aria-hidden>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="bk-grid" aria-hidden>
        {BOOKINGS.map((b, i) => (
          <span
            key={i}
            className="bk"
            style={{ left: `${b.d * 20}%`, top: `${b.h * (100 / 6)}%` }}
          />
        ))}
        {BOOKINGS.filter((b) => b.clash).map((b, i) => (
          <span
            key={`c${i}`}
            className="bk bk-clash"
            style={{
              left: `${b.d * 20 + 1.5}%`,
              top: `${b.h * (100 / 6) + 5}%`,
            }}
          />
        ))}
      </div>
      <p className="vis-cap bk-foot">
        <span className="bk-rule c-green">Rule on: no double booking.</span>{" "}
        <span className="bk-done c-yellow">80% fewer clashes.</span>
      </p>
    </div>
  );
}

/* Technical lead: a squad of 15+, and the ball keeps moving between them. */
const SPOTS: [number, number][] = [
  [50, 90],
  [18, 70],
  [38, 74],
  [62, 74],
  [82, 70],
  [28, 52],
  [50, 56],
  [72, 52],
  [14, 34],
  [38, 36],
  [62, 36],
  [86, 34],
  [30, 16],
  [50, 12],
  [70, 16],
  [50, 36],
];

export function PitchVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const ball = q(".pv-ball")[0];
    const tl = gsap.timeline({ repeat: -1 });
    tl.from(q(".pv-dot"), {
      scale: 0,
      duration: 0.25,
      stagger: 0.04,
      ease: "steps(3)",
    });
    const route = [15, 6, 9, 13, 10, 7, 11, 14, 12, 5, 2, 0, 3, 15];
    route.forEach((s) => {
      const [x, y] = SPOTS[s];
      tl.to(ball, {
        left: `${x}%`,
        top: `${y}%`,
        duration: 0.45,
        ease: "steps(6)",
      });
    });
    const projects = q(".pv-projects")[0];
    const counter = { n: 15 };
    tl.to(
      counter,
      {
        n: 20,
        duration: route.length * 0.45,
        ease: "none",
        onUpdate: () => {
          projects.textContent = String(Math.round(counter.n));
        },
      },
      0.6,
    );
    return tl;
  });
  return (
    <div ref={root} className="vis vis-pitch">
      <div className="vis-row">
        <span className="vis-title">ServiceNow team, 15+ engineers</span>
        <span className="vis-cap">
          Live projects <span className="pv-projects txt c-yellow">15</span>
        </span>
      </div>
      <div className="pv-field" aria-hidden>
        <span className="pv-half" />
        <span className="pv-circle" />
        {SPOTS.map(([x, y], i) => (
          <span
            key={i}
            className={`pv-dot ${i === 15 ? "pv-captain" : ""}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {i === 15 ? "C" : ""}
          </span>
        ))}
        <span className="pv-ball" style={{ left: "50%", top: "36%" }} />
      </div>
      <p className="vis-cap">
        The C is me, in the middle of it, still on the ball.
      </p>
    </div>
  );
}
