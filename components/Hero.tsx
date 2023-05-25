import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/hero-2.jpg";
import { Alkatra } from "next/font/google";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const alk = Alkatra({
  subsets: ["latin"],
});

const Hero: FC = () => {
  return (
    <section className="h-screen flex flex-col md:flex-row lg:p-16">
      <div className="flex-[0.4] p-4 flex flex-col items-center md:items-start justify-center space-y-12">
        <h1
          className={`${alk.className}  text-[#1f4168] uppercase font-extrabold text-4xl md:text-6xl lg:text-8xl text-center md:text-start `}
        >
          Whisper Wire
        </h1>

        <Link
          href={"/login"}
          className="  flex items-center bg-[#f9a31c]/90 transition-colors ease-out hover:bg-[#f9a31c]  px-5 py-2 rounded-[0.2rem] shadow-lg shadow-black/20 text-white  space-x-4 uppercase tracking-wide"
        >
          <p className="font-medium text-lg">Login</p>
          <IoIosArrowDroprightCircle className="h-4 w-4 " />
        </Link>
      </div>
      <div className="flex-[0.6] flex items-center justify-center md:justify-end w-full p-4">
        <Image
          src={hero}
          alt="hero-image"
          className="w-[80%] small-tab:w-[60%]  sm:w-[50%]  md:w-[90%] bg-red-500"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;
