import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, SESSION_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const user = checkCredentials(email, password);

  if (!user) {
    return NextResponse.json(
      { error: "That email and password combination doesn't match our records." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, JSON.stringify({ email: user.email, name: user.name, initials: user.initials }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
