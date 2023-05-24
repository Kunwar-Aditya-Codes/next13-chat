"use client";

import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signIn } from "next-auth/react";

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
    <button
      onClick={handleGoogleLogin}
      className="bg-black w-[15rem] p-4 m-6 rounded-2xl shadow-lg shadow-black/40 flex items-center space-x-4"
    >
      {loading ? (
        <>
          <AiOutlineLoading3Quarters className="text-white text-center w-8 h-5 animate-spin" />
        </>
      ) : (
        <>
          <FcGoogle className="text-white w-8 h-5" />
          <span className="text-white">Sign in with Google</span>
        </>
      )}
    </button>
  );
};

export default page;
