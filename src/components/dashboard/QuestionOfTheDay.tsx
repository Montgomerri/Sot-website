import { ArrowRight, Sparkles } from "lucide-react";

export default function QuestionOfTheDay() {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border bg-gradient-to-r from-blue-600 to-blue-500 text-white">

      <div className="flex items-center justify-between p-8">

        <div>

          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <span className="text-sm font-medium uppercase tracking-wide">
              Question of the Day
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            Are your Array.map() keys stable?
          </h2>

          <p className="mt-4 max-w-xl text-blue-100 leading-7">
            Learn why stable keys matter in React, how they affect rendering,
            and the common mistakes developers make.
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-blue-600 hover:bg-gray-100">
            View Question
            <ArrowRight size={18} />
          </button>

        </div>

        <div className="hidden lg:flex items-center justify-center text-8xl opacity-20">
          💡
        </div>

      </div>

    </div>
  );
}