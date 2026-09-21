import {
  ArrowRight,
  Lightbulb,
  Sparkles,
} from "lucide-react";

export default function QuestionOfTheDay() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border bg-gradient-to-r from-blue-600 to-blue-500 text-white sm:mt-6">
      <div className="flex items-center justify-between gap-4 p-5 sm:p-8">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} />

            <span className="text-xs font-medium uppercase tracking-wide sm:text-sm">
              Question of the Day
            </span>
          </div>

          <h2 className="mt-3 text-xl font-bold leading-tight sm:mt-4 sm:text-3xl">
            Are your Array.map() keys stable?
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-blue-100 sm:mt-4 sm:text-base sm:leading-7">
            Learn why stable keys matter in React, how they
            affect rendering, and the common mistakes
            developers make.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-100 sm:mt-6 sm:px-5 sm:py-3"
          >
            View Question
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="hidden shrink-0 items-center justify-center text-blue-100 opacity-20 lg:flex">
          <Lightbulb size={110} strokeWidth={1.2} />
        </div>
      </div>
    </div>
  );
}