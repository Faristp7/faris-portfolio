import "./globals.css";
import { Inter, Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Providers } from "@/components/providers";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://faris.co.in"),
  title: {
    default: "Faris | Full Stack Developer",
    template: "%s | Faris",
  },
  description:
    "Portfolio of Faris, a Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js — building fast, accessible, and beautifully crafted digital products.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  keywords: [
    "Faris",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Web Developer Dubai",
    "Web Developer UAE",
    "UI/UX Designer",
    "JavaScript Developer",
    "Software Engineer Dubai",
    "Portfolio",
  ],
  authors: [{ name: "Faris", url: "https://faris.co.in" }],
  creator: "Faris",
  openGraph: {
    title: "Faris | Full Stack Developer",
    description:
      "Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js — building fast, accessible digital products.",
    url: "https://faris.co.in",
    siteName: "Faris Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Faris | Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Faris | Full Stack Developer",
    description:
      "Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js.",
    creator: "@faristp07",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "/",
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
        className={`${inter.variable} ${mono.variable} ${geist.variable} ${instrumentSerif.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
