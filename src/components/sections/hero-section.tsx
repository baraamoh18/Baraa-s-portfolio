import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { FlipWords } from "@/components/ui/flip-words";
import { GlowingAvatar } from "@/components/ui/glowing-avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { cn } from "@/lib/utils";

interface StatProps {
  value: string;
  label: string;
}

const Stat = ({ value, label }: StatProps) => (
  <div className="flex flex-col items-center gap-1 lg:items-start">
    <span className="font-display text-2xl font-bold text-foreground sm:text-3xl">{value}</span>
    <span className="text-center text-xs text-muted-foreground lg:text-start">{label}</span>
  </div>
);

export const HeroSection = () => {
  const { t } = useTranslation();
  const words = t("hero.words", { returnObjects: true }) as unknown as string[];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pb-20 pt-36 sm:pt-40"
    >
      <AmbientBackground />

      <div className="container relative grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-[1.25] tracking-tight text-foreground sm:text-5xl md:text-6xl overflow-visible"
          >
            {t("hero.titlePrefix")}{" "}
            <br className="hidden sm:block" />
            <FlipWords words={words} className="font-display block py-2 sm:py-4" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg text-base text-muted-foreground sm:text-lg"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button size="lg" onClick={() => scrollTo("#projects")}>
              {t("hero.ctaPrimary")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Button>
            <motion.a
              href="/Albaraa_resume.pdf"
              download="Baraa_CV.pdf"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }), "gap-2")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Download className="h-4 w-4" />
              {t("hero.resume")}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 grid grid-cols-3 gap-8 border-t border-white/10 pt-6"
          >
            <Stat value="React & TS" label="Core Architecture" />
            <Stat value="Tailwind" label="Pixel-Perfect UI" />
            <Stat value="Framer" label="Fluid Motion Design" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlowingAvatar
            src="/images/headshot.webp"
            alt={t("hero.greeting")}
            href="https://www.linkedin.com/in/albaraa-mohamed-830498284/"
            className="h-[26rem] sm:h-[32rem]"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:flex"
      >
        {t("hero.scrollHint")}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
};
