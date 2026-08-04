import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { SKILL_CATEGORIES } from "@/data/skills";

export const SkillsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <AmbientBackground showGrid={false} />

      <div className="container relative flex flex-col gap-16">
        <SectionHeading
          eyebrow={t("skills.eyebrow")}
          title={t("skills.title")}
          description={t("skills.description")}
        />

        <BentoGrid>
          {SKILL_CATEGORIES.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <BentoGridItem key={category.id} className={category.className}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="h-full"
                >
                  <CardSpotlight className="flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <CategoryIcon className="h-5 w-5 text-foreground" />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {t(`skills.categories.${category.id}.title`)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {t(`skills.categories.${category.id}.description`)}
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {category.items.map((tech) => {
                        const TechIcon = tech.icon;
                        return (
                          <div
                            key={tech.name}
                            className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                          >
                            <TechIcon
                              className="h-4 w-4 shrink-0"
                              style={{ color: tech.color }}
                              aria-hidden
                            />
                            <span className="truncate text-xs font-medium text-muted-foreground">
                              {tech.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </CardSpotlight>
                </motion.div>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
};
