import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LogoHoverEffect } from "@/components/ui/logo-hover-effect";

export interface PreloaderProps {
  onComplete: () => void;
}

const EASE_EXPO = [0.76, 0, 0.24, 1] as const;

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const durationMs = 2200;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(next);
      if (elapsed < durationMs) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 450);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE_EXPO }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 bg-background"
        exit={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
        exit={{ y: "100%" }}
        transition={{ duration: 0.7, ease: EASE_EXPO }}
      />

      <motion.div
        exit={{ opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.35, ease: EASE_EXPO }}
        className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-6 px-6"
      >
        <div className="aspect-[600/335] w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <LogoHoverEffect className="h-full w-full" automatic />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground"
        >
          {t("preloader.tagline")}
        </motion.p>

        <div className="mt-4 h-px w-48 overflow-hidden bg-white/10">
          <div className="h-full bg-white/70" style={{ width: `${progress}%` }} />
        </div>
        <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">
          {progress}%
        </span>
      </motion.div>
    </motion.div>
  );
};
