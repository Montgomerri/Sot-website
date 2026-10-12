import type { SupabaseClient } from "@supabase/supabase-js";

export interface NeedsAnswerItem {
  id: string;
  title: string;
  tags: string[];
  createdAt: string;
  authorName: string | null;
}

export interface NeedsAnswerData {
  /** Total unanswered questions from other people */
  count: number;
  /** The ones that have been waiting longest */
  items: NeedsAnswerItem[];
}

type Row = {
  id: string;
  title: string;
  tags: string[] | null;
  created_at: string;
  profiles:
    | { full_name: string | null }
    | { full_name: string | null }[]
    | null;
};

/**
 * Unanswered questions asked by other students, longest-waiting first.
 */
export async function getNeedsAnswer(
  supabase: SupabaseClient,
  userId: string,
  limit = 3
): Promise<NeedsAnswerData> {
  const { data, count, error } = await supabase
    .from("questions")
    .select("id, title, tags, created_at, profiles(full_name)", {
      count: "exact",
    })
    .eq("answers_count", 0)
    .neq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error || !data) {
    return { count: 0, items: [] };
  }

  const rows = data as unknown as Row[];

  return {
    count: count ?? rows.length,
    items: rows.map((row) => {
      const author = Array.isArray(row.profiles)
        ? row.profiles[0]
        : row.profiles;

      return {
        id: row.id,
        title: row.title,
        tags: row.tags ?? [],
        createdAt: row.created_at,
        authorName: author?.full_name ?? null,
      };
    }),
  };
}