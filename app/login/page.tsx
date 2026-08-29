"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { ArrowUpRight, Activity, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("demo@pulse.app");
  const [password, setPassword] = useState("pulse1234");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-900 p-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-500/30 blur-3xl"
        />
        <div
          className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-signal-amber/20 blur-3xl"
        />

        <div className="relative flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white/10">
            <Activity className="h-4.5 w-4.5" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg font-medium tracking-tight">Pulse</span>
        </div>

        <div className="relative max-w-sm">
          <p className="font-display text-3xl font-medium leading-tight tracking-tight">
            Every metric your team argues about, in one quiet room.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Pulse pulls usage, revenue, and activity into a single live view —
            so standups start with answers, not screenshots.
          </p>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 pt-6 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Pulse Analytics</span>
          <a href="#" className="flex items-center gap-1 hover:text-white/80">
            What's new <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-paper px-6 py-16">
        <div className="w-full max-w-sm animate-fade-up">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-500 text-white">
              <Activity className="h-4.5 w-4.5" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-medium tracking-tight">Pulse</span>
          </div>

          <h1 className="font-display text-2xl font-medium tracking-tight text-ink">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Sign in to see what changed since yesterday.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="mb-1.5 text-xs font-medium text-brand-600 hover:text-brand-700">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-ink-faint hover:text-ink-soft"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-md border border-signal-red/20 bg-signal-red/5 px-3 py-2 text-sm text-signal-red"
              >
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              {loading ? "Signing in" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 rounded-md border border-line bg-white px-3 py-2.5 text-xs leading-relaxed text-ink-soft">
            Demo credentials are pre-filled —{" "}
            <span className="font-mono text-ink">demo@pulse.app</span> /{" "}
            <span className="font-mono text-ink">pulse1234</span>. Just hit sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
