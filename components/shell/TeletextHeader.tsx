"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { pageByNum, pageByPath } from "@/lib/pages";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const pad = (n: number) => String(n).padStart(2, "0");

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);
  return now;
}

export function TeletextHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const now = useClock();
  const current = pageByPath(pathname);
  const targetNum = current?.num ?? 404;

  const numRef = useRef<HTMLSpanElement>(null);
  const shownNum = useRef(targetNum);
  const [typed, setTyped] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  // Real Teletext sets cycled past the pages in between. Count up to the new page.
  useEffect(() => {
    const el = numRef.current;
    if (!el) return;
    const counter = { n: shownNum.current };
    const tween = gsap.to(counter, {
      n: targetNum,
      duration: Math.abs(targetNum - shownNum.current) > 0 ? 0.45 : 0,
      ease: "steps(9)",
      onUpdate: () => {
        el.textContent = `P${Math.round(counter.n)}`;
      },
      onComplete: () => {
        shownNum.current = targetNum;
        el.textContent = `P${targetNum}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [targetNum]);

  // The remote control: type three digits anywhere to jump to that page.
  useEffect(() => {
    let buffer = "";
    let timer: number | undefined;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!/^[0-9]$/.test(e.key)) return;
      buffer += e.key;
      setTyped(buffer);
      window.clearTimeout(timer);
      if (buffer.length === 3) {
        const num = Number(buffer);
        const page = pageByNum(num);
        buffer = "";
        if (page) {
          router.push(page.path);
          window.setTimeout(() => setTyped(""), 120);
        } else {
          setNotice(`Page ${num} is not in service`);
          window.setTimeout(() => {
            setTyped("");
            setNotice(null);
          }, 1600);
        }
      } else {
        timer = window.setTimeout(() => {
          buffer = "";
          setTyped("");
        }, 2500);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [router]);

  const typing = typed.length > 0;

  return (
    <header className="txt-header txt" aria-label="Page header">
      <span className="pnum" data-typing={typing} aria-live="polite">
        {typing ? `P${typed.padEnd(3, "_")}` : <span ref={numRef}>P{targetNum}</span>}
      </span>
      <Link href="/" className="service home-link" aria-label="Back to the index, page 100">
        <span className="service-name">LESTERFAX</span> {notice ? <span className="c-red">{notice}</span> : targetNum}
      </Link>
      <span className="spacer" />
      <span className="date" suppressHydrationWarning>
        {now ? `${DAYS[now.getDay()]} ${pad(now.getDate())} ${MONTHS[now.getMonth()]}` : ""}
      </span>
      <span className="clock" suppressHydrationWarning>
        {now ? `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--"}
      </span>
    </header>
  );
}
