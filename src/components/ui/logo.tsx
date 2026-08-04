import * as React from "react";
import { cn } from "@/lib/utils";
import { LOGO_PATHS, LOGO_TRANSFORM, LOGO_VIEWBOX } from "./logo-paths";

export interface LogoProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
}

/**
 * The "BARAA" wordmark, traced from the brand SVG and recolored via
 * `currentColor` so it can adapt to the monochrome dark theme.
 */
export const Logo = React.forwardRef<SVGSVGElement, LogoProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox={LOGO_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        className={cn("text-current", className)}
        role="img"
        aria-label="Baraa"
        {...props}
      >
        <g transform={LOGO_TRANSFORM} fill="currentColor" stroke="none">
          {LOGO_PATHS.map((d, index) => (
            <path key={index} d={d} />
          ))}
        </g>
      </svg>
    );
  },
);
Logo.displayName = "Logo";
