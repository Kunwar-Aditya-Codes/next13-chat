import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { fetchRedis } from "@/lib/helpers/redis";
import { messageArrayValidator } from "@/lib/validations/message";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DynaPuff } from "next/font/google";
import Messages from "@/components/Messages";
import ChatInput from "@/components/ChatInput";

interface pageProps {
  params: {
    chatId: string;
  };
}

const dyna = DynaPuff({
  subsets: ["latin"],
});

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      "zrange",
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const messages = results.map((result) => JSON.parse(result) as Message);

    const reversedMessages = messages.reverse();

    const validMessages = messageArrayValidator.parse(reversedMessages);

    return validMessages;
  } catch (error) {
    notFound();
  }
}

const page = async ({ params }: pageProps) => {
  const { chatId } = params;

  // Extra security check
  const session = await getServerSession(authOptions);
  if (!session) {
    return notFound();
  }

  const { user } = session;

  const [userId1, userId2] = chatId.split("--");

  if (userId1 !== user.id && userId2 !== user.id) {
    return notFound();
  }

  const chatPartnerId = user.id === userId1 ? userId2 : userId1;

  const chatPartner = (await db.get(`user:${chatPartnerId}`)) as User;
  const initialMessages = await getChatMessages(chatId);

  return (
    <div className="h-full sm:p-4">
      <div className="flex h-full flex-col">
        {/* Topbar */}
        <div className="flex items-center space-x-4 bg-cyan-800 px-4 py-[1.15rem] sm:rounded-lg sm:rounded-b-none">
          <Image
            src={chatPartner.image}
            alt="profile-image"
            width={35}
            height={35}
            className="rounded-full"
          />
          <h1
            className={`${dyna.className} font-bold tracking-widest text-white md:text-lg`}
          >
            {chatPartner.name}
          </h1>
        </div>
        {/* Chat */}
        <div className="flex h-full flex-grow flex-col overflow-y-scroll border-b-4 border-b-cyan-800 bg-white p-4  sm:rounded-b-lg">
          <Messages
            initialMessages={initialMessages}
            sessionId={user.id}
            chatId={chatId}
            sessionImage={user.image as string}
            chatPartnerImage={chatPartner.image}
          />
          <ChatInput chatPartner={chatPartner} chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default page;
