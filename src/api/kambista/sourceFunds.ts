import sourceFounds from "../../data/sourceFunds.json";

export type SourceFunds = {
  name: string;
  _id: string;
};

// Fake fetch con delay simulado
export const fetchSourceFunds = (): Promise<SourceFunds[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sourceFounds);
    }, 500); // simula tiempo de red
  });
};
