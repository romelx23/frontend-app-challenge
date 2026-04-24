import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StepStore {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

export const useStep = create<StepStore>()(
  devtools((set, get) => ({
    currentStep: 0,
    setCurrentStep: (step) => set({ currentStep: step }),
  }))
);
