import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlowingAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * The hero headshot: a floating card with a soft, breathing glow behind it.
 */
export const GlowingAvatar = ({ src, alt, className }: GlowingAvatarProps) => {
  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.div
        aria-hidden
        className="absolute h-[80%] w-[80%] rounded-full bg-white/[0.14] blur-[80px]"
        animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute h-2/3 w-2/3 rounded-full border border-white/10"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-full"
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60"
        >
          <img
            src={src}
            alt={alt}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={480}
            height={600}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
        </motion.div>
      </motion.div>
    </div>
  );
};
