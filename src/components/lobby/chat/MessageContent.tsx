const URL_PATTERN = /(https?:\/\/[^\s<]+[^\s<.,;:!?)"'\]])/g;

/**
 * Message text with web links made tappable.
 * Only http and https links are turned into links.
 */
export default function MessageContent({ text }: { text: string }) {
  // Splitting with a capture group puts the links at the odd positions
  const parts = text.split(URL_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="break-all text-brand-700 underline underline-offset-2 hover:text-brand-800"
          >
            {part}
          </a>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}