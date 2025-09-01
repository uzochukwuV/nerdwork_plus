import React from "react";
import Logo from "@/assets/nerdwork.svg";
import Image from "next/image";
import Navbar from "@/components/homepage/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <main className="bg-[#171719] text-white min-h-screen px-5 flex flex-col gap-4 font-inter justify-center items-center">
        <div className="flex items-center gap-1.5 text-6xl font-obostar">
          <h2>4</h2>
          <span className="animate-bounce">
            <Image src={Logo} width={60} height={60} alt="Nerdwork logo" />
          </span>
          <h2>4</h2>
        </div>

        <div className="max-w-md text-center">
          <p className="font-semibold text-2xl mb-3">This Page is Hiding!</p>
          <p className="font-light">
            Looks like this page has gone rogue and is off on its own adventure.
            Maybe it&apos;s battling a supervillain or scouting for new heroes.
            While we get it back on the grid, here are some options:
          </p>
        </div>

        <div className="flex justify-center gap-4 max-w-md w-full">
          <Link href={"/"}>
            <Button className="w-36" variant={"secondary"}>
              Home
            </Button>
          </Link>
          <Link href={"/nerdwork+"}>
            <Button className="w-36" variant={"primary"}>
              Nerdwork+
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
