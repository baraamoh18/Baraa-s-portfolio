import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { Direction, LanguageOption, LocaleCode } from "@/types";

export const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "EN", dir: "ltr" },
  { code: "ar", label: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", nativeLabel: "\u0639\u0631", dir: "rtl" },
];

export function getDirection(locale: string): Direction {
  return locale === "ar" ? "rtl" : "ltr";
}

/**
 * Keeps <html dir="" lang=""> in sync with the active i18next language,
 * so Tailwind logical-property utilities and native flex/text behaviour
 * flip automatically for RTL locales.
 */
export function useDirection(): { language: LocaleCode; dir: Direction } {
  const { i18n } = useTranslation();
  const language = (i18n.language?.split("-")[0] as LocaleCode) || "en";
  const dir = getDirection(language);

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return { language, dir };
}
