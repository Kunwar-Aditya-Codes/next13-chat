"use client";
import { Message } from "@/lib/validations/message";
import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface MessagesProps {
  initialMessages: Message[];
  sessionId: string;
  sessionImage: string;
  chatId: string;
  chatPartnerImage: string;
}

const Messages: FC<MessagesProps> = ({
  initialMessages,
  sessionId,
  sessionImage,
  chatId,
  chatPartnerImage,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const formatTimeStamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`chat:${chatId}`));

    const messageHandler = (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    };

    pusherClient.bind("incoming_message", messageHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`chat:${chatId}`));
      pusherClient.unbind("incoming_message", messageHandler);
    };
  }, [chatId]);

  return (
    <div className=" scrollbar-w-2 mb-8 flex flex-grow flex-col-reverse overflow-y-scroll  px-2">
      <div ref={scrollRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderId === sessionId;

        const hasNextMessageFromSameSender =
          messages[index - 1]?.senderId === messages[index]?.senderId;
        return (
          <div
            key={`${message.id}-${message.timestamp} `}
            className={`mb-6 flex items-end justify-end  ${
              isCurrentUser ? "mr-[1rem] flex-row" : "  flex-row-reverse"
            }`}
          >
            <div
              className={`flex flex-col space-y-1  ${
                isCurrentUser ? "items-end text-end" : "items-start"
              }`}
            >
              <p
                className={`
              rounded-t-lg  px-4 py-1 text-lg 
              ${
                isCurrentUser
                  ? " rounded-bl-lg  bg-[#343941] text-white"
                  : " rounded-br-lg bg-gray-200 "
              }`}
              >
                {message.text}
              </p>
              <p className="text-xs text-white">
                {formatTimeStamp(message.timestamp)}
              </p>
            </div>
            <div
              className={`
            flex-shrink-0
            ${hasNextMessageFromSameSender ? "invisible" : "visible"}
            `}
            >
              <Image
                src={isCurrentUser ? sessionImage : chatPartnerImage}
                alt="profile-image"
                width={25}
                height={25}
                className={`rounded-full 
                ${isCurrentUser ? "ml-3" : "mr-3"}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
