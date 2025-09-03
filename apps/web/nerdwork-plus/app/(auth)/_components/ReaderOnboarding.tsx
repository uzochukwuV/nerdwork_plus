"use client";

import { useState } from "react";
import { ReaderGenres } from "./ReaderGenres";
import { ReaderForm } from "./ReaderForm";
// import { SetPinForm } from "./SetPinForm";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ReaderOnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    fullName: string;
    genres: string[];
  }>({
    fullName: "",
    genres: [],
  });

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const handleFinishProfile = (data: { fullName: string }) => {
    setFormData((prev) => ({ ...prev, fullName: data.fullName }));
    handleNextStep();
  };

  const handleSelectGenres = (genres: string[]) => {
    setFormData((prev) => ({ ...prev, genres }));

    console.log("Final Reader Data:", { ...formData, genres });
    toast.success("Account setup complete!");

    setTimeout(() => {
      router.push("/r/comics");
    }, 3000);
  };

  // const handleSetPin = (pin: string) => {
  //   setFormData((prev) => ({ ...prev, pin }));
  //   console.log("Final Reader Data:", { ...formData, pin });
  //   toast.success("Account setup complete!");
  //   // Here you would typically redirect the user
  //   setTimeout(() => {
  //     router.push("/r/comics");
  //   }, 3000);
  // };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReaderForm onNext={handleFinishProfile} />;
      case 2:
        return <ReaderGenres onSelectGenres={handleSelectGenres} />;
      // case 3:
      //   return <SetPinForm onNext={handleSetPin} />;
      default:
        return null;
    }
  };

  return <div className="min-h-[75vh] font-inter">{renderStep()}</div>;
}
