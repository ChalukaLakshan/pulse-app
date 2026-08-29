# Pulse

A Next.js 14 (App Router) starter with a designed login flow and a protected
dashboard: sidebar nav, stat cards, a revenue chart, an activity feed, and a
customers table.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll land on `/login`.

**Demo credentials** (pre-filled on the form):
- Email: `demo@pulse.app`
- Password: `pulse1234`

## How auth works here

This is a self-contained demo, not a production auth system:

- `lib/auth.ts` checks credentials against a single hardcoded demo user and
  reads/writes a signed-looking session cookie.
- `app/api/login/route.ts` / `app/api/logout/route.ts` set and clear an
  `httpOnly` cookie (`pulse_session`).
- `middleware.ts` protects everything under `/dashboard` and bounces logged-in
  users away from `/login`.

To make this production-ready, swap `checkCredentials` for a real database
lookup with hashed passwords (bcrypt/argon2), replace the plain JSON cookie
with a signed session (e.g. `next-auth`, `iron-session`, or your own JWT), and
add CSRF protection to the login route.

## Structure

```
app/
  login/page.tsx           login screen
  dashboard/layout.tsx     sidebar + topbar shell (server, reads session)
  dashboard/page.tsx       overview: stats, chart, activity, table
  api/login, api/logout    session cookie endpoints
components/
  ui/                      button, input, label, card
  dashboard/                sidebar, topbar, stat-card, revenue-chart
lib/
  auth.ts, utils.ts
middleware.ts              route protection
```

## Stack

Next.js 14 · TypeScript · Tailwind CSS · Recharts · lucide-react
