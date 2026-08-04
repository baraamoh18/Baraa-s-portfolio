import type { ProjectMeta } from "@/types";

/**
 * Non-translated project metadata. Localized copy (title, description,
 * challenge, solution) lives in `src/i18n/locales/*.json` under
 * `projects.items.<id>`.
 */
export const PROJECTS: ProjectMeta[] = [
  {
    id: "aurora-finance",
    year: "2024",
    role: "Lead Frontend Engineer",
    tech: ["React", "TypeScript", "WebSocket", "D3.js", "Framer Motion"],
    image: "aurora",
    links: {
      live: "https://example.com",
      repo: "https://github.com",
    },
  },
  {
    id: "nimbus-console",
    year: "2023",
    role: "Frontend Engineer",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    image: "nimbus",
    links: {
      live: "https://example.com",
    },
  },
  {
    id: "lumen-commerce",
    year: "2023",
    role: "Frontend Engineer",
    tech: ["Next.js", "Tailwind CSS", "Stripe", "Framer Motion"],
    image: "lumen",
    links: {
      live: "https://example.com",
      repo: "https://github.com",
    },
  },
  {
    id: "orbit-analytics",
    year: "2022",
    role: "Frontend Engineer",
    tech: ["React", "TypeScript", "D3.js", "Redux"],
    image: "orbit",
  },
];
