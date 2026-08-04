import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardSpotlightProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  radius?: number;
}

/**
 * Aceternity-style "Card Spotlight" — a bordered card whose background
 * radial-gradient spotlight tracks the pointer position on hover.
 */
export const CardSpotlight = ({
  children,
  className,
  spotlightColor = "rgba(255, 255, 255, 0.12)",
  radius = 380,
}: CardSpotlightProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6",
        "transition-colors duration-300 hover:border-white/20",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background, opacity: isHovering ? 1 : 0 }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-grid opacity-[0.15]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
