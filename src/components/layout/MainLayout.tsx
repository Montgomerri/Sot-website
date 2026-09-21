"use client";

import { ReactNode } from "react";
import { User } from "@supabase/supabase-js";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

interface Props {
  children: ReactNode;
  user: User;
}

export default function MainLayout({
  children,
  user,
}: Props) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} />

      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="min-h-[calc(100vh-50px)] min-w-0 flex-1 bg-white">
          {children}
        </main>

        {/* Desktop right sidebar */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}