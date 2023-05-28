"use client";
import { AiOutlineClose } from "react-icons/ai";
import { FC, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { DynaPuff } from "next/font/google";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";
import { HiMenu } from "react-icons/hi";
import { MdPersonAddAlt1 } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";

const dyna = DynaPuff({
  subsets: ["latin"],
});

interface SidebarProps {
  initialUnseenRequestsCount: number;
  sessionId: string;
}

const Sidebar: FC<SidebarProps> = ({
  initialUnseenRequestsCount,
  sessionId,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [unseenRequestsCount, setUnseenRequestsCount] = useState<number>(
    initialUnseenRequestsCount
  );

  return (
    <>
      <div className="m-1 ">
        <HiMenu
          className="h-5 w-5  sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-50 h-full w-full  transition-all duration-[250ms] ease-out sm:relative sm:m-4 sm:h-auto sm:flex-[0.3] sm:translate-x-0 lg:flex-[0.25]`}
      >
        <div className="h-full w-full border-b-4 border-black border-b-amber-600 bg-gray-200 py-2  shadow-2xl sm:rounded-md sm:py-0">
          <div className="mx-4 flex items-center justify-end text-end ">
            <AiOutlineClose
              className="h-5 w-5 rounded-full  bg-black p-[2.5px] text-end text-white sm:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          {/* Topbar */}
          <div className=" mt-4 flex items-center bg-white px-2 py-5 shadow-xl sm:mt-0 sm:rounded-md">
            <div className="flex grow items-center space-x-2 ">
              <FaUserCircle className="h-6 w-6" />
              <h1
                className={` ${dyna.className}  font-bold  tracking-wider first-letter:text-amber-600`}
              >
                Kunwar Aditya
              </h1>
            </div>
            <Link href={"/"} className="mr-2">
              <IoExitOutline className="h-5 w-5 hover:text-amber-600" />
            </Link>
          </div>

          <div className="flex items-center justify-start space-x-4">
            {/* Add button */}
            <Link href={"/dashboard/add"}>
              <MdPersonAddAlt1 className="mx-2 my-6 h-8 w-8 rounded-lg bg-amber-600 p-[0.35rem] text-white shadow-md" />
            </Link>

            {/* Notifications */}
            <Link href={"/dashboard/requests"} className="relative">
              <BsBellFill className="mx-2 my-6 h-8 w-8 rounded-lg bg-amber-600 p-2 text-white shadow-md" />
              {unseenRequestsCount > 0 && (
                <span className="absolute left-7 top-4 w-4 rounded-full bg-white text-center text-xs ">
                  {unseenRequestsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Lists */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
