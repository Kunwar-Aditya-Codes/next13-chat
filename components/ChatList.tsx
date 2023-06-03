"use client";
import { pusherClient } from "@/lib/pusher";
import { chatHrefConstructor, toPusherKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ChatListProps {
  friends: User[];
  sessionId: string;
}

interface ExtendedMessage extends Message {
  senderImage: string;
  senderName: string;
}

const ChatList: FC<ChatListProps> = ({ friends, sessionId }) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      setUnseenMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("new_message", chatHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind("new_message", chatHandler);
    };
  }, [pathname, router, sessionId]);

  useEffect(() => {
    if (pathname?.includes("/chat")) {
      setUnseenMessages((prev) =>
        prev.filter((message) => !pathname.includes(message.senderId))
      );
    }
  }, [pathname]);

  return (
    <div className="mt-6">
      {friends.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (message) => message.senderId === friend.id
        ).length;

        return (
          <li key={friend.id} className="mb-4 list-none  text-white ">
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="flex items-center space-x-4 p-4 transition-colors ease-out hover:bg-[#353941] hover:text-green-400 "
            >
              <Image
                alt="profile-image"
                src={friend.image}
                width={35}
                height={35}
                className="rounded-full"
              />
              <h1 className=" flex items-center font-light uppercase tracking-widest md:text-lg">
                {friend.name}
                {unseenMessagesCount > 0 && (
                  <p className="ml-4 rounded-lg  bg-green-400  px-2 text-sm text-black">
                    {unseenMessagesCount}
                  </p>
                )}
              </h1>
            </a>
          </li>
        );
      })}
    </div>
  );
};

export default ChatList;
