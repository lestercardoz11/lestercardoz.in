"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Chevron } from "@/components/Chevron";
import { TLink } from "@/components/Shell";
import { Tabs, tabId } from "@/components/Tabs";
import { CREDENTIALS, METHOD, PRINCIPLES, TIMELINE } from "@/lib/content";
import { gsap, rise, still, useArrowKeys, useGSAP } from "@/lib/gsap";
import { setTrack } from "@/lib/track";

const TABS = [
  { id: "path", label: "Path" },
  { id: "how", label: "How I work" },
  { id: "credentials", label: "Credentials" },
];

// The open tab is the URL hash, so /about#how links straight to a tab.
const onHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.slice(1);

function openTab(id: string) {
  // Replace, so Back leaves the page instead of stepping through tabs.
  window.history.replaceState(window.history.state, "", id === "path" ? window.location.pathname : `#${id}`);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}

export function About() {
  const hash = useSyncExternalStore(onHash, readHash, () => "");
  const tab = TABS.some((t) => t.id === hash) ? hash : "path";
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (still()) return;
      rise(".about-body > *", 12);
    },
    { dependencies: [tab], scope: ref },
  );

  return (
    <div className="about" ref={ref}>
      <div className="head" data-in>
        <h1>About</h1>
        <Tabs label="About Lester" panelId="about-panel" value={tab} onChange={openTab} options={TABS} />
      </div>
      <div className="about-body" data-in role="tabpanel" id="about-panel" aria-labelledby={tabId("about-panel", tab)}>
        {tab === "path" && <Path />}
        {tab === "how" && <How />}
        {tab === "credentials" && <Credentials />}
      </div>
    </div>
  );
}

function Path() {
  const [i, setI] = useState(TIMELINE.length - 1);
  const ref = useRef<HTMLDivElement>(null);
  const t = TIMELINE[i];

  useArrowKeys(TIMELINE.length, setI);

  useGSAP(
    () => {
      const scaleX = i / (TIMELINE.length - 1);
      if (still()) {
        gsap.set(".rail-fill", { scaleX });
        return;
      }
      gsap.to(".rail-fill", { scaleX, duration: 0.5, ease: "power3.out" });
      rise(".stop-card > *");
    },
    { dependencies: [i], scope: ref },
  );

  return (
    <div className="path" ref={ref}>
      <div className="rail">
        <span className="rail-line" aria-hidden>
          <span className="rail-fill" />
        </span>
        <ol>
          {TIMELINE.map((s, n) => (
            <li key={s.year}>
              <button type="button" className="stop" aria-current={n === i ? "step" : undefined} data-past={n <= i || undefined} onClick={() => setI(n)}>
                <span className="stop-dot" aria-hidden />
                {s.year}
                <span className="stop-short">{s.short}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="stop-card" aria-live="polite">
        <p className="stop-place">
          {t.year}, {t.place}
        </p>
        <h2>{t.title}</h2>
        <p className="stop-body">{t.body}</p>
        <div className="stop-nav">
          <button type="button" className="btn btn-icon" onClick={() => setI(i - 1)} disabled={i === 0} aria-label="Earlier">
            <Chevron back />
          </button>
          <button type="button" className="btn btn-icon" onClick={() => setI(i + 1)} disabled={i === TIMELINE.length - 1} aria-label="Later">
            <Chevron />
          </button>
          {t.href && (
            <TLink href={t.href} className="btn btn-solid" onClick={() => t.track && setTrack(t.track)}>
              {t.cta}
            </TLink>
          )}
        </div>
      </div>
    </div>
  );
}

function How() {
  return (
    <>
      <ul className="principles">
        {PRINCIPLES.map((p) => (
          <li key={p.title}>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <div className="method">
        <p>How I fix a problem</p>
        <ol>
          {METHOD.map((m, i) => (
            <li key={m}>
              <span>{i + 1}</span>
              {m}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

function Credentials() {
  return (
    <ul className="creds">
      {CREDENTIALS.map((c) => (
        <li key={c.title}>
          <span className="cred-kind">{c.kind}</span>
          <h2>{c.title}</h2>
          <p>{c.detail}</p>
        </li>
      ))}
    </ul>
  );
}
