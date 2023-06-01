import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { fetchRedis } from "@/lib/helpers/redis";
import FriendRequestList from "@/components/FriendRequestList";
import { DynaPuff } from "next/font/google";

const dyna = DynaPuff({
  subsets: ["latin"],
});

const page = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis("get", `user:${senderId}`)) as string;

      const senderData = JSON.parse(sender) as User;

      return {
        senderId,
        senderEmail: senderData.email,
      };
    })
  );

  return (
    <div className="mt-4 py-5">
      <h1
        className={`${dyna.className} text-center text-2xl font-bold uppercase tracking-widest sm:text-start lg:text-4xl`}
      >
        Friend Requests
      </h1>
      <FriendRequestList
        incomingRequests={incomingFriendRequests}
        sessionId={session.user.id}
      />
    </div>
  );
};

export default page;
