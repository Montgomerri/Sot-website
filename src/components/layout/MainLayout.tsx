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
    <>
      <Navbar user={user} />

      <div className="mx-auto flex max-w-[1600px]">
        <Sidebar />

        <main className="min-h-screen flex-1 border-r border-gray-200 bg-white">
          {children}
        </main>

        <RightSidebar />
      </div>
    </>
  );
}