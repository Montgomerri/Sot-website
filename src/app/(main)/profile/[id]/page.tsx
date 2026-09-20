import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileAbout from "@/components/profile/ProfileAbout";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileQuestions from "@/components/profile/ProfileQuestions";
import ProfileAnswers from "@/components/profile/ProfileAnswers";

import {
  getProfile,
  getProfileStats,
  getUserAnswers,
  getUserQuestions,
} from "@/services/profiles/profile";

import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    profile,
    stats,
    questions,
    answers,
  ] = await Promise.all([
    getProfile(id),
    getProfileStats(id),
    getUserQuestions(id),
    getUserAnswers(id),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">

      <ProfileHeader
        profile={profile}
        isOwner={user?.id === id}
      />

      <ProfileStats
        reputation={profile.reputation ?? 1}
        questionCount={stats.questionCount}
        answerCount={stats.answerCount}
        acceptedCount={stats.acceptedCount}
      />

      <ProfileAbout profile={profile} />

      <ProfileTabs
        questions={
          <ProfileQuestions
            questions={questions}
          />
        }
        answers={
          <ProfileAnswers
            answers={answers}
          />
        }
      />

    </div>
  );
}