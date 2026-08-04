import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[minmax(14rem,auto)] grid-cols-1 grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface BentoGridItemProps {
  children: ReactNode;
  className?: string;
}

export const BentoGridItem = ({ children, className }: BentoGridItemProps) => {
  return <div className={cn("h-full", className)}>{children}</div>;
};
