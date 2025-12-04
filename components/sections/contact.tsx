import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import { ContactModal } from "../contact-modal";

export function Contact() {
  const socialLinks = [
    { name: "Twitter", href: "https://x.com/faristp07" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/faris-tp" },
    { name: "GitHub", href: "https://github.com/faristp7" }
  ];
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />

      <div className="container px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-sm font-mono text-accent tracking-widest uppercase mb-4">05. What's Next?</h2>
          <h3 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Let's work together.
          </h3>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <ContactModal>
              <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-xl shadow-primary/20 hover:shadow-accent/20">
                <Mail className="mr-2 h-5 w-5" />
                Say Hello
              </Button>
            </ContactModal>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
              <MessageSquare className="mr-2 h-5 w-5" />
              Schedule a Call
            </Button>
          </div>
        </motion.div>

        <footer className="mt-32 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Faris Dev. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0 font-mono">
            {socialLinks.map((item) => (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{item.name}</a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}
