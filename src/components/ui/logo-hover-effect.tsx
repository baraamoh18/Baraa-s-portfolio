import { useEffect, useId, useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { cn } from "@/lib/utils";
import { LOGO_PATHS, LOGO_TRANSFORM, LOGO_VIEWBOX } from "./logo-paths";

export interface LogoHoverEffectProps {
  className?: string;
  /**
   * Sweeps the reveal mask on its own so the effect is visible even if the
   * pointer never touches it (useful for the preloader). Real pointer
   * movement always takes priority over the automatic sweep.
   */
  automatic?: boolean;
}

/**
 * Aceternity-style "Text Hover Effect" applied to the real BARAA wordmark
 * artwork (instead of generic font text), so the brand's custom, angled
 * final "A" renders correctly. A dim base layer keeps the mark legible at
 * rest, while a brighter gradient layer is revealed through a radial mask
 * that follows the pointer.
 */
export const LogoHoverEffect = ({ className, automatic = false }: LogoHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const rawId = useId().replace(/[:]/g, "");

  useEffect(() => {
    if (!svgRef.current || (automatic && !hovered)) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursor.x - rect.left) / rect.width) * 100;
    const cyPercentage = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
  }, [cursor, automatic, hovered]);

  useAnimationFrame((time) => {
    if (!automatic || hovered) return;
    const periodMs = 2600;
    const angle = ((time % periodMs) / periodMs) * Math.PI * 2;
    setMaskPosition({
      cx: `${50 + 42 * Math.cos(angle)}%`,
      cy: `${50 + 42 * Math.sin(angle * 1.15)}%`,
    });
  });

  return (
    <svg
      ref={svgRef}
      viewBox={LOGO_VIEWBOX}
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn("select-none", className)}
      role="img"
      aria-label="Baraa"
    >
      <defs>
        <linearGradient
          id={`logo-gradient-${rawId}`}
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#9a9aa4" />
        </linearGradient>

        <motion.radialGradient
          id={`logo-reveal-${rawId}`}
          gradientUnits="userSpaceOnUse"
          r="30%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`logo-mask-${rawId}`}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#logo-reveal-${rawId})`} />
        </mask>
      </defs>

      {/* Dim base layer -- keeps the mark legible even without pointer interaction */}
      <g transform={LOGO_TRANSFORM}>
        <motion.g
          fill="white"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.4 : 0.25 }}
          transition={{ duration: 0.4 }}
        >
          {LOGO_PATHS.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </motion.g>
      </g>

      {/* Gradient layer, revealed only where the cursor mask allows */}
      <g transform={LOGO_TRANSFORM}>
        <motion.g
          fill={`url(#logo-gradient-${rawId})`}
          stroke="none"
          mask={`url(#logo-mask-${rawId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {LOGO_PATHS.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </motion.g>
      </g>
    </svg>
  );
};
