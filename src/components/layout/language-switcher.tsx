import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { LANGUAGES } from "@/hooks/use-direction";
import { LANGUAGE_STORAGE_KEY } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import type { LocaleCode } from "@/types";

export interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
  const { i18n } = useTranslation();
  const current = (i18n.language?.split("-")[0] as LocaleCode) || "en";

  const handleSelect = (code: LocaleCode) => {
    if (code === current) return;
    void i18n.changeLanguage(code);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
  };

  return (
    <div
      className={cn(
        "relative flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1",
        className,
      )}
    >
      {LANGUAGES.map((lang) => {
        const isActive = lang.code === current;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => handleSelect(lang.code)}
            aria-pressed={isActive}
            aria-label={lang.label}
            className={cn(
              "relative z-10 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
              isActive ? "text-background" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-active-pill"
                className="absolute inset-0 -z-10 rounded-full bg-white"
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
              />
            )}
            {lang.nativeLabel}
          </button>
        );
      })}
    </div>
  );
};
