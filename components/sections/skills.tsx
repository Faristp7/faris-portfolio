import { motion } from "framer-motion";
import { Layout, Settings, Terminal } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "TanStack Query"]
  },
  {
    category: "Backend",
    icon: Terminal,
    items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Rest API", "Socket.io", "Redis"]
  },
  {
    category: "Tools & DevOps",
    icon: Settings,
    items: ["Git", "Docker", "AWS", "Vercel", "Figma", "Postman"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-red-300 bg-secondary/30 border-y border-border/50">
      <div className="container px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">02. My Arsenal</h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold">
            Technologies I work with
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                <skill.icon className="w-24 h-24 text-foreground" />
              </div>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <skill.icon className="w-6 h-6" />
                </div>

                <h4 className="text-xl font-display font-bold mb-6">{skill.category}</h4>

                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm rounded-md border border-border bg-background/50 text-muted-foreground group-hover:border-accent/30 group-hover:text-foreground transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
