import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";
import Link from "next/link";

const RESUME_VIEW_URL =
  "https://drive.google.com/file/d/1Na7SJwn_DamONSNjHhAWe6G4iHG2dBge/view?usp=sharing";
const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1Na7SJwn_DamONSNjHhAWe6G4iHG2dBge";

const highlights = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Shipped", value: "5+" },
  { label: "Technologies", value: "15+" },
];

export function Resume() {
  return (
    <section
      id="resume"
      className="py-24 md:py-32 bg-secondary/20 border-y border-border/50 relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <div className="mb-12">
            <p className="text-sm font-mono text-accent tracking-widest uppercase mb-4">
              05. Resume
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Download My CV
            </h2>
          </div>

          {/* Resume card */}
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
            {/* Accent top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                {/* Info side */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                        Curriculum Vitae
                      </p>
                      <h3 className="font-display font-bold text-lg">
                        Faris — Full Stack Developer
                      </h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed max-w-md mb-8">
                    3+ years of full-stack experience building production-grade
                    web applications for clients across Dubai. Specialized in
                    React, Next.js, Node.js, and TypeScript.
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-8">
                    {highlights.map((h, i) => (
                      <div key={i}>
                        <div className="text-2xl font-display font-bold">
                          {h.value}
                        </div>
                        <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                          {h.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons side */}
                <div className="flex flex-col gap-3 md:min-w-[180px]">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full gap-2 shadow-lg hover:shadow-accent/20 transition-shadow"
                  >
                    <Link
                      href={RESUME_DOWNLOAD_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full gap-2"
                  >
                    <Link
                      href={RESUME_VIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="w-4 h-4" />
                      View Online
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="absolute top-5 right-6 font-mono text-xs text-muted-foreground/20 select-none pointer-events-none">
              .pdf
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
