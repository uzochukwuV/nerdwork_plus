"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import React from "react";

const Onboarding = () => {
  const [selectedRole, setSelectedRole] = useState<"creator" | "reader" | null>(
    null
  );
  const router = useRouter();

  const handleContinue = () => {
    if (selectedRole) {
      // Handle the role selection logic here, e.g., storing it in a cookie, context, or database
      console.log(`User selected role: ${selectedRole}`);
      router.push(`/onboarding/${selectedRole}`);
    } else {
      alert("Please choose a role to continue.");
    }
  };
  return (
    <main className="bg-[#171719] min-h-[75vh] w-full font-inter text-white flex flex-col items-center justify-center px-5">
      <section className="w-full max-w-[400px] text-center">
        <h4 className="text-2xl font-semibold">
          Choose your Role:
          <br /> Reader or Creator
        </h4>
        <p className="text-[#707073] text-sm mt-3">
          Don't worry you can change your answer later
        </p>

        <div className="space-y-4 text-left mt-10">
          <div
            className={`p-6 cursor-pointer transition-all duration-200 rounded-[12px] border-[0.5px] border-[#292A2E] ${
              selectedRole === "creator"
                ? "bg-white text-black"
                : "bg-[#1D1E21] hover:bg-neutral-800"
            }`}
            onClick={() => setSelectedRole("creator")}
          >
            <h2 className="text-lg font-semibold">Creator</h2>
            <p className="text-sm text-gray-400">
              I want to create and share my content
            </p>
          </div>

          <div
            className={`p-6 cursor-pointer transition-all duration-200 rounded-[12px] border-[0.5px] border-[#292A2E] ${
              selectedRole === "reader"
                ? "bg-white text-black"
                : "bg-[#1D1E21] hover:bg-neutral-800"
            }`}
            onClick={() => setSelectedRole("reader")}
          >
            <h2 className="text-lg font-semibold">Reader</h2>
            <p className="text-sm text-gray-400">
              I just want to read and enjoy content
            </p>
          </div>
        </div>

        <Button
          onClick={handleContinue}
          variant={"primary"}
          className="w-full mt-10"
        >
          Continue
        </Button>
      </section>
    </main>
  );
};

export default Onboarding;
