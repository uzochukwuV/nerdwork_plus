import React from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const ComicsHeader = () => {
  return (
    <section className="mx-auto max-w-[1300px] font-inter flex justify-between items-center mt-10 mb-6">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-[28px]">My Comics</h3>
        <p className="font-medium text-sm text-[#707073]">
          Welcome back, Creatorba09! Manage your comic series
        </p>
      </div>
      <Link href={"/creator/comics/new"}>
        <Button variant={"secondary"}>
          <Plus />
          New Project
        </Button>
      </Link>
    </section>
  );
};

export default ComicsHeader;
