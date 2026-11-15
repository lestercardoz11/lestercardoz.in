"use client";

import { Chevron } from "@/components/Chevron";
import { TLink } from "@/components/Shell";
import { type Project, TRACKS } from "@/lib/content";
import { useTrack } from "@/lib/track";

// Only what a card shows. The page picks these out on the server, so the
// steps and pictures of every project are not sent along with the list.
export type Card = Pick<Project, "slug" | "tracks" | "name" | "what" | "period" | "metric">;

export function WorkIndex({ cards }: { cards: Card[] }) {
  // The switch in the header decides which work is showing.
  const track = useTrack();
  const list = cards.filter((p) => p.tracks.includes(track));
  const blurb = TRACKS.find((t) => t.id === track)!.blurb;

  return (
    <div className="work">
      <div className="head" data-in>
        <h1>Work</h1>
      </div>
      <p className="lede" data-in>
        {blurb} Pick one to walk through it.
      </p>
      <ul className={`cards cards-${list.length > 3 ? "many" : "few"}`}>
        {list.map((p) => (
          <li key={p.slug} data-in>
            <TLink href={`/work/${p.slug}`} className="card">
              <span className="card-metric">{p.metric.value}</span>
              <span className="card-metric-label">{p.metric.label}</span>
              <span className="card-name">{p.name}</span>
              <span className="card-what">{p.what}</span>
              <span className="card-foot">
                <span>{p.period}</span>
                <span className="card-open">
                  See how
                  <Chevron />
                </span>
              </span>
            </TLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
