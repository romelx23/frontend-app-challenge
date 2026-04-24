import banks from "../../data/banks.json";

export type Bank = {
  name: string;
  alias: string;
  id: string;
};

// Fake fetch con delay simulado
export const fetchBanks = (): Promise<Bank[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(banks);
    }, 500); // simula tiempo de red
  });
};
