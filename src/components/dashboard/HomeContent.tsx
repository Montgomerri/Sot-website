import GreetingBanner from "./GreetingBanner";
import StatsSection from "./StatsSection";
import MobileHighlights from "./MobileHighlights";
import NeedsAnswerStrip from "./NeedsAnswerStrip";
import QuickAskBox from "./QuickAskBox";
import QuestionList from "@/components/questions/QuestionList";
import type { DashboardStats } from "@/services/profiles/dashboardStats";
import type { NeedsAnswerData } from "@/services/questions/needsAnswer";
import type { Profile } from "@/types/profile";

const EMPTY_STATS: DashboardStats = {
  questionCount: 0,
  answerCount: 0,
  acceptedCount: 0,
};

const EMPTY_NEEDS_ANSWER: NeedsAnswerData = { count: 0, items: [] };

export default function HomeContent({
  profile = null,
  stats = EMPTY_STATS,
  needsAnswer = EMPTY_NEEDS_ANSWER,
}: {
  profile?: Profile | null;
  stats?: DashboardStats;
  needsAnswer?: NeedsAnswerData;
}) {
  return (
    <div className="mx-auto w-full max-w-[820px] px-3 py-4 sm:px-6 sm:py-6">
      <GreetingBanner profile={profile} />

      <StatsSection
        reputation={profile?.reputation ?? 1}
        stats={stats}
      />

      {/* Swipeable sidebar cards (phones and tablets only) */}
      <MobileHighlights />

      <NeedsAnswerStrip data={needsAnswer} />

      <QuickAskBox profile={profile} />

      <QuestionList />
    </div>
  );
}