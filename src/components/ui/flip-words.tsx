import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

/**
 * Cycles through a list of words with a smooth blur/slide transition.
 * Gradient is applied via inline style on the outer motion.span so that
 * background-clip:text is never broken by framer's color interpolation.
 */
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  if (!words || words.length === 0) return null;

  const currentWord = words[index] ?? "";

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord + index}
        initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(12px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn("inline-block whitespace-nowrap", className)}
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #a6a6ac 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {currentWord}
      </motion.span>
    </AnimatePresence>
  );
};
