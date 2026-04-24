import { create } from "zustand";
import { devtools } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  loadTheme: () => void;
}

const THEME_KEY = "kambista_dark_mode";

export const useThemeStore = create<ThemeStore>()(
  devtools((set, get) => ({
    isDarkMode: false,
    toggleDarkMode: async () => {
      const next = !get().isDarkMode;
      set({ isDarkMode: next });
      await AsyncStorage.setItem(THEME_KEY, JSON.stringify(next));
    },
    loadTheme: async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_KEY);
        if (stored !== null) {
          set({ isDarkMode: JSON.parse(stored) });
        }
      } catch (_) {}
    },
  }))
);
