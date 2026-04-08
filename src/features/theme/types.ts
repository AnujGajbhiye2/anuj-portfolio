export type PaletteName = 'cyan' | 'matrix' | 'amber' | 'violet';
export type FontName = 'jetbrains' | 'firacode' | 'ibmplex' | 'spacemono'

export interface ThemeState {
    palette: PaletteName;
    font: FontName;
}

export interface ThemeContextValue extends ThemeState {
    setPalette: (palette: PaletteName) => void;
    setFont: (font: FontName) => void;
    setTheme: (palette: PaletteName, font: FontName) => void;
}