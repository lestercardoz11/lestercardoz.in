"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FASTEXT, pageByNum } from "@/lib/pages";

export function Fastext() {
  const pathname = usePathname();
  return (
    <nav className="fastext txt" aria-label="Pages">
      {FASTEXT.map(({ key, num }) => {
        const page = pageByNum(num)!;
        const active = pathname === page.path;
        return (
          <Link key={key} href={page.path} className={`fk c-${key}`} aria-current={active ? "page" : undefined}>
            <span className="fk-chip" aria-hidden />
            <span className="fk-label">{page.title}</span>
          </Link>
        );
      })}
      <Link href="/" className="fk c-ink" aria-current={pathname === "/" ? "page" : undefined}>
        <span className="fk-chip" aria-hidden />
        <span className="fk-label">Index</span>
      </Link>
      <span className="hint" aria-hidden>
        Type a page number, <kbd>100</kbd> for the index
      </span>
    </nav>
  );
}
