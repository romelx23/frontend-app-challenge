import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Bank } from "../../../api/kambista/banks";

interface BankStore {
  banks: Bank[];
  setBanks: (banks: Bank[]) => void;
}

export const useBanks = create<BankStore>()(
  devtools((set, get) => ({
    currentStep: 0,
    setBanks: (banks) => set({ banks: banks }),
  }))
);
