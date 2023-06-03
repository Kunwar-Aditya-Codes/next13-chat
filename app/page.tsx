import Hero from "@/components/Hero";
import Image from "next/image";
import AboutImg from "@/public/about.png";
import { dyna } from "@/lib/utils";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main className="min-h-screen divide-y-2 divide-[#343941] ">
      {/* hero section */}
      <Hero />

      {/* About */}
      <section className=" flex flex-col space-y-12 px-5 py-12 md:flex-row md:space-y-0">
        <Image
          src={AboutImg}
          alt="about"
          className="mx-auto w-[100%] rounded-lg border border-[#343941] p-2 shadow-xl shadow-black/10 md:w-[55%]"
        />
        <div className="px-4 text-center md:px-8">
          <h1
            className={`${dyna.className} text-3xl font-bold tracking-widest text-green-400  lg:text-5xl`}
          >
            About
          </h1>
          <p className="mt-5 text-justify text-sm text-white md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quae voluptates voluptatibus
            exercitationem quos voluptate quod quibusdam, quia, quae voluptates
            voluptatibus exercitationem quos voluptate quod
          </p>
        </div>
      </section>

      {/* Review */}
      <section className="px-5 py-12">
        <Reviews />
      </section>

      {/* Footer */}
    </main>
  );
}
