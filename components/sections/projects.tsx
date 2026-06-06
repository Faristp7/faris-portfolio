import { m } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectArchiveModal } from "../project-archive-modal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  category?: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
  number?: string;
}

const projects: Project[] = [
  {
    number: "01",
    title: "Dollar UAE",
    category: "Web Application",
    description: "A seamless car rental app for Dubai, letting users book, manage, and track rentals with ease.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    image: "/dollar_2.jpg",
    link: "https://dollaruae.com",
  },
  {
    number: "02",
    title: "Thrifty",
    category: "Web Application",
    description: "A high-performance car rental booking platform in the UAE, featuring live fleet updates, pricing integrations, and seamless booking flows.",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Shadcn UI", "TanStack Query"],
    image: "/thrifty.jpg",
    link: "https://www.thriftyuae.com",
  },
  {
    number: "03",
    title: "PVS",
    category: "Web Application",
    description: "AI-powered data visualization tool for enterprise clients to process and interpret large datasets with predictive modeling.",
    tech: ["Next.js", "TypeScript", "Antd"],
    image: "/fintech_dashboard_project_mockup.png",
    link: "https://pvscrm.tycanapps.com",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1] as const
    }
  }
};

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 md:py-48 bg-[#000000] relative overflow-hidden">
      {/* Background grain texture for the whole section */}
      <div className="absolute inset-0 grain-overlay opacity-30 pointer-events-none z-0" />
      
      <div className="container px-6 md:px-12 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4">
            03. SELECTED WORK
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#DEDBC8]">
            Featured Projects
          </h2>
        </m.div>

        {/* 3-column horizontal grid layout */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <m.div
                key={index}
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -8,
                  borderColor: "rgba(222, 219, 200, 0.25)",
                  boxShadow: "0 0 30px 2px rgba(222, 219, 200, 0.03)"
                }}
                animate={{
                  opacity: isAnyHovered && !isHovered ? 0.45 : 1,
                  scale: isHovered ? 1.01 : 1
                }}
                transition={{
                  y: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4, ease: [0.25, 1, 0.5, 1] }
                }}
                className="relative overflow-hidden rounded-2xl border border-[#1A1A1A] h-[580px] bg-white/[0.01] backdrop-blur-xl p-6 flex flex-col justify-between group cursor-pointer"
              >
                {project.link ? (
                  <Link href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10" />
                ) : null}
                
                <div>
                  {/* Image Container at the top */}
                  <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-5 border border-white/5">
                    <m.div
                      variants={{
                        hover: { scale: 1.05 }
                      }}
                      animate={isHovered ? "hover" : "initial"}
                      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                      className="w-full h-full relative"
                    >
                      {project.image && (
                        <Image 
                          src={project.image} 
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      )}
                    </m.div>
                    <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none" />
                  </div>

                  {/* Header: Category & Number */}
                  <div className="flex justify-between items-center w-full mb-3 relative z-20">
                    <span className="text-xs font-mono text-accent/40 uppercase tracking-wider">
                      {project.category || "Web App"}
                    </span>
                    <span className="text-base font-mono text-accent/60 font-semibold">
                      {project.number}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-3 group-hover:text-accent transition-colors duration-300 relative z-20">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans line-clamp-3 relative z-20">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Section: Tech Tags & Arrow */}
                <div className="flex flex-col items-start w-full relative z-20 mt-4">
                  <div className="flex flex-wrap gap-2 w-full mb-2 pr-12">
                    {project.tech.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] text-[11px] font-mono text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reveal Arrow Icon in bottom-right */}
                <m.div
                  className="absolute bottom-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] z-20"
                  variants={{
                    initial: { opacity: 0, scale: 0.8, x: -10 },
                    hover: { opacity: 1, scale: 1, x: 0 }
                  }}
                  animate={isHovered ? "hover" : "initial"}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-accent" />
                </m.div>
              </m.div>
            );
          })}
        </m.div>

        {/* View Archive Button */}
        <div className="mt-24 text-center relative z-10">
          <ProjectArchiveModal>
            <button className="rounded-full px-8 py-3.5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-accent/40 text-[#DEDBC8] font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-accent/5 cursor-pointer">
              View Full Project Archive
            </button>
          </ProjectArchiveModal>
        </div>
      </div>
    </section>
  );
}
