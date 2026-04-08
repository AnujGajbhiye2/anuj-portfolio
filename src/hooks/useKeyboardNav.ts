import { useState, useEffect, useCallback } from 'react';

export interface UseKeyboardNavOptions {
  itemCount: number;
  initialIndex?: number;
  loop?: boolean;
  onSelect?: (index: number) => void;
  onEscape?: () => void;
  enabled?: boolean;
}

export interface UseKeyboardNavReturn {
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function useKeyboardNav(options: UseKeyboardNavOptions): UseKeyboardNavReturn {
  const {
    itemCount,
    initialIndex = 0,
    loop = true,
    onSelect,
    onEscape,
    enabled = true,
  } = options;

  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowUp':
        case 'k':
          event.preventDefault();
          setSelectedIndex((prev) => {
            if (prev <= 0) return loop ? itemCount - 1 : 0;
            return prev - 1;
          });
          break;

        case 'ArrowDown':
        case 'j':
          event.preventDefault();
          setSelectedIndex((prev) => {
            if (prev >= itemCount - 1) return loop ? 0 : itemCount - 1;
            return prev + 1;
          });
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          onSelect?.(selectedIndex);
          break;

        case 'Escape':
        case 'q':
          event.preventDefault();
          onEscape?.();
          break;

        case 'Home':
          event.preventDefault();
          setSelectedIndex(0);
          break;

        case 'End':
          event.preventDefault();
          setSelectedIndex(itemCount - 1);
          break;
      }
    },
    [enabled, itemCount, loop, onSelect, onEscape, selectedIndex]
  );

  useEffect(() => {
    if (!enabled) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);

  useEffect(() => {
    if (selectedIndex >= itemCount && itemCount > 0) {
      setSelectedIndex(itemCount - 1);
    }
  }, [itemCount, selectedIndex]);

  return { selectedIndex, setSelectedIndex };
}

export default useKeyboardNav;
