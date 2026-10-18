import { ImageResponse } from "next/og";

export const alt = "LESTERFAX page 100: Lester Cardoz, senior software engineer in Berlin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const KEYS: [string, string][] = [
  ["#ff5a4e", "Full-stack"],
  ["#3ee07f", "ServiceNow"],
  ["#ffe14d", "The squad"],
  ["#45e3ff", "Transfer desk"],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#000000",
          padding: 18,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: "#132257",
            borderRadius: 28,
            padding: "36px 56px",
            color: "#ffffff",
          }}
        >
          <div style={{ display: "flex", fontSize: 30, gap: 28 }}>
            <span>P100</span>
            <span style={{ color: "#45e3ff" }}>LESTERFAX</span>
            <span>100</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", marginTop: 60, fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4 }}>
            <span>LESTER</span>
            <span>CARDOZ</span>
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 36, color: "#ffe14d" }}>
            Senior software engineer in Berlin. Full-stack and ServiceNow.
          </div>
          <div style={{ display: "flex", marginTop: "auto", gap: 36, fontSize: 28 }}>
            {KEYS.map(([c, t]) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: c }}>
                <div style={{ width: 22, height: 22, background: c }} />
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
