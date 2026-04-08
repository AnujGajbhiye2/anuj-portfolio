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
    indexRef.current = 0;
    const resetId = window.setTimeout(() => {
      setDisplayText("");
      setIsTyping(false);
      setIsDone(false);

      timeoutRef.current = window.setTimeout(() => {
        setIsTyping(true);

        timerRef.current = window.setInterval(() => {
          const i = indexRef.current;

          if (i >= text.length) {
            if (timerRef.current !== null) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }

            setIsTyping(false);
            setIsDone(true);

            if (loop) {
              indexRef.current = 0;
              setDisplayText("");
              setIsDone(false);

              timeoutRef.current = window.setTimeout(() => {
                setIsTyping(true);
              }, delay);
            }

            return;
          }

          setDisplayText((prev) => prev + text[i]);
          indexRef.current = i + 1;
        }, speed);
      }, delay);
    }, 0);

    return () => {
      window.clearTimeout(resetId);

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, speed, delay, loop]);

  return {
    displayedText: displayText,
    isTyping,
    isDone,
  };
}
