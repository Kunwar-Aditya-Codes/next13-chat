import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { id: idToDeny } = z
      .object({
        id: z.string(),
      })
      .parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    await db.srem(`user:${session.user.id}:incoming_friend_requests`, idToDeny);

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json("Invalid request payload!", { status: 422 });
    }

    return NextResponse.json("Invalid request", { status: 400 });
  }
}
