"use client";

import { useState } from "react";
import { ReaderGenres } from "./ReaderGenres";
import { ReaderForm } from "./ReaderForm";
import { SetPinForm } from "./SetPinForm";

export default function ReaderOnboardingFlow() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{
    fullName: string;
    genres: string[];
    pin: string;
  }>({
    fullName: "",
    genres: [],
    pin: "",
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
    handleNextStep();
  };

  const handleSetPin = (pin: string) => {
    setFormData((prev) => ({ ...prev, pin }));
    console.log("Final Reader Data:", { ...formData, pin });
    alert("Account setup complete!");
    // Here you would typically redirect the user
    // router.push('/reader-dashboard');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReaderForm onNext={handleFinishProfile} />;
      case 2:
        return <ReaderGenres onSelectGenres={handleSelectGenres} />;
      case 3:
        return <SetPinForm onNext={handleSetPin} />;
      default:
        return null;
    }
  };

  return <div className="min-h-[75vh] font-inter">{renderStep()}</div>;
}
