import WelcomeCard from "./WelcomeCard";
import StatsSection from "./StatsSection";
import QuestionOfTheDay from "./QuestionOfTheDay";
import QuestionList from "@/components/questions/QuestionList";

export default function HomeContent() {
  return (
    <div className="mx-auto w-full max-w-[820px] px-3 py-4 sm:px-6 sm:py-6">
      <WelcomeCard />

      <StatsSection />

      <QuestionOfTheDay />

      <QuestionList />
    </div>
  );
}