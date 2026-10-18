"use client";

import { useRef, useState } from "react";
import { useVisual } from "@/components/story/useVisual";
import { gsap, SCRAMBLE_CHARS } from "@/lib/gsap";

/* Tacnique: a CV goes in, a structured profile comes out, and the client finds a match. */
const CV = [
  ["Five years building ", "React", " and ", "Node.js", " products."],
  ["Moved a codebase to ", "TypeScript", "."],
  ["Data in ", "PostgreSQL", ", services on ", "AWS", "."],
  ["Mentored two junior developers."],
];
const SKILLS = ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS"];

export function ExtractVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const kws = q(".kw");
    const chips = q(".skill");
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, delay: 0.5 });
    tl.set(chips, { autoAlpha: 0 })
      .set(q(".match"), { autoAlpha: 0 })
      .set(kws, { backgroundColor: "rgba(0,0,0,0)", color: "inherit" })
      .from(q(".cv-line"), { clipPath: "inset(0 100% 0 0)", duration: 0.35, stagger: 0.12, ease: "steps(8)" })
      .to(q(".extract-arrow"), { autoAlpha: 1, duration: 0.2 });
    kws.forEach((kw, i) => {
      tl.to(kw, { backgroundColor: "#ffe14d", color: "#132257", duration: 0.12, ease: "steps(1)" }, "+=0.12").to(
        chips[i],
        { autoAlpha: 1, duration: 0.5, scrambleText: { text: SKILLS[i], chars: SCRAMBLE_CHARS } },
        "<",
      );
    });
    tl.to(q(".match"), { autoAlpha: 1, duration: 0.3, ease: "steps(3)" }, "+=0.3")
      .fromTo(q(".match-bar i"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, stagger: 0.08, ease: "steps(4)" })
      .to({}, { duration: 2.5 });
    return tl;
  });

  let k = 0;
  return (
    <div ref={root} className="vis vis-extract">
      <div className="extract-cols">
        <div className="cv">
          <p className="vis-cap">Sample CV</p>
          {CV.map((parts, i) => (
            <p key={i} className="cv-line">
              {parts.map((p, j) =>
                j % 2 === 1 ? (
                  <span key={j} className="kw" data-k={k++}>
                    {p}
                  </span>
                ) : (
                  <span key={j}>{p}</span>
                ),
              )}
            </p>
          ))}
        </div>
        <div className="extract-arrow txt c-accent" aria-hidden>
          ▶
        </div>
        <div className="profile">
          <p className="vis-cap">Structured profile</p>
          <ul className="skills txt">
            {SKILLS.map((s) => (
              <li key={s} className="skill">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="match txt">
        <span>Client needs React and PostgreSQL</span>
        <span className="match-bar" aria-hidden>
          <i />
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="c-green">Match</span>
      </div>
    </div>
  );
}

/* Opex Genie: bills in four carrier formats go through the queue, the parsers and into the dashboard. */
const CARRIERS = ["#ff5a4e", "#45e3ff", "#ffe14d", "#3ee07f"];

function PipelineVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const stage = q(".pipe-stages")[0];
    const w = stage.offsetWidth;
    const tl = gsap.timeline({ repeat: -1 });
    q(".bill").forEach((bill, i) => {
      const row = q(".row")[i];
      const t = i * 0.55;
      tl.fromTo(bill, { x: 0, autoAlpha: 0 }, { autoAlpha: 1, duration: 0.1 }, t)
        .to(bill, { x: w * 0.27, duration: 0.6, ease: "steps(6)" }, t)
        .to(bill, { x: w * 0.52, duration: 0.6, ease: "steps(6)" }, t + 0.8)
        .to(bill, { autoAlpha: 0, duration: 0.05 }, t + 1.4)
        .fromTo(row, { x: w * 0.54, autoAlpha: 0 }, { x: w * 0.8, autoAlpha: 1, duration: 0.6, ease: "steps(6)" }, t + 1.4)
        .to(row, { autoAlpha: 0, duration: 0.05 }, t + 2.05);
    });
    const bars = q(".dash-bar");
    tl.fromTo(bars, { scaleY: 0.08 }, { scaleY: (i) => [0.45, 0.8, 0.6, 1, 0.7, 0.9][i], duration: 4.5, ease: "steps(9)", stagger: 0.1 }, 0.5);
    const counter = { n: 4.2 };
    const out = q(".pipe-count")[0];
    tl.fromTo(
      counter,
      { n: 4.2 },
      {
        n: 5,
        duration: 5,
        ease: "none",
        onUpdate: () => {
          out.textContent = `${counter.n.toFixed(2)}M`;
        },
        onComplete: () => {
          out.textContent = "5M+";
        },
      },
      0,
    );
    tl.to({}, { duration: 1 });
    return tl;
  });
  return (
    <div ref={root} className="vis vis-pipe">
      <div className="vis-row">
        <span className="vis-title">Bill pages processed</span>
        <span className="pipe-count txt c-accent">5M+</span>
      </div>
      <div className="pipe-stages">
        {[
          ["PDF bills", "4 carriers"],
          ["SQS", "queue"],
          ["Parsers", "Spring Boot, PDFBox"],
          ["PostgreSQL", "multi-tenant"],
        ].map(([a, b]) => (
          <div key={a} className="pipe-stage">
            <span className="vis-title">{a}</span>
            <span className="vis-cap">{b}</span>
          </div>
        ))}
        <div className="pipe-lane" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="bill" style={{ background: CARRIERS[i % 4] }}>
              <i />
              <i />
              <i />
            </span>
          ))}
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i} className="row" style={{ background: CARRIERS[i % 4] }} />
          ))}
        </div>
      </div>
      <div className="pipe-dash">
        <span className="vis-cap">Angular dashboard, cost by carrier</span>
        <div className="dash-bars" aria-hidden>
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className="dash-bar" style={{ background: CARRIERS[i % 4] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* The parser fix: the same bill, before and after. */
function RaceVisual() {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.4 });
    const beforeRows = q(".lane-before .cell");
    const afterRows = q(".lane-after .cell");
    tl.set([beforeRows, afterRows], { backgroundColor: "#1c2f72" })
      .set(q(".lane-done"), { autoAlpha: 0 })
      .set(q(".reads i"), { backgroundColor: "#1c2f72" })
      .fromTo(q(".lane-before .lane-fill"), { scaleX: 0 }, { scaleX: 1, duration: 4.5, ease: "none" }, 0)
      .fromTo(q(".lane-after .lane-fill"), { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "none" }, 0)
      .to(q(".lane-before .reads i"), { backgroundColor: "#ff5a4e", stagger: 1.4, duration: 0.05 }, 0)
      .to(q(".lane-after .reads i"), { backgroundColor: "#3ee07f", duration: 0.05 }, 0)
      .to(beforeRows, { backgroundColor: "#ff5a4e", stagger: 4.4 / beforeRows.length, duration: 0.05, ease: "steps(1)" }, 0.05)
      .to(afterRows.slice(0, 12), { backgroundColor: "#3ee07f", duration: 0.05 }, 0.7)
      .to(afterRows.slice(12), { backgroundColor: "#3ee07f", duration: 0.05 }, 1.45)
      .to(q(".lane-after .lane-done"), { autoAlpha: 1, duration: 0.1 }, 1.5)
      .to(q(".lane-before .lane-done"), { autoAlpha: 1, duration: 0.1 }, 4.5);
    return tl;
  });
  const lane = (cls: string, name: string, note: string, reads: number) => (
    <div className={`lane ${cls}`}>
      <div className="vis-row">
        <span className="vis-title">{name}</span>
        <span className="lane-done txt">Done</span>
      </div>
      <p className="lane-note">{note}</p>
      <div className="lane-body">
        <span className="reads" aria-label={`${reads} reads of the bill`}>
          {Array.from({ length: reads }, (_, i) => (
            <i key={i} />
          ))}
        </span>
        <span className="cells" aria-hidden>
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="cell" />
          ))}
        </span>
      </div>
      <div className="lane-track" aria-hidden>
        <span className="lane-fill" />
      </div>
    </div>
  );
  return (
    <div ref={root} className="vis vis-race">
      {lane("lane-before", "Before", "a write per row, the bill read three times", 3)}
      {lane("lane-after", "After", "rows in a map, batched writes, one read", 1)}
      <pre className="race-code">
        <code>
          <span className="c-red">- for (Row r : rows) repo.save(r);</span>
          {"\n"}
          <span className="c-green">+ rows.forEach(r -&gt; batch.put(r.key(), r));</span>
          {"\n"}
          <span className="c-green">+ repo.saveAll(batch.values());</span>
        </code>
      </pre>
    </div>
  );
}

/* Opex Genie: the pipeline, and one click over, the parser fix that made it ~200% faster. */
const OPEX_TABS = [
  ["pipe", "The pipeline"],
  ["fix", "The parser fix, ~200%"],
] as const;

export function OpexVisual() {
  const [tab, setTab] = useState<(typeof OPEX_TABS)[number][0]>("pipe");
  return (
    <div className="vis vis-opex">
      <div className="vis-tabs" role="tablist" aria-label="Opex Genie">
        {OPEX_TABS.map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`opex-tab-${id}`}
            className="vis-tab txt"
            aria-selected={tab === id}
            aria-controls="opex-panel"
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="vis-panel" id="opex-panel" role="tabpanel" aria-labelledby={`opex-tab-${tab}`}>
        {tab === "pipe" ? <PipelineVisual key="pipe" /> : <RaceVisual key="fix" />}
      </div>
    </div>
  );
}

/* Technical lead: a stadium scoreboard, flapping over to the numbers. */
export function FlapVisual({ rows }: { rows: { value: string; label: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  useVisual(root, (q) => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 0.3 });
    q(".flap-value").forEach((el, i) => {
      const text = rows[i].value;
      tl.to(el, { duration: 1.1, scrambleText: { text, chars: "0123456789%+", speed: 0.4, revealDelay: 0.5 } }, i * 0.18);
    });
    return tl;
  });
  return (
    <div ref={root} className="vis vis-flap">
      <p className="vis-title c-yellow">Ajackus, technical lead</p>
      <dl className="flap-board">
        {rows.map((r) => (
          <div key={r.label} className="flap-row">
            <dt className="flap-label">{r.label}</dt>
            <dd className="flap-value txt">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
