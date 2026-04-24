import { useThemeStore } from "../store/theme";

export const lightColors = {
  background: "#f6f6f9",
  card: "#ffffff",
  backgroundSecondary: "#f0f0f5",
  textPrimary: "#1a1a2e",
  textSecondary: "#6b7280",
  textTertiary: "#9ca3af",
  border: "#e5e7eb",
  danger: "#ef4444",
  dangerBg: "#fee2e2",
  dangerText: "#ef4444",
  successBg: "#E1F5EE",
  successText: "#0F6E56",
  infoBg: "#E6F1FB",
  infoText: "#185FA5",
  warningBg: "#FAEEDA",
  warningText: "#854F0B",
  headerBg: "#1DC99A",
  primary: "#1DC99A",
  tabBar: "#ffffff",
  tabBarBorder: "#e5e7eb",
};

export const darkColors: typeof lightColors = {
  background: "#0f0f1a",
  card: "#1a1a2e",
  backgroundSecondary: "#252535",
  textPrimary: "#f9fafb",
  textSecondary: "#d1d5db",
  textTertiary: "#9ca3af",
  border: "#2d2d45",
  danger: "#f87171",
  dangerBg: "#3b1515",
  dangerText: "#f87171",
  successBg: "#0d2e20",
  successText: "#34d399",
  infoBg: "#0d1e30",
  infoText: "#60a5fa",
  warningBg: "#2e200a",
  warningText: "#fbbf24",
  headerBg: "#0e9972",
  primary: "#1DC99A",
  tabBar: "#1a1a2e",
  tabBarBorder: "#2d2d45",
};

export function useTheme() {
  const { isDarkMode, toggleDarkMode, loadTheme } = useThemeStore();
  const colors = isDarkMode ? darkColors : lightColors;
  return { colors, isDarkMode, toggleDarkMode, loadTheme };
}
