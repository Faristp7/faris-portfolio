import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`mx-auto max-w-7xl px-6 md:px-12`}>
        <div className={`rounded-2xl border border-transparent transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-lg pl-6 pr-4 py-2" : "bg-transparent pl-0 pr-0 py-0"
        } flex items-center justify-between`}>
          
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold font-display rounded-lg group-hover:rotate-12 transition-transform">
              F
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Faris Dev</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </button>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <ModeToggle />
            <Button className="rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-colors" onClick={() => scrollToSection('#contact')}>
              Let's Talk
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <ModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 p-4 md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
        >
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-lg font-medium py-2 text-left border-b border-border/50 last:border-0"
              >
                {item.name}
              </button>
            ))}
            <Button className="w-full mt-4" onClick={() => scrollToSection('#contact')}>
              Let's Talk
            </Button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
