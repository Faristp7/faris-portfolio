import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export function ContactModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Mock submission
    console.log(values);
    
    // Simulate loading for a nicer feel
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setOpen(false);
      form.reset();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-background/80 backdrop-blur-xl border-white/10 p-0 overflow-hidden gap-0 shadow-2xl duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
        <div className="p-6 border-b border-white/10 bg-white/5 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-accent/20 rounded-full blur-[50px] pointer-events-none"></div>
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent">
                <Mail className="w-4 h-4" />
              </span>
              Say Hello
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-2">
              Have a project in mind? Fill out the form below to send me a message directly.
            </DialogDescription>
          </DialogHeader>
        </div>
        
        <div className="p-6 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-secondary/30 border-transparent focus-visible:border-accent/50 focus-visible:ring-0 focus-visible:bg-secondary/50 transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} className="bg-secondary/30 border-transparent focus-visible:border-accent/50 focus-visible:ring-0 focus-visible:bg-secondary/50 transition-all" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell me about your project..." {...field} className="min-h-[150px] bg-secondary/30 border-transparent focus-visible:border-accent/50 focus-visible:ring-0 focus-visible:bg-secondary/50 resize-none transition-all" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end pt-2">
                <Button type="submit" className="rounded-full px-8 py-6 bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all shadow-lg hover:shadow-accent/25">
                  Send Message
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
