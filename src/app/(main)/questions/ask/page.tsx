import AskQuestionForm from "@/components/ask/AskQuestionForm";

export default function AskQuestionPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Ask a public question
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
        Get help from students and lecturers in your department.
      </p>

      <AskQuestionForm />

    </div>
  );
}