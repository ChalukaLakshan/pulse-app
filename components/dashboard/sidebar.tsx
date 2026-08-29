"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  LayoutGrid,
  Users,
  CreditCard,
  Settings,
  LifeBuoy,
} from "lucide-react";

const NAV = [
  { label: "Overview", href: "/dashboard", icon: LayoutGrid },
  { label: "Customers", href: "/dashboard/customers", icon: Users },
  { label: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-white lg:flex">
      <div className="flex h-16 items-center gap-2 px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white">
          <Activity className="h-4 w-4" strokeWidth={2.5} />
        </div>
        <span className="font-display text-base font-medium tracking-tight">Pulse</span>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-2">
        <p className="px-2 pb-1.5 pt-3 text-[11px] font-medium uppercase tracking-wide text-ink-faint">
          Workspace
        </p>
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-brand-600" : "text-ink-faint")} strokeWidth={2} />
              {item.label}
              {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-line p-3">
        <a
          href="#"
          className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-paper hover:text-ink"
        >
          <LifeBuoy className="h-4 w-4 text-ink-faint" />
          Help &amp; support
        </a>
      </div>
    </aside>
  );
}
