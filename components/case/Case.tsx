"use client";

import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Chevron";
import { TLink, useGo } from "@/components/Shell";
import { Tabs } from "@/components/Tabs";
import { Visual } from "@/components/case/Visuals";
import type { Project, Track } from "@/lib/content";
import { gsap, rise, still, useArrowKeys, useGSAP } from "@/lib/gsap";
import { setTrack, useTrack } from "@/lib/track";

type Props = { project: Project; nexts: Partial<Record<Track, { slug: string; name: string }>> };

const back = "/work";

// A project told in a few steps. Click the steps, the arrows, or use the arrow keys.
export function Case({ project, nexts }: Props) {
  // A project opened from a link may belong to the other version of the site.
  // Follow it, so "All work" and "Next" stay among its neighbours.
  const chosen = useTrack();
  const track = project.tracks.includes(chosen) ? chosen : project.tracks[0];
  const next = nexts[track]!;
  const arrived = useRef(false);
  const go = useGo();
  useEffect(() => {
    if (project.tracks.includes(chosen)) {
      arrived.current = true;
      return;
    }
    // On arrival the site follows the project. After that, flipping the
    // switch to a version this project is not part of goes back to the work.
    if (arrived.current) go(back);
    else setTrack(track);
    arrived.current = true;
  }, [chosen, project.tracks, track, go]);

  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const steps = project.steps;
  const s = steps[step];
  const last = step === steps.length - 1;

  useArrowKeys(steps.length, setStep, () => go(back));

  useGSAP(
    () => {
      const scaleX = (step + 1) / steps.length;
      if (still()) {
        gsap.set(".case-bar-fill", { scaleX });
        return;
      }
      rise(".case-copy > *");
      gsap.to(".case-bar-fill", { scaleX, duration: 0.5, ease: "power3.out" });
    },
    { dependencies: [step], scope: ref },
  );

  return (
    <div className="case" ref={ref}>
      <div className="case-text">
        <TLink href={back} className="back" data-in>
          <Chevron back />
          All work
        </TLink>
        <div data-in>
          <h1>{project.name}</h1>
          <p className="case-meta">
            {project.role}, {project.period}
          </p>
        </div>
        <div data-in>
          <Tabs label="Steps" numbered value={String(step)} onChange={(v) => setStep(Number(v))} options={steps.map((x, i) => ({ id: String(i), label: x.tab }))} />
        </div>
        <div className="case-copy" data-in aria-live="polite">
          <h2>{s.title}</h2>
          <p>{s.body}</p>
        </div>
        <div className="case-nav" data-in>
          <button type="button" className="btn btn-icon" onClick={() => setStep(step - 1)} disabled={step === 0} aria-label="Previous step">
            <Chevron back />
          </button>
          {last ? (
            <TLink href={`/work/${next.slug}`} className="btn btn-solid">
              Next: {next.name}
              <Chevron />
            </TLink>
          ) : (
            <button type="button" className="btn btn-solid" onClick={() => setStep(step + 1)}>
              Next: {steps[step + 1].tab}
              <Chevron />
            </button>
          )}
        </div>
        <ul className="tags" data-in aria-label="Built with">
          {project.stack.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="panel" data-in>
        <div className="case-bar" aria-hidden>
          <span className="case-bar-fill" />
        </div>
        <Visual key={step} visual={s.visual} />
      </div>
    </div>
  );
}
