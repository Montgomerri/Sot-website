import { createClient } from "@/lib/supabase/server";
import HomeContent from "@/components/dashboard/HomeContent";
import {
  getDashboardStats,
  type DashboardStats,
} from "@/services/profiles/dashboardStats";
import {
  getNeedsAnswer,
  type NeedsAnswerData,
} from "@/services/questions/needsAnswer";
import type { Profile } from "@/types/profile";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;

  let stats: DashboardStats = {
    questionCount: 0,
    answerCount: 0,
    acceptedCount: 0,
  };

  let needsAnswer: NeedsAnswerData = { count: 0, items: [] };

  if (user) {
    const [profileResult, statsResult, needsAnswerResult] =
      await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle(),

        getDashboardStats(supabase, user.id),

        getNeedsAnswer(supabase, user.id),
      ]);

    profile = (profileResult.data as Profile | null) ?? null;
    stats = statsResult;
    needsAnswer = needsAnswerResult;
  }

   return (
    <HomeContent
      profile={profile}
      stats={stats}
      needsAnswer={needsAnswer}
    />
  );
}