import {
  FileText,
  Image as ImageIcon,
  Download,
} from "lucide-react";

interface Props {
  attachments?: string[];
}

export default function QuestionAttachments({
  attachments = [],
}: Props) {
  if (attachments.length === 0) {
    return null;
  }

  const images = attachments.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  const files = attachments.filter(
    (file) => !/\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  return (
    <div className="mt-8 rounded-2xl border bg-white p-8">

      <h2 className="mb-6 text-xl font-semibold">
        Attachments
      </h2>

      {/* Images */}

      {images.length > 0 && (

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {images.map((image) => (

            <a
              key={image}
              href={image}
              target="_blank"
              rel="noopener noreferrer"
              className="group overflow-hidden rounded-xl border"
            >

              <img
                src={image}
                alt="Attachment"
                className="
                  h-52
                  w-full
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-105
                "
              />

            </a>

          ))}

        </div>

      )}

      {/* Files */}

      {files.length > 0 && (

        <div className="mt-6 space-y-3">

          {files.map((file) => (

            <a
              key={file}
              href={file}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                p-4
                transition
                hover:bg-gray-50
              "
            >

              <div className="flex items-center gap-3">

                <FileText size={22} />

                <span className="truncate">
                  {file.split("/").pop()}
                </span>

              </div>

              <Download size={18} />

            </a>

          ))}

        </div>

      )}

    </div>
  );
}