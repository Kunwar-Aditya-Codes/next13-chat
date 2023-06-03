"use client";
import { AiOutlineClose, AiFillHome } from "react-icons/ai";
import { FC, useEffect, useState } from "react";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import ChatList from "./ChatList";
import Image from "next/image";
import { pusherClient } from "@/lib/pusher";
import { dyna, toPusherKey } from "@/lib/utils";

interface SidebarProps {
  initialUnseenRequestsCount: number;
  session: {
    user: User;
    expires: string;
  };
  friends: User[];
}

const Sidebar: FC<SidebarProps> = ({
  initialUnseenRequestsCount,
  session,
  friends,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unseenRequestsCount, setUnseenRequestsCount] = useState<number>(
    initialUnseenRequestsCount
  );

  // New
  const [activeChats, setActiveChats] = useState<User[]>(friends);

  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${session.user.id}:incoming_friend_requests`)
    );
    pusherClient.subscribe(toPusherKey(`user:${session.user.id}:friends`));

    const friendRequestHandler = () => {
      setUnseenRequestsCount((prev) => prev + 1);
    };

    const addedFriendHandler = () => {
      setUnseenRequestsCount((prev) => prev - 1);
    };

    // New
    const newFriendHandler = (newFriend: User) => {
      setActiveChats((prev) => [...prev, newFriend]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);
    pusherClient.bind("new_friend", addedFriendHandler);
    // New
    pusherClient.bind("new_friend", newFriendHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${session.user.id}:incoming_friend_requests`)
      );
      pusherClient.unsubscribe(toPusherKey(`user:${session.user.id}:friends`));
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
      pusherClient.unbind("new_friend", addedFriendHandler);
      // New
      pusherClient.unbind("new_friend", newFriendHandler);
    };
  }, [session.user.id]);

  return (
    <>
      <div className="m-1 px-4 py-2">
        <HiMenu
          className="h-7 w-7 cursor-pointer rounded-lg bg-[#353941] p-1 text-white sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-50 h-full w-full transition-all  duration-[250ms] ease-out sm:relative sm:m-4 sm:h-[91%] sm:flex-[0.3] sm:translate-x-0 lg:flex-[0.25]`}
      >
        <div className="h-full w-full border-b-4 border-black border-b-[#353941] bg-[#26282b] py-2  shadow-2xl sm:rounded-md sm:py-0">
          <div className="mx-4 flex items-center justify-end text-end ">
            <AiOutlineClose
              className="h-6 w-6 cursor-pointer  rounded-full bg-[#353941] p-[3.5px] text-end text-white sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {/* Topbar */}
          <div className=" mt-4 flex items-center bg-[#353941] px-2 py-5 text-white shadow-xl sm:mt-0 sm:rounded-lg sm:rounded-b-none">
            <div className="flex grow items-center space-x-2 ">
              {/* <FaUserCircle className="h-6 w-6" /> */}
              <Image
                alt="profile-image"
                src={session.user.image}
                className="rounded-full"
                width={30}
                height={30}
              />
              <h1
                className={` ${dyna.className}  font-bold  tracking-wider first-letter:text-green-400`}
              >
                {session.user.name}
              </h1>
            </div>
            <button onClick={handleSignOut} className="mr-2">
              <IoExitOutline className="h-5 w-5 hover:text-green-400" />
            </button>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-evenly space-x-4  px-2">
            {/* Home button */}
            <Link
              href={"/dashboard"}
              className="my-6 rounded-lg ring-offset-1 ring-offset-[#26282b] focus:ring-2 focus:ring-green-400  "
            >
              <AiFillHome className=" h-8 w-8 rounded-lg bg-[#353941] p-[0.35rem] text-white shadow-md" />
            </Link>

            {/* Add button */}
            <Link
              href={"/dashboard/add"}
              className="my-6 rounded-lg ring-offset-1 ring-offset-[#26282b] focus:ring-2 focus:ring-green-400  "
            >
              <MdPersonAddAlt1 className="  h-8 w-8 rounded-lg bg-[#353941] p-[0.35rem] text-white shadow-md" />
            </Link>

            {/* Notifications */}
            <Link
              href={"/dashboard/requests"}
              className="relative my-6 rounded-lg ring-offset-1 ring-offset-[#26282b] focus:ring-2 focus:ring-green-400"
            >
              <BsBellFill className="h-8 w-8 rounded-lg bg-[#353941] p-2 text-white shadow-md" />
              {unseenRequestsCount > 0 && (
                <span className="absolute -top-1 left-6 w-4 rounded-full bg-green-400 text-center text-xs ">
                  {unseenRequestsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Lists */}
          {activeChats.length > 0 && (
            <div className="my-4">
              <h1 className="text-center text-sm font-extrabold uppercase tracking-widest text-green-400">
                Chats
              </h1>
              <ChatList friends={activeChats} sessionId={session.user.id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
