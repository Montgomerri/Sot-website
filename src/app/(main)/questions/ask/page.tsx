import AskQuestionForm from "@/components/ask/AskQuestionForm";

export default function AskQuestionPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-10">

      <h1 className="text-4xl font-bold">
        Ask a public question
      </h1>

      <p className="mt-3 text-gray-600">
        Get help from students and lecturers in your department.
      </p>

      <AskQuestionForm />

    </div>
  );
}