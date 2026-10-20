import { createClient } from "@/lib/supabase/server";
import UsersDirectory from "@/components/users/UsersDirectory";

import type { DirectoryUser } from "@/components/users/UsersDirectory";

/** The directory loads this many members (highest reputation first) */
const MEMBER_LIMIT = 500;

export default async function UsersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error, count } = await supabase
    .from("profiles")
    .select(
      "id, full_name, avatar_url, level, department, reputation, created_at",
      { count: "exact" }
    )
    .order("reputation", { ascending: false, nullsFirst: false })
    .limit(MEMBER_LIMIT);

  const users = (data ?? []) as DirectoryUser[];

  return (
    <UsersDirectory
      users={users}
      total={count ?? users.length}
      currentUserId={user?.id ?? null}
      loadFailed={!!error}
    />
  );
}