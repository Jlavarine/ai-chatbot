import React from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
  model?: string;
};

export function MessageBubble({ role, content, model }: Message) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-lg p-3 rounded-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-900"
        }`}
      >
        {!isUser && model && (
          <div className="text-xs font-semibold mb-1">
            {model}
          </div>
        )}
        <div>{content}</div>
      </div>
    </div>
  );
}
