"use client";

import { useState } from "react";
import AttachmentUpload from "@/components/editor/AttachmentUpload";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { createQuestion } from "@/services/questions/createQuestion";

export default function AskQuestionForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setLoading(true);

      await createQuestion({
        title,
        description,
        tags,
        attachments,
      });

      alert("Question posted successfully!");

      setTitle("");
      setDescription("");
      setTags([]);
      setAttachments([]);
    } catch (err) {
      console.error(err);
      alert("Failed to post question.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 rounded-xl border bg-white p-8 shadow-sm">
      <div className="space-y-8">

        {/* Title */}

        <div>
          <h2 className="font-semibold text-lg">
            Title
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Be specific and imagine you're asking another student.
          </p>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Why is my Next.js page not rendering?"
            className="mt-3 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}

        <div>
          <h2 className="font-semibold text-lg">
            Description
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Include everything someone would need to answer your question.
          </p>

          <div className="mt-3">
            <RichTextEditor
              value={description}
              onChange={setDescription}
            />
          </div>
        </div>

        {/* Tags */}

        <div>

          <h2 className="font-semibold text-lg">
            Tags
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add tags that describe your question.
          </p>

          <input
            placeholder="nextjs, react, supabase"
            onChange={(e) => {

              const value = e.target.value;

              setTags(
                value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              );

            }}
            className="mt-3 w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Tag Preview */}

          <div className="flex flex-wrap gap-2 mt-3">

            {tags.map((tag) => (

              <span
                key={tag}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
              >
                {tag}
              </span>

            ))}

          </div>

        </div>

        {/* Attachments */}

        <div>

          <h2 className="font-semibold text-lg">
            Attachments
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add screenshots, PDFs, or other helpful files.
          </p>

          <div className="mt-3">

            <AttachmentUpload
              onUploadComplete={(urls) =>
                setAttachments((prev) => [
                  ...prev,
                  ...urls,
                ])
              }
            />

          </div>

          {/* Temporary uploaded URL preview */}

          {attachments.length > 0 && (

            <div className="mt-4 rounded-lg bg-gray-50 p-4">

              <p className="text-sm font-medium mb-2">
                Uploaded files:
              </p>

              {attachments.map((url) => (

                <p
                  key={url}
                  className="text-xs text-blue-600 break-all"
                >
                  {url}
                </p>

              ))}

            </div>

          )}

        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            rounded-lg
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            hover:bg-blue-700
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Posting..." : "Post Question"}
        </button>

      </div>
    </div>
  );
}