import { useEffect, useRef, useState } from "react";

export type UseTypingEffectOptions = {
  text: string;
  speed?: number; // ms per character
  delay?: number; // ms before starting
  loop?: boolean;
};

export type UseTypingEffectReturn = {
  displayedText: string;
  isTyping: boolean;
  isDone: boolean;
};

export function useTypingEffect(
  options: UseTypingEffectOptions,
): UseTypingEffectReturn {
  const { text, speed = 100, delay = 0, loop = false } = options;

  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const timerRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayText("");
    setIsTyping(false);
    setIsDone(false);
    indexRef.current = 0;

    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);

      timerRef.current = setInterval(() => {
        // Capture index NOW — before any async state update reads it
        const i = indexRef.current;

        if (i >= text.length) {
          clearInterval(timerRef.current!);
          setIsTyping(false);
          setIsDone(true);
          if (loop) {
            indexRef.current = 0;
            setDisplayText("");
            setIsTyping(true);
          }
          return;
        }

        setDisplayText((prev) => prev + text[i]);
        indexRef.current = i + 1;
      }, speed);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };

  }, [text, speed, delay, loop]);

  return {
    displayedText: displayText,
    isTyping,
    isDone,
  };
}
