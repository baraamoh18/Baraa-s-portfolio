import {
  createContext,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarContextValue {
  visible: boolean;
}

const NavbarContext = createContext<NavbarContextValue>({ visible: false });
const useNavbarContext = () => useContext(NavbarContext);

export interface NavbarProps {
  children: ReactNode;
  className?: string;
}

/**
 * Aceternity-style "Resizable Navbar" — a fixed header that tracks page
 * scroll and shrinks into a floating, blurred pill once the user scrolls
 * past the hero.
 */
export const Navbar = ({ children, className }: NavbarProps) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 60);
  });

  return (
    <NavbarContext.Provider value={{ visible }}>
      <div className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}>
        {children}
      </div>
    </NavbarContext.Provider>
  );
};

export interface NavBodyProps {
  children: ReactNode;
  className?: string;
}

export const NavBody = ({ children, className }: NavBodyProps) => {
  const { visible } = useNavbarContext();
  return (
    <div className="mx-auto hidden w-full max-w-6xl px-4 pt-4 lg:block">
      <motion.div
        animate={{
          width: visible ? "84%" : "100%",
          backgroundColor: visible ? "rgba(12,12,14,0.78)" : "rgba(12,12,14,0)",
          borderColor: visible ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0)",
          boxShadow: visible
            ? "0 10px 40px rgba(0,0,0,0.45)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28 }}
        className={cn(
          "relative z-50 mx-auto flex flex-row items-center justify-between rounded-full border border-transparent px-6 py-3 backdrop-blur-xl",
          className,
        )}
      >
        {children}
      </motion.div>
    </div>
  );
};

export interface NavbarNavItem {
  key: string;
  label: string;
  href: string;
}

export interface NavItemsProps {
  items: NavbarNavItem[];
  className?: string;
  onItemClick?: (href: string) => void;
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 items-center justify-center gap-1 text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      {items.map((item, index) => (
        <a
          key={item.key}
          href={item.href}
          onMouseEnter={() => setHovered(index)}
          onClick={(event) => {
            event.preventDefault();
            onItemClick?.(item.href);
          }}
          className="relative rounded-full px-4 py-2 transition-colors hover:text-foreground"
        >
          {hovered === index && (
            <motion.span
              layoutId="nav-hover-pill"
              className="absolute inset-0 rounded-full bg-white/[0.08]"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => (
  <div
    className={cn(
      "flex items-center justify-between rounded-2xl border border-white/10 bg-[#0c0c0e]/80 px-4 py-3 backdrop-blur-xl lg:hidden",
      className,
    )}
  >
    {children}
  </div>
);

export interface MobileNavToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
}

export const MobileNavToggle = ({ isOpen, className, ...props }: MobileNavToggleProps) => (
  <button
    type="button"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
    className={cn(
      "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground transition-colors hover:bg-white/[0.06]",
      className,
    )}
    {...props}
  >
    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
  </button>
);

export interface MobileNavMenuProps {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}

export const MobileNavMenu = ({ children, isOpen, className }: MobileNavMenuProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.98 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={cn(
          "mx-1 mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-[#0c0c0e]/95 p-3 backdrop-blur-xl lg:hidden",
          className,
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
