type MessageBubbleProps = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm md:max-w-[75%]",
          isUser
            ? "bg-zinc-900 text-white rounded-br-md"
            : "bg-white text-zinc-900 ring-1 ring-zinc-200 rounded-bl-md",
        ].join(" ")}
      >
        {content}
      </div>
    </div>
  );
}
