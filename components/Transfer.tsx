"use client";

import { useState } from "react";
import { Subpages } from "@/components/shell/Subpages";
import { CONTACT } from "@/lib/pages";

const ROLES = [
  "Senior full-stack engineer",
  "Product engineer",
  "Founding engineer",
  "Forward deployed engineer",
  "Hands-on tech lead",
  "ServiceNow technical lead",
  "ServiceNow consultant",
];

const FACTS = [
  ["Berlin", "Home base since 2026"],
  ["Germany", "Eligible to work here"],
  ["Dubai", "Open to the right move"],
  ["The EU", "Open across the rest of Europe"],
];

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string };

export function Transfer() {
  const [role, setRole] = useState(ROLES[0]);
  const [club, setClub] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const clubName = club.trim() || "your company";
  const subject = `${role} at ${clubName}`;
  const body = `Hi Lester,\n\nWe would like to talk to you about a ${role} role at ${clubName}.\n\n${note.trim() ? note.trim() + "\n\n" : ""}Best,\n`;
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const send = async (form: HTMLFormElement) => {
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, club, email, note, website: new FormData(form).get("website") }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "The message did not go through.");
      setStatus({ state: "sent" });
      setNote("");
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "The message did not go through." });
    }
  };

  return (
    <>
      <div className="band" data-reveal suppressHydrationWarning>
        <h1>Transfer desk</h1>
        <p className="band-meta">Berlin based</p>
      </div>
      <Subpages
        name="Transfer desk"
        className="transfer"
        panels={[
          {
            id: "move",
            label: "The next move",
            node: (
              <>
                <p className="free" data-reveal suppressHydrationWarning>
                  Open to the right move.
                </p>
                <p className="seeking-lede" data-reveal suppressHydrationWarning>
                  Exciting opportunities across Germany, Dubai and the rest of the EU.
                </p>
                <ul className="facts" data-reveal suppressHydrationWarning>
                  {FACTS.map(([a, b]) => (
                    <li key={a}>
                      <span className="txt">{a}</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <p className="seeking" data-reveal suppressHydrationWarning>
                  The work that excites me: senior full-stack, product, founding and forward deployed engineering, or a
                  hands-on tech lead seat. On the ServiceNow side, technical lead and senior consulting work. English-first teams
                  suit me best, and my German is coming along.
                </p>
                <div className="contact-row" data-reveal suppressHydrationWarning>
                  <a className="btn" href={`mailto:${CONTACT.email}`}>
                    Email {CONTACT.email}
                  </a>
                  <a className="btn btn-ghost" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a className="btn btn-ghost" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              </>
            ),
          },
          {
            id: "talk",
            label: "Start a conversation",
            className: "offer",
            node: (
              <form
                className="offer-form"
                data-reveal
                suppressHydrationWarning
                onSubmit={(e) => {
                  e.preventDefault();
                  if (status.state !== "sending") send(e.currentTarget);
                }}
              >
                <fieldset>
                  <legend>Start a conversation. The role</legend>
                  <div className="roles">
                    {ROLES.map((r) => (
                      <button key={r} type="button" className="role-chip" aria-pressed={r === role} onClick={() => setRole(r)}>
                        {r}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="offer-fields">
                  <label>
                    <span>Your email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                  <label>
                    <span>The club</span>
                    <input value={club} onChange={(e) => setClub(e.target.value)} placeholder="Company name" autoComplete="organization" />
                  </label>
                  <label className="offer-trap" aria-hidden>
                    Leave this empty
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>
                  <label>
                    <span>Anything else</span>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Team, stack, when you would like to talk" />
                  </label>
                </div>
                <p className="telex" aria-live="polite">
                  <span className="c-yellow">TRANSFER NEWS</span>
                  {"\n"}
                  {clubName.toUpperCase()} IN TALKS WITH CARDOZ.
                  {"\n"}
                  POSITION: {role.toUpperCase()}.
                  {"\n"}
                  {status.state === "sent" ? "MESSAGE RECEIVED. REPLY TO FOLLOW." : "BERLIN BASED. OPEN TO GERMANY, DUBAI AND THE EU."}
                </p>
                <div className="offer-send">
                  <button type="submit" className="btn" disabled={status.state === "sending"}>
                    {status.state === "sending" ? "Sending..." : status.state === "sent" ? "Sent. Send another?" : "Send message"}
                  </button>
                  <p className="offer-status" role="status">
                    {status.state === "sent" ? "Thanks. Lester will reply to your email." : null}
                    {status.state === "error" ? (
                      <>
                        {status.message} <a href={mailto}>Email Lester instead</a>.
                      </>
                    ) : null}
                  </p>
                </div>
              </form>
            ),
          },
        ]}
      />
    </>
  );
}
