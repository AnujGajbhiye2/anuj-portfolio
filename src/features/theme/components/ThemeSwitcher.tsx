// src/features/theme/components/ThemeSwitcher.tsx

import useTheme  from '../hooks/useTheme';
import { palettes, fonts } from '../../../styles/theme';
import type { PaletteName, FontName } from '../types';

export function ThemeSwitcher() {
  const { palette, font, setPalette, setFont } = useTheme();

  return (
    <div className="flex gap-4">
      {/* Palette selector */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Theme</label>
        <select
          value={palette}
          onChange={(e) => setPalette(e.target.value as PaletteName)}
          className="bg-surface border border-surface-hover rounded px-2 py-1 text-sm"
        >
          {Object.keys(palettes).map((key) => (
            <option key={key} value={key}>
              {palettes[key as PaletteName].name}
            </option>
          ))}
        </select>
      </div>

      {/* Font selector */}
      <div>
        <label className="block text-xs text-text-muted mb-1">Font</label>
        <select
          value={font}
          onChange={(e) => setFont(e.target.value as FontName)}
          className="bg-surface border border-surface-hover rounded px-2 py-1 text-sm"
        >
          {Object.keys(fonts).map((key) => (
            <option key={key} value={key}>
              {fonts[key as FontName].name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}