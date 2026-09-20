export default function AnnouncementCard() {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border border-yellow-300">

      <div className="border-b border-yellow-300 bg-yellow-100 px-4 py-3">
        <h3 className="font-semibold">
          Department Announcements
        </h3>
      </div>

      <div className="space-y-4 bg-yellow-50 p-4">

        <p className="text-sm">
           Mid-semester examinations begin next Monday.
        </p>

        <p className="text-sm">
           Final year project proposals are due this Friday.
        </p>

        <p className="text-sm">
           Register for the AI Workshop before July 20.
        </p>

      </div>

    </div>
  );
}