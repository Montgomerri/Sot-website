"use client";

import { Clock3 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Props {
  comment: any;
}

export default function CommentCard({
  comment,
}: Props) {
  const profile = comment.profiles;

  return (
    <div className="border-b py-3 last:border-none">

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-sm font-semibold text-blue-700">

            {profile?.avatar_url ? (

              <img
                src={profile.avatar_url}
                alt={profile?.full_name ?? "User avatar"}
                className="h-full w-full object-cover"
              />

            ) : (

              profile?.full_name?.charAt(0) ?? "U"

            )}

          </div>


          <div>

            <p className="text-sm font-medium text-gray-900">
              {profile?.full_name ?? "Unknown User"}
            </p>

            <p className="mt-1 text-sm text-gray-700">
              {comment.content}
            </p>

          </div>

        </div>


        <div className="flex items-center gap-1 whitespace-nowrap text-xs text-gray-400">

          <Clock3 size={13} />

          {formatDistanceToNow(
            new Date(comment.created_at),
            {
              addSuffix: true,
            }
          )}

        </div>


      </div>

    </div>
  );
}