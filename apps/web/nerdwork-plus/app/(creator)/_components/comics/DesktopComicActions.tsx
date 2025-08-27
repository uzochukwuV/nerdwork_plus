import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "@/components/ui/menubar";
import { ChartLine, Edit2Icon, Eye, Trash } from "lucide-react";
import React from "react";
import { ComicProps } from "./CreatorComics";
import Link from "next/link";

const ComicActions = ({
  comic,
  details,
}: {
  comic: ComicProps;
  details: boolean;
}) => {
  return (
    <>
      <MenubarContent className="max-md:hidden bg-[#1D1E21] text-white border-0 absolute -right-[30px]">
        {!details && (
          <Link href={`/creator/comics/${comic.id}`}>
            <MenubarItem>
              <Eye />
              View Details
            </MenubarItem>
          </Link>
        )}
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
    </>
  );
};

export default ComicActions;
