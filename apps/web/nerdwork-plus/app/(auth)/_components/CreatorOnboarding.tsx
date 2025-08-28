"use client";

import { useState } from "react";
import { PaymentDetailsForm } from "./PaymentSetup"; // Your second component
import { CreatorProfileForm } from "./CreatorProfileForm";

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <CreatorProfileForm onNext={handleNextStep} />;
      case 2:
        return <PaymentDetailsForm />;
      default:
        return null;
    }
  };

  return <div className="min-h-[78vh] font-inter">{renderStep()}</div>;
}
