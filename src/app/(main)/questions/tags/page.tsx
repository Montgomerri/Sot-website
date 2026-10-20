import { createClient } from "@/lib/supabase/server";
import TagsDirectory from "@/components/tags/TagsDirectory";

import type { TagCount } from "@/components/tags/TagsDirectory";

export default async function TagsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("questions")
    .select("tags")
    .not("tags", "is", null)
    .limit(5000);

  // Count how many questions use each tag
  const counts = new Map<string, number>();

  (data ?? []).forEach((row) => {
    ((row.tags as string[] | null) ?? []).forEach((raw) => {
      const tag = raw.trim();

      if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });

  const tags: TagCount[] = [...counts.entries()].map(([name, count]) => ({
    name,
    count,
  }));

  return <TagsDirectory tags={tags} loadFailed={!!error} />;
}