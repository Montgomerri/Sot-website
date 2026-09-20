"use client";

import {
  Award,
  CircleHelp,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

interface Props {
  reputation: number;
  questionCount: number;
  answerCount: number;
  acceptedCount: number;
}

export default function ProfileStats({
  reputation,
  questionCount,
  answerCount,
  acceptedCount,
}: Props) {
  const stats = [
    {
      label: "Reputation",
      value: reputation,
      icon: Award,
    },
    {
      label: "Questions",
      value: questionCount,
      icon: CircleHelp,
    },
    {
      label: "Answers",
      value: answerCount,
      icon: MessageSquare,
    },
    {
      label: "Accepted",
      value: acceptedCount,
      icon: BadgeCheck,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => {

        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border
              bg-white
              p-6
              transition
              hover:shadow-md
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-gray-500">
                {stat.label}
              </span>

              <Icon
                size={20}
                className="text-blue-600"
              />

            </div>

            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              {stat.value}
            </h2>

          </div>
        );

      })}

    </div>
  );
}