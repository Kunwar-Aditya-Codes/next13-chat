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
  const [activeChats, setActiveChats] = useState<User[]>(friends);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:friends`));

    const newFriendHandler = (newFriend: User) => {
      console.log("new friend");
      setActiveChats((prev) => [...prev, newFriend]);
    };

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotify =
        pathname !==
        `/dashboard/chat/${chatHrefConstructor(sessionId, message.senderId)}`;

      if (!shouldNotify) return;

      setUnseenMessages((prev) => [...prev, message]);
    };

    pusherClient.bind("new_message", chatHandler);
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:friends`));
      pusherClient.unbind("new_message", chatHandler);
      pusherClient.unbind("new_friend", newFriendHandler);
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
      {activeChats.sort().map((friend) => {
        const unseenMessagesCount = unseenMessages.filter(
          (message) => message.senderId === friend.id
        ).length;

        return (
          <li key={friend.id} className="mb-4 list-none border-b-2  ">
            <a
              href={`/dashboard/chat/${chatHrefConstructor(
                sessionId,
                friend.id
              )}`}
              className="flex items-center space-x-4 p-4 transition-colors ease-out hover:bg-white/30 hover:text-cyan-800 "
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
                  <p className="ml-4 rounded-lg bg-cyan-800 px-2  text-sm text-white">
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
