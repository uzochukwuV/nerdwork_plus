import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import ComicGallery from "@/assets/nerdwork+/comis.png";

export default function Waitlist() {
  return (
    <section className="text-white font-inter md:text-center max-w-[1600px] max-lg:py-10 mx-auto flex flex-col gap-5 md:items-center">
      <h2 className="font-obostar text-[40px] max-md:text-2xl px-7">
        Join Today
      </h2>
      <p className="px-7">Free to join, pay as you go</p>

      <form className="max-w-[600px] px-7 mb-12 w-full flex gap-3 justify-center items-stretch">
        <Input
          type="email"
          className="bg-[#17171A] outline-none border-none w-full rounded-[8px] py-2.5 pl-4 w-"
          placeholder="Email address"
        />
        <Button variant={"primary"} className="h-full font-inter">
          Join Waitlist
        </Button>
      </form>

      <figure className="relative">
        <Image
          src={ComicGallery}
          width={2867}
          height={911}
          alt="comic images"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0D0D0D_0%,rgba(13,13,13,0)_70%)] z-10" />
      </figure>
    </section>
  );
}
