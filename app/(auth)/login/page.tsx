"use client";

import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page: FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-10">
      {loading ? (
        <div className="w-[10rem] rounded-md bg-[#353941] px-5 py-3 text-white md:px-8 md:py-4">
          <AiOutlineLoading3Quarters className="mx-auto h-5 w-5 animate-spin text-center" />
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="flex items-center space-x-4 rounded-md bg-[#353941] px-5 py-3 text-white md:px-8 md:py-4 md:uppercase md:tracking-wider"
        >
          <FcGoogle className="h-5 w-5 md:h-7 md:w-7" />
          <p className="font-light md:text-2xl">Login with Google</p>
        </button>
      )}

      <Link href={"/"}>
        <p className="text-sm text-green-400 underline underline-offset-2">
          Back to home
        </p>
      </Link>
    </div>
  );
};

export default Page;
