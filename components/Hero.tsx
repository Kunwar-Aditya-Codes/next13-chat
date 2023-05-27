import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/hero.png";
import { Alkatra } from "next/font/google";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const alk = Alkatra({
  subsets: ["latin"],
});

const Hero: FC = () => {
  return (
    <section className="flex h-screen flex-col">
      <div className="flex flex-[0.5] flex-col items-center justify-center space-y-12  p-4 ">
        <h1
          className={`${alk.className}  text-center text-4xl font-extrabold uppercase text-black md:text-start md:text-6xl lg:text-8xl `}
        >
          Whisper Wire
        </h1>

        <Link
          href={"/login"}
          className="flex items-center space-x-4 rounded-full border-2 border-amber-400 bg-amber-500  px-5  py-2 uppercase tracking-wide text-white shadow-md transition-colors  ease-out hover:shadow-xl"
        >
          <p className="text-lg font-medium">Login</p>
          <IoIosArrowDroprightCircle className="h-4 w-4 " />
        </Link>
      </div>
      <div className="flex flex-[0.5] items-center justify-center ">
        <Image src={hero} alt="hero" className="md:w-[55%]" priority />
      </div>
    </section>
  );
};

export default Hero;
