"use client";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { FC } from "react";

interface AddFriendProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriend: FC<AddFriendProps> = ({}) => {
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      toast.success("Request sent!");

      // reset form
      reset();
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
    addFriend(data.email).catch((error) => {
      console.error(error);
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col items-center space-y-4 px-4 sm:flex-row sm:space-x-8 sm:space-y-0 sm:px-0"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Ex. xyz@gmail.com"
          autoFocus
          className=" w-full rounded-lg px-4 py-2 shadow-md outline-cyan-800 md:w-[45%]"
        />
        <button
          type="submit"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Send Request
        </button>
      </form>
      {errors.email && (
        <div className="ml-1 mt-4 text-center text-sm font-medium text-red-500 sm:text-start">
          **{errors.email?.message}
        </div>
      )}
    </div>
  );
};

export default AddFriend;
