"use client";

import AnnouncementCard from "@/components/dashboard/AnnouncementCard";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import ResourcesCard from "@/components/dashboard/ResourcesCard";

export default function RightSidebar() {
  return (
    <aside className="sticky top-[50px] h-[calc(100vh-50px)] w-[320px] shrink-0 overflow-y-auto border-l border-gray-200 bg-[#fafafa] p-4">
      <AnnouncementCard />
      <UpcomingEvents />
      <ResourcesCard />
    </aside>
  );
}