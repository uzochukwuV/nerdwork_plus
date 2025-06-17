import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Card1 from "@/assets/costume.png";
import Card2 from "@/assets/mask.png";
import Card3 from "@/assets/arrow.png";
import Card4 from "@/assets/woman.png";

export default function Community() {
  return (
    <section className="z-10 flex max-w-[1130px] font-inter mx-auto text-white pt-12 pb-28">
      <aside className="w-2/5 flex flex-col gap-6">
        <h2 className="font-obostar text-[40px]">
          People
          <br />
          passion
          <br />
          community
        </h2>
        <p className="font-semibold">
          No matter your passion, there&apos;s a community for you.
        </p>
        <div className="flex gap-4 items-center">
          <p className="text-[28px] font-medium text-[#EDEBEB]">Pop Culture</p>
          <Button className="bg-[#3373D9] font-inter rounded-[12px]">
            Join Community
          </Button>
        </div>
        <ul className="text-[#9C9C9C] text-[28px] flex flex-col gap-6 font-medium">
          <li>Video Games</li>
          <li>Comics</li>
          <li>Theatre</li>
          <li>Anime</li>
          <li>Books</li>
          <li>Movies</li>
          <li>Music</li>
        </ul>
      </aside>
      <section className="w-3/5 flex flex-col gap-16">
        <div className="flex justify-center gap-28">
          <Image src={Card1} width={241} height={302} alt="" />
          <Image src={Card2} width={257} height={334} alt="" />
        </div>

        <div className="flex gap-11 -ml-10">
          <Image src={Card3} width={486} height={351} alt="" />
          <Image src={Card4} width={303} height={370} alt="" />
        </div>
      </section>
    </section>
  );
}
