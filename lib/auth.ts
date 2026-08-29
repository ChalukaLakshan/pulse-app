import { cookies } from "next/headers";

export const SESSION_COOKIE = "pulse_session";

// Demo credential store. Swap this for a real database + password hashing
// (e.g. bcrypt) and a real user table before shipping.
const DEMO_USER = {
  email: "demo@pulse.app",
  password: "pulse1234",
  name: "Jordan Reyes",
  initials: "JR",
};

export function checkCredentials(email: string, password: string) {
  if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
    return DEMO_USER;
  }
  return null;
}

export function getSession() {
  const cookie = cookies().get(SESSION_COOKIE);
  if (!cookie) return null;
  try {
    return JSON.parse(cookie.value) as { email: string; name: string; initials: string };
  } catch {
    return null;
  }
}
