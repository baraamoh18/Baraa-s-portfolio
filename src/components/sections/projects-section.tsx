import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StickyScrollReveal } from "@/components/ui/sticky-scroll-reveal";
import { TextRevealCard } from "@/components/ui/text-reveal-card";
import { ProjectVisual } from "@/components/ui/project-visual";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { PROJECTS } from "@/data/projects";
import type { ProjectContent, StickyScrollItem } from "@/types";

interface ProjectMetaRowProps {
  project: ProjectContent;
}

const ProjectMetaRow = ({ project }: ProjectMetaRowProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <span className="rounded-full border border-white/10 px-3 py-1">{project.year}</span>
        <span className="rounded-full border border-white/10 px-3 py-1">{project.role}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.links && (project.links.live || project.links.repo) && (
        <div className="flex items-center gap-5">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
            >
              {t("projects.viewLive")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.links.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
            >
              {t("projects.viewCode")}
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export const ProjectsSection = () => {
  const { t } = useTranslation();

  const projects: ProjectContent[] = PROJECTS.map((meta) => ({
    ...meta,
    title: t(`projects.items.${meta.id}.title`),
    description: t(`projects.items.${meta.id}.description`),
    challenge: t(`projects.items.${meta.id}.challenge`),
    solution: t(`projects.items.${meta.id}.solution`),
  }));

  const stickyContent: StickyScrollItem[] = projects.map((project) => ({
    title: project.title,
    description: project.description,
    content: <ProjectMetaRow project={project} />,
  }));

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <AmbientBackground showGrid={false} />

      <div className="container relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={t("projects.eyebrow")}
          title={t("projects.title")}
          description={t("projects.description")}
        />

        <StickyScrollReveal
          content={stickyContent}
          renderVisual={(index) => {
            const project = projects[index];
            return <ProjectVisual id={project.image} title={project.title} />;
          }}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <TextRevealCard
              key={project.id}
              text={project.challenge}
              revealText={project.solution}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="font-display text-base font-semibold text-foreground">
                  {project.title}
                </h4>
                <span className="shrink-0 text-xs text-muted-foreground">{project.year}</span>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/70">
                <span>{t("projects.challengeLabel")}</span>
                <span className="h-px flex-1 bg-white/10" />
                <span>{t("projects.solutionLabel")}</span>
              </div>
            </TextRevealCard>
          ))}
        </div>
      </div>
    </section>
  );
};
