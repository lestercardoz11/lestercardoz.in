"use client";

import { useEffect, useRef, useState } from "react";
import { LOOKING, PRACTICAL, ROLES, TRACKS } from "@/lib/content";
import { gsap, still, useGSAP } from "@/lib/gsap";
import { CONTACT } from "@/lib/site";
import { useTrack } from "@/lib/track";

type State = "idle" | "sending" | "sent" | "error";

export function Contact() {
  // The role starts on whichever version of the site the visitor is reading.
  const track = useTrack();
  const [picked, setRole] = useState<string | null>(null);
  const role = picked ?? TRACKS.find((t) => t.id === track)!.label;
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const sentRef = useRef<HTMLHeadingElement>(null);
  const { contextSafe } = useGSAP({ scope: ref });

  const copy = contextSafe(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      window.location.assign(`mailto:${CONTACT.email}`);
      return;
    }
    setCopied(true);
    if (!still()) gsap.fromTo(".copy", { scale: 0.96 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    setTimeout(() => setCopied(false), 1800);
  });

  // The form has gone, so move focus to the confirmation and let it be read out.
  useEffect(() => {
    if (state === "sent") sentRef.current?.focus();
  }, [state]);

  useGSAP(
    () => {
      if (state === "sent" && !still()) {
        gsap.from(".sent > *", { opacity: 0, y: 14, duration: 0.5, ease: "power3.out", stagger: 0.08 });
        gsap.from(".sent-tick path", { strokeDashoffset: 1, duration: 0.5, delay: 0.15, ease: "power2.out" });
      }
    },
    { dependencies: [state], scope: ref },
  );

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email: data.get("email"), company: data.get("company"), note: data.get("note"), hp: data.get("hp_extra") }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "The message did not send. Email me directly instead.");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The message did not send. Email me directly instead.");
      setState("error");
    }
  }

  return (
    <div className="contact" ref={ref}>
      <div className="contact-side">
        <h1 data-in>Let&rsquo;s talk.</h1>
        <p className="lede" data-in>
          {LOOKING[track]}
        </p>
        <div className="reach" data-in>
          <button type="button" className="copy" onClick={copy}>
            <span>{CONTACT.email}</span>
            <em aria-live="polite">{copied ? "Copied" : "Copy"}</em>
          </button>
          <div className="reach-links">
            <a className="btn" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn" href={CONTACT.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <dl className="practical" data-in>
          {PRACTICAL.map((p) => (
            <div key={p.value}>
              <dt>{p.value}</dt>
              <dd>{p.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="panel contact-panel" data-in>
        {state === "sent" ? (
          <div className="sent" role="status">
            <svg className="sent-tick" viewBox="0 0 48 48" width="56" height="56" aria-hidden>
              <path d="M12 25l8 8 16-18" pathLength={1} />
            </svg>
            <h2 ref={sentRef} tabIndex={-1}>
              Message sent.
            </h2>
            <p>It is in my inbox, and I will reply to the address you gave.</p>
            <button type="button" className="btn btn-on-panel" onClick={() => setState("idle")}>
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={send} className="form">
            <fieldset>
              <legend>What is the role?</legend>
              <div className="role-chips">
                {ROLES.map((r) => (
                  <button type="button" key={r} className="role" aria-pressed={r === role} onClick={() => setRole(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="fields">
              <label>
                <span className="lab">Your email</span>
                <input type="email" name="email" required autoComplete="email" placeholder="you@company.com" />
              </label>
              <label>
                <span className="lab">
                  Company <i>optional</i>
                </span>
                <input type="text" name="company" autoComplete="organization" maxLength={80} />
              </label>
            </div>
            <label>
              <span className="lab">
                Message <i>optional</i>
              </span>
              <textarea name="note" rows={3} maxLength={2000} placeholder="A line about the role, or a link to it" />
            </label>
            <input type="text" name="hp_extra" tabIndex={-1} autoComplete="off" className="trap" aria-hidden />
            <div className="form-foot">
              <button type="submit" className="btn btn-yellow" disabled={state === "sending"}>
                {state === "sending" ? "Sending" : "Send message"}
              </button>
              {state === "error" && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
