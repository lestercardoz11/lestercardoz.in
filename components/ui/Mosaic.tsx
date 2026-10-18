// Teletext had mosaic graphics: pictures built from blocks. This draws one from a bitmap.
const COLOURS: Record<string, string> = {
  a: "var(--accent)",
  w: "var(--ink)",
  y: "var(--yellow)",
  n: "var(--navy)",
  c: "var(--cyan)",
  g: "var(--green)",
  r: "var(--red)",
};

export function Mosaic({ rows, className, label }: { rows: string[]; className?: string; label?: string }) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  return (
    <svg
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      preserveAspectRatio="xMinYMid meet"
    >
      {rows.flatMap((row, y) =>
        row.split("").map((ch, x) =>
          COLOURS[ch] ? <rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={COLOURS[ch]} /> : null,
        ),
      )}
    </svg>
  );
}

export const ART = {
  cup: [
    "a.aaaaaaaa.a",
    "a.aaaaaaaa.a",
    "aaaaaaaaaaaa",
    ".aaaaaaaaaa.",
    "..aaaaaaaa..",
    "...aaaaaa...",
    "....aaaa....",
    ".....aa.....",
    ".....aa.....",
    "....aaaa....",
    "...wwwwww...",
    "...wwwwww...",
  ],
  shield: [
    "aaaaaaaaaa",
    "awwwwwwwwa",
    "awwaaaawwa",
    "awwaaaawwa",
    "awwwwwwwwa",
    ".awwwwwwa.",
    ".awwwwwwa.",
    "..awwwwa..",
    "...awwa...",
    "....aa....",
  ],
  medal: [
    "aa......aa",
    ".aa....aa.",
    "..aa..aa..",
    "...aaaa...",
    "..wwwwww..",
    ".wwyyyyww.",
    ".wwyyyyww.",
    ".wwyyyyww.",
    "..wwwwww..",
    "...wwww...",
  ],
  book: [
    "aaaaaaaaaaaa",
    "awwwwwawwwwa",
    "awnnnwawnnwa",
    "awwwwwawwwwa",
    "awnnnwawnnwa",
    "awwwwwawwwwa",
    "aaaaaaaaaaaa",
  ],
  cockerel: [
    "......rr........",
    ".....rrr........",
    "....wwww........",
    "...wwnwwy.......",
    "...wwwwyy.......",
    "....wwww....ww..",
    "...wwwwww..www..",
    "..wwwwwwwwwww...",
    "..wwwwwwwwwww...",
    "...wwwwwwwww....",
    "....wwwwwww.....",
    ".....y...y......",
    ".....y...y......",
    "....wwwwwwww....",
    "...wwnnwwnnww...",
    "...wwnnwwnnww...",
    "....wwwwwwww....",
  ],
} as const;
