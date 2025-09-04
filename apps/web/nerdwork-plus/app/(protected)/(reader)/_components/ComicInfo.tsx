"use client";
import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Chapter } from "@/lib/types";
import { Popover } from "@radix-ui/react-popover";
import { Info } from "lucide-react";
import React from "react";

const ComicInfo = ({ chapter }: { chapter: Chapter }) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className="max-w-1/2 flex items-center gap-1.5"
          >
            <p className="max-md:truncate">{chapter?.title}</p>
            <Info size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-nerd-default flex flex-col items-center gap-2 font-inter text-white bg-[#151515]">
          <p className="text-center">{chapter?.title}</p>
          <Button>Save Progress</Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ComicInfo;
