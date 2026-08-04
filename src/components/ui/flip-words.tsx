import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

/**
 * Cycles through a list of words with a staggered letter-in / blur-out
 * transition, in the spirit of Aceternity UI's Flip Words component.
 */
export const FlipWords = ({
  words,
  duration = 2600,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = useCallback(() => {
    setIsAnimating(true);
  }, []);

  useEffect(() => {
    if (isAnimating || words.length < 2) return;
    const timeout = setTimeout(startAnimation, duration);
    return () => clearTimeout(timeout);
  }, [isAnimating, duration, startAnimation, words.length]);

  const currentWord = words[index % words.length] ?? "";

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }}
    >
      <motion.span
        key={currentWord}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        exit={{
          opacity: 0,
          y: -32,
          x: 8,
          filter: "blur(10px)",
          scale: 1.05,
          position: "absolute",
        }}
        className={cn("inline-block whitespace-nowrap text-gradient", className)}
      >
        {currentWord.split(" ").map((word, wordIndex) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.08,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: wordIndex * 0.08 + letterIndex * 0.025,
                  duration: 0.25,
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
