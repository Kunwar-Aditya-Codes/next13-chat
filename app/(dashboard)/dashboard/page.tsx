import { dyna } from "@/lib/utils";

const page = async ({}) => {
  return (
    <div className="flex h-screen items-center justify-center px-4 ">
      <h1
        className={`text-2xl font-bold uppercase text-white md:text-4xl ${dyna.className} text-center tracking-widest`}
      >
        Start chatting with your friends!
      </h1>
    </div>
  );
};

export default page;
