"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Feb", revenue: 18200 },
  { month: "Mar", revenue: 21400 },
  { month: "Apr", revenue: 19800 },
  { month: "May", revenue: 24600 },
  { month: "Jun", revenue: 27100 },
  { month: "Jul", revenue: 26300 },
  { month: "Aug", revenue: 31950 },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 text-xs shadow-popover">
      <p className="font-medium text-ink">{label}</p>
      <p className="tnum mt-0.5 text-ink-soft">
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D5BFF" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#2D5BFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E7E8EC" />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9AA1AC", fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#9AA1AC", fontSize: 12 }}
          tickFormatter={(v) => `$${v / 1000}k`}
          width={40}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E7E8EC" }} />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#2D5BFF"
          strokeWidth={2}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
