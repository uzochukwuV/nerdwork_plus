"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/nerdwork.png";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="lg:flex hidden gap-4 font-inter font-semibold justify-between h-24 items-center px-6">
        <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
        <ul className="flex gap-10">
          <li>Communities</li>
          <li>Nerdwork+</li>
          <li className="flex items-center gap-2">
            Comic Con 2025{" "}
            <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
              Soon
            </span>
          </li>
          <li>Events</li>
          <li>Company</li>
        </ul>
        <div className="flex gap-4">
          <Button>Log In</Button>
          <Button variant={"primary"}>Sign Up</Button>
        </div>
      </nav>
      <nav className="max-lg:flex relative lg:hidden font-inter font-semibold justify-between h-24 items-center px-6">
        <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
        <button onClick={handleMenu}>
          <MenuIcon />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-0 flex flex-col w-full gap-4 bg-white text-black px-5 py-7">
            <button onClick={handleMenu} className="self-end">
              <X />
            </button>
            <ul className="flex flex-col gap-10">
              <li>Communities</li>
              <li>Nerdwork+</li>
              <li className="flex items-center gap-2">
                Comic Con 2025{" "}
                <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
                  Soon
                </span>
              </li>
              <li>Events</li>
              <li>Company</li>
            </ul>
            <div className="flex flex-col gap-4">
              <Button className="bg-[#343435]">Log In</Button>
              <Button className="bg-[#3373D9]">Sign Up</Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
