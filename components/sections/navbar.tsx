"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Resume", href: "#resume" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  // Smooth scroll handler
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(href.slice(1));
    }
  };

  // Intersection Observer to track active section while scrolling
  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "experience", "resume", "contact"];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: "-25% 0px -45% 0px",
          threshold: 0.1,
        }
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <m.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 left-0 right-0 z-[9999] flex justify-center items-center px-6 md:px-12 pointer-events-none"
    >
      {/* Navbar Container Pill (Only fits items) */}
      <div className="pointer-events-auto flex items-center justify-center h-11 md:h-12 px-2.5 md:px-3 rounded-full bg-black/75 dark:bg-black/60 backdrop-blur-[16px] border border-white/10 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] w-fit gap-1">
        {/* Navigation Links */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const itemSection = item.href.slice(1);
            const isActive = activeSection === itemSection;
            return (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="relative px-3 md:px-4 py-1.5 text-[13px] md:text-[14px] font-medium transition-colors duration-300 rounded-full cursor-pointer hover:text-white text-white/75"
              >
                {isActive && (
                  <m.span
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-white/10 border border-white/10 shadow-[0_0_12px_rgba(255,255,255,0.12)] z-0"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Right Side: Desktop Actions */}
      {/* <div className="hidden md:flex absolute right-6 md:right-12 items-center gap-4 pointer-events-auto">
        <Button 
          className="rounded-full bg-white text-black hover:bg-white/90 text-sm font-semibold transition-all px-5 h-9 cursor-pointer hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]" 
          onClick={() => scrollToSection('#contact')}
        >
          Let&apos;s Talk
        </Button>
      </div> */}
    </m.header>
  );
}
