import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const session = req.cookies.get(SESSION_COOKIE);
  const { pathname } = req.nextUrl;

  const isAuthed = Boolean(session);
  const isProtected = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  if (isProtected && !isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && isAuthed) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
