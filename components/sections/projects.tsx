import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectArchiveModal } from "../project-archive-modal";


const projects = [
  {
    title: "Dollar UAE",
    category: "Web Application",
    description: "A seamless car rental app for Dubai, letting users book, manage, and track rentals with ease.",
    tech: ["React", "Redux", "Node.js", "MongoDB"],
    image: "/dollar_2.jpg",
    link: "https://dollaruae.com",
  },
  {
    title: "Thrifty",
    category: "Web Application",
    description: "A premium shopping experience mobile app with AR try-on features, seamless checkout, and personalized recommendations.",
    tech: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Shadcn UI", "TanStack Query"],
    image: "/thrifty.jpg",
    link: "https://www.thriftyuae.com",
  },
  {
    title: "PVS",
    category: "Web Application",
    description: "AI-powered data visualization tool for enterprise clients to process and interpret large datasets with predictive modeling.",
    tech: ["Next.js", "TypeScript", "Antd"],
    image: "/fintech_dashboard_project_mockup.png",
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">03. Selected Work</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold">
            Featured Projects
          </h3>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-3/5 relative group cursor-pointer">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl bg-card">
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/5 flex flex-col items-start">
                <span className="text-accent font-mono text-sm mb-4">{project.category}</span>
                <h4 className="text-3xl md:text-4xl font-display font-bold mb-6 group-hover:text-accent transition-colors">{project.title}</h4>

                <div className="p-6 bg-card border border-border rounded-xl shadow-sm mb-8 relative z-20 lg:-ml-12 lg:w-[110%]">
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-4 text-sm font-mono text-muted-foreground mb-8">
                  {project.tech.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {
                    //  project.github
                    false && (
                      <Button variant="outline" className="gap-2 group cursor-pointer">
                        <Github className="w-4 h-4" />
                        Code
                      </Button>
                    )
                  }

                  {
                    project.link && (
                      <Button className="gap-2 cursor-pointer" onClick={() => window.open(project.link, "_blank")}>
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </Button>
                    )
                  }
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <ProjectArchiveModal>
            <Button variant="outline" size="lg" className="rounded-full px-8 font-mono text-sm">
              View Full Project Archive
            </Button>
          </ProjectArchiveModal>
        </div>
      </div>
    </section>
  );
}
