import { useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import {
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  type NavbarNavItem,
} from "@/components/ui/resizable-navbar";

const SECTION_IDS = ["home", "skills", "projects", "contact"] as const;

export const Navbar = () => {
  const { t } = useTranslation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems: NavbarNavItem[] = SECTION_IDS.map((id) => ({
    key: id,
    label: t(`nav.${id}`),
    href: `#${id}`,
  }));

  const scrollToSection = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection("#home");
  };

  return (
    <ResizableNavbar>
      <NavBody>
        <a href="#home" onClick={handleLogoClick} className="flex items-center gap-2">
          <Logo className="h-6 w-auto text-foreground" />
        </a>
        <NavItems items={navItems} onItemClick={scrollToSection} />
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button size="sm" onClick={() => scrollToSection("#contact")}>
            {t("nav.cta")}
          </Button>
        </div>
      </NavBody>

      <div className="px-4 pt-4">
        <MobileNavHeader>
          <a href="#home" onClick={handleLogoClick} className="flex items-center gap-2">
            <Logo className="h-5 w-auto text-foreground" />
          </a>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <MobileNavToggle
              isOpen={isMobileOpen}
              onClick={() => setIsMobileOpen((prev) => !prev)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileOpen}>
          {navItems.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => scrollToSection(item.href)}
              className="w-full rounded-xl px-4 py-3 text-start text-sm font-medium text-foreground transition-colors hover:bg-white/[0.06]"
            >
              {item.label}
            </button>
          ))}
          <Button className="mt-1 w-full" onClick={() => scrollToSection("#contact")}>
            {t("nav.cta")}
          </Button>
        </MobileNavMenu>
      </div>
    </ResizableNavbar>
  );
};
