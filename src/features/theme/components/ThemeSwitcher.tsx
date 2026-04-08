import useTheme  from '../hooks/useTheme';
import { palettes, fonts } from '../../../styles/theme';
import type { PaletteName, FontName } from '../types';
import { cn } from '../../../lib/cn';
import { IconFont, IconPalette } from '../../../components/shared/icons';

type SelectorProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
};

function Selector({ label, value, onChange, options, className }: SelectorProps) {
  return (
    <label className={cn('flex items-center gap-2 text-[11px] text-text-dim', className)}>
      <span className="hidden xl:inline">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className={cn(
          'min-w-0 rounded-sm border border-surface bg-background-primary px-2 py-1',
          'text-xs text-text-secondary outline-none transition-colors duration-150',
          'hover:border-surface-hover focus:border-primary-400',
          'max-w-[7.5rem] sm:max-w-none'
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function ThemeSwitcher({ className }: { className?: string }) {
  const { palette, font, setPalette, setFont } = useTheme();
  const paletteOptions = Object.entries(palettes).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));
  const fontOptions = Object.entries(fonts).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));

  const cycleOption = (options: { value: string; label: string }[], currentValue: string) => {
    const currentIndex = options.findIndex((option) => option.value === currentValue);
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % options.length : 0;
    return options[nextIndex]?.value ?? currentValue;
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 rounded-sm border border-surface bg-background-primary/80 px-2 py-1',
        className
      )}
    >
      <div className="flex items-center gap-2 sm:hidden">
        <button
          type="button"
          aria-label={`Switch theme. Current theme: ${palettes[palette].name}`}
          title={`Theme: ${palettes[palette].name}`}
          onClick={() => setPalette(cycleOption(paletteOptions, palette) as PaletteName)}
          className={cn(
            'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-surface',
            'bg-background-primary text-text-muted transition-colors duration-150',
            'hover:border-surface-hover hover:text-text-primary'
          )}
        >
          <IconPalette className="h-4 w-4 text-primary-400" />
        </button>

        <button
          type="button"
          aria-label={`Switch font. Current font: ${fonts[font].name}`}
          title={`Font: ${fonts[font].name}`}
          onClick={() => setFont(cycleOption(fontOptions, font) as FontName)}
          className={cn(
            'inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border border-surface',
            'bg-background-primary text-text-muted transition-colors duration-150',
            'hover:border-surface-hover hover:text-text-primary'
          )}
        >
          <IconFont className="h-4 w-4 text-primary-400" />
        </button>
      </div>

      <div className="hidden sm:flex sm:items-center sm:gap-2">
        <span className="hidden lg:inline text-[11px] text-primary-400">$ prefs</span>
        <Selector
          label="theme"
          value={palette}
          onChange={(value) => setPalette(value as PaletteName)}
          options={paletteOptions}
        />
        <Selector
          label="font"
          value={font}
          onChange={(value) => setFont(value as FontName)}
          options={fontOptions}
        />
      </div>
    </div>
  );
}
