import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = (await fetchRedis(
      "get",
      `user:email:${emailToAdd}`
    )) as string;

    // If the user doesn't exist, return a 404
    if (!idToAdd) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const session = await getServerSession(authOptions);

    // If the user is not authenticated, return a 401
    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    // If the user is trying to add himself, return a 400
    if (session.user.id === idToAdd) {
      return NextResponse.json("You can't add yourself as a friend!", {
        status: 400,
      });
    }

    // If the user is already a friend, return a 400
    const isFriend = await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    );

    if (isFriend) {
      return NextResponse.json("You are already friends!", { status: 400 });
    }

    // If the user is already a friend, return a 400
    const isAlreadyFriend = await fetchRedis(
      "sismember",
      `user:${session.user.id}:friends`,
      idToAdd
    );

    if (isAlreadyFriend) {
      return NextResponse.json("You are already friends!", { status: 400 });
    }

    // Send the friend request
    await pusherServer.trigger(
      toPusherKey(`user:${idToAdd}:incoming_friend_requests`),
      "incoming_friend_requests",
      {
        senderId: session.user.id,
        senderEmail: session.user.email,
      }
    );

    await db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

    return NextResponse.json("OK", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json("Invalid request payload!", { status: 422 });
    }

    return NextResponse.json("Invalid request", { status: 400 });
  }
}
