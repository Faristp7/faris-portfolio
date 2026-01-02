"use client"

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { useScroll, useSpring, motion } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground font-sans">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-100"
        style={{ scaleX }}
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Faris",
            url: "https://faris-portfolio.vercel.app", // Placeholder, check if correct
            jobTitle: "Frontend Developer & UI/UX Designer",
            sameAs: [
              // Add social links if available in future, for now empty or generic
            ]
          }),
        }}
      />
    </div>
  );
}