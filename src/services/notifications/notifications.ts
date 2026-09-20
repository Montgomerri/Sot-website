import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createNotification({
  userId,
  actorId,
  type,
  message,
  link,
}: {
  userId: string;
  actorId: string;
  type: "answer" | "comment" | "accepted";
  message: string;
  link: string;
}) {
  // Don't notify yourself
  if (userId === actorId) return;

  const { error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      actor_id: actorId,
      type,
      message,
      link,
      read: false,
    });

  if (error) {
    console.error("CREATE NOTIFICATION ERROR:", error);
    throw error;
  }
}

export async function getNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);
    throw error;
  }

  return data ?? [];
}

export async function markNotificationAsRead(
  notificationId: string
) {
  const { error } = await supabase
    .from("notifications")
    .update({
      read: true,
    })
    .eq("id", notificationId);

  if (error) {
    console.error("MARK NOTIFICATION ERROR:", error);
    throw error;
  }
}

export async function getUnreadNotificationCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return 0;

  const { count, error } = await supabase
    .from("notifications")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("user_id", user.id)
    .eq("read", false);

  if (error) {
    console.error("UNREAD COUNT ERROR:", error);
    throw error;
  }

  return count ?? 0;
}

export async function clearNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("CLEAR NOTIFICATIONS ERROR:", error);
    throw error;
  }
}