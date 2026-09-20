import WelcomeCard from "./WelcomeCard";
import StatsSection from "./StatsSection";
import QuestionOfTheDay from "./QuestionOfTheDay";
import QuestionList from "@/components/questions/QuestionList";

export default function HomeContent() {
  return (
    <div className="max-w-[820px] mx-auto px-6 py-6">

      <WelcomeCard />

      <StatsSection />

      <QuestionOfTheDay />

      <QuestionList />

    </div>
  );
}