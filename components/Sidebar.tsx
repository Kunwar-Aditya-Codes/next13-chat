"use client";
import { CiMenuBurger } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = ({}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <CiMenuBurger
        className="h-5 w-5 sm:hidden"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } absolute z-50 h-full w-full transition-all duration-[250ms]  ease-out sm:relative sm:flex-[0.3] sm:translate-x-0 lg:flex-[0.25]`}
      >
        <div className="h-full w-full bg-">
          <AiOutlineClose
            className="h-5 w-5 sm:hidden"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className="flex items-center justify-between px-4 py-2">
            <h1 className=""></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
