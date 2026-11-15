/*
  Screenshots and layout checks in headless Chrome, with no dependencies.

    pnpm build && pnpm start -p 3100   (in another terminal)
    pnpm shots                  every shot in scripts/shots.json
    pnpm shots home case-race   only the named shots

  Each shot prints one line: how far the page scrolls (it should be 0 on a
  laptop), anything hanging off the side, and any console errors. Read that
  line first. Open the PNG in .shots/ only when the line looks wrong or the
  change was visual. A shot is { name, path, w, h, js?, wait?, after?, reduced? }.
*/
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, "..", ".shots");
const only = process.argv.slice(2);
const BASE = process.env.BASE || "http://localhost:3100";
const all = JSON.parse(readFileSync(join(here, "shots.json"), "utf8"));
const shots = only.length ? all.filter((s) => only.includes(s.name)) : all;

const CHROME = [
  process.env.CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));
if (!CHROME) throw new Error("No Chrome found. Set CHROME to the browser path.");

const port = 9333 + Math.floor(Math.random() * 500);
mkdirSync(out, { recursive: true });
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), `shots-${port}`)}`, "--no-first-run", "--hide-scrollbars", "about:blank"]);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 40 && !target; i++) {
  await sleep(250);
  try {
    target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === "page");
  } catch {}
}
if (!target) throw new Error("Chrome did not start.");

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
const errors = [];
ws.onmessage = (m) => {
  const d = JSON.parse(m.data);
  if (d.id && pending.has(d.id)) pending.get(d.id)(d.result ?? d.error);
  if (d.method === "Runtime.exceptionThrown") errors.push(d.params.exceptionDetails.exception?.description || d.params.exceptionDetails.text);
  if (d.method === "Runtime.consoleAPICalled" && d.params.type === "error") errors.push(d.params.args.map((a) => a.value ?? a.description).join(" "));
};
const send = (method, params = {}) => new Promise((r) => (pending.set(++id, r), ws.send(JSON.stringify({ id, method, params }))));
await send("Page.enable");
await send("Runtime.enable");

// What a reviewer would otherwise have to eyeball: scroll, overflow, tiny tap targets.
const METRICS = `(() => {
  const stage = document.querySelector(".stage");
  const off = [...document.querySelectorAll(".view *")]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width && !e.closest(".trap") && !e.classList.contains("trap") && (r.right > innerWidth + 1 || r.left < -1); })
    .slice(0, 4).map((e) => String(e.className || e.tagName));
  const small = [...document.querySelectorAll("a, button, [role=button]")]
    .filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.height < 32 || r.width < 32); })
    .slice(0, 4).map((e) => (e.textContent || "").trim().slice(0, 20));
  return JSON.stringify({ scroll: stage.scrollHeight - stage.clientHeight, sideways: document.documentElement.scrollWidth - innerWidth, off, small });
})()`;

let failed = 0;
for (const s of shots) {
  errors.length = 0;
  await send("Emulation.setDeviceMetricsOverride", { width: s.w, height: s.h, deviceScaleFactor: 1, mobile: s.w < 600 });
  await send("Emulation.setEmulatedMedia", { features: s.reduced ? [{ name: "prefers-reduced-motion", value: "reduce" }] : [] });
  // The site remembers its version, so every shot says which one it wants.
  const path = s.path.includes("track=") ? s.path : s.path.replace(/(#|$)/, (s.path.includes("?") ? "&" : "?") + "track=fullstack$1");
  await send("Page.navigate", { url: BASE + path });
  await sleep(s.wait ?? 2200);
  if (s.js) {
    const r = await send("Runtime.evaluate", { expression: s.js, awaitPromise: true });
    if (r.exceptionDetails) errors.push(`js: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
    await sleep(s.after ?? 2000);
  }
  const m = await send("Runtime.evaluate", { expression: METRICS, returnByValue: true });
  const png = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(join(out, `${s.name}.png`), Buffer.from(png.data, "base64"));
  if (errors.length) failed++;
  console.log(`${s.name} ${s.w}x${s.h} ${m.result?.value}${errors.length ? ` ERRORS ${JSON.stringify(errors).slice(0, 300)}` : ""}`);
}
ws.close();
chrome.kill();
process.exit(failed ? 1 : 0);
