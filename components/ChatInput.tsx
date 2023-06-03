"use client";
import { FC, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ChatInputProps {
  chatPartner: User;
  chatId: string;
}

const ChatInput: FC<ChatInputProps> = ({ chatPartner, chatId }) => {
  const [input, setInput] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    setLoading(true);

    if (!input) {
      setLoading(false);
      return;
    }

    await axios.post("/api/message/add", {
      text: input,
      chatId,
    });
    setInput("");
    textAreaRef.current?.focus();
    try {
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center rounded-lg  ">
      <TextareaAutosize
        ref={textAreaRef}
        className="w-full rounded-lg rounded-r-none bg-[#343941] px-2 py-3 text-white shadow-md outline-none "
        placeholder={`Message ${chatPartner.name}`}
        value={input}
        autoFocus
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        rows={1}
      />
      <button
        onClick={sendMessage}
        className="flex h-full w-[4rem] items-center justify-center rounded-r-lg   bg-green-400  p-2 text-base text-white shadow-md"
      >
        {loading ? (
          <AiOutlineLoading3Quarters className=" h-5 w-5 animate-spin" />
        ) : (
          <RiSendPlaneFill className="h-5 w-5 " />
        )}
      </button>
    </div>
  );
};

export default ChatInput;
