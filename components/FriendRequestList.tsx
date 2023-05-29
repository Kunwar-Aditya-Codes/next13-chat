"use client";

import axios from "axios";
import { FC, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface FriendRequestListProps {
  incomingRequests: {
    senderId: string;
    senderEmail: string;
  }[];
}

const FriendRequestList: FC<FriendRequestListProps> = ({
  incomingRequests,
}) => {
  const [incomingFriendRequests, setIncomingFriendRequests] =
    useState(incomingRequests);

  const router = useRouter();

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
          className="m-4 flex flex-col items-center justify-evenly space-y-3 rounded-lg bg-white py-3 text-center text-sm shadow-md hover:shadow-lg sm:mx-0 sm:w-[70%] sm:flex-row sm:justify-between sm:space-y-0 sm:px-4 sm:text-base md:text-lg lg:w-[50%]"
        >
          <p className="md:font-light">{request.senderEmail}</p>
          <div className="flex items-center space-x-6">
            <AiFillCheckCircle
              onClick={() => acceptFriendRequest(request.senderId)}
              className="h-7 w-7 cursor-pointer text-green-500  md:h-8 md:w-8"
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
