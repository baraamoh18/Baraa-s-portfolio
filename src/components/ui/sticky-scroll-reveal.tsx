import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StickyScrollItem } from "@/types";

export interface StickyScrollRevealProps {
  content: StickyScrollItem[];
  contentClassName?: string;
  renderVisual: (index: number) => ReactNode;
}

const GLOW_POSITIONS = [
  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.10), transparent 60%)",
  "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.10), transparent 60%)",
  "radial-gradient(circle at 30% 80%, rgba(255,255,255,0.10), transparent 60%)",
  "radial-gradient(circle at 80% 80%, rgba(255,255,255,0.10), transparent 60%)",
];

/**
 * Aceternity-style "Sticky Scroll Reveal" — an internally-scrollable panel
 * where the active copy block is tracked as the user scrolls, while a
 * sticky visual panel on the opposite side swaps to match.
 */
export const StickyScrollReveal = ({
  content,
  contentClassName,
  renderVisual,
}: StickyScrollRevealProps) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, index) => index / cardLength);
    const closest = breakpoints.reduce((closestIndex, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      const closestDistance = Math.abs(latest - breakpoints[closestIndex]);
      return distance < closestDistance ? index : closestIndex;
    }, 0);
    setActiveCard(closest);
  });

  return (
    <motion.div
      ref={ref}
      className="relative flex h-[34rem] gap-10 overflow-y-auto rounded-2xl border border-white/10 bg-surface/60 p-6 sm:p-10 no-scrollbar"
      animate={{
        backgroundImage: GLOW_POSITIONS[activeCard % GLOW_POSITIONS.length],
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex items-start">
        <div className="max-w-xl">
          {content.map((item, index) => (
            <div key={item.title} className="py-10 first:pt-2">
              <motion.h3
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-2xl font-display font-bold text-foreground sm:text-3xl"
              >
                {item.title}
              </motion.h3>
              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {item.description}
              </motion.p>
              {item.content && (
                <motion.div
                  animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                  className="mt-6"
                >
                  {item.content}
                </motion.div>
              )}
            </div>
          ))}
          <div className="h-16" />
        </div>
      </div>

      <div
        className={cn(
          "sticky top-0 hidden h-72 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 lg:block",
          contentClassName,
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full w-full"
          >
            {renderVisual(activeCard)}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
