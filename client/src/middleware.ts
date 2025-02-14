import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // If the user visits "/swap", rewrite to "/"
  if (url.pathname.startsWith("/swap")) {
    url.pathname = "/"; // Internally rewrite to "/"
    return NextResponse.rewrite(url);
  }

  return NextResponse.next(); // Proceed with normal request if not "/swap"
}

// Apply middleware only to "/swap" and its subroutes
export const config = {
  matcher: "/swap/:path*",
};
