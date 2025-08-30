"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SubNav = () => {
  const pathname = usePathname();

  const navItems = [
    { title: "My Comics", path: "/creator/comics" },
    { title: "My NFTs", path: "/creator/nfts" },
    { title: "Analytics", path: "/creator/analytics" },
    { title: "Wallet", path: "/creator/wallet" },
  ];

  const isActive = (path: string) => {
    if (pathname.startsWith(path) && pathname !== "/") return true;
    return false;
  };

  return (
    <>
      <nav className="max-md:hidden flex justify-center w-full gap-10 font-inter text-sm pt-5 border-t border-[#292A2E]">
        {navItems.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className={`text-[#707073] pb-5 hover:opacity-75 cursor-pointer ${
              isActive(item.path) ? "border-b border-white text-white" : ""
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <hr className="!text-[#292A2E] h-0 border-t border-[#292A2E]" />
    </>
  );
};

export default SubNav;
