import React, { useEffect, useRef } from "react";
import { MessageBubble, Message } from "./MessageBubble";

interface Props {
    messages: Message[];
}

export function MessageList({ messages }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div
            ref={containerRef}
            className="h-full overflow-auto space-y-2 p-2"
        >
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
