"use client";

import { useEffect, useRef } from "react";
import { Message } from "../lib/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

type ChatWindowProps = {
  messages: Message[];
  loading: boolean;
};

export default function ChatWindow({ messages, loading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-zinc-50 p-4 md:p-6">
      <div className="space-y-3">
        {messages
          .filter((message) => message.role !== "system")
          .map((message, index) => (
          <MessageBubble
            key={`${message.role}-${index}`}
            role={message.role}
            content={message.content}
          />
          ))}
        {loading ? <TypingIndicator /> : null}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
