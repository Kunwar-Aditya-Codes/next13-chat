import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/hero.png";
import { DynaPuff } from "next/font/google";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const dyna = DynaPuff({
  subsets: ["latin"],
});

const Hero: FC = () => {
  return (
    <section className="flex h-screen flex-col">
      <div className="flex flex-[0.5] flex-col items-center justify-center space-y-12  p-4 ">
        <h1
          className={`${dyna.className} items-center space-x-4 text-center text-4xl font-bold uppercase text-black sm:flex  md:text-start md:text-6xl lg:text-8xl `}
        >
          <p className="first-letter:text-amber-600">Whisper</p>
          <p className="first-letter:text-amber-600">Wire</p>
        </h1>

        <Link
          href={"/login"}
          className="flex items-center space-x-4 rounded-full bg-white px-5 py-2 uppercase tracking-wide text-black shadow-md ease-out hover:shadow-xl md:px-7 md:py-3"
        >
          <p className="text-lg font-medium md:text-xl">Login</p>
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
