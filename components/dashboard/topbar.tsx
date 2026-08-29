"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Bell, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar({ name, initials }: { name: string; initials: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b border-line bg-white px-6">
      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <input
          type="search"
          placeholder="Search customers, invoices…"
          className="h-9 w-full rounded-md border border-line bg-paper pl-9 pr-3 text-sm placeholder:text-ink-faint focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-md text-ink-soft hover:bg-paper hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-signal-amber" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 text-sm hover:bg-paper"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-medium text-white">
              {initials}
            </span>
            <span className="hidden font-medium text-ink sm:inline">{name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-44 rounded-md border border-line bg-white p-1 shadow-popover">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-sm px-2.5 py-2 text-left text-sm text-ink-soft hover:bg-paper hover:text-ink",
                    loggingOut && "opacity-60"
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  {loggingOut ? "Signing out…" : "Sign out"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
