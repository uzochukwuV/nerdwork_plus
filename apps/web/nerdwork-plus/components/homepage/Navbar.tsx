"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/assets/nerdwork.png";
import { Button } from "@/components/ui/button";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <section className="lg:flex hidden border-b border-[#FFFFFF1A] gap-4 font-inter font-semibold justify-between h-[93px] items-center px-6">
        <Link href={"/"}>
          <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
        </Link>
        <ul className="flex gap-10 items-center">
          <li>Communities</li>
          <Link href={"/nerdwork+"} className="hover:opacity-75">
            Nerdwork+
          </Link>
          <li className="flex items-center gap-2">
            Comic Con 2025{" "}
            <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
              Soon
            </span>
          </li>
          <Link href={"/events"} className="hover:opacity-75">
            Events
          </Link>
          <li>Company</li>
        </ul>
        <div className="flex gap-4">
          <Button>Log In</Button>
          <Button variant={"primary"}>Sign Up</Button>
        </div>
      </section>

      {/* Mobile navbar */}
      <section className="max-lg:flex relative lg:hidden border-b border-[#FFFFFF1A] font-inter font-semibold justify-between h-[88px] items-center px-6">
        <Link href={"/"}>
          <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
        </Link>
        <button onClick={handleMenu}>
          <MenuIcon />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-0 flex flex-col w-full gap-8 bg-[#0D0D0D] px-5 py-7">
            <div className="flex justify-between items-center">
              <Link href={"/"}>
                <Image src={Logo} width={146} height={40} alt="nerdwork logo" />
              </Link>
              <button onClick={handleMenu} className="">
                <X />
              </button>
            </div>
            <ul className="flex flex-col gap-7">
              <li>Communities</li>
              <Link href={"/nerdwork+"} className="hover:opacity-75">
                Nerdwork+
              </Link>
              <li className="flex items-center gap-2">
                Comic Con 2025{" "}
                <span className="bg-[#1BDB6C] font-medium px-2 pb-0.5 text-black rounded-[6px]">
                  Soon
                </span>
              </li>
              <Link href={"/events"} className="hover:opacity-75">
                Events
              </Link>
              <li>Company</li>
            </ul>
            <div className="flex justify-between gap-4 w-full">
              <Button className="bg-[#343435] w-1/2">Log In</Button>
              <Button className="bg-[#3373D9] w-1/2">Sign Up</Button>
            </div>
          </div>
        )}
      </section>
    </nav>
  );
}
