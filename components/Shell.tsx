"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import { Tabs } from "@/components/Tabs";
import { TRACKS, type Track } from "@/lib/content";
import { gsap, still, typing, useGSAP, useResize } from "@/lib/gsap";
import { NAV, isActive } from "@/lib/site";
import { setTrack, useTrack } from "@/lib/track";

const Go = createContext<(href: string) => void>(() => {});

// Navigate with a short exit: the current view lifts away, then the route changes.
export function useGo() {
  return useContext(Go);
}

export function Shell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const track = useTrack();
  // The exit in flight, if any. One navigation at a time.
  const leaving = useRef<{ tween: gsap.core.Tween; timer: number } | null>(null);

  // Put the view back and forget the exit. Used when the route has changed,
  // when the visitor pressed Back mid-exit, and as a safety net.
  const settle = useCallback((restore: boolean) => {
    const l = leaving.current;
    if (!l) return;
    leaving.current = null;
    window.clearTimeout(l.timer);
    l.tween.kill();
    if (restore) gsap.set(".view", { clearProps: "opacity,transform" });
  }, []);

  useEffect(() => settle(false), [pathname, settle]);

  useEffect(() => {
    const onPop = () => settle(true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [settle]);

  const go = useCallback(
    (href: string) => {
      if (leaving.current) return;
      if (href === pathname) return;
      const view = document.querySelector(".view");
      if (!view || still()) {
        router.push(href);
        return;
      }
      const tween = gsap.to(view, {
        opacity: 0,
        y: -10,
        duration: 0.16,
        ease: "power1.in",
        onComplete: () => router.push(href),
      });
      // If the next page has not arrived after a moment, show this one again.
      leaving.current = { tween, timer: window.setTimeout(() => settle(true), 1500) };
    },
    [pathname, router, settle],
  );

  // 1 to 5 jump between sections.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typing(e) || e.defaultPrevented) return;
      const item = NAV[Number(e.key) - 1];
      if (item) go(item.href);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  return (
    <Go.Provider value={go}>
      <header className="top">
        <TLink href="/" className="brand">
          Lester Cardoz
        </TLink>
        <Tabs label="Show the site for" value={track} onChange={(v) => setTrack(v as Track)} options={TRACKS.map((t) => ({ id: t.id, label: t.label }))} />
        <TLink href="/contact" className="status">
          <span className="status-dot" aria-hidden />
          Available now in Berlin
        </TLink>
      </header>
      <main className="stage" id="main" tabIndex={-1}>
        {children}
      </main>
      <Dock pathname={pathname} />
    </Go.Provider>
  );
}

function Dock({ pathname }: { pathname: string }) {
  const ref = useRef<HTMLElement>(null);
  const first = useRef(true);

  const place = useCallback((animate: boolean) => {
    const nav = ref.current;
    const on = nav?.querySelector<HTMLElement>("[aria-current]");
    const pill = nav?.querySelector<HTMLElement>(".dock-pill");
    if (!nav || !pill) return;
    if (!on) {
      gsap.set(pill, { opacity: 0 });
      return;
    }
    const to = { x: on.offsetLeft, width: on.offsetWidth, opacity: 1 };
    if (animate && !still()) gsap.to(pill, { ...to, duration: 0.5, ease: "power3.out", overwrite: true });
    else gsap.set(pill, to);
  }, []);

  useGSAP(
    () => {
      place(!first.current);
      first.current = false;
    },
    { dependencies: [pathname], scope: ref },
  );

  useResize(ref, () => place(false));

  return (
    <nav className="dock" ref={ref} aria-label="Sections">
      <span className="dock-pill" aria-hidden />
      {NAV.map((item, i) => (
        <TLink key={item.href} href={item.href} className="dock-link" aria-current={isActive(item.href, pathname) ? "page" : undefined}>
          <kbd aria-hidden>{i + 1}</kbd>
          {item.label}
        </TLink>
      ))}
    </nav>
  );
}

type TLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

// A link that plays the exit before it navigates. Modified clicks stay native.
export function TLink({ href, onClick, ...rest }: TLinkProps) {
  const go = useGo();
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        go(href);
      }}
      {...rest}
    />
  );
}
