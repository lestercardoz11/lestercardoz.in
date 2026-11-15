"use client";

import { useRef } from "react";
import type { Stat, Visual as V } from "@/lib/content";
import { gsap, still, useGSAP } from "@/lib/gsap";

/*
  One small picture per step. Each is drawn in its finished state and animates
  from somewhere else, so with reduced motion the picture is simply there.
*/
export function Visual({ visual }: { visual: V }) {
  switch (visual.kind) {
    case "stats":
      return <Stats items={visual.items} note={visual.note} />;
    case "chips":
      return <Chips groups={visual.groups} />;
    case "bills":
      return <Bills />;
    case "pipeline":
      return <Pipeline />;
    case "race":
      return <Race />;
    case "repo":
      return <Repo />;
    case "extract":
      return <Extract />;
    case "match":
      return <Match />;
    case "team":
      return <Team />;
  }
}

const pop = { opacity: 0, scale: 0.6, duration: 0.45, ease: "back.out(1.8)" };

/* ---------------------------------------------------------------- Stats */

function Stats({ items, note }: { items: Stat[]; note?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      gsap.from(".stat", { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", stagger: 0.09 });
      // Count the first number in each value up from zero.
      ref.current?.querySelectorAll<HTMLElement>(".stat-value").forEach((el, i) => {
        const full = el.dataset.value ?? "";
        const m = full.match(/\d+/);
        if (!m) return;
        const n = { v: 0 };
        gsap.to(n, {
          v: Number(m[0]),
          duration: 1,
          delay: i * 0.09,
          ease: "power2.out",
          onUpdate: () => (el.textContent = full.replace(m[0], String(Math.round(n.v)))),
          onComplete: () => (el.textContent = full),
        });
      });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <dl className={`stats stats-${items.length}`}>
        {items.map((s) => (
          <div className="stat" key={s.label}>
            <dt className="stat-value" data-value={s.value}>
              {s.value}
            </dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="vis-note">{note}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- Chips */

function Chips({ groups }: { groups: { title: string; items: string[] }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      gsap.from(".chip-title", { opacity: 0, duration: 0.3 });
      gsap.from(".chip", { ...pop, stagger: 0.06 });
    },
    { scope: ref },
  );
  return (
    <div className="vis vis-chips" ref={ref}>
      {groups.map((g) => (
        <ChipList key={g.title} {...g} />
      ))}
    </div>
  );
}

function ChipList({ title, items, hot, className }: { title: string; items: string[]; hot?: boolean; className?: string }) {
  return (
    <div className={className}>
      <p className="chip-title">{title}</p>
      <ul className="chips">
        {items.map((c) => (
          <li className={hot ? "chip chip-hot" : "chip"} key={c}>
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------- Opex Genie: the bills */

function Bills() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      // Start as one untidy pile, then deal the four formats out.
      gsap.from(".sheet", {
        x: (i) => (1.5 - i) * 110,
        rotation: (i) => [-9, 5, -4, 8][i],
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.25,
      });
      gsap.from(".sheet-name", { opacity: 0, duration: 0.3, delay: 0.9, stagger: 0.08 });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <div className="sheets">
        {["A", "B", "C", "D"].map((c, i) => (
          <div className={`sheet sheet-${i}`} key={c}>
            <span className="sheet-head" />
            <span className="sheet-body" />
            <span className="sheet-name">Carrier {c}</span>
          </div>
        ))}
      </div>
      <p className="vis-note">Same information, four layouts, and each layout keeps changing.</p>
    </div>
  );
}

/* ---------------------------------------------- Opex Genie: the pipeline */

const NODES = [
  { name: "PDF bills", sub: "4 carriers" },
  { name: "Queue", sub: "AWS SQS" },
  { name: "Parsers", sub: "Spring Boot, PDFBox" },
  { name: "Database", sub: "PostgreSQL" },
  { name: "Dashboard", sub: "Angular" },
];

function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      const nodes = gsap.utils.toArray<HTMLElement>(".node");
      const dots = gsap.utils.toArray<HTMLElement>(".link-dot");
      gsap.from(nodes, { ...pop, stagger: 0.09 });
      // One bill travels the whole line, lighting each stage as it passes.
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.7 });
      nodes.forEach((node, i) => {
        tl.to(node, { "--lit": 1, duration: 0.18 });
        if (dots[i]) tl.set(dots[i], { "--p": 0, opacity: 1 }).to(dots[i], { "--p": 1, duration: 0.45, ease: "power1.inOut" }).set(dots[i], { opacity: 0 });
        tl.to(node, { "--lit": 0, duration: 0.5 }, i === nodes.length - 1 ? ">0.4" : "<0.1");
      });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <ol className="pipe">
        {NODES.map((n, i) => (
          <li key={n.name}>
            <div className="node">
              <strong>{n.name}</strong>
              <span>{n.sub}</span>
            </div>
            {i < NODES.length - 1 && (
              <span className="link" aria-hidden>
                <span className="link-dot" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="vis-note">Every customer&rsquo;s billing data stays isolated from every other&rsquo;s.</p>
    </div>
  );
}

/* -------------------------------------------------- Opex Genie: the race */

const ROWS = Array.from({ length: 9 }, (_, i) => i);
const LANES = [
  { name: "Before", sub: "each row saved on its own trip", time: 1 },
  { name: "After", sub: "all rows saved in one trip", time: 1 / 3 },
];

function Race() {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      if (still()) return;
      const run = gsap.timeline({ delay: 0.4 });
      tl.current = run;
      const SLOW = 2.7;
      gsap.utils.toArray<HTMLElement>(".lane").forEach((lane, li) => {
        const rows = gsap.utils.toArray<HTMLElement>(".row", lane);
        const db = lane.querySelector<HTMLElement>(".db")!;
        const fill = lane.querySelector<HTMLElement>(".lane-fill")!;
        // Measured when each tween starts, and again after "Run it again".
        const dist = (el: HTMLElement) => db.offsetLeft - el.offsetLeft;
        const total = SLOW * LANES[li].time;
        run.set(rows, { x: 0, opacity: 1 }, 0).fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: total, ease: "none" }, 0);
        if (li === 0) {
          // Before: every row makes its own trip to the database.
          const each = total / rows.length;
          rows.forEach((row, i) => {
            run
              .to(row, { x: () => dist(row), duration: each * 0.85, ease: "power1.in" }, i * each)
              .set(row, { opacity: 0 }, (i + 0.85) * each)
              .fromTo(db, { scale: 1.1 }, { scale: 1, duration: 0.2 }, (i + 0.85) * each);
          });
        } else {
          // After: rows are gathered in memory, then written in one batch.
          run
            .to(rows, { x: (i, el) => rows[0].offsetLeft - el.offsetLeft + i * 3, duration: total * 0.35, ease: "power2.out" }, 0)
            .to(rows, { x: (i, el) => dist(el), duration: total * 0.55, ease: "power2.in" }, total * 0.4)
            .set(rows, { opacity: 0 }, total * 0.95)
            .fromTo(db, { scale: 1.25 }, { scale: 1, duration: 0.3 }, total * 0.95);
        }
      });
    },
    { scope: ref },
  );

  return (
    <div className="vis" ref={ref}>
      <div className="race">
        {LANES.map((l) => (
          <div className="lane" key={l.name}>
            <p className="lane-name">
              <strong>{l.name}</strong> {l.sub}
            </p>
            <div className="lane-track">
              {ROWS.map((r) => (
                <span className="row" key={r} />
              ))}
              <span className="db">Database</span>
            </div>
            <div className="lane-time">
              <span>Time taken</span>
              <span className="lane-bar">
                <span className="lane-fill" style={{ width: `${l.time * 100}%` }} />
              </span>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-on-panel race-again" onClick={() => tl.current?.invalidate().restart(true)}>
        Run it again
      </button>
    </div>
  );
}

/* ----------------------------------------------------- Tacnique: the repo */

function Repo() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      gsap.from(".repo-line", { strokeDashoffset: 1, duration: 1.4, ease: "power2.inOut", stagger: 0.25 });
      gsap.from(".repo-dot", { scale: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(2)", stagger: 0.14, delay: 0.1 });
      gsap.from(".repo-label", { opacity: 0, duration: 0.4, stagger: 1.2, delay: 0.2 });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <svg className="repo" viewBox="0 0 520 220" role="img" aria-label="A commit history that starts at one commit, branches and merges, and ends in production">
        <path className="repo-line" pathLength={1} d="M40 150 H480" />
        <path className="repo-line" pathLength={1} d="M110 150 C150 150 150 90 190 90 H280 C320 90 320 150 360 150" />
        <path className="repo-line" pathLength={1} d="M200 150 C230 150 230 190 260 190 H300 C330 190 330 150 360 150" />
        {[
          [40, 150],
          [110, 150],
          [190, 90],
          [200, 150],
          [280, 90],
          [260, 190],
          [360, 150],
          [420, 150],
        ].map(([x, y]) => (
          <circle className="repo-dot" key={`${x}-${y}`} cx={x} cy={y} r="9" />
        ))}
        <circle className="repo-dot repo-dot-end" cx="480" cy="150" r="14" />
        <text className="repo-label" x="40" y="188" textAnchor="start">
          First commit
        </text>
        <text className="repo-label" x="480" y="112" textAnchor="end">
          Production
        </text>
      </svg>
      <p className="vis-note">Four engineers. Three years. One product in production.</p>
    </div>
  );
}

/* -------------------------------------------------- Tacnique: extraction */

const RESUME: (string | number)[][] = [
  [34, "TypeScript", 18],
  [22, "React", 30],
  [40, 26],
  [16, "PostgreSQL", 24],
  [28, "AWS", 36],
  [44, 20],
  [20, "Node.js", 28],
];
const FOUND = RESUME.flat().filter((x): x is string => typeof x === "string");

function Extract() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".cv", { y: 24, opacity: 0, duration: 0.5, ease: "power3.out" });
      // The marker finds a skill, then the skill lands in the profile.
      gsap.utils.toArray<HTMLElement>(".cv-word").forEach((w, i) => {
        tl.fromTo(w, { backgroundSize: "0% 100%" }, { backgroundSize: "100% 100%", duration: 0.25, ease: "power1.out" }, 0.5 + i * 0.32);
        tl.from(`.profile .chip:nth-child(${i + 1})`, pop, 0.65 + i * 0.32);
      });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <div className="extract">
        <div className="cv" aria-label="A resume with five skills highlighted">
          <span className="cv-title" />
          {RESUME.map((line, i) => (
            <p key={i}>
              {line.map((x, j) =>
                typeof x === "string" ? (
                  <span className="cv-word" key={j}>
                    {x}
                  </span>
                ) : (
                  <span className="cv-bar" key={j} style={{ width: `${x}%` }} />
                ),
              )}
            </p>
          ))}
        </div>
        <ChipList className="profile" title="Structured profile" items={FOUND} />
      </div>
    </div>
  );
}

/* ---------------------------------------------------- Tacnique: matching */

const NEEDS = ["React", "Node.js", "AWS"];
const PEOPLE = [
  { name: "Candidate A", has: ["React", "Node.js", "AWS", "PostgreSQL"] },
  { name: "Candidate B", has: ["React", "AWS", "Python"] },
  { name: "Candidate C", has: ["Java", "Node.js", "Angular"] },
];

function Match() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      gsap.from(".needs .chip", { ...pop, stagger: 0.07 });
      gsap.from(".person", { opacity: 0, x: -16, duration: 0.45, ease: "power3.out", stagger: 0.12, delay: 0.3 });
      gsap.from(".score-fill", { scaleX: 0, duration: 0.7, ease: "power3.out", stagger: 0.12, delay: 0.6 });
      gsap.from(".best", { ...pop, delay: 1.3 });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <div className="match">
        <ChipList className="needs" title="The client needs" items={NEEDS} hot />
        <ul className="people">
          {PEOPLE.map((p, i) => {
            const hits = p.has.filter((h) => NEEDS.includes(h)).length;
            return (
              <li className="person" key={p.name}>
                <span className="person-name">
                  {p.name}
                  {i === 0 && <span className="best">Best match</span>}
                </span>
                <span className="person-skills">
                  {p.has.map((h) => (
                    <span key={h} className={NEEDS.includes(h) ? "hit" : ""}>
                      {h}
                    </span>
                  ))}
                </span>
                <span className="score" aria-label={`${hits} of ${NEEDS.length} skills match`}>
                  <span className="score-fill" style={{ width: `${(hits / NEEDS.length) * 100}%` }} />
                </span>
                <span className="score-num" aria-hidden>
                  {hits} of {NEEDS.length}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------ Lead: the team */

function Team() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (still()) return;
      gsap.from(".member", { scale: 0, duration: 0.45, ease: "back.out(2)", stagger: { each: 0.04, from: "center", grid: "auto" } });
      gsap.from(".member-me", { boxShadow: "0 0 0 0 rgba(255,228,92,0)", duration: 0.6, delay: 0.7 });
    },
    { scope: ref },
  );
  return (
    <div className="vis" ref={ref}>
      <div className="team" role="img" aria-label="A team of fifteen engineers with Lester in the middle">
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} className={`member ${i === 7 ? "member-me" : ""}`}>
            {i === 7 ? "Me" : ""}
          </span>
        ))}
      </div>
      <p className="vis-note">15+ engineers, 15 to 20+ projects at a time, and I still write code.</p>
    </div>
  );
}
