import Image from "next/image";
import React from "react";
import Logo from "@/assets/nerdwork.png";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex font-inter font-semibold justify-between h-24 items-center px-6">
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
        <Button className="bg-[#343435]">Log In</Button>
        <Button className="bg-[#3373D9]">Sign Up</Button>
      </div>
    </nav>
  );
}
