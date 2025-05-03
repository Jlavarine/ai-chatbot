import React from "react";

interface Props {
  suggestions: string[];
  onPick: (text: string) => void;
}

export function SuggestionList({ suggestions, onPick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          className="text-left border rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {s}
        </button>
      ))}
    </div>
  );
}
