import { m } from "framer-motion";
import { ArrowRight, Download, Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-end overflow-hidden pt-32 pb-20 md:pb-[120px]">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_25%,rgba(0,0,0,0.65)_100%)] z-10 pointer-events-none" />
        {/* Bottom fade to blend with about section */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent z-10 pointer-events-none" />
        {/* Readability gradient for bottom-left text */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-background/10 to-transparent z-10 pointer-events-none" />
        <div className="relative w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="object-cover w-full h-full opacity-60 dark:opacity-75"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Content */}
      <div className="w-full relative z-20 px-6 md:px-20 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] items-end gap-8 lg:gap-16">
          {/* Left Column: Title */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-[13vw] text-[#DEDBC8] md:text-[9vw] font-display font-bold leading-[0.85] tracking-tighter bg-clip-text select-none">
              Faris*
            </h1>
          </m.div>

          {/* Right Column: Description & CTAs */}
          <m.div
            className="flex flex-col gap-6 items-start lg:pb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Available for freelance work
            </div> */}

            <p className="text-lg md:text-lg text-muted-foreground leading-relaxed max-w-lg">
              I&apos;m Faris, a Full Stack Creative Developer crafting digital experiences with a focus on motion, aesthetic precision, and performant code.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full">
              <Button
                size="lg"
                className="h-12 px-6 text-base rounded-full bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all shadow-lg hover:shadow-accent/25 hover:-translate-y-1 cursor-pointer"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base rounded-full hover:-translate-y-1 transition-transform cursor-pointer"
              >
                <Link
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </Link>
              </Button>

              <div className="flex items-center gap-3">
                {[
                  { logo: Github, href: "https://github.com/faristp7", name: "GitHub" },
                  { logo: Linkedin, href: "https://www.linkedin.com/in/faris-tp", name: "LinkedIn" },
                  { logo: Instagram, href: "https://www.instagram.com/faris_tp_", name: "Instagram" }
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href={Icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={Icon.name}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-background/50 backdrop-blur-sm hover:border-accent hover:text-accent transition-all hover:-translate-y-1"
                  >
                    <Icon.logo className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
