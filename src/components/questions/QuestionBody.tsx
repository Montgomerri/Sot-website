import { Question } from "@/types/question";

interface Props {
  question: Question;
}

export default function QuestionBody({
  question,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-8">

      <article
        className="
          prose
          prose-gray
          max-w-none

          prose-headings:font-bold
          prose-headings:text-gray-900

          prose-p:text-gray-700
          prose-p:leading-8

          prose-li:leading-8

          prose-pre:rounded-xl
          prose-pre:bg-gray-900

          prose-code:text-pink-600
          prose-code:before:content-none
          prose-code:after:content-none

          prose-img:rounded-xl
          prose-img:shadow-md

          prose-a:text-blue-600
          prose-a:no-underline
          hover:prose-a:underline

          prose-blockquote:border-l-4
          prose-blockquote:border-blue-500
        "
        dangerouslySetInnerHTML={{
          __html: question.description,
        }}
      />

    </div>
  );
}