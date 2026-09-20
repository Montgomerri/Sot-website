export default function UpcomingEvents() {
  return (
    <div className="mb-4 rounded-lg border bg-white p-4">

      <h3 className="font-semibold mb-4">
        Upcoming Events
      </h3>

      <div className="space-y-3 text-sm">

        <div>
          <p className="font-medium">
            AI Workshop
          </p>

          <p className="text-gray-500">
            July 20 • 10:00 AM
          </p>
        </div>

        <div>
          <p className="font-medium">
            Career Talk
          </p>

          <p className="text-gray-500">
            July 25 • 2:00 PM
          </p>
        </div>

      </div>

    </div>
  );
}