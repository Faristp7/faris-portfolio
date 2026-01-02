import { motion } from "framer-motion";

const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Products in Production", value: "5+" },
  { label: "Users Impacted Globally", value: "10k+" },
];

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content: Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">01. About Me</h2>
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
              More than just code. <br />
              <span className="text-muted-foreground">I design solutions.</span>
            </h3>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I’ve built real-world applications in automotive and chemical domains, collaborating with brands like <span className="text-foreground font-medium">Dollar</span>, <span className="text-foreground font-medium">Thrifty</span>, and <span className="text-foreground font-medium">PVS Chemicals</span>, including work on a <span className="text-foreground font-medium">Dubai car rental platform</span>.
              </p>

              <p>
                My main focus these days is building accessible, inclusive, and high-performance digital products—bridging design and engineering while taking full ownership across the product lifecycle.
              </p>
              <p>
                When I'm off the clock, you’ll probably catch me riding my ADV motorcycle and taking spontaneous trips to new places—it keeps me grounded and inspired.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12 border-t border-border pt-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Content: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border border-white/10 bg-linear-to-br from-white/5 to-white/0 backdrop-blur-sm shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src={"/chatGptHeroImg.png"}
                alt="Developer Avatar"
                className="w-full h-auto object-cover bg-linear-to-b from-accent/10 to-background"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent text-white">
                <p className="font-mono text-xs opacity-70 mb-1">CURRENTLY WORKING AT</p>
                <p className="font-display font-bold text-lg">Accore Labs</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
