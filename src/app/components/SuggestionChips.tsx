"use client";

type SuggestionChipsProps = {
  suggestions: string[];
  onSelectSuggestion: (message: string) => void;
  disabled?: boolean;
};

export default function SuggestionChips({
  suggestions,
  onSelectSuggestion,
  disabled = false,
}: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          disabled={disabled}
          onClick={() => onSelectSuggestion(suggestion)}
          className="rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-700 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}
