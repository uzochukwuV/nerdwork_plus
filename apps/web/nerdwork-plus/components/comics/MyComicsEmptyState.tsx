import { Book, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const MyComicsEmptyState = () => {
  return (
    <section className="max-w-[1300px] mx-auto font-inter border border-[#292A2E] rounded-[12px] flex flex-col gap-6 justify-center items-center py-16">
      <div className="bg-[#1D1E21] rounded-full w-20 h-20 flex justify-center items-center">
        <Book />
      </div>
      <div className="text-center max-w-[420px]">
        <p className="font-semibold mb-1">No comics yet</p>
        <p className="text-[#707073] text-sm">
          You currently have no comics. Start your creative journey by creating
          your first comic series!
        </p>
      </div>
      <Link href={"/creator/comics/new"}>
        <Button variant={"secondary"} className="min-w-[262px]">
          <Plus />
          New Project
        </Button>
      </Link>
    </section>
  );
};

export default MyComicsEmptyState;
