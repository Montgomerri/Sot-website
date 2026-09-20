"use client";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { Answer } from "@/types/answer";
import useAnswers from "@/hooks/useAnswers";
import AnswerList from "@/components/answers/AnswerList";
import AnswerEditor from "@/components/answers/AnswerEditor";

interface Props {
  questionId: string;
  acceptedAnswerId?: string | null;
  canAccept: boolean;
}

export default function QuestionDiscussion({
  questionId,
  acceptedAnswerId: initialAcceptedAnswerId,
  canAccept,
}: Props) {
  const {
    answers: fetchedAnswers,
    loading,
  } = useAnswers(questionId);

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [acceptedAnswerId, setAcceptedAnswerId] = useState<
    string | null | undefined
  >(initialAcceptedAnswerId);

  useEffect(() => {
    setAnswers(fetchedAnswers);
  }, [fetchedAnswers]);

  const handleAnswerAdded = useCallback((answer: Answer) => {
  setAnswers((prev) => [...prev, answer]);
}, []);

const handleAccepted = useCallback((answerId: string) => {
  setAcceptedAnswerId((current) =>
    current === answerId ? null : answerId
  );
}, []);

  return (
    <>
      <AnswerList
        questionId={questionId}
        answers={answers}
        loading={loading}
        acceptedAnswerId={acceptedAnswerId}
        canAccept={canAccept}
        onAccepted={handleAccepted}
      />

      <AnswerEditor
        questionId={questionId}
        onAnswerAdded={handleAnswerAdded}
      />
    </>
  );
}