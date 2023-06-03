"use client";

import axios from "axios";
import { FC, useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestListProps {
  incomingRequests: FriendRequestProps[];
  sessionId: string;
}

interface FriendRequestProps {
  senderId: string;
  senderEmail: string;
}

const FriendRequestList: FC<FriendRequestListProps> = ({
  incomingRequests,
  sessionId,
}) => {
  const [incomingFriendRequests, setIncomingFriendRequests] =
    useState(incomingRequests);

  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: FriendRequestProps) => {
      setIncomingFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
    };

    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  //*** Accept friend request
  const acceptFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/accept", {
      id: senderId,
    });

    setIncomingFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  //*** Reject friend request
  const rejectFriendRequest = async (senderId: string) => {
    await axios.post("/api/friends/deny", {
      id: senderId,
    });

    setIncomingFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    );

    router.refresh();
  };

  return (
    <div className="mt-6">
      {incomingFriendRequests.map((request) => (
        <div
          key={request.senderId}
          className="m-4 flex flex-col items-center justify-evenly space-y-3 rounded-lg bg-[#343941] py-3 text-center text-sm text-white shadow-md hover:shadow-lg sm:mx-0 sm:w-[70%] sm:flex-row sm:justify-between sm:space-y-0 sm:px-4 sm:text-base md:text-lg lg:w-[50%]"
        >
          <p className="md:font-light">{request.senderEmail}</p>
          <div className="flex items-center space-x-6">
            <AiFillCheckCircle
              onClick={() => acceptFriendRequest(request.senderId)}
              className="h-7 w-7 cursor-pointer text-green-400  md:h-8 md:w-8"
            />
            <AiFillCloseCircle
              onClick={() => rejectFriendRequest(request.senderId)}
              className="h-7 w-7 cursor-pointer text-red-500   md:h-8 md:w-8"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
