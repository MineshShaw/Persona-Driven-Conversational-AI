export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 text-sm text-zinc-600 ring-1 ring-zinc-200 shadow-sm">
        <span className="inline-flex items-center gap-1">
          <span>Thinking</span>
          <span className="animate-bounce [animation-delay:-0.3s]">.</span>
          <span className="animate-bounce [animation-delay:-0.15s]">.</span>
          <span className="animate-bounce">.</span>
        </span>
      </div>
    </div>
  );
}
