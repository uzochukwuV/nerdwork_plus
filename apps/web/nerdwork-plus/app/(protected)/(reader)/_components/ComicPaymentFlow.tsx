"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chapter } from "@/lib/types";
import NWT from "@/assets/nwt.svg";
import Success from "@/assets/sucess.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SpinLoader from "@/components/loader";

type ModalStep = "form" | "loading" | "success";

const ComicPaymentFlow = ({ chapter }: { chapter: Chapter }) => {
  const [balance, setBalance] = React.useState(true);
  //   const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<ModalStep>("form");
  const [isOpen, setIsOpen] = React.useState(false);

  const walletBalance = 0.108;
  const chapterPrice = 0.001;

  useEffect(() => {
    if (walletBalance < chapterPrice) {
      setBalance(false);
    } else {
      setBalance(true);
    }
  }, [walletBalance]);

  const handleOpenChange = (open: boolean) => {
    if (!open && step !== "loading") {
      setIsOpen(false);
      setStep("form");
      //   setIsLoading(false);
    } else if (open) {
      setIsOpen(true);
    }
  };

  const handleSubmit = () => {
    // setIsLoading(true);
    setStep("loading");

    setTimeout(() => {
      setStep("success");
    }, 5000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger className="flex items-center justify-center cursor-pointer w-full gap-3">
          Unlock 0.001 <Image src={NWT} width={18} height={18} alt="nwt" />
        </DialogTrigger>
        <DialogContent className="bg-[#1E1E1E] min-w-[275px] text-white font-inter border-none space-y-3 text-sm">
          <DialogHeader className={`${step != "form" ? "hidden" : ""}`}>
            <DialogTitle className="font-semibold text-2xl">
              Unlock Chapter
            </DialogTitle>
            <DialogDescription className="sr-only">
              Please proceed to unlock the chapter
            </DialogDescription>
          </DialogHeader>
          {step == "form" && (
            <section className="space-y-6">
              <div className="flex items-center justify-between font-semibold p-4 border border-[#FFFFFF1A] rounded-[12px]">
                <p>
                  #{chapter.id} {chapter.title}
                </p>
                <p className="flex items-center gap-2">
                  {chapterPrice}{" "}
                  <Image src={NWT} width={14} height={14} alt="nwt" />
                </p>
              </div>
              <div className="space-y-3">
                <p>Your Wallet</p>
                <div className="flex items-center justify-between font-semibold p-4 border border-[#FFFFFF1A] rounded-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="h-9 w-9 rounded-full bg-blue-400"></span>
                    <p className="flex flex-col gap-1">
                      0xDEAF...fB8B{" "}
                      <span className="text-nerd-muted">SOLANA</span>
                    </p>
                  </div>
                  <p className="flex items-center gap-2">
                    {walletBalance}
                    <Image src={NWT} width={14} height={14} alt="nwt" />
                  </p>
                </div>
              </div>

              {!balance && (
                <p className="text-[#BF6A02]">
                  You do not have enough funds. Buy SOL or deposit from another
                  account
                </p>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full"
                variant={"primary"}
                disabled={!balance}
              >
                Continue
              </Button>
            </section>
          )}

          {step == "loading" && (
            <div className="flex flex-col items-center text-center py-10 gap-3 max-w-[275px] mx-auto">
              <SpinLoader />
              <p className="font-medium text-xl">Unlocking Comic</p>
              <p className="text-[#B3B3B3] text-sm">
                Please wait while we process your transaction. It will take no
                more than 30 seconds.
              </p>
            </div>
          )}

          {step == "success" && (
            <div className="flex flex-col items-center text-center py-10 gap-3 max-w-[275px] mx-auto">
              <Image src={Success} width={60} height={60} alt="success icon" />
              <p className="font-medium text-xl">Comic unlocked</p>
              <p className="text-[#F5F5F5] text-sm">
                Transaction was successful and comic added to library
              </p>
              <Button className="w-full" variant={"primary"}>
                Start Reading
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComicPaymentFlow;
