"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <TooltipProvider>
                <Toaster />
                {children}
            </TooltipProvider>
        </ThemeProvider>
    );
}
