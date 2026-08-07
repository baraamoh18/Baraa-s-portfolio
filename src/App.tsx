import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Preloader } from "@/components/layout/preloader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";
import { useDirection } from "@/hooks/use-direction";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useDirection();

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="site"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
