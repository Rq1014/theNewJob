import { useState } from "react";
import { ReviewSubmitStep1, Step1Data } from "./ReviewSubmitStep1";
import { ReviewSubmitStep2 } from "./ReviewSubmitStep2";
import { Institution } from "../data/institutions";

interface ReviewSubmitFlowProps {
  institution: Institution;
  onBack: () => void;
  onComplete: () => void;
}

export function ReviewSubmitFlow({ institution, onBack, onComplete }: ReviewSubmitFlowProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);

  const handleStep1Next = (data: Step1Data) => {
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep2Submit = () => {
    onComplete();
  };

  if (currentStep === 1) {
    return (
      <ReviewSubmitStep1
        institution={institution}
        onBack={onBack}
        onNext={handleStep1Next}
      />
    );
  }

  if (currentStep === 2 && step1Data) {
    return (
      <ReviewSubmitStep2
        institution={institution}
        step1Data={step1Data}
        onBack={handleStep2Back}
        onSubmit={handleStep2Submit}
      />
    );
  }

  return null;
}
