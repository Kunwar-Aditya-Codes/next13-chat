"use client";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { FC, useState } from "react";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

interface pageProps {}

type FormData = z.infer<typeof addFriendValidator>;

const page: FC<pageProps> = ({}) => {
  const { register, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      toast.success("Request sent!");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", {
          message: error.message,
        });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", {
          message: error.response?.data,
        });
        return;
      }

      setError("email", {
        message: "Something went wrong!",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email")}
          type="text"
          className="bg-black/30 px-4 py-2 m-6 rounded-xl w-fit text-white outline-none"
        />
        <button
          type="submit"
          className="bg-sky-600 px-4 py-2 rounded-md text-white"
        >
          Send Request
        </button>
      </form>
    </div>
  );
};

export default page;
