// src/app/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    // Add user message
    const newMsgs = [...messages, { role: "user", content: prompt }];
    setMessages(newMsgs);
    setPrompt("");
    setIsPending(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ messages: newMsgs }),
    });
    if (!res.body) return;

    // Stream the assistant’s reply
    ChatCompletionStream.fromReadableStream(res.body)
      .on("content", (delta, full) => {
        setMessages((msgs) => {
          const last = msgs[msgs.length - 1];
          if (last.role !== "assistant") {
            return [...msgs, { role: "assistant", content: full }];
          }
          return [
            ...msgs.slice(0, -1),
            { role: "assistant", content: full },
          ];
        });
      })
      .on("end", () => setIsPending(false));
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded p-2"
          placeholder="Say something…"
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

      <div className="space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.role === "user"
                ? "text-right"
                : "text-left italic text-gray-700"
            }
          >
            <strong>{m.role === "user" ? "You:" : "Bot:"}</strong>{" "}
            {m.content}
          </div>
        ))}
      </div>
    </main>
  );
}
