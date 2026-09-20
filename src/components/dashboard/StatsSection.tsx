export default function StatsSection() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">

      <div className="border rounded-xl p-5 bg-white">
        <p className="text-sm text-gray-500">
          Reputation
        </p>

        <h2 className="text-3xl font-bold mt-3">
          1
        </h2>
      </div>

      <div className="border rounded-xl p-5 bg-white">
        <p className="text-sm text-gray-500">
          Badge Progress
        </p>

        <h2 className="text-3xl font-bold mt-3">
          0
        </h2>
      </div>

      <div className="border rounded-xl p-5 bg-white">
        <p className="text-sm text-gray-500">
          Watched Tags
        </p>

        <h2 className="text-3xl font-bold mt-3">
          0
        </h2>
      </div>

    </div>
  );
}