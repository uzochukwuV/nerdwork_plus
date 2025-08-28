import { ChartLine, Edit2Icon, Eye, Trash } from "lucide-react";
import React from "react";
import { ComicProps } from "./CreatorComics";
import Link from "next/link";
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";

const MobileComicActions = ({ comic }: { comic: ComicProps }) => {
  return (
    <>
      <SheetContent
        side="bottom"
        className="bg-[#1D1E21] p-2 text-white text-sm border-none flex flex-col gap-1"
      >
        <SheetTitle className="sr-only">Comic Options</SheetTitle>
        <SheetDescription className="sr-only">
          These are the list of actions that can be taken on the comic
        </SheetDescription>
        <button className="flex items-center gap-2 cursor-pointer hover:bg-[#25262A] p-4 rounded-[8px]">
          <Edit2Icon size={16} /> Edit Series
        </button>
        <button className="flex items-center gap-2 cursor-pointer hover:bg-[#25262A] p-4 rounded-[8px]">
          <ChartLine size={16} /> View Stats
        </button>
        <button className="flex items-center gap-2 cursor-pointer hover:bg-[#25262A] p-4 rounded-[8px]">
          <Trash size={16} /> Delete Series
        </button>
      </SheetContent>
    </>
  );
};

export default MobileComicActions;
