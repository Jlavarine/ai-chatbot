"use client";

import { FormEvent, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import { MessageList } from "../components/MessageList";
import type { Message } from "../components/MessageBubble";
import { SuggestionList } from "../components/SuggestionList";

export default function Home() {
  const MODEL_OPTIONS = [
    "google/gemma-2b-it",
    "mistralai/Mistral-7B-Instruct-v0.2"
  ];

  const DEFAULT_SUGGESTIONS = [
    "What are Newton's Laws and examples of each?",
    "What are the rules for professional cricket?",
    "What are some quick one pot meals for a family of 4?",
    "What is the weather in San Francisco like in July?",
  ];
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    const history = [...messages, { role: "user", content: text }];
    setMessages(history);
    setPrompt("");
    setIsPending(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, model: selectedModel }),
    });

    if (!res.ok || !res.body) {
      console.error("Chat API error:", await res.text());
      setIsPending(false);
      return;
    }

    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (_delta, full) => {
        setMessages((prev) => {
          const bot: Message = {
            role: "assistant",
            content: full,
            model: selectedModel,
          };
          const last = prev[prev.length - 1];
          if (last.role === "assistant") {
            return [...prev.slice(0, -1), bot];
          }
          return [...prev, bot];
        });
      })
      .on("end", () => {
        setIsPending(false);
      });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(prompt);
  }

  function handlePickSuggestion(text: string) {
    sendMessage(text);
  }

  return (
    <main className="flex flex-col h-screen p-6 max-w-xl mx-auto">
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="model" className="font-semibold">
          Model:
        </label>
        <select
          id="model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className="border rounded p-1 flex-1"
        >
          {MODEL_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setMessages([])}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Clear
        </button>
      </div>

      {messages.length === 0 &&
        <div>
          <h1 className="text-2xl font-bold mb-1">Hello there!</h1>
          <p className="text-gray-500 mb-4">How can I help you today?</p>
        </div>
      }
      
      {messages.length === 0 && prompt === "" && (
        <SuggestionList
          suggestions={DEFAULT_SUGGESTIONS}
          onPick={handlePickSuggestion}
        />
      )}

      <div className="flex-1 overflow-auto">
        <MessageList messages={messages} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Ask anything..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 rounded"
        >
          {isPending ? "…" : "Send"}
        </button>
      </form>
    </main>
  );
}
