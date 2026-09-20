import { cn } from "@/lib/cn";

export default function Alert({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm",
        className
      )}
    >
      {message}
    </div>
  );
}