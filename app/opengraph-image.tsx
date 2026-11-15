import { ImageResponse } from "next/og";

export const alt = "Lester Cardoz, senior software engineer in Berlin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#2742f5", color: "#fff", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 34 }}>Lester Cardoz</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1.15, letterSpacing: -2 }}>
          <div style={{ display: "flex" }}>I build products</div>
          <div style={{ display: "flex" }}>
            <span style={{ background: "#ffe45c", color: "#14151a", padding: "0 18px", borderRadius: 12 }}>from an empty repo.</span>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30 }}>Senior software engineer in Berlin. Java, TypeScript, AWS.</div>
      </div>
    ),
    size,
  );
}
