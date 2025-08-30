import NFTsEmptyState from "@/app/(protected)/(creator)/_components/nfts/NFTsEmptyState";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
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
        <Button variant={"secondary"}>
          <Plus /> New Collectible
        </Button>
      </section>
      <NFTsEmptyState />
    </main>
  );
};

export default NFTsPage;
