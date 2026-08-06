import { Code2, Database, Globe, Palette, Server, Wrench } from "lucide-react";
import {
  SiFigma,
  SiFramer,
  SiGit,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSass,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import type { SkillCategory } from "@/types";

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    icon: Code2,
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    ],
  },
  {
    id: "styling",
    icon: Palette,
    className: "sm:col-span-2 lg:col-span-2",
    items: [
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Framer Motion", icon: SiFramer, color: "#FFFFFF" },
      { name: "Sass", icon: SiSass, color: "#CC6699" },
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    ],
  },
  {
    id: "tooling",
    icon: Wrench,
    className: "sm:col-span-1 lg:col-span-1",
    items: [
      { name: "Vite", icon: SiVite, color: "#BD34FE" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Jest", icon: SiJest, color: "#C21325" },
      { name: "Storybook", icon: SiStorybook, color: "#FF4785" },
    ],
  },
  {
    id: "backend",
    icon: Database,
    className: "sm:col-span-1 lg:col-span-1",
    items: [
      { name: "Xano", icon: Server, color: "#6C47FF" },
      { name: "Redux", icon: SiRedux, color: "#764ABC" },
      { name: "React Query", icon: SiReactquery, color: "#FF4154" },
      { name: "REST APIs", icon: Globe, color: "#38BDF8" },
    ],
  },
];
