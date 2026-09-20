import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export async function createQuestion(data: {
  title: string;
  description: string;
  tags: string[];
  attachments: string[];
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("questions")
    .insert({
      user_id: user.id,
      title: data.title,
      description: data.description,
      tags: data.tags,
      attachments: data.attachments,
    });

  if (error) throw error;
}