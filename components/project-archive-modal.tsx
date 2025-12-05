import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Search, Folder, ArrowUpRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Project {
    year: string;
    title: string;
    madeAt: "Diffrenz Solutions" | "Freelance" | "Accore Labs";
    builtWith: string[];
    link: string;
    github?: string;
}

const archiveProjects: Project[] = [
    {
        year: "2025",
        title: "PVS",
        madeAt: "Diffrenz Solutions",
        builtWith: ["Next.js", "TypeScript", "Antd"],
        link: "https://pvscrm.tycanapps.com",
    },
    {
        year: "2024",
        title: "Thrifty UAE",
        madeAt: "Diffrenz Solutions",
        builtWith: ["Next.js", "Shadcn UI", "TanStack Query"],
        link: "https://www.thriftyuae.com",
    },
    {
        year: "2024",
        title: "Thrifty PL",
        madeAt: "Diffrenz Solutions",
        builtWith: ["React", "TanStack Query", "Zustand"],
        link: "https://pl.thriftyuae.com",
    },
    {
        year: "2024",
        title: "Dollar PL",
        madeAt: "Diffrenz Solutions",
        builtWith: ["React", "TanStack Query", "Zustand"],
        link: "https://www.dollaruae.com/personal-leasing",
    },
    {
        year: "2023",
        title: "Dollar UAE",
        madeAt: "Diffrenz Solutions",
        builtWith: ["React", "Redux", "Node.js", "MongoDB"],
        link: "https://dollaruae.com",
    },
    {
        year: "2021",
        title: "Audio",
        madeAt: "Freelance",
        builtWith: ["React", "Redux", "Node.js", "MongoDB"],
        link: "https://github.com/Faristp7/Audio",
    },
];

export function ProjectArchiveModal({ children }: { children: React.ReactNode }) {
    const [search, setSearch] = useState("");

    const filteredProjects = useMemo(() => {
        return archiveProjects.filter((project) =>
            project.title.toLowerCase().includes(search.toLowerCase()) ||
            project.builtWith.some(tech => tech.toLowerCase().includes(search.toLowerCase())) ||
            project.madeAt.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-[80vh] bg-background/90 backdrop-blur-xl border-white/10 p-0 gap-0 shadow-2xl flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                <div className="p-6 border-b border-white/10 bg-white/5 relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-display font-bold flex items-center gap-2">
                                <Folder className="w-5 h-5 text-accent" />
                                Project Archive
                            </DialogTitle>
                        </DialogHeader>
                        <p className="text-sm text-muted-foreground">
                            A complete list of things I’ve worked on.
                        </p>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search projects..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-8 bg-background/50 border-white/10 focus-visible:ring-accent/50 transition-all"
                        />
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-6">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-white/10">
                                    <TableHead className="w-[100px] text-accent font-mono">Year</TableHead>
                                    <TableHead className="font-display text-foreground">Project</TableHead>
                                    <TableHead className="hidden md:table-cell font-mono text-xs">Made at</TableHead>
                                    <TableHead className="hidden sm:table-cell font-mono text-xs">Built with</TableHead>
                                    <TableHead className="text-right font-mono text-xs">Link</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProjects.map((project, index) => (
                                    <TableRow key={index} className="group hover:bg-white/5 border-white/10 transition-colors">
                                        <TableCell className="font-mono text-accent/80 text-sm">{project.year}</TableCell>
                                        <TableCell className="font-medium font-display text-lg group-hover:text-accent transition-colors">
                                            {project.title}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-muted-foreground">{project.madeAt}</TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            <div className="flex flex-wrap gap-2">
                                                {project.builtWith.map((tech, i) => (
                                                    <span key={i} className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-mono">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                {project.github && (
                                                    <a href={project.github} className="text-muted-foreground hover:text-accent transition-colors">
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <a href={project.link} className="text-muted-foreground hover:text-accent transition-colors">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {filteredProjects.length === 0 && (
                            <div className="py-12 text-center text-muted-foreground">
                                No projects found matching "{search}"
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
