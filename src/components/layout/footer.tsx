import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { SITE_CONFIG } from "@/data/site";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
    <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
  </svg>
);

const SOCIAL_LINKS = [
  { key: "email", href: `mailto:${SITE_CONFIG.email}`, icon: Mail },
  { key: "github", href: SITE_CONFIG.socials.github, icon: Github },
  { key: "linkedin", href: SITE_CONFIG.socials.linkedin, icon: Linkedin },
  { key: "whatsapp", href: SITE_CONFIG.socials.whatsapp, icon: WhatsAppIcon },
];

export const Footer = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-background">
      <div className="container flex flex-col items-center gap-8 py-12 sm:flex-row sm:justify-between">
        <img src="/images/footer-logo.png" alt="Baraa Logo" className="h-20 w-auto opacity-100 transition-transform hover:scale-105" />

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ key, href, icon: Icon }) => (
            <a
              key={key}
              href={href}
              target={key === "email" ? undefined : "_blank"}
              rel={key === "email" ? undefined : "noreferrer"}
              aria-label={key}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-white/30 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <motion.button
          type="button"
          onClick={scrollToTop}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("footer.backToTop")}
          <ArrowUp className="h-3.5 w-3.5" />
        </motion.button>
      </div>
      <div className="border-t border-white/5 py-6">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name} &mdash; {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};
