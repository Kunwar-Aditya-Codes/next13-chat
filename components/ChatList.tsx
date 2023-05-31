"use client";
import { chatHrefConstructor } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface ChatListProps {
  friends: User[];
  sessionId: string;
}

const ChatList: FC<ChatListProps> = ({ friends, sessionId }) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const router = useRouter();
  const pathname = usePathname();

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
              <h1 className="font-light uppercase tracking-widest md:text-lg">
                {friend.name}
                {unseenMessagesCount > 0 && (
                  <span className="absolute -top-1 left-6 w-4 rounded-full bg-white text-center text-xs ">
                    {unseenMessagesCount}
                  </span>
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
