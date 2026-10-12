import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export default async function LobbyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <main className="h-screen">{children}</main>;
}