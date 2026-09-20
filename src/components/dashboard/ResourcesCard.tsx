export default function ResourcesCard() {
  return (
    <div className="rounded-lg border bg-white p-4">

      <h3 className="mb-4 font-semibold">
        Quick Links
      </h3>

      <div className="space-y-2 text-sm">

        <a className="block text-blue-600 hover:underline" href="#">
          Student Handbook
        </a>

        <a className="block text-blue-600 hover:underline" href="#">
          Lecture Notes
        </a>

        <a className="block text-blue-600 hover:underline" href="#">
          Academic Calendar
        </a>

        <a className="block text-blue-600 hover:underline" href="#">
          Project Repository
        </a>

      </div>

    </div>
  );
}