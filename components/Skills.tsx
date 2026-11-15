"use client";

import { useRef, useState } from "react";
import { TLink } from "@/components/Shell";
import { Tabs, tabId } from "@/components/Tabs";
import { SKILLS, type Track } from "@/lib/content";
import { gsap, rise, still, useGSAP } from "@/lib/gsap";
import { useTrack } from "@/lib/track";

type Names = Record<string, string>;

export function Skills({ names }: { names: Names }) {
  const track = useTrack();
  return <Areas key={track} track={track} names={names} />;
}

function Areas({ track, names }: { track: Track; names: Names }) {
  const groups = SKILLS.filter((s) => s.track === track);
  const [id, setId] = useState(groups[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const g = groups.find((s) => s.id === id)!;

  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      if (still()) return;
      rise(".skill-blurb, .skill-foot", 8);
      gsap.fromTo(".skill", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", stagger: 0.025, clearProps: "all" });
    },
    { dependencies: [id], scope: ref },
  );

  return (
    <div className="skills" ref={ref}>
      <div className="head" data-in>
        <h1>Skills</h1>
      </div>
      <div className="skills-grid">
        <div data-in>
          <Tabs label="Skill areas" panelId="skills-panel" vertical value={id} onChange={setId} options={groups.map((s) => ({ id: s.id, label: s.label }))} />
        </div>
        <div className="skills-body" data-in role="tabpanel" id="skills-panel" aria-labelledby={tabId("skills-panel", id)}>
          <p className="skill-blurb">{g.blurb}</p>
          <ul className="skill-list">
            {g.core.map((s) => (
              <li className="skill skill-core" key={s}>
                {s}
              </li>
            ))}
            {g.also.map((s) => (
              <li className="skill" key={s}>
                {s}
              </li>
            ))}
          </ul>
          <div className="skill-foot">
            {g.badges && (
              <p className="skill-badges">
                <strong>Certified:</strong> {g.badges.join(", ")}
              </p>
            )}
            <p className="skill-used">
              <span>
                <i className="key key-core" aria-hidden /> Strongest
              </span>
              <span>
                <i className="key" aria-hidden /> Also used
              </span>
              <span className="skill-links">
                See it in
                {g.usedIn.map((slug) => (
                  <TLink key={slug} href={`/work/${slug}`} className="text-link">
                    {names[slug]}
                  </TLink>
                ))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
