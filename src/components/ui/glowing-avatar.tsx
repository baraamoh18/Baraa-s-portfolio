import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlowingAvatarProps {
  src: string;
  alt: string;
  className?: string;
  href?: string;
}

/**
 * The hero headshot: a floating card with a soft, breathing glow behind it.
 * Supports an optional `href` to make the card a clickable link with a
 * LinkedIn-style hover overlay.
 */
export const GlowingAvatar = ({ src, alt, className, href }: GlowingAvatarProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* Ambient breathing glow */}
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
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          {/* Clickable card wrapper */}
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View LinkedIn profile"
            className="group block h-full w-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <motion.div
              animate={hovered ? { scale: 1.03, y: -6 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60"
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

              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Hover overlay with LinkedIn CTA */}
              <motion.div
                animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex flex-col items-center justify-end gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pb-8"
              >
                <motion.div
                  animate={hovered ? { y: 0, opacity: 1 } : { y: 12, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
                >
                  {/* LinkedIn icon */}
                  <svg
                    className="h-4 w-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm font-medium text-white">View Profile</span>
                </motion.div>
              </motion.div>

              {/* Subtle border ring */}
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

              {/* Hover border highlight */}
              <motion.div
                animate={hovered ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/30"
              />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};
