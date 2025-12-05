import { motion } from "framer-motion";
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10" />
        <img
          src={"/abstract_futuristic_dark_background_with_neon_accents.png"}
          alt="Abstract Background"
          className="w-full h-full object-cover opacity-40 dark:opacity-60"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Available for freelance work
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/50">
              Building the <br />
              <span className="text-stroke-thin md:text-stroke hover:text-accent transition-colors duration-500 cursor-default">Future</span> of Digital
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              I'm Faris, a Full Stack Creative Developer crafting digital experiences with a focus on motion, aesthetic precision, and performant code.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-lg rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all shadow-lg hover:shadow-accent/25 hover:-translate-y-1"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="flex items-center gap-4 sm:ml-4">
                {[
                  { logo: Github, href: "https://github.com/faristp7" },
                  { logo: Linkedin, href: "https://www.linkedin.com/in/faris-tp" },
                  { logo: Instagram, href: "https://www.instagram.com/faris_tp_" }].map((Icon, index) => (
                    <a
                      key={index}
                      href={Icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-accent hover:text-accent transition-all hover:-translate-y-1"
                    >
                      <Icon.logo className="h-5 w-5" />
                    </a>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 2, repeat: Infinity }}
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-foreground/20 to-foreground"></div>
        <span>Scroll</span>
      </motion.div>
    </section>
  );
}
