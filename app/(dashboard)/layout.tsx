import Sidebar from "@/components/Sidebar";
import { FC, ReactNode } from "react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/lib/helpers/redis";
import { authOptions } from "@/lib/auth";

export const metadata = {
  title: "Dashboard | Whisper Wire",
  description: "Generated by create next app",
};

interface layoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: layoutProps) => {
  // const session = await getServerSession(authOptions);

  // if (!session) notFound();

  // const unseenRequestCount = (
  //   (await fetchRedis(
  //     "smembers",
  //     `user:${session.user.id}:incoming_friend_requests`
  //   )) as User[]
  // ).length;

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden sm:flex-row">
      <Sidebar
      // initialUnseenRequestsCount={unseenRequestCount}
      // sessionId={session.user.id}
      />
      <div className="w-full sm:flex-[0.70] lg:flex-[0.75]">{children}</div>
    </div>
  );
};

export default Layout;
