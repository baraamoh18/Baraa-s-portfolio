import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProjectVisualProps {
  id: string;
  title: string;
  className?: string;
}

const GRADIENTS: Record<string, string> = {
  aurora: "from-sky-100/10 via-white/5 to-transparent",
  nimbus: "from-violet-100/10 via-white/5 to-transparent",
  lumen: "from-amber-100/10 via-white/5 to-transparent",
  orbit: "from-emerald-100/10 via-white/5 to-transparent",
};

/**
 * Abstract, self-contained "device mockup" used in place of a project
 * screenshot — a browser-chrome frame with a generative gradient field
 * and decorative UI bars, tinted per-project.
 */
export const ProjectVisual = ({ id, title, className }: ProjectVisualProps) => {
  const gradient = GRADIENTS[id] ?? GRADIENTS.aurora;

  return (
    <div className={cn("relative flex h-full w-full flex-col bg-[#0a0a0b]", className)}>
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ms-3 h-1.5 w-28 rounded-full bg-white/[0.06]" />
      </div>

      <div className={cn("relative flex-1 overflow-hidden bg-gradient-to-br", gradient)}>
        <div className="absolute inset-0 bg-grid opacity-20" />

        <motion.span
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center px-6 text-center font-display text-2xl font-bold uppercase tracking-tight text-white/20 sm:text-3xl"
        >
          {title}
        </motion.span>

        <div className="absolute inset-x-6 bottom-6 flex flex-col gap-2">
          <div className="h-2 w-2/3 rounded-full bg-white/10" />
          <div className="h-2 w-1/2 rounded-full bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
};
