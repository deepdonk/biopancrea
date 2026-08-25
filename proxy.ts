import { NextRequest, NextResponse } from "next/server";

const canonicalPaths = new Set([
  "/mission",
  "/how-it-works",
  "/meet-the-team",
  "/contact",
]);

const legacyPaths = new Map([
  ["/home", "/"],
  ["/team", "/meet-the-team"],
  ["/about", "/meet-the-team"],
  ["/focus", "/mission"],
  ["/approach", "/how-it-works"],
  ["/insights", "/mission"],
]);

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const lowercasePath = pathname.toLowerCase();
  const canonicalPath = legacyPaths.get(lowercasePath) ||
    (canonicalPaths.has(lowercasePath) ? lowercasePath : null);

  if (canonicalPath && pathname !== canonicalPath) {
    const destination = request.nextUrl.clone();
    destination.pathname = canonicalPath;
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
