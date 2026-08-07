import { useRef, useState, useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [bottomSpacer, setBottomSpacer] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const containerTop = container.getBoundingClientRect().top;
    const targetY = containerTop + 20;

    let closestIndex = activeCard;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const distance = Math.abs(rect.top - targetY);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeCard) {
      setActiveCard(closestIndex);
    }
  };

  // Calculate exact spacer needed to allow the last item to reach the top
  // without scrolling too far past it.
  useEffect(() => {
    const lastItem = itemRefs.current[itemRefs.current.length - 1];
    if (lastItem) {
      // 544px is the height of h-[34rem]
      const containerHeight = 544;
      const lastItemHeight = lastItem.offsetHeight;
      // targetY offset is 20px
      const requiredPadding = Math.max(0, containerHeight - lastItemHeight - 20);
      setBottomSpacer(requiredPadding);
    }
  }, [content]);

  return (
    <motion.div
      onScroll={handleScroll}
      className="relative flex h-[34rem] justify-between gap-10 overflow-y-auto rounded-2xl border border-white/10 bg-surface/60 p-6 sm:p-10 no-scrollbar"
      animate={{
        backgroundImage: GLOW_POSITIONS[activeCard % GLOW_POSITIONS.length],
      }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative flex items-start">
        <div className="max-w-xl">
          {content.map((item, index) => (
            <div
              key={item.title}
              ref={(el) => (itemRefs.current[index] = el)}
              className="py-10 first:pt-2"
            >
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
          <div style={{ height: `${bottomSpacer}px` }} />
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
