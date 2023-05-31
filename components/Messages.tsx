"use client";
import { Message } from "@/lib/validations/message";
import { FC, useRef, useState } from "react";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
}

// !Styling is not done yet

const Messages: FC<MessagesProps> = ({ initialMessages, sessionId }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex-grow">
      <div ref={scrollRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;
        const hasNextMessageFromSameSender =
          messages[index - 1]?.senderId === messages[index]?.senderId;
        return (
          <div key={`${message.id}-${message.timestamp}`}>
            <div>{message.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
