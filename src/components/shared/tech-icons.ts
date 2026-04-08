import type { IconType } from 'react-icons';
import {
  IconCss,
  IconDesignSystems,
  IconExpress,
  IconJavascript,
  IconReact,
  IconState,
  IconTailwind,
  IconTanStackQuery,
  IconTypescript,
  IconVite,
} from './icons';

const TECH_ICONS: Record<string, IconType> = {
  css: IconCss,
  'design systems': IconDesignSystems,
  express: IconExpress,
  javascript: IconJavascript,
  react: IconReact,
  'tailwind css': IconTailwind,
  'tanstack query': IconTanStackQuery,
  typescript: IconTypescript,
  vite: IconVite,
  zustand: IconState,
};

export function getTechIcon(label: string): IconType | null {
  return TECH_ICONS[label.toLowerCase()] ?? null;
}
