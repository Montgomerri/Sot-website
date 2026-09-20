import QuestionList from "@/components/questions/QuestionList";

export default function QuestionsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">

      <h1 className="mb-6 text-3xl font-bold">
        All Questions
      </h1>

      <QuestionList />

    </div>
  );
}