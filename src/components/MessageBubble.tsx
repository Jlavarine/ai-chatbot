import React, { useEffect, useState } from "react";
import { Clipboard } from 'lucide-react';


export type Message = {
  role: "user" | "assistant";
  content: string;
  model?: string;
};

export function MessageBubble({ role, content, model }: Message) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

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
          <button
            onClick={copyToClipboard}
            aria-label="Copy response"
            className="mt-2 p-1 rounded hover:bg-black-200"
          >
            <Clipboard className="w-5 h-5 text-white-500 hover:text-gray-700"/>
            {copied && (
              <span className="text-xs text-green-600">
                Copied!
              </span>
            )}
          </button>
      </div>
    </div>
  );
}
