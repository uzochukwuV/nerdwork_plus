"use client";
import { Button } from "@/components/ui/button";
import { Send, WalletCardsIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import NWT from "@/assets/nwt.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";
import { creatorTransactions } from "@/components/data";

const TransactionType = ["all", "earning", "withdrawal", "gift", "purchase"];

const WalletPage = () => {
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("");

  const transactionData = creatorTransactions ?? [];

  return (
    <main className="text-white font-inter">
      <section className="max-w-[1300px] mx-auto px-5 py-10 flex flex-col gap-5">
        <div className="flex max-md:flex-col gap-3 justify-between md:items-center">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-[28px]">Wallet</h3>
            <p className="text-nerd-muted text-sm">
              Manage your tokens, earnings, and payouts
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="bg-transparent border-[#292A2E]"
            >
              <WalletCardsIcon /> Buy NWT
            </Button>
            <Button variant={"primary"}>
              <Send /> Withdraw Money
            </Button>
          </div>
        </div>

        <section className="flex max-md:flex-col gap-3">
          <div className="md:w-2/4 md:h-[279px] rounded-[12px] border-[0.5px] border-[#292A2E] bg-[#1D1E21] flex flex-col justify-between p-6">
            <div>
              <p className="text-sm">Available Balance</p>
              <p className="text-[64px] text-[#09FFFF] flex items-center gap-3 font-bold">
                <Image src={NWT} width={64} height={64} alt="" />
                100
              </p>
            </div>
            <p className="text-right font-bold text-[#598EE2] opacity-55 text-5xl">
              ≈ $427.05
            </p>
          </div>

          <div className="md:w-1/4 h-[279px] rounded-[12px] border-[0.5px] border-[#292A2E] text-sm p-6 flex flex-col justify-between">
            <div>
              <p>Wallet Information</p>
              <p className="text-nerd-muted">Manage your payout destination</p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <p>Solflare (Solana Wallet)</p>
                <p className="text-nerd-muted">0xDEAF...fB8B</p>
              </div>
              <Button className="bg-nerd-default w-fit">Edit Wallet</Button>
            </div>
            <p className="text-nerd-muted text-xs">
              Payouts are completed every 3 working days
            </p>
          </div>

          <div className="md:w-1/4 h-[279px] rounded-[12px] border-[0.5px] border-[#292A2E] text-sm flex flex-col">
            <div className="p-6 h-[60%] flex flex-col justify-between">
              <div>
                <p>Exchange Rates</p>
                <p className="text-nerd-muted">
                  Rates are updated every 2 minutes
                </p>
              </div>
              <div className="font-medium">
                <p className="flex justify-between">
                  1 NWT <span>$10.05</span>
                </p>
                <p className="flex justify-between">
                  1 SOL <span>$10.05</span>
                </p>
              </div>
            </div>
            <hr className="!text-[#292A2E] h-0 border-t border-[#292A2E]" />
            <div className="p-6 text-xs text-nerd-muted flex flex-col gap-1 mt-4">
              <p className="flex justify-between">
                Fees: <span>1% on all transactions.</span>
              </p>
              <p className="flex justify-between">
                Minimum payout: <span>$50 or equivalent.</span>
              </p>
              <p className="flex justify-between">
                Processing time: <span>1 to 3 working days.</span>
              </p>
            </div>
          </div>
        </section>
      </section>

      <hr className="!text-[#292A2E] h-0 border-t border-[#292A2E]" />

      <section className="max-w-[1300px] mx-auto px-5 py-10">
        <p>Transaction History</p>
        <p className="text-nerd-muted text-sm">
          Your payout requests and their status
        </p>

        <div className="flex gap-3 py-5 border-b border-[#292A2E]">
          <Select onValueChange={setTypeFilter} value={typeFilter}>
            <SelectTrigger className="w-full max-w-[155px] bg-[#1D1E21] border-[#292A2E] text-white">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D1E21] border-none text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="earning">Earning</SelectItem>
              <SelectItem value="gift">Gift</SelectItem>
              <SelectItem value="purchase">Purchase</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="w-full max-w-[155px] bg-[#1D1E21] border-[#292A2E] text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D1E21] border-none text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setSort} value={sort}>
            <SelectTrigger className="w-full max-w-[155px] bg-[#1D1E21] border-[#292A2E] text-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-[#1D1E21] border-none text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="type">Type</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="container mx-auto py-10 text-white">
          <DataTable columns={columns} data={transactionData} />
        </div>
      </section>
    </main>
  );
};

export default WalletPage;
