/**
 * Theme System
 * =============
 * 
 * SINGLE SOURCE OF TRUTH for all design tokens.
 * 
 * How it works:
 * 1. Define palettes and fonts here
 * 2. generateCSSVariables() converts them to CSS custom properties
 * 3. ThemeContext/themeStore applies them to document.documentElement
 * 4. Tailwind classes reference these CSS variables
 * 5. Changing variables = instant theme switch
 */

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface BackgroundColors {
  primary: string;   // Main background (#030712)
  secondary: string; // Slightly elevated (#0a0a0a)
  tertiary: string;  // Cards, modals (#111827)
}

export interface SurfaceColors {
  DEFAULT: string;   // Borders, dividers
  hover: string;     // Hover state
  active: string;    // Active/pressed state
}

export interface TextColors {
  primary: string;   // Headings, important text
  secondary: string; // Body text
  muted: string;     // Less important
  dim: string;       // Very subtle (hints, timestamps)
}

export interface ColorPalette {
  name: string;
  primary: ColorScale;
  background: BackgroundColors;
  surface: SurfaceColors;
  text: TextColors;
}

export interface FontStack {
  name: string;
  mono: string;
  display: string;
  body: string;
  weights: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  import: string; // Google Fonts URL
}

export type PaletteName = 'cyan' | 'matrix' | 'amber' | 'violet';
export type FontName = 'jetbrains' | 'firacode' | 'ibmplex' | 'spacemono';

// =============================================================================
// COLOR PALETTES
// =============================================================================

export const palettes: Record<PaletteName, ColorPalette> = {
  // ─────────────────────────────────────────────────────────────────────────
  // CYAN - Default terminal theme
  // ─────────────────────────────────────────────────────────────────────────
  cyan: {
    name: 'Cyan Terminal',
    primary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    background: {
      primary: '#020c14',
      secondary: '#061018',
      tertiary: '#0a1929',
    },
    surface: {
      DEFAULT: '#0e2a3d',
      hover: '#163d55',
      active: '#1e506e',
    },
    text: {
      primary: '#cffafe',
      secondary: '#a5f3fc',
      muted: '#22d3ee',
      dim: '#0e7490',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // MATRIX - Green hacker aesthetic
  // ─────────────────────────────────────────────────────────────────────────
  matrix: {
    name: 'Matrix Green',
    primary: {
      50: '#e8ffe8',
      100: '#b6ffb6',
      200: '#7aff7a',
      300: '#50ff50',
      400: '#00ff41',
      500: '#00cc33',
      600: '#00a82a',
      700: '#008020',
      800: '#005c17',
      900: '#003d0f',
    },
    background: {
      primary: '#000000',
      secondary: '#020a02',
      tertiary: '#041a04',
    },
    surface: {
      DEFAULT: '#0a200a',
      hover: '#103510',
      active: '#1a4a1a',
    },
    text: {
      primary: '#00ff41',
      secondary: '#33ff66',
      muted: '#00cc33',
      dim: '#008020',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AMBER - Retro CRT monitor
  // ─────────────────────────────────────────────────────────────────────────
  amber: {
    name: 'Amber Retro',
    primary: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffb300',
      600: '#ff8f00',
      700: '#cc6d00',
      800: '#995200',
      900: '#663800',
    },
    background: {
      primary: '#0a0700',
      secondary: '#120e04',
      tertiary: '#1a1508',
    },
    surface: {
      DEFAULT: '#2a2010',
      hover: '#3d3018',
      active: '#504020',
    },
    text: {
      primary: '#ffca28',
      secondary: '#ffe082',
      muted: '#ffb300',
      dim: '#995200',
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // VIOLET - Synthwave aesthetic
  // ─────────────────────────────────────────────────────────────────────────
  violet: {
    name: 'Synthwave Violet',
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    background: {
      primary: '#09090b',
      secondary: '#18181b',
      tertiary: '#27272a',
    },
    surface: {
      DEFAULT: '#3f3f46',
      hover: '#52525b',
      active: '#71717a',
    },
    text: {
      primary: '#fafafa',
      secondary: '#e4e4e7',
      muted: '#a1a1aa',
      dim: '#71717a',
    },
  },
};

// =============================================================================
// FONT STACKS
// =============================================================================

export const fonts: Record<FontName, FontStack> = {
  jetbrains: {
    name: 'JetBrains Mono',
    mono: '"JetBrains Mono", "Fira Code", "SF Mono", Consolas, monospace',
    display: '"JetBrains Mono", monospace',
    body: '"JetBrains Mono", monospace',
    weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    import: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap',
  },

  firacode: {
    name: 'Fira Code',
    mono: '"Fira Code", "JetBrains Mono", monospace',
    display: '"Fira Code", monospace',
    body: '"Fira Code", monospace',
    weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    import: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap',
  },

  ibmplex: {
    name: 'IBM Plex Mono',
    mono: '"IBM Plex Mono", monospace',
    display: '"IBM Plex Mono", monospace',
    body: '"IBM Plex Mono", monospace',
    weights: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    import: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap',
  },

  spacemono: {
    name: 'Space Mono',
    mono: '"Space Mono", monospace',
    display: '"Space Mono", monospace',
    body: '"Space Mono", monospace',
    weights: { light: 400, regular: 400, medium: 400, semibold: 700, bold: 700 },
    import: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap',
  },
};

// =============================================================================
// DEFAULTS
// =============================================================================

export const DEFAULT_PALETTE: PaletteName = 'cyan';
export const DEFAULT_FONT: FontName = 'jetbrains';

// =============================================================================
// CSS VARIABLE GENERATOR
// =============================================================================

/**
 * Converts a palette + font into CSS custom properties.
 * 
 * @example
 * const css = generateCSSVariables(palettes.matrix, fonts.jetbrains);
 * // Returns string like:
 * // "--color-primary-400: #4ade80;
 * //  --color-bg-primary: #000000;
 * //  ..."
 * 
 * Then apply to DOM:
 * document.documentElement.style.cssText += css;
 */
export function generateCSSVariables(
  palette: ColorPalette,
  font: FontStack
): string {
  return `
    --color-primary-50: ${palette.primary[50]};
    --color-primary-100: ${palette.primary[100]};
    --color-primary-200: ${palette.primary[200]};
    --color-primary-300: ${palette.primary[300]};
    --color-primary-400: ${palette.primary[400]};
    --color-primary-500: ${palette.primary[500]};
    --color-primary-600: ${palette.primary[600]};
    --color-primary-700: ${palette.primary[700]};
    --color-primary-800: ${palette.primary[800]};
    --color-primary-900: ${palette.primary[900]};
    
    --color-bg-primary: ${palette.background.primary};
    --color-bg-secondary: ${palette.background.secondary};
    --color-bg-tertiary: ${palette.background.tertiary};
    
    --color-surface: ${palette.surface.DEFAULT};
    --color-surface-hover: ${palette.surface.hover};
    --color-surface-active: ${palette.surface.active};
    
    --color-text-primary: ${palette.text.primary};
    --color-text-secondary: ${palette.text.secondary};
    --color-text-muted: ${palette.text.muted};
    --color-text-dim: ${palette.text.dim};
    
    --font-mono: ${font.mono};
    --font-display: ${font.display};
    --font-body: ${font.body};
  `;
}

// =============================================================================
// HELPER: Apply Theme to DOM
// =============================================================================

/**
 * Applies a theme directly to the document.
 * Use this for immediate theme application.
 * 
 * @example
 * applyTheme('matrix', 'firacode');
 */
export function applyTheme(
  paletteName: PaletteName,
  fontName: FontName
): void {
  if (typeof document === 'undefined') return;

  const palette = palettes[paletteName];
  const font = fonts[fontName];
  const root = document.documentElement;

  // Apply primary colors
  Object.entries(palette.primary).forEach(([key, value]) => {
    root.style.setProperty(`--color-primary-${key}`, value);
  });

  // Apply background colors
  root.style.setProperty('--color-bg-primary', palette.background.primary);
  root.style.setProperty('--color-bg-secondary', palette.background.secondary);
  root.style.setProperty('--color-bg-tertiary', palette.background.tertiary);

  // Apply surface colors
  root.style.setProperty('--color-surface', palette.surface.DEFAULT);
  root.style.setProperty('--color-surface-hover', palette.surface.hover);
  root.style.setProperty('--color-surface-active', palette.surface.active);

  // Apply text colors
  root.style.setProperty('--color-text-primary', palette.text.primary);
  root.style.setProperty('--color-text-secondary', palette.text.secondary);
  root.style.setProperty('--color-text-muted', palette.text.muted);
  root.style.setProperty('--color-text-dim', palette.text.dim);

  // Apply fonts
  root.style.setProperty('--font-mono', font.mono);
  root.style.setProperty('--font-display', font.display);
  root.style.setProperty('--font-body', font.body);
}

// =============================================================================
// HELPER: Load Font
// =============================================================================

/**
 * Dynamically loads a Google Font.
 * 
 * @example
 * loadFont('firacode');
 */
export function loadFont(fontName: FontName): void {
  if (typeof document === 'undefined') return;

  const font = fonts[fontName];
  const existingLink = document.querySelector(`link[href="${font.import}"]`);

  if (existingLink) return; // Already loaded

  const link = document.createElement('link');
  link.href = font.import;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}