"use client";

import React, { FC, FormEvent, RefObject } from "react";

interface ChatInputProps {
  prompt: string;
  onPromptChange: (s: string) => void;
  onSubmit: (e: FormEvent) => void;
  onClear: () => void;
  isPending: boolean;
  inputRef: RefObject<HTMLInputElement>;
  noMessages: number
}

export const ChatInput: FC<ChatInputProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  isPending,
  inputRef,
  onClear,
  noMessages
}) => (
  <form
    onSubmit={onSubmit}
    autoComplete="off"
    className="flex gap-2 mt-4"
  >
    <label htmlFor="chat-input" className="sr-only">
      Type your message
    </label>
    <input
      id="chat-input"
      name="chat-input"
      ref={inputRef}
      aria-label="Type your message"
      className="flex-1 border rounded py-2 pl-2"
      placeholder="Ask anything..."
      value={prompt}
      onChange={(e) => onPromptChange(e.target.value)}
      disabled={isPending}
      autoComplete="off"
    />
    <button
      type="submit"
      disabled={isPending}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      aria-label="Send message"
    >
      {isPending ? "…" : "Send"}
    </button>
    {noMessages && !isPending ? <button
      type="button"
      onClick={onClear}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      aria-label="Clear conversation"
      disabled={!noMessages || isPending}
    >
      Clear chat
    </button>: null}
  </form>
);