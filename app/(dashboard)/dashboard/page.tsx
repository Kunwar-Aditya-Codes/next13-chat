import { DynaPuff } from "next/font/google";

const dyna = DynaPuff({
  subsets: ["latin"],
});

const page = async ({}) => {
  return (
    <div className="flex h-screen items-center justify-center px-4 ">
      <h1
        className={`text-2xl font-bold uppercase md:text-4xl ${dyna.className} text-center tracking-widest`}
      >
        Start chatting with your friends!
      </h1>
    </div>
  );
};

export default page;
