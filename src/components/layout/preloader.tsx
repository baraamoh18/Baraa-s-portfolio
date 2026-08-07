import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

export interface PreloaderProps {
  onComplete: () => void;
}

const EASE_EXPO: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Lottie-powered preloader — plays a custom brand animation from a .json
 * file once, then fades out the wrapper to reveal the main site.
 *
 * The animation plays exactly once (no loop). When it finishes, the
 * wrapper fades out over 0.8s and fires `onComplete` to unmount.
 */
export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"playing" | "fadeout">("playing");

  // Grab the DotLottie instance so we can listen for the "complete" event
  const dotLottieRefCallback = useCallback((dotLottie: DotLottie | null) => {
    if (!dotLottie) return;

    const handleComplete = () => {
      setPhase("fadeout");
    };

    dotLottie.addEventListener("complete", handleComplete);

    return () => {
      dotLottie.removeEventListener("complete", handleComplete);
    };
  }, []);

  // Fire onComplete after the fade-out transition finishes
  useEffect(() => {
    if (phase !== "fadeout") return;
    const timeout = setTimeout(onComplete, 800);
    return () => clearTimeout(timeout);
  }, [phase, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={phase === "fadeout" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_EXPO }}
      style={{ pointerEvents: phase === "fadeout" ? "none" : "auto" }}
    >
      <div className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px]">
        <DotLottieReact
          src="/loading-animation.json"
          autoplay
          loop={false}
          speed={1}
          dotLottieRefCallback={dotLottieRefCallback}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </motion.div>
  );
};
