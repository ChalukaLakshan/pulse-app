import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({ label, value, delta, trend, icon: Icon }: StatCardProps) {
  const positive = trend === "up";
  return (
    <div className="relative overflow-hidden rounded-lg border border-line bg-white p-5 shadow-card">
      <span
        className={cn(
          "absolute inset-y-0 left-0 w-1",
          positive ? "bg-signal-green" : "bg-signal-red"
        )}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-ink-soft">{label}</p>
        <Icon className="h-4 w-4 text-ink-faint" strokeWidth={2} />
      </div>
      <p className="tnum mt-2 font-display text-2xl font-medium tracking-tight text-ink">
        {value}
      </p>
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-1 text-xs font-medium",
          positive ? "text-signal-green" : "text-signal-red"
        )}
      >
        {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
        <span className="tnum">{delta}</span>
        <span className="font-normal text-ink-faint">vs last month</span>
      </div>
    </div>
  );
}
