import "./globals.css";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Faris | Full Stack Developer",
  description: "Portfolio of Faris, a passionate Full Stack Developer crafting beautiful and functional digital experiences.",
  keywords: ["Faris", "Full Stack Developer", "UI/UX Designer", "Web Developer", "React", "Next.js", "Portfolio"],
  openGraph: {
    title: "Faris | Full Stack Developer",
    description: "Portfolio of Faris, a passionate Full Stack Developer and UI/UX Designer crafting beautiful and functional digital experiences.",
    url: "https://faris-portfolio.vercel.app", // Assuming a placeholder or if user provided one, but I'll use a generic one or ask. For now, I'll put a placeholder and can ask user to update.
    siteName: "Faris Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faris | Full Stack Developer",
    description: "Portfolio of Faris, a passionate Full Stack Developer crafting beautiful and functional digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${mono.variable} ${syne.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
