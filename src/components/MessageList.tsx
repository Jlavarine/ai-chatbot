import React from "react";
import { MessageBubble, Message } from "./MessageBubble";

interface Props {
  messages: Message[];
}

export function MessageList({ messages }: Props) {
  return (
    <div className="space-y-2 overflow-auto h-[60vh] p-2">
      {messages.map((m, i) => (
        <MessageBubble
          key={i}
          role={m.role}
          content={m.content}
          model={m.model}
        />
      ))}
    </div>
  );
}
