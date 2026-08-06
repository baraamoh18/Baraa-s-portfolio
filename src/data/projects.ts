import type { ProjectMeta } from "@/types";

/**
 * Non-translated project metadata. Localized copy (title, description,
 * challenge, solution) lives in `src/i18n/locales/*.json` under
 * `projects.items.<id>`.
 */
export const PROJECTS: ProjectMeta[] = [
  {
    id: "trosc",
    year: "2025",
    role: "Frontend Developer",
    tech: ["React", "TypeScript", "Tailwind CSS", "React Router"],
    image: "trosc",
    links: {
      repo: "https://github.com/TROSC-Dev/TROSC-SCU.github.io",
    },
  },
  {
    id: "tijara",
    year: "2026",
    role: "Frontend Developer",
    tech: ["React", "TypeScript", "Xano", "Redux", "React Query", "Recharts"],
    image: "tijara",
    links: {
      live: "https://tijara-psi.vercel.app/",
      repo: "https://github.com/baraamoh18/TIJARA",
    },
  },
  {
    id: "todo-app",
    year: "2024",
    role: "Frontend Developer",
    tech: ["React", "TypeScript", "Tailwind CSS", "LocalStorage"],
    image: "todo",
    links: {
      live: "https://to-do-app-jade-pi.vercel.app/",
      repo: "https://github.com/baraamoh18/ToDo-App",
    },
  },
];
