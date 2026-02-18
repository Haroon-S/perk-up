"use client";

import { useCounter } from "../shared/useCounter";

function StatItem({
  value,
  suffix = "",
  prefix = "",
  label,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}) {
  const isFloat = value % 1 !== 0;
  const { count, ref } = useCounter(isFloat ? Math.floor(value) : value);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-4xl font-black text-white mb-1"
        style={{ fontFamily: "'Arial Black', sans-serif" }}
      >
        {prefix}
        {isFloat ? value.toFixed(2) : count}
        {suffix}
      </div>
      <div className="text-xs text-white/40 tracking-widest uppercase">
        {label}
      </div>
    </div>
  );
}

export function StatRow() {
  const stats = [
    { value: 50, suffix: "+", label: "Partner Businesses" },
    { value: 3.99, prefix: "€", label: "Per Month" },
    { value: 1000, suffix: "+", label: "Active Members" },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
      {stats.map((stat, i) => (
        <StatItem key={i} {...stat} />
      ))}
    </div>
  );
}
