"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Helio from "@/assets/helio.svg";
import { toast } from "sonner";

const WithdrawEarningsModal = () => {
  const [withdrawAmount, setWithdrawAmount] = React.useState(0);

  const availableBalance = 100; // NWT
  const usdEquivalent = 427.05; // USD
  const transactionFee = 0.01; // 1%

  const handleWithdrawAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value);
    setWithdrawAmount(isNaN(value) ? 0 : value);
  };

  const calculateFee = (amount: number) => {
    return amount * transactionFee;
  };

  const calculateTotal = (amount: number) => {
    return amount + calculateFee(amount);
  };

  const amountInNWT = withdrawAmount;
  const amountInUSD = (
    withdrawAmount *
    (usdEquivalent / availableBalance)
  ).toFixed(2);
  const feeNWT = calculateFee(withdrawAmount);
  const totalNWT = calculateTotal(withdrawAmount);

  const handleSubmit = () => {
    // console.log(totalNWT);
    toast.info("Proceeding to Helio for payment...");
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant={"primary"}>
              <Send /> Withdraw Money
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#171719] text-white border-none">
            <DialogHeader>
              <DialogTitle className="text-2xl">Withdraw Earnings</DialogTitle>
              <DialogDescription className="text-nerd-muted">
                Choose the amount of money you want to withdraw and continue to
                payment
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className={`py-3 px-3 border border-[#292A2E] rounded-md`}>
                <p>Available Balance</p>
                <p className="text-nerd-muted flex items-center justify-between">
                  100 NWT <span>$427.05</span>
                </p>
              </div>

              <div
                className={`py-3 px-3 border border-[#292A2E] rounded-md flex items-center justify-between`}
              >
                <div>
                  <p>Solflare (Solana Wallet)</p>
                  <p className="text-nerd-muted flex items-center justify-between">
                    0xDEAF...fB8B
                  </p>
                </div>
                <Button className="bg-nerd-default w-fit">Edit Wallet</Button>
              </div>

              <div className="relative flex items-center space-x-2">
                <Input
                  type="number"
                  value={withdrawAmount === 0 ? "" : withdrawAmount}
                  onChange={handleWithdrawAmountChange}
                  placeholder="$0"
                  className="bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-nerd-muted"
                />
                <Button
                  variant="outline"
                  className="bg-transparent text-white"
                  onClick={() => setWithdrawAmount(availableBalance)}
                >
                  Max
                </Button>
              </div>
              <p className="text-sm text-[#E8794A]">Minimum amount is $25.00</p>
            </div>
            <div className="space-y-2 text-sm text-nerd-muted border-t pt-4 border-[#292A2E]">
              <div className="flex justify-between">
                <span>USD Amount</span>
                <span className="text-white">${amountInUSD}</span>
              </div>
              <div className="flex justify-between">
                <span>Token Equivalent</span>
                <span className="text-white">{amountInNWT} NWT</span>
              </div>
              <div className="flex justify-between pb-3">
                <span>1% Transaction Fee</span>
                <span className="text-white">{feeNWT} NWT</span>
              </div>
              <div className="flex justify-between border-t border-[#292A2E] pt-3 text-white">
                <span>Total to pay</span>
                <span>{totalNWT} NWT</span>
              </div>
            </div>

            <DialogFooter className="flex !flex-col">
              <Button
                onClick={handleSubmit}
                variant={"primary"}
                className="w-full mt-3"
              >
                Continue to Payment
              </Button>
              <p className="text-xs text-center text-nerd-muted flex items-center justify-center gap-2">
                Powered by Helio{" "}
                <Image src={Helio} width={14} height={14} alt="helio" />
              </p>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default WithdrawEarningsModal;
