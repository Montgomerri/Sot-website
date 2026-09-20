import QuestionFeed from "@/components/questions/QuestionFeed";

export default function InterestingPosts() {
  return (
    <div className="mt-8 rounded-xl border bg-white overflow-hidden">

      <div className="border-b px-6 py-5">

        <h2 className="text-2xl font-semibold">
          Recent Questions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Questions from your department
        </p>

      </div>

      <div className="p-6">
        <QuestionFeed />
      </div>

    </div>
  );
}