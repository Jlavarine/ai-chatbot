"use client";

import { FormEvent, useState, useRef, useEffect, useCallback } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream";
import { MessageList } from "../components/MessageList";
import type { Message } from "../components/MessageBubble";
import { SuggestionList } from "../components/SuggestionList";
import { ChatControls } from "@/components/ChatControls";
import { ChatInput } from "@/components/ChatInput";

const MODEL_OPTIONS = [
  "mistralai/Mistral-7B-Instruct-v0.2",
  "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo"
];

const DEFAULT_SUGGESTIONS = [
  "What are Newton's Laws and examples of each?",
  "What are the rules for professional cricket?",
  "What are some quick one pot meals for a family of 4?",
  "What is the weather in San Francisco like in July?",
];

export default function Home() {

  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (!isPending) {
      inputRef.current?.focus();
    }
  }, [isPending]);

  async function sendMessage(text: string) {
    if (!text.trim()) return;

    setError(null);


    const history = [...messages, { role: "user", content: text }];
    setMessages(history);
    setPrompt("");
    setIsPending(true);

    let res: Response;
    try {
      res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, model: selectedModel }),
      });
    } catch (networkErr: any) {
      console.error("Network error:", networkErr);
      setError("Network error – please check your connection and try again.");
      setIsPending(false);
      inputRef.current?.focus();
      return;
    }

    if (!res.ok || !res.body) {
      const textErr = await res.text().catch(() => "Unknown server error");
      console.error("Chat API error:", textErr);
      setError(`Server error: ${textErr}`);
      setIsPending(false);
      inputRef.current?.focus();
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
          if (last?.role === "assistant") {
            return [...prev.slice(0, -1), bot];
          }
          return [...prev, bot];
        });
      })
      .on("end", () => {
        setIsPending(false);
        inputRef.current?.focus();
      });
  }

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    sendMessage(prompt);
  }, [prompt, sendMessage])

  const handlePickSuggestion = useCallback((text: string) => {
    sendMessage(text);
  }, [sendMessage])

  const clearConversation = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <main className="flex flex-col h-screen p-6 max-w-3xl mx-auto">
      <ChatControls
        modelOptions={MODEL_OPTIONS}
        selectedModel={selectedModel}
        onChangeModel={setSelectedModel}
      />

      {messages.length === 0 &&
        <div>
          <div className="bg-gray-100 text-gray-900 p-4 rounded-xl shadow-sm max-w-lg">
            <h1>Hello there!</h1>
            <h2>How can I help you today?</h2>
          </div>
        </div>
      }

      <div className="flex-1 overflow-auto"
        role="log"
        aria-live="polite"
        aria-atomic="false"
      >
        <MessageList messages={messages} />
      </div>

      <div>
        {messages.length === 0 && prompt === "" && (
          <SuggestionList
            suggestions={DEFAULT_SUGGESTIONS}
            onPick={handlePickSuggestion}
          />
        )}

        {error && (
          <div
            role="alert"
            className="mb-4 p-3 bg-red-100 text-red-800 rounded border border-red-200"
          >
            {error}
          </div>
        )}
        <ChatInput
          prompt={prompt}
          onClear={clearConversation}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
          isPending={isPending}
          inputRef={inputRef}
        />

      </div>
    </main>
  );
}
