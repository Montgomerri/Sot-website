import { BadgeCheck, CircleHelp, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { DashboardStats } from "@/services/profiles/dashboardStats";
import { CountUp, ReputationRing } from "./StatsVisuals";

/**
 * Reputation tiers. Rename them or change the point values to suit
 * your department, the ring and labels update automatically.
 */
const TIERS = [
  { name: "Newcomer", min: 0 },
  { name: "Contributor", min: 50 },
  { name: "Helper", min: 150 },
  { name: "Mentor", min: 400 },
  { name: "Expert", min: 1000 },
];

function getTier(reputation: number) {
  let index = 0;

  TIERS.forEach((tier, i) => {
    if (reputation >= tier.min) index = i;
  });

  const current = TIERS[index];
  const next = TIERS[index + 1] ?? null;

  const progress = next
    ? (reputation - current.min) / (next.min - current.min)
    : 1;

  return {
    current,
    next,
    progress,
    remaining: next ? next.min - reputation : 0,
  };
}

function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-3 sm:p-5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700 sm:h-9 sm:w-9">
        <Icon size={17} />
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
        <CountUp value={value} />
      </p>

      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}

export default function StatsSection({
  reputation,
  stats,
}: {
  reputation: number;
  stats: DashboardStats;
}) {
  const tier = getTier(reputation);

  return (
    <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
      {/* Reputation */}
      <div className="flex items-center gap-4 rounded-xl border bg-white p-4 sm:gap-5 sm:p-5">
        <ReputationRing value={reputation} progress={tier.progress} />

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Reputation
          </p>

          <p className="mt-0.5 text-lg font-semibold text-gray-900 sm:text-xl">
            {tier.current.name}
          </p>

          <p className="mt-0.5 text-sm text-gray-500">
            {tier.next
              ? `${tier.remaining} more to reach ${tier.next.name}`
              : "You've reached the top tier"}
          </p>
        </div>
      </div>

      {/* Activity */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <StatTile
          icon={CircleHelp}
          label="Questions"
          value={stats.questionCount}
        />

        <StatTile
          icon={MessageSquare}
          label="Answers"
          value={stats.answerCount}
        />

        <StatTile
          icon={BadgeCheck}
          label="Accepted"
          value={stats.acceptedCount}
        />
      </div>
    </div>
  );
}