import { cn } from "@/lib/utils";

export interface AmbientBackgroundProps {
  className?: string;
  showGrid?: boolean;
}

/**
 * Shared decorative backdrop: a faint grid plus soft, blurred glow orbs.
 * Purely presentational — always aria-hidden.
 */
export const AmbientBackground = ({ className, showGrid = true }: AmbientBackgroundProps) => {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      {showGrid && <div className="absolute inset-0 bg-grid mask-fade-bottom opacity-40" />}
      <div className="absolute left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-white/[0.06] blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] translate-x-1/3 translate-y-1/3 rounded-full bg-white/[0.05] blur-[100px]" />
    </div>
  );
};
