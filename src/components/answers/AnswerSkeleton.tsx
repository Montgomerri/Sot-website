export default function AnswerSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-6 animate-pulse">

      <div className="flex items-center gap-4">

        <div className="h-12 w-12 rounded-full bg-gray-200" />

        <div className="space-y-2">

          <div className="h-4 w-40 rounded bg-gray-200" />

          <div className="h-3 w-24 rounded bg-gray-200" />

        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="h-4 rounded bg-gray-200" />

        <div className="h-4 rounded bg-gray-200" />

        <div className="h-4 w-3/4 rounded bg-gray-200" />

      </div>

    </div>
  );
}