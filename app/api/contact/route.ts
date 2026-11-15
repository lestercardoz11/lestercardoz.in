import { ROLES } from "@/lib/content";
import { CONTACT } from "@/lib/site";

/*
  The contact form. It emails Lester through Resend with the visitor's address
  as reply-to, so a reply goes straight back to them. RESEND_API_KEY lives in
  the environment. CONTACT_FROM needs a domain verified in Resend. Until then
  Resend's test sender only delivers to the account owner.
*/
const FROM = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || CONTACT.email;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A few messages per visitor every ten minutes. Per instance, which is enough to stop a loop.
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const seen = new Map<string, number[]>();

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return Response.json({ error: "That message could not be read." }, { status: 400 });
  }

  // A hidden field people never see. Bots fill it in, and get a quiet success.
  if (clean(body.hp, 200)) return Response.json({ ok: true });

  const email = clean(body.email, 200);
  const company = clean(body.company, 80);
  const note = clean(body.note, 2000);
  const role = ROLES.includes(body.role) ? (body.role as string) : ROLES[ROLES.length - 1];

  if (!EMAIL.test(email)) {
    return Response.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return Response.json({ error: "The form is not set up yet. Email me directly instead." }, { status: 503 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) {
    return Response.json({ error: "Too many messages. Try again in a few minutes." }, { status: 429 });
  }
  if (seen.size > 1000) seen.clear();
  seen.set(ip, [...recent, now]);

  const who = company || "Someone";
  const text = [`${who} would like to talk about a ${role} role.`, "", `From: ${email}`, ...(company ? [`Company: ${company}`] : []), `Role: ${role}`, "", note || "(No message.)"].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#14151a">
<p style="margin:0 0 16px">${escape(who)} would like to talk about a <strong>${escape(role)}</strong> role.</p>
<table style="border-collapse:collapse;margin-bottom:16px">
<tr><td style="padding:2px 16px 2px 0;color:#5b6070">From</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
${company ? `<tr><td style="padding:2px 16px 2px 0;color:#5b6070">Company</td><td>${escape(company)}</td></tr>` : ""}
<tr><td style="padding:2px 16px 2px 0;color:#5b6070">Role</td><td>${escape(role)}</td></tr>
</table>
<p style="margin:0;white-space:pre-wrap">${note ? escape(note) : "<em>No message.</em>"}</p>
<p style="margin:24px 0 0;font-size:13px;color:#5b6070">Sent from the contact form on your portfolio. Reply to answer them directly.</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject: `${role} role, from ${who}`, text, html }),
  });

  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "The message did not send. Email me directly instead." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
