import NFTsEmptyState from "@/app/(protected)/(creator)/_components/nfts/NFTsEmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const NFTsPage = () => {
  return (
    <main className="max-w-[1300px] mx-auto px-5 font-inter text-white">
      <section className="flex max-md:flex-col justify-between gap-4 md:items-center py-8">
        <div>
          <h3 className="font-semibold text-[28px]">My NFTs</h3>
          <p className="text-sm text-nerd-muted">
            Welcome back, Creatorba09! Manage your comic series
          </p>
        </div>
        <Link href={"/creator/nfts/new"} className="max-md:w-full">
          <Button variant={"secondary"}>
            <Plus /> New Collectible
          </Button>
        </Link>
      </section>
      <NFTsEmptyState />
    </main>
  );
};

export default NFTsPage;
