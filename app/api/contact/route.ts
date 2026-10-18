import { CONTACT } from "@/lib/pages";

/*
  The transfer desk form. It sends Lester an email through Resend, with the
  visitor's address as reply-to, so a reply goes straight back to them.
  RESEND_API_KEY lives in the environment. CONTACT_FROM needs a domain verified
  in Resend; until then Resend's test sender only delivers to the account owner.
*/
const FROM = process.env.CONTACT_FROM || "Lesterfax <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || CONTACT.email;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// A few messages per visitor every ten minutes. Per instance, which is enough to stop a loop.
const WINDOW = 10 * 60 * 1000;
const LIMIT = 5;
const seen = new Map<string, number[]>();

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ error: "Email is not set up yet." }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Could not read the form." }, { status: 400 });
  }

  // The hidden field is only ever filled in by bots. Pretend it worked.
  if (clean(body.website, 200)) return Response.json({ ok: true });

  const email = clean(body.email, 200);
  const role = clean(body.role, 80);
  const club = clean(body.club, 120);
  const note = clean(body.note, 4000);
  if (!EMAIL.test(email)) return Response.json({ error: "That email address does not look right." }, { status: 400 });
  if (!role) return Response.json({ error: "Pick a role first." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const now = Date.now();
  const recent = (seen.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) {
    return Response.json({ error: "Too many messages in a row. Try again in a few minutes." }, { status: 429 });
  }
  seen.set(ip, [...recent, now]);

  const company = club || "A company";
  const text = [
    `${company} would like to talk about a ${role} role.`,
    "",
    `From: ${email}`,
    ...(club ? [`Company: ${club}`] : []),
    `Role: ${role}`,
    "",
    note || "(No message.)",
  ].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#132257">
<p style="margin:0 0 4px;font-weight:700;color:#132257">TRANSFER NEWS</p>
<p style="margin:0 0 16px">${escape(company)} would like to talk about a <strong>${escape(role)}</strong> role.</p>
<table style="border-collapse:collapse;margin-bottom:16px">
<tr><td style="padding:2px 16px 2px 0;color:#5a6488">From</td><td><a href="mailto:${escape(email)}">${escape(email)}</a></td></tr>
${club ? `<tr><td style="padding:2px 16px 2px 0;color:#5a6488">Company</td><td>${escape(club)}</td></tr>` : ""}
<tr><td style="padding:2px 16px 2px 0;color:#5a6488">Role</td><td>${escape(role)}</td></tr>
</table>
<p style="margin:0;white-space:pre-wrap">${note ? escape(note) : "<em>No message.</em>"}</p>
<p style="margin:24px 0 0;font-size:13px;color:#5a6488">Sent from the transfer desk on your portfolio. Reply to answer them directly.</p>
</div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `${role} at ${company}`,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "The message did not go through." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
