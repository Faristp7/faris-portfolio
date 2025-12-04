import { motion } from "framer-motion";

const experiences = [
  {
    company: "Accore Labs",
    role: "Full Stack Developer",
    period: "2025 — Present",
    description: "Building a high-performance financial analytics platform for enterprise clients in Dubai."
  },
  {
    company: "Diffrenz Business Solutions",
    role: "Full Stack Developer",
    period: "2023 — 2025",
    description: "Engineered a scalable car rental booking platform serving users across Dubai."
  },
  {
    company: "Freelancer",
    role: "Full Stack Developer",
    period: "2021 — 2023",
    description: "Delivered full-stack solutions end-to-end, modernized legacy systems, and shipped refined UI/UX experiences."
  }
];


export function Experience() {
  return (
    <section id="experience" className="py-24 bg-secondary/20">
      <div className="container px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">04. Experience</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold">
            Where I've Worked
          </h3>
        </motion.div>

        <div className="relative border-l border-border ml-4 md:ml-0 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent ring-4 ring-background" />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h4 className="text-xl font-display font-bold">{exp.role}</h4>
                <span className="font-mono text-sm text-accent bg-accent/10 px-3 py-1 rounded-full w-fit mt-2 sm:mt-0">
                  {exp.period}
                </span>
              </div>

              <h5 className="text-lg text-muted-foreground mb-4 font-medium">{exp.company}</h5>

              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
