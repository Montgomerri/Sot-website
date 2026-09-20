export default function QuestionCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 animate-pulse">

      <div className="flex gap-6">

        <div className="w-20 space-y-3">
          <div className="h-5 w-8 rounded bg-gray-200" />
          <div className="h-5 w-8 rounded bg-gray-200" />
          <div className="h-5 w-8 rounded bg-gray-200" />
        </div>

        <div className="flex-1">

          <div className="h-7 w-2/3 rounded bg-gray-200" />

          <div className="mt-4 h-4 w-full rounded bg-gray-200" />
          <div className="mt-2 h-4 w-11/12 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-4/5 rounded bg-gray-200" />

          <div className="mt-5 flex gap-2">
            <div className="h-8 w-16 rounded-full bg-gray-200" />
            <div className="h-8 w-20 rounded-full bg-gray-200" />
            <div className="h-8 w-16 rounded-full bg-gray-200" />
          </div>

          <div className="mt-6 flex items-center justify-between">

            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />

              <div>
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="h-4 w-10 rounded bg-gray-200" />
              <div className="h-4 w-10 rounded bg-gray-200" />
              <div className="h-4 w-10 rounded bg-gray-200" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}