import { DollarSign, Users, Activity, Percent } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { getSession } from "@/lib/auth";

const STATS = [
  { label: "Monthly revenue", value: "$31,950", delta: "12.4%", trend: "up" as const, icon: DollarSign },
  { label: "Active customers", value: "1,284", delta: "3.1%", trend: "up" as const, icon: Users },
  { label: "Churn rate", value: "2.4%", delta: "0.6%", trend: "down" as const, icon: Percent },
  { label: "Avg. session", value: "6m 42s", delta: "1.2%", trend: "down" as const, icon: Activity },
];

const ACTIVITY = [
  { who: "Maya Chen", action: "upgraded to the Team plan", time: "2m ago" },
  { who: "Diego Alvarez", action: "invited 3 teammates", time: "18m ago" },
  { who: "Priya Nair", action: "connected the Stripe integration", time: "1h ago" },
  { who: "System", action: "flagged an unusual login for Sam Osei", time: "3h ago" },
  { who: "Kenji Watanabe", action: "cancelled a subscription", time: "5h ago" },
];

const CUSTOMERS = [
  { name: "Northwind Traders", plan: "Team", mrr: "$1,240", status: "Active" },
  { name: "Acme Logistics", plan: "Growth", mrr: "$680", status: "Active" },
  { name: "Blue Ridge Foods", plan: "Team", mrr: "$1,240", status: "Past due" },
  { name: "Solstice Studio", plan: "Starter", mrr: "$120", status: "Active" },
  { name: "Harborline Co.", plan: "Growth", mrr: "$680", status: "Trialing" },
];

const STATUS_STYLE: Record<string, string> = {
  Active: "bg-signal-green/10 text-signal-green",
  "Past due": "bg-signal-red/10 text-signal-red",
  Trialing: "bg-signal-amber/10 text-signal-amber",
};

export default function DashboardPage() {
  const session = getSession();
  const firstName = (session?.name ?? "Jordan").split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-medium tracking-tight text-ink">
          Good to see you, {firstName}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Here's what's moved since your last visit.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h2 className="font-display text-base font-medium tracking-tight text-ink">
                Revenue
              </h2>
              <p className="text-xs text-ink-soft">Last 7 months</p>
            </div>
            <span className="tnum rounded-md bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">
              +12.4%
            </span>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-display text-base font-medium tracking-tight text-ink">
              Recent activity
            </h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                <p className="text-sm leading-snug text-ink-soft">
                  <span className="font-medium text-ink">{a.who}</span> {a.action}
                  <span className="tnum block text-xs text-ink-faint">{a.time}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="font-display text-base font-medium tracking-tight text-ink">
            Customers
          </h2>
          <a href="#" className="text-xs font-medium text-brand-600 hover:text-brand-700">
            View all
          </a>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-t border-line text-left text-xs uppercase tracking-wide text-ink-faint">
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">MRR</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.name} className="border-t border-line hover:bg-paper/60">
                  <td className="px-5 py-3 font-medium text-ink">{c.name}</td>
                  <td className="px-5 py-3 text-ink-soft">{c.plan}</td>
                  <td className="tnum px-5 py-3 text-ink-soft">{c.mrr}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLE[c.status]}`}
                    >
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
