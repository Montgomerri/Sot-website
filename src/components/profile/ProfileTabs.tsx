"use client";

import { useState } from "react";
import { CircleHelp, MessageSquare, Activity } from "lucide-react";

interface Props {
  questions: React.ReactNode;
  answers: React.ReactNode;
  activity?: React.ReactNode;
}

export default function ProfileTabs({
  questions,
  answers,
  activity,
}: Props) {
  const [tab, setTab] = useState<
    "questions" | "answers" | "activity"
  >("questions");

  const tabs = [
    {
      id: "questions",
      label: "Questions",
      icon: CircleHelp,
    },
    {
      id: "answers",
      label: "Answers",
      icon: MessageSquare,
    },
    {
      id: "activity",
      label: "Activity",
      icon: Activity,
    },
  ] as const;

  return (
    <div className="rounded-2xl border bg-white">

      <div className="flex border-b">

        {tabs.map((item) => {

          const Icon = item.icon;

          return (

            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`
                flex
                items-center
                gap-2
                border-b-2
                px-6
                py-4
                text-sm
                font-medium
                transition

                ${
                  tab === item.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }
              `}
            >

              <Icon size={17} />

              {item.label}

            </button>

          );

        })}

      </div>

      <div className="p-6">

        {tab === "questions" && questions}

        {tab === "answers" && answers}

        {tab === "activity" &&
          (activity ?? (
            <div className="py-12 text-center text-gray-500">
              Activity coming soon.
            </div>
          ))}

      </div>

    </div>
  );
}