import Hero from "@/components/Hero";
import Image from "next/image";
import AboutImg from "@/public/about.png";
import { dyna } from "@/lib/utils";
import Reviews from "@/components/Reviews";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";

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
            className={`${dyna.className} text-3xl font-bold tracking-widest text-white first-letter:text-green-400  lg:text-5xl`}
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
      <footer>
        <div className="flex flex-col items-center justify-center space-y-10  bg-[#343941] px-6 py-12 text-white md:flex-row-reverse md:space-y-0 ">
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-[0.5]">
            <h1
              className={`${dyna.className}  text-2xl font-bold tracking-widest text-white  first-letter:text-green-400`}
            >
              Contact
            </h1>
            <div className="flex space-x-4">
              <a href="#" className="text-xl text-white hover:text-green-400">
                <BsFacebook />
              </a>
              <a href="#" className="text-xl text-white hover:text-green-400">
                <BsInstagram />
              </a>
              <a href="#" className="text-xl text-white hover:text-green-400">
                <BsTwitter />
              </a>
            </div>
          </div>
          <p className="pt-8 text-justify text-sm md:flex-[0.5] md:px-16 md:pt-0 md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum, quibusdam, quia, quae voluptates voluptatibus
            exercitationem quos voluptate quod quibusdam, quia, quae voluptates
            voluptatibus exercitationem quos voluptate quod
          </p>
        </div>
        <div className="bg-green-400 py-2">
          <p className="text-center ">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium uppercase tracking-wider">
              <a
                href="https://kunwar-aditya-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kunwar Aditya
              </a>
            </span>
            .
          </p>
        </div>
      </footer>
    </main>
  );
}
