import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IAccount {
  name: string;
  alias: string;
  id: string;
  type: string;
  number: string;
  typeMoney: string;
}

export const fetchAccounts = async (): Promise<IAccount[]> => {
  const stored = (await AsyncStorage.getItem("accounts")) || "[]";

  return JSON.parse(stored);
};
