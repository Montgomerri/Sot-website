"use client";

import { Trash2 } from "lucide-react";
import NotificationItem from "./NotificationItem";

interface Props {
  notifications: any[];
  loading: boolean;
  onRead: (id: string) => void;
  onClose: () => void;
  onClear: () => void;
}

export default function NotificationDropdown({
  notifications,
  loading,
  onRead,
  onClose,
  onClear,
}: Props) {
  return (
    <div
      className="
        absolute
        right-0
        mt-3
        w-96
        rounded-xl
        border
        bg-white
        shadow-2xl
        z-50
        overflow-hidden
      "
    >
      <div className="flex items-center justify-between border-b px-5 py-4">

        <h2 className="text-lg font-semibold">
          Notifications
        </h2>

        {notifications.length > 0 && (
          <button
            onClick={onClear}
            className="rounded-md p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
            title="Clear notifications"
          >
            <Trash2 size={18} />
          </button>
        )}

      </div>

      <div className="max-h-[450px] overflow-y-auto">

        {loading && (
          <div className="p-6 text-center text-gray-500">
            Loading...
          </div>
        )}

        {!loading && notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            You're all caught up 
          </div>
        )}

        {!loading &&
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={onRead}
              onClose={onClose}
            />
          ))}

      </div>
    </div>
  );
}