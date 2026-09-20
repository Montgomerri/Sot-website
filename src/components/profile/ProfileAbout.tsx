"use client";

import { Profile } from "@/types/profile";
import {
  User,
  Building2,
  Mail,
} from "lucide-react";

interface Props {
  profile: Profile;
}

export default function ProfileAbout({
  profile,
}: Props) {
  return (
    <div className="rounded-2xl border bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-900">
        About
      </h2>

      <div className="mt-6 space-y-5">

        {/* Bio */}
        <div className="flex items-start gap-3">
          <User
            size={18}
            className="mt-0.5 text-gray-500"
          />

          <div>
            <h3 className="font-medium text-gray-900">
              Bio
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              {profile.bio ||
                "This user hasn't added a bio yet."}
            </p>
          </div>
        </div>

        {/* Department */}
        {profile.department && (
          <div className="flex items-center gap-3">
            <Building2
              size={18}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-700">
              {profile.department}
            </span>
          </div>
        )}

        {/* Email */}
        {profile.email && (
          <div className="flex items-center gap-3">
            <Mail
              size={18}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-700">
              {profile.email}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}