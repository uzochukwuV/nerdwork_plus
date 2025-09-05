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
import { WalletCardsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import NWT from "@/assets/nwt.svg";
import Helio from "@/assets/helio.svg";
import { toast } from "sonner";

const PurchaseTokenModal = () => {
  const [nwtAmount, setNwtAmount] = React.useState(0);

  // Hardcoded values for demonstration
  const usdPerNwt = 1.405; // 100 NWT for $140.50
  const transactionFeeRate = 0.01; // 1%

  const suggestedAmounts = [50, 100, 200, 500];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setNwtAmount(isNaN(value) ? 0 : value);
  };

  const calculateUSD = (amount: number) => amount * usdPerNwt;
  const calculateFee = (amount: number) =>
    calculateUSD(amount) * transactionFeeRate;
  const calculateTotal = (amount: number) =>
    calculateUSD(amount) + calculateFee(amount);

  const usdEquivalent = calculateUSD(nwtAmount);
  const transactionFee = calculateFee(nwtAmount);
  const totalToPay = calculateTotal(nwtAmount);

  const handleSubmit = () => {
    // console.log(totalToPay);
    toast.info("Redirecting to Helio for payment...");
  };

  return (
    <div>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="primary">
              <WalletCardsIcon size={16} /> Buy NWT
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#171719] text-white border-none">
            <DialogHeader>
              <DialogTitle className="text-2xl">Buy NWT</DialogTitle>
              <DialogDescription className="text-nerd-muted">
                Choose the amount of NWT tokens you want to purchase and
                continue to payment
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  value={nwtAmount === 0 ? "" : nwtAmount}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="bg-[#1D1E21] border-[#292A2E] text-white placeholder:text-nerd-muted"
                />
              </div>
              <div className="flex space-x-2 flex-wrap">
                {suggestedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className={`flex items-center gap-1.5 ${
                      nwtAmount === amount
                        ? "bg-white text-black"
                        : "bg-transparent"
                    }`}
                    onClick={() => setNwtAmount(amount)}
                  >
                    {amount}{" "}
                    <Image src={NWT} width={14} height={14} alt="nwt" />
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2 mt-4 text-sm text-nerd-muted border-t pt-3 border-[#292A2E]">
              <div className="flex justify-between">
                <span>Token Amount</span>
                <span>{nwtAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>USD Equivalent</span>
                <span>${usdEquivalent.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>1% Transaction Fee</span>
                <span>${transactionFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-3 border-[#292A2E] text-white">
                <span>Total to pay</span>
                <span>${totalToPay.toFixed(2)}</span>
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

export default PurchaseTokenModal;
