import AddFriend from "@/components/AddFriend";
import { FC } from "react";
import { DynaPuff } from "next/font/google";

const dyna = DynaPuff({
  subsets: ["latin"],
});

const page: FC = ({}) => {
  return (
    <div className="mt-4 py-5">
      <h1
        className={`${dyna.className} text-center text-2xl font-bold uppercase tracking-widest text-white sm:text-start lg:text-4xl`}
      >
        Add Friend
      </h1>
      <AddFriend />
    </div>
  );
};

export default page;
