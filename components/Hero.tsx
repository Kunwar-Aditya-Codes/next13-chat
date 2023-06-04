import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/hero2.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { dyna } from "@/lib/utils";

const Hero: FC = () => {
  return (
    <section className="mb-6 flex h-screen flex-col bg-[url('/back3.svg')] bg-cover bg-center bg-no-repeat">
      <div className="flex flex-[0.5] flex-col  items-center justify-center space-y-12  p-4 ">
        <div>
          <h1
            className={`${dyna.className} flex w-full items-center justify-center space-x-4 text-center text-4xl font-bold uppercase text-white md:text-start md:text-6xl lg:text-[7rem] `}
          >
            <p className="">Chat</p>-
            <p className="first-letter:text-green-400">a</p>-
            <p className="">Lot</p>
          </h1>
          <p className=" mt-4 text-center font-bold italic tracking-wide text-white/50 md:text-xl ">
            Up for a chat ?
          </p>
        </div>

        <Link
          href={"/login"}
          className="flex items-center space-x-4 rounded-full bg-[#353941]  px-5 py-2 uppercase tracking-wide text-white shadow-md ring-green-400 ring-offset-4  ring-offset-[#26282b] transition ease-out hover:shadow-xl active:ring-2 md:px-7 md:py-3"
        >
          <p
            className={`${dyna.className} text-lg tracking-widest text-white md:text-xl lg:text-2xl`}
          >
            Login
          </p>
          <IoIosArrowDroprightCircle className="h-4 w-4" />
        </Link>
      </div>
      <div className="flex flex-[0.5] items-center justify-center">
        <Image src={hero} alt="hero" className="md:w-[28%]" priority />
      </div>
    </section>
  );
};

export default Hero;
