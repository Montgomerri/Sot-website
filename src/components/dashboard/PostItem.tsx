import { Eye, MessageSquare } from "lucide-react";

interface PostItemProps {
  title: string;
  excerpt: string;
  votes: number;
  answers: number;
  views: number;
  author: string;
  time: string;
  tags: string[];
}

export default function PostItem({
  title,
  excerpt,
  votes,
  answers,
  views,
  author,
  time,
  tags,
}: PostItemProps) {
  return (
    <div className="flex gap-6 border-b border-gray-200 p-6 hover:bg-gray-50 transition">

      {/* Left Stats */}

      <div className="w-24 shrink-0 text-right text-sm text-gray-600">

        <div>{votes} votes</div>

        <div className="my-2 rounded border border-green-500 px-2 py-1 text-green-600">
          {answers} answers
        </div>

        <div className="flex justify-end items-center gap-1">
          <Eye size={14} />
          {views}
        </div>

      </div>

      {/* Right */}

      <div className="flex-1">

        <h2 className="text-xl font-medium text-blue-600 hover:text-blue-700 cursor-pointer">
          {title}
        </h2>

        <p className="mt-2 text-gray-600 leading-7">
          {excerpt}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">

          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-blue-50 px-2 py-1 text-xs text-blue-700"
            >
              {tag}
            </span>
          ))}

        </div>

        <div className="mt-4 flex justify-end text-sm text-gray-500">
          {author} • {time}
        </div>

      </div>

    </div>
  );
}