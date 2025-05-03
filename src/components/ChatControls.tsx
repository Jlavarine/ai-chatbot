"use client";

import React, { FC } from "react";

interface ChatControlsProps {
  modelOptions: string[];
  selectedModel: string;
  onChangeModel: (model: string) => void;
  onClear: () => void;
}

export const ChatControls: FC<ChatControlsProps> = ({
  modelOptions,
  selectedModel,
  onChangeModel,
  onClear,
}) => (
  <div className="mb-4 flex items-center gap-2">
    <label htmlFor="model" className="font-semibold">
      Model:
    </label>
    <select
      id="model"
      value={selectedModel}
      onChange={(e) => onChangeModel(e.target.value)}
      className="border rounded p-1 flex-1"
    >
      {modelOptions.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
    <button
      type="button"
      onClick={onClear}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      aria-label="Clear conversation"
    >
      Clear chat history
    </button>
  </div>
);