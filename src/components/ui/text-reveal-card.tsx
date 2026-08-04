import {
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Aceternity-style "Text Reveal Card" — dragging the pointer across the
 * card wipes away the base copy to reveal a second layer underneath,
 * used here to transition from "the challenge" to "the solution".
 */
export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: TextRevealCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const updateFromClientX = (clientX: number) => {
    if (!cardRef.current) return;
    const { left: cardLeft, width } = cardRef.current.getBoundingClientRect();
    const relativeX = clientX - cardLeft;
    setWidthPercentage(Math.max(0, Math.min(100, (relativeX / width) * 100)));
  };

  const onMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    updateFromClientX(event.clientX);
  };
  const onTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (touch) updateFromClientX(touch.clientX);
  };
  const onEnter = () => setIsMouseOver(true);
  const onLeave = () => {
    setIsMouseOver(false);
    setWidthPercentage(0);
  };

  const rotateDeg = useMemo(() => (widthPercentage - 50) * 0.08, [widthPercentage]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
      onTouchMove={onTouchMove}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0f] p-6 sm:p-8",
        className,
      )}
    >
      {children}

      <div className="relative mt-4 flex min-h-[7rem] items-center overflow-hidden">
        <motion.div
          style={{ width: "100%" }}
          animate={
            isMouseOver
              ? {
                  opacity: widthPercentage > 0 ? 1 : 0,
                  clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
                }
              : { clipPath: `inset(0 ${100 - widthPercentage}% 0 0)` }
          }
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-20 will-change-transform"
        >
          <p className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-sm font-medium leading-relaxed text-transparent sm:text-base">
            {revealText}
          </p>
        </motion.div>

        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-50 h-full w-[2px] bg-gradient-to-b from-transparent via-white/70 to-transparent will-change-transform"
        />

        <div className="h-full w-full overflow-hidden">
          <p className="text-sm font-medium leading-relaxed text-neutral-500 sm:text-base">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
