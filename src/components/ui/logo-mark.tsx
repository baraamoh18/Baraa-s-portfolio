import * as React from "react";
import { cn } from "@/lib/utils";
import { LOGOMARK_PATHS, LOGOMARK_TRANSFORM } from "./logo-paths";

export interface LogoMarkProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

/**
 * The standalone "A" brand icon — extracted from the full wordmark.
 * Cropped tight around the glyph so it renders crisply at small navbar sizes.
 * Uses `currentColor` so it adapts automatically to dark/light themes.
 */
export const LogoMark = React.forwardRef<SVGSVGElement, LogoMarkProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        /* Tight crop around the A glyph in the transformed 600×335 viewport.
           After transform translate(0,335) scale(0.1,-0.1):
           Raw x: ~2490–3490 → SVG x: ~249–349
           Raw y: ~1400–2200 → SVG y: ~115–195
           Adding small padding on each side. */
        viewBox="240 100 120 110"
        preserveAspectRatio="xMidYMid meet"
        className={cn("text-current", className)}
        role="img"
        aria-label="Baraa logo"
        {...props}
      >
        <g transform={LOGOMARK_TRANSFORM} fill="currentColor" stroke="none">
          {LOGOMARK_PATHS.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>
    );
  },
);
LogoMark.displayName = "LogoMark";
