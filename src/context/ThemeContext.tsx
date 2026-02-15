import { createContext, useContext, useMemo, useState } from "react";
import type { RegionKey, RegionTheme } from "../utils/regionTheme";
import { REGION_THEMES } from "../utils/regionTheme";

type ThemeCtx = {
  theme: RegionTheme;
  regionKey: RegionKey;
  setRegionKey: (k: RegionKey) => void;
  resetTheme: () => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [regionKey, setRegionKey] = useState<RegionKey>("default");

  const theme = useMemo(() => REGION_THEMES[regionKey], [regionKey]);

  const value: ThemeCtx = {
    theme,
    regionKey,
    setRegionKey,
    resetTheme: () => setRegionKey("default"),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
