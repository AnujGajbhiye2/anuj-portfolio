import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FontName, PaletteName } from "../types";
import { fonts, generateCSSVariables, palettes } from "../../../styles/theme";

type ThemeStore = {
    palette: string;
    font: string;
    setPalette: (palette: string) => void;
    setFont: (font: string) => void;
    // setTheme: (palette: string, font: string) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            palette: "cyan",
            font: "jetbrains",
            setPalette: (palette) => {
                set({ palette });
                applyTheme(palette as PaletteName, useThemeStore.getState().font as FontName);
            },
            setFont: (font) => {
                set({ font });
                applyTheme(useThemeStore.getState().palette as PaletteName, font as FontName);
            }
        }),
        {
            name: "theme-store",
        }
    )
)

// Apply theme to CSS variables
function applyTheme(palette: PaletteName, font: FontName) {
  const root = document.documentElement;
  const css = generateCSSVariables(palettes[palette], fonts[font]);
  
  css.split(';').forEach((rule) => {
    const [property, value] = rule.split(':').map((s) => s.trim());
    if (property && value) {
      root.style.setProperty(property, value);
    }
  });
}


// Initialize theme on load
if (typeof window !== 'undefined') {
  const state = useThemeStore.getState();
  applyTheme(state.palette as PaletteName, state.font as FontName);
}