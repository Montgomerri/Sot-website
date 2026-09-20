"use client";

import Link from "next/link";
import { Bell } from "lucide-react";

interface Props {
  notification: {
    id: string;
    message: string;
    link: string;
    read: boolean;
    created_at: string;
  };
  onRead: (id: string) => void;
  onClose: () => void;
}

export default function NotificationItem({
  notification,
  onRead,
  onClose,
}: Props) {
  function handleClick() {
    onRead(notification.id);
    onClose();
  }

  return (
    <Link
      href={notification.link}
      onClick={handleClick}
      className={`
        flex
        gap-3
        border-b
        p-4
        transition
        hover:bg-gray-50
        ${
          notification.read
            ? "bg-white"
            : "bg-blue-50"
        }
      `}
    >
      <div
        className="
          mt-1
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-blue-100
          text-blue-600
        "
      >
        <Bell size={16} />
      </div>

      <div className="flex-1">

        <p className="text-sm text-gray-800">
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-gray-500">
          {new Date(
            notification.created_at
          ).toLocaleString()}
        </p>

      </div>

      {!notification.read && (
        <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
      )}
    </Link>
  );
}