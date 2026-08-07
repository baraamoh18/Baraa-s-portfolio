import type { IconType } from "react-icons";
import type { ReactNode } from "react";

/** Supported locale codes for the site. */
export type LocaleCode = "en" | "ar";

/** Text direction derived from the active locale. */
export type Direction = "ltr" | "rtl";

export interface LanguageOption {
  code: LocaleCode;
  label: string;
  nativeLabel: string;
  dir: Direction;
}

/** A single technology entry rendered inside a Skills bento card. */
export interface TechIcon {
  name: string;
  icon: IconType;
  color?: string;
}

/** A category card shown in the Skills bento grid. */
export interface SkillCategory {
  id: string;
  icon: IconType;
  items: TechIcon[];
  className?: string;
}

export interface ProjectLink {
  live?: string;
  repo?: string;
}

/** Structured, non-translated metadata for a project. Copy lives in i18n. */
export interface ProjectMeta {
  id: string;
  year: string;
  role: string;
  tech: string[];
  image: string;
  links?: ProjectLink;
}

/** Fully resolved project used by the Sticky Scroll Reveal component. */
export interface ProjectContent extends ProjectMeta {
  title: string;
  description: string;
  challenge: string;
  solution: string;
}

export interface StickyScrollItem {
  title: string;
  description: string;
  content?: ReactNode;
}

export type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}
