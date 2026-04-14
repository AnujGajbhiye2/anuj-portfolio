import { useEffect } from "react";
import type { ReactNode } from "react";
import type { FontName, PaletteName, ThemeContextValue } from "../types";
import { applyTheme, fonts } from "../../../styles/theme";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ThemeContext } from "./theme-context";

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [palette, setPalette] = useLocalStorage<PaletteName>("theme-palette","violet");
  const [font, setFont] = useLocalStorage<FontName>("theme-font","jetbrains");

  useEffect(() => {
    applyTheme(palette, font);
  },[palette, font]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = fonts[font].import;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [font])

  const value: ThemeContextValue = {
    palette,
    font,
    setPalette,
    setFont,
    setTheme: (newPalette: PaletteName, newFont: FontName) => {
      setPalette(newPalette);
      setFont(newFont);
    }
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
