export default function StatsSection() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-4">
      <div className="rounded-xl border bg-white p-4 sm:p-5">
        <p className="text-sm text-gray-500">
          Reputation
        </p>

        <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
          1
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4 sm:p-5">
        <p className="text-sm text-gray-500">
          Badge Progress
        </p>

        <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
          0
        </h2>
      </div>

      <div className="rounded-xl border bg-white p-4 sm:p-5">
        <p className="text-sm text-gray-500">
          Watched Tags
        </p>

        <h2 className="mt-2 text-2xl font-bold sm:mt-3 sm:text-3xl">
          0
        </h2>
      </div>
    </div>
  );
}