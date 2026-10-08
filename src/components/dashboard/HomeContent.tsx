import GreetingBanner from "./GreetingBanner";
import StatsSection from "./StatsSection";
import QuestionOfTheDay from "./QuestionOfTheDay";
import QuestionList from "@/components/questions/QuestionList";
import type { Profile } from "@/types/profile";

export default function HomeContent({
  profile,
}: {
  profile: Profile | null;
}) {
  return (
    <div className="mx-auto w-full max-w-[820px] px-3 py-4 sm:px-6 sm:py-6">
      <GreetingBanner profile={profile} />

      <StatsSection />

      <QuestionOfTheDay />

      <QuestionList />
    </div>
  );
}