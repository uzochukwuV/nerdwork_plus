import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Card1 from "@/assets/costume.png";
import Card2 from "@/assets/mask.png";
import Card3 from "@/assets/arrow.png";
import Card4 from "@/assets/woman.png";
import ComicCon1 from "@/assets/comic-con1.png";

export default function Community() {
  return (
    <section className="z-10 flex items-center max-w-[1130px] font-inter mx-auto text-white pt-12 pb-28 px-7">
      <aside className="lg:w-2/5 max-lg::w-3/5 flex flex-col max-lg:gap-4 gap-6">
        <h2 className="font-obostar text-[40px] max-md:text-2xl">
          People
          <br />
          passion
          <br />
          community
        </h2>
        <p className="font-semibold max-md:text-sm">
          No matter your passion, there&apos;s a community for you.
        </p>
        <div className="flex gap-4 items-center">
          <p className="text-[28px] max-md:text-[20px] font-medium text-[#9C9C9C] md:text-[#EDEBEB]">
            Pop Culture
          </p>
          <Button
            variant={"primary"}
            className="max-md:hidden font-inter rounded-[12px]"
          >
            Join Community
          </Button>
        </div>
        <ul className="text-[#9C9C9C] text-[28px] max-md:text-xl flex flex-col gap-6 font-medium">
          <li>Video Games</li>
          <li>Comics</li>
          <li>Theatre</li>
          <li>Anime</li>
          <li>Books</li>
          <li>Movies</li>
          <li>Music</li>
        </ul>
      </aside>

      {/* Desktop image gallery */}
      <section className="lg:w-3/5 hidden lg:flex flex-col gap-16">
        <div className="flex justify-center gap-20">
          <Image src={Card1} width={241} height={302} alt="" />
          <Image src={Card2} width={257} height={334} alt="" />
        </div>
        <div className="flex gap-7 -ml-20 max-xl:overflow-hidden">
          <Image src={Card3} width={450} height={324} alt="" />
          <Image src={Card4} width={303} height={370} alt="" className="" />
        </div>
      </section>

      {/* Mobile image gallery */}
      <section className="lg:hidden max-lg:2/5 overflow-hidden flex flex-col items-center gap-4">
        <Image src={Card2} width={181} height={227} alt="" />
        <Image src={ComicCon1} width={254} height={159} alt="" />
        <Image src={Card1} width={150} height={188} alt="" />
      </section>
    </section>
  );
}
