import "./globals.css";
import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";

const ogDescription =
  "Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js — building fast, accessible digital products.";

export const metadata: Metadata = {
  metadataBase: new URL("https://faris.co.in"),
  title: "Faris | Full Stack Developer",
  description:
    "Portfolio of Faris, a Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js — building fast, accessible, and beautifully crafted digital products.",
  keywords:
    "Faris,Full Stack Developer,Frontend Developer,React Developer,Next.js Developer,TypeScript Developer,Node.js Developer,Web Developer Dubai,Web Developer UAE,UI/UX Designer,JavaScript Developer,Software Engineer Dubai,Portfolio",
  authors: [{ name: "Faris", url: "https://faris.co.in" }],
  creator: "Faris",
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
  alternates: { canonical: "https://faris.co.in" },
  openGraph: {
    type: "website",
    title: "Faris | Full Stack Developer",
    description: ogDescription,
    url: "https://faris.co.in",
    siteName: "Faris Portfolio",
    locale: "en_US",
    images: [
      {
        url: "https://faris.co.in/assets/og.png",
        type: "image/png",
        width: 1200,
        height: 630,
        alt: "Faris | Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@faristp07",
    title: "Faris | Full Stack Developer",
    description:
      "Full Stack Developer based in Dubai, UAE. Specializing in React, Next.js, TypeScript, and Node.js.",
    images: ["https://faris.co.in/assets/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#e3e7ec",
  colorScheme: "light",
};

/* Kept verbatim from the static index.html and inlined in <head> (not next/script) so it runs
   before first paint. */
const prePaint = `
    /* State classes, set before first paint. Motion is an enhancement; the page is complete without it.
         js          scripting is available
         motion      the visitor has not asked for reduced motion
         is-loading  first visit of this session: the title card is up (not for a link into a chapter)
         is-entered  the page itself may play its opening
       The title card is only worth showing when the scripts are quick. If they have not run within
       1.8 seconds (a slow connection, or none at all) the page opens without it; until the scripts
       do arrive each chapter simply has its own background colour instead of being flooded by the
       travelling dot. */
    (function (root) {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var seen = location.hash.length > 1;
      try { seen = seen || sessionStorage.getItem('faris:seen') === '1'; } catch (e) {}
      root.classList.add('js');
      if (reduce) root.classList.add('is-entered');
      else root.classList.add('motion', seen ? 'is-entered' : 'is-loading');
      setTimeout(function () {
        if (window.__farisReady) return;
        root.classList.remove('is-loading');
        root.classList.add('is-entered');
      }, 1800);
    })(document.documentElement);
  `;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Faris",
  url: "https://faris.co.in",
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer based in Dubai, UAE, specializing in React, Next.js, TypeScript, and Node.js.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "AWS",
    "UI/UX Design",
    "Framer Motion",
    "TanStack Query",
  ],
  worksFor: { "@type": "Organization", name: "Accore Labs" },
  address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
  sameAs: [
    "https://github.com/faristp7",
    "https://www.linkedin.com/in/faris-tp",
    "https://x.com/faristp07",
    "https://www.instagram.com/faris_tp_",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Preloads go through ReactDOM's resource API: a <link rel="preload"> element in <head> is
  // emitted twice by React 19 (once hoisted as a resource, once as the element).
  preload("/fonts/jost.woff2", { as: "font", type: "font/woff2", crossOrigin: "" });
  preload("/assets/portrait/faris-1086.webp", {
    as: "image",
    type: "image/webp",
    imageSrcSet: "/assets/portrait/faris-720.webp 720w, /assets/portrait/faris-1086.webp 1086w",
    imageSizes: "(min-width: 560px) and (min-height: 340px) and (min-aspect-ratio: 5/4) 68vh, 116vw",
    fetchPriority: "high",
  });

  return (
    // The pre-paint script adds state classes to <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
