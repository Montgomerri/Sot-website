"use client";

import { useEffect, useState } from "react";
import {
  voteQuestion,
  getQuestionVoteCount,
  getMyQuestionVote,
} from "@/services/votes/questionVotes";

export default function useQuestionVote(
  questionId: string
) {
  const [score, setScore] = useState(0);
  const [myVote, setMyVote] = useState<1 | -1 | 0>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVoteData() {
      try {
        const [voteCount, userVote] = await Promise.all([
          getQuestionVoteCount(questionId),
          getMyQuestionVote(questionId),
        ]);

        setScore(voteCount);
        setMyVote(userVote as 1 | -1 | 0);
      } catch (error) {
        console.error("VOTE ERROR:", error);
console.error("QUESTION ID:", questionId);
      } finally {
        setLoading(false);
      }
    }

    loadVoteData();
  }, [questionId]);

  async function vote(value: 1 | -1) {
    if (loading) return;

    const previousVote = myVote;
    const previousScore = score;

    // Optimistic UI update
    let newScore = score;

    if (previousVote === value) {
      newScore -= value;
      setMyVote(0);
    } else {
      newScore += value - previousVote;
      setMyVote(value);
    }

    setScore(newScore);

    try {
      await voteQuestion(questionId, value);
    } catch (error) {
      // Roll back if request fails
      setMyVote(previousVote);
      setScore(previousScore);
      console.error(error);
    }
  }

  return {
    score,
    myVote,
    loading,
    vote,
  };
}