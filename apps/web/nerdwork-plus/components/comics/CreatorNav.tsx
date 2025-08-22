import Image from "next/image";
import React from "react";
import Logo from "@/assets/nerdwork.png";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
// import { BiCoin } from "react-icons/bi";

export default function CreatorNav() {
  return (
    <nav className="max-w-[1300px] mx-auto font-inter flex justify-between items-center h-[76px]">
      <div className="flex justify-between items-center gap-10">
        <Image src={Logo} width={146} height={40} alt="Nerdwork logo" />
        <ul className="flex gap-4">
          <Link href={""}>Comics</Link>
          <Link href={""}>Marketplace</Link>
        </ul>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
          <Input
            placeholder="Search"
            className="h-[40px] w-[400px] pl-5 border border-[#292A2E] rounded-[20px] bg-[#1D1E21]"
          />
        </div>
      </div>

      <div className="flex justify-between items-center gap-3">
        <Link href={""}>Become a Creator</Link>
        <p className="bg-[#1D1E21] px-3 rounded-[20px]">
          {/* 100 <BiCoin /> */}
        </p>
        <p>C</p>
        <p>
          <Menu />
        </p>
      </div>
    </nav>
  );
}
