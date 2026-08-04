import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface TextHoverEffectProps {
  text: string;
  duration?: number;
  automatic?: boolean;
}

/**
 * Aceternity-style "Text Hover Effect" — renders large SVG text with a
 * static silver outline, then reveals an animated gradient fill through a
 * radial mask that follows the pointer (or sweeps automatically).
 */
export const TextHoverEffect = ({
  text,
  duration = 0,
  automatic = false,
}: TextHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const rawId = useId().replace(/[:]/g, "");

  useEffect(() => {
    if (!svgRef.current) return;
    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
    setMaskPosition({ cx: `${cxPercentage}%`, cy: `${cyPercentage}%` });
  }, [cursor]);

  useEffect(() => {
    if (!automatic || !svgRef.current) return;
    let frame = 0;
    let raf: number;
    const svgRect = svgRef.current.getBoundingClientRect();

    const animate = () => {
      frame += 1;
      const t = (frame % 360) * (Math.PI / 180);
      setMaskPosition({
        cx: `${50 + 40 * Math.cos(t)}%`,
        cy: `${50 + 40 * Math.sin(t)}%`,
      });
      raf = requestAnimationFrame(animate);
    };

    void svgRect;
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [automatic]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 900 220"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        <linearGradient
          id={`text-gradient-${rawId}`}
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
          id={`reveal-mask-${rawId}`}
          gradientUnits="userSpaceOnUse"
          r="25%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id={`text-mask-${rawId}`}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#reveal-mask-${rawId})`}
          />
        </mask>
      </defs>

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent font-display text-8xl font-bold stroke-white/25"
        style={{ opacity: hovered ? 0.65 : 0.35 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent font-display text-8xl font-bold"
        stroke={`url(#text-gradient-${rawId})`}
        mask={`url(#text-mask-${rawId})`}
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      >
        {text}
      </motion.text>
    </svg>
  );
};
