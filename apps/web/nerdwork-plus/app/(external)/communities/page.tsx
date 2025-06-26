import Footer from "@/components/homepage/Footer";
import Navbar from "@/components/homepage/Navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Pop from "@/assets/community/pop-culture.jpg";
import Games from "@/assets/community/games.jpg";
import Comics from "@/assets/community/comics.jpg";
import Anime from "@/assets/community/anime.jpg";
import Books from "@/assets/community/books.jpg";
import Movies from "@/assets/community/movies.jpg";
import Image from "next/image";

const communities = [
  {
    id: 1,
    name: "Pop Culture",
    src: Pop,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  {
    id: 2,
    name: "Video Games",
    src: Games,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  {
    id: 3,
    name: "Comics",
    src: Comics,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  {
    id: 4,
    name: "Anime",
    src: Anime,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  {
    id: 5,
    name: "Books",
    src: Books,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
  {
    id: 6,
    name: "Movies",
    src: Movies,
    members: 2000,
    desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi animi fuga officiis aliquam ullam, porro veniam, unde dolore labore quas nemo impedit repellendus",
    discord: "",
    whatsapp: "",
    telegram: "",
  },
];

export default function Communities() {
  return (
    <main className="bg-[#0D0D0D] text-white">
      <Navbar />
      <section className="max-w-[1130px] mx-auto w-full font-inter text-white flex flex-col items-center mb-20 px-7">
        <h1 className="font-obostar text-[52px] max-md:text-[32px] max-md:my-10 md:mt-28 md:mb-20 text-center">
          Join Community
        </h1>
        <div className="relative max-w-[520px] w-full">
          <Input
            type="text"
            placeholder="Search Communities"
            className=" w-full !rounded-[4px] font-inter py-3 text-sm placeholder:text-sm outline-none border-none ring-0 bg-[#FFFFFF0A]"
          />
          <Search className="absolute right-2 top-2 !size-4.5" />
        </div>

        <section className="mt-10 max-w-[900px] w-full">
          <Accordion type="single" collapsible className="flex flex-col gap-5">
            {communities.map((community) => (
              <AccordionItem
                className="border-none text-base rounded-[16px] bg-[#FFFFFF05] px-4 md:px-6 group"
                key={community.id}
                value={community.id.toString()}
              >
                <AccordionTrigger className="font-obostar text-[28px] max-md:text-lg !no-underline ">
                  <div className="flex gap-4 items-center">
                    <Image
                      src={community.src}
                      width={72}
                      height={72}
                      alt="community image"
                      className="rounded-[12px] transition-all duration-300 w-[72px] h-[72px] group-data-[state=open]:hidden"
                    />
                    <h3 className="group-data-[state=open]:sr-only fade-in fade-out transition-all duration-300">
                      {community.name}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex max-md:flex-col max-md:items-center gap-5 md:gap-10 fade-in fade-out transition-all duration-300">
                  <Image
                    src={community.src}
                    width={296}
                    height={296}
                    alt="community image"
                    className="rounded-[12px] transition-all duration-300 md:max-w-1/3 w-[296px] h-[296px] object-cover"
                  />
                  <div className="md:w-2/3 flex flex-col gap-3 justify-center max-md:self-start max-md:pl-6">
                    <h3 className="font-obostar text-[28px] max-md:text-lg">
                      {community.name}
                    </h3>
                    <p className="text-[#FFFFFF99] font-semibold max-md:text-sm">
                      {community.members} members
                    </p>
                    <p className="max-md:text-sm">{community.desc}</p>
                    <p className="text-[#FFFFFF99] font-semibold max-md:text-sm">
                      Join
                    </p>
                    <div>
                      <Link
                        className="hover:opacity-75"
                        href={community.discord}
                      >
                        Discord
                      </Link>{" "}
                      |{" "}
                      <Link
                        className="hover:opacity-75"
                        href={community.whatsapp}
                      >
                        Whatsapp
                      </Link>{" "}
                      |{" "}
                      <Link
                        className="hover:opacity-75"
                        href={community.telegram}
                      >
                        Telegram
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
      <Footer />
    </main>
  );
}
