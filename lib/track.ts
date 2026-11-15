"use client";

import { useSyncExternalStore } from "react";
import type { Track } from "@/lib/content";

/*
  Which version of the site is showing: full stack or ServiceNow. The choice
  lives on <html data-track>, so the stylesheet can change the accent colour
  with it, and in localStorage, so it is remembered. A link ending in
  ?track=servicenow opens that version (the script in app/layout.tsx reads it
  before the first paint).
*/
const EVENT = "trackchange";

const read = (): Track => (document.documentElement.dataset.track === "servicenow" ? "servicenow" : "fullstack");

const subscribe = (cb: () => void) => {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
};

export function useTrack(): Track {
  return useSyncExternalStore(subscribe, read, () => "fullstack");
}

export function setTrack(track: Track) {
  if (read() === track) return;
  document.documentElement.dataset.track = track;
  try {
    localStorage.setItem("track", track);
  } catch {
    // Private windows can refuse storage. The choice still holds for this visit.
  }
  window.dispatchEvent(new Event(EVENT));
}
