"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import AttachmentUpload from "@/components/editor/AttachmentUpload";
import RichTextEditor from "@/components/editor/RichTextEditor";
import { createQuestion } from "@/services/questions/createQuestion";

export default function AskQuestionForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [attachments, setAttachments] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function addTag(value: string) {
    const cleanedTag = value.trim().toLowerCase();

    if (!cleanedTag) return;

    if (tags.includes(cleanedTag)) {
      setTagInput("");
      return;
    }

    if (tags.length >= 5) {
      setError("You can add a maximum of 5 tags.");
      return;
    }

    setTags((prev) => [...prev, cleanedTag]);
    setTagInput("");
    setError("");
  }

  function removeTag(tagToRemove: string) {
    setTags((prev) =>
      prev.filter((tag) => tag !== tagToRemove)
    );
  }

  function handleTagKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (
      event.key === "Enter" ||
      event.key === ","
    ) {
      event.preventDefault();
      addTag(tagInput);
    }

    if (
      event.key === "Backspace" &&
      !tagInput &&
      tags.length > 0
    ) {
      removeTag(tags[tags.length - 1]);
    }
  }

  function removeAttachment(url: string) {
    setAttachments((prev) =>
      prev.filter((attachment) => attachment !== url)
    );
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError("Please enter a title for your question.");
      return;
    }

    if (trimmedTitle.length < 10) {
      setError(
        "Your title should be at least 10 characters long."
      );
      return;
    }

    if (
      !trimmedDescription ||
      trimmedDescription === "<p></p>"
    ) {
      setError(
        "Please describe your question before posting."
      );
      return;
    }

    if (tags.length === 0) {
      setError(
        "Please add at least one tag to your question."
      );
      return;
    }

    try {
      setLoading(true);

      await createQuestion({
        title: trimmedTitle,
        description,
        tags,
        attachments,
      });

      router.push("/questions");
      router.refresh();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to post question. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 sm:mt-10 rounded-xl border bg-white p-4 shadow-sm sm:p-6 lg:p-8"
    >
      <div className="space-y-8">

        {/* Error */}

        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {/* Title */}

        <div>
          <h2 className="text-lg font-semibold">
            Title
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Be specific and imagine you&apos;re asking another
            student.
          </p>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. Why is my Next.js page not rendering?"
            maxLength={200}
            className="
              mt-3
              h-12
              w-full
              rounded-lg
              border
              border-gray-300
              px-4
              text-sm
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          <div className="mt-2 text-right text-xs text-gray-400">
            {title.length}/200
          </div>
        </div>

        {/* Description */}

        <div>
          <h2 className="text-lg font-semibold">
            Description
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Include everything someone would need to answer
            your question.
          </p>

          <div className="mt-3 min-w-0 overflow-hidden">
            <RichTextEditor
              value={description}
              onChange={setDescription}
            />
          </div>
        </div>

        {/* Tags */}

        <div>
          <h2 className="text-lg font-semibold">
            Tags
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add up to 5 tags that describe your question.
          </p>

          <div
            className="
              mt-3
              flex
              min-h-12
              w-full
              flex-wrap
              items-center
              gap-2
              rounded-lg
              border
              border-gray-300
              px-3
              py-2
              focus-within:border-blue-500
              focus-within:ring-2
              focus-within:ring-blue-100
            "
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="
                  inline-flex
                  max-w-full
                  items-center
                  gap-1
                  rounded-md
                  bg-blue-50
                  px-2.5
                  py-1
                  text-sm
                  font-medium
                  text-blue-700
                "
              >
                <span className="max-w-[180px] truncate">
                  {tag}
                </span>

                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded p-0.5 hover:bg-blue-100"
                  aria-label={`Remove ${tag}`}
                >
                  <X size={14} />
                </button>
              </span>
            ))}

            <input
              type="text"
              value={tagInput}
              onChange={(event) =>
                setTagInput(event.target.value)
              }
              onKeyDown={handleTagKeyDown}
              onBlur={() => {
                if (tagInput.trim()) {
                  addTag(tagInput);
                }
              }}
              placeholder={
                tags.length === 0
                  ? "nextjs, react, supabase"
                  : "Add another tag..."
              }
              className="
                min-w-[140px]
                flex-1
                border-0
                bg-transparent
                px-1
                py-1
                text-sm
                outline-none
              "
            />
          </div>

          <p className="mt-2 text-xs text-gray-400">
            Press Enter or comma to add a tag.
          </p>
        </div>

        {/* Attachments */}

        <div>
          <h2 className="text-lg font-semibold">
            Attachments
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add screenshots, PDFs, or other helpful files.
          </p>

          <div className="mt-3 min-w-0">
            <AttachmentUpload
              onUploadComplete={(urls) =>
                setAttachments((prev) => [
                  ...prev,
                  ...urls,
                ])
              }
            />
          </div>

          {attachments.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Uploaded files
              </p>

              {attachments.map((url) => (
                <div
                  key={url}
                  className="
                    flex
                    min-w-0
                    items-center
                    justify-between
                    gap-3
                    rounded-lg
                    border
                    bg-gray-50
                    px-3
                    py-2
                  "
                >
                  <p className="min-w-0 flex-1 truncate text-xs text-blue-600">
                    {url}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      removeAttachment(url)
                    }
                    className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove attachment"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}

        <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-blue-600
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            {loading
              ? "Posting..."
              : "Post Question"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="
              w-full
              rounded-lg
              border
              border-gray-300
              px-6
              py-3
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:w-auto
            "
          >
            Cancel
          </button>
        </div>

      </div>
    </form>
  );
}