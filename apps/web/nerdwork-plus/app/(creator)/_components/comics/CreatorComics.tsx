import { Badge } from "@/components/ui/badge";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BookOpen,
  Calendar,
  ChartLine,
  Edit2Icon,
  EllipsisVertical,
  Eye,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export interface ComicProps {
  id: number;
  image: string;
  title: string;
  short_description: string;
  status: "upcoming" | "draft" | "scheduled" | "published";
  chapters: number;
  last_updated: string;
}

const CreatorComics = ({ data }: { data: ComicProps[] }) => {
  return (
    <section className="font-inter text-white mb-10 max-md:mt-5 max-xl:mx-5">
      <section className="grid grid-cols-4 gap-3 max-lg:hidden">
        {data.map((comic) => (
          <div
            key={comic.id}
            className="relative group h-[586px] bg-[#1D1E21] rounded-[8px] flex flex-col justify-between border border-transparent hover:border-[#9D9D9F] transition duration-300 hover:ease-in-out overflow-hidden"
          >
            {/* <div className={` h-[468px] z-10`}></div> */}
            <Image
              src={comic.image}
              width={316}
              height={468}
              alt={`${comic.title} cover`}
              className="h-[468px] object-cover"
            />
            <div className="absolute left-5 right-5 flex justify-between top-3">
              <Badge variant={"secondary"} className="capitalize h-8">
                {comic.status}
              </Badge>
              <Menubar className="bg-[#1D1E21] font-inter outline-none border-none ring-0 rounded-full transition duration-300 hover:ease-in-out group-hover:flex hidden p-0">
                <MenubarMenu>
                  <MenubarTrigger className="bg-[#1D1E21] data-[state=open]:bg-none h-8 w-8 flex justify-center items-center transition duration-300 hover:ease-in-out cursor-pointer rounded-full p-0">
                    <EllipsisVertical size={16} />
                  </MenubarTrigger>
                  <MenubarContent className="bg-[#1D1E21] text-white border-0 absolute -right-[30px]">
                    <MenubarItem>
                      <Eye />
                      View Details
                    </MenubarItem>
                    <MenubarItem>
                      <Edit2Icon /> Edit Series
                    </MenubarItem>
                    <MenubarItem>
                      <ChartLine /> View Stats
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <Trash /> Delete Series
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
            <div className="p-5">
              <p className="mb-3 font-semibold">{comic.title}</p>
              <div className="text-sm text-[#707073] flex flex-col gap-1">
                <p className="flex items-center gap-3">
                  <BookOpen size={16} /> {comic.chapters} Chapters
                </p>
                <p className="flex items-center gap-3">
                  <Calendar size={16} /> Updated {comic.last_updated}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Mobile comic cards */}
      <section></section>
    </section>
  );
};

export default CreatorComics;
