"use client";

import type { Visual as V } from "@/lib/content/chapters";
import { ExtractVisual, FlapVisual, OpexVisual } from "@/components/story/visuals/fullstack";
import { MorphVisual, PhotoVisual, RouteVisual, ScopeVisual } from "@/components/story/visuals/general";
import {
  BookingsVisual,
  InstancesVisual,
  MapVisual,
  PitchVisual,
  ScannerVisual,
  StatesVisual,
} from "@/components/story/visuals/servicenow";

export function Visual({ visual }: { visual: V }) {
  switch (visual.kind) {
    case "scope":
      return <ScopeVisual />;
    case "photo":
      return <PhotoVisual src={visual.src} alt={visual.alt} caption={visual.caption} focus={visual.focus} zoom={visual.zoom} />;
    case "extract":
      return <ExtractVisual />;
    case "opex":
      return <OpexVisual />;
    case "flap":
      return <FlapVisual rows={visual.rows} />;
    case "route":
      return <RouteVisual />;
    case "morph":
      return <MorphVisual />;
    case "states":
      return <StatesVisual />;
    case "map":
      return <MapVisual />;
    case "scanner":
      return <ScannerVisual />;
    case "instances":
      return <InstancesVisual />;
    case "bookings":
      return <BookingsVisual />;
    case "pitch":
      return <PitchVisual />;
  }
}
