import { createContext, useEffect } from "react";
import type { FontName, PaletteName, ThemeContextValue } from "../types";
import { fonts, generateCSSVariables, palettes } from "../../../styles/theme";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [palette, setPalette] = useLocalStorage<PaletteName>("theme-palette","cyan");
  const [font, setFont] = useLocalStorage<FontName>("theme-font","jetbrains");

  useEffect(() => {

    const root = document.documentElement;
    const css = generateCSSVariables(palettes[palette], fonts[font]);

        // Parse and apply each CSS variable
    css.split(';').forEach((rule) => {
      const [property, value] = rule.split(':').map((s) => s.trim());
      if (property && value) {
        root.style.setProperty(property, value);
      }
    });

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
