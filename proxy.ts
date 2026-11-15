import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SLUGS } from "@/lib/slugs";

const KNOWN = new Set<string>(SLUGS);

// A project address that does not exist is sent to a path with no route, so
// it gets a real 404 status. Without this, the prerendered shell of
// /work/[slug] would answer 200 first and only then show "not found".
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !KNOWN.has(slug)) {
    return NextResponse.rewrite(new URL("/_missing", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
