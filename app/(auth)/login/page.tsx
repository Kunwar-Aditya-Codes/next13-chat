"use client";

import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Alkatra } from "next/font/google";

const alk = Alkatra({
  subsets: ["latin"],
});

const page: FC = ({}) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn("google", {
      callbackUrl: "/",
    });
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-10 items-center justify-center min-h-screen">
      {loading ? (
        <div className="bg-[#1f4168] text-white px-5 py-3 md:px-8 md:py-4 rounded-md w-[10rem]">
          <AiOutlineLoading3Quarters className="w-5 h-5 animate-spin mx-auto text-center" />
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-[#1f4168] text-white px-5 py-3 md:px-8 md:py-4 rounded-md flex items-center space-x-4"
        >
          <FcGoogle className="w-5 h-5 md:w-7 md:h-7" />
          <p className="font-light md:text-2xl">Login with Google</p>
        </button>
      )}

      <Link href={"/"}>
        <p className="text-sm underline">Back to home</p>
      </Link>
    </div>
  );
};

export default page;
