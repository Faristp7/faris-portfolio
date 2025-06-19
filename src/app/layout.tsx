import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";
import { Pointer } from "@/components/magicui/pointer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("http://faris.website"),
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "MongoDB",
    "Express.js",
    "React.js",
    "Node.js",
    "Web Development",
    "JavaScript",
    "Frontend Development",
    "Backend Development",
    "RESTful APIs",
    "Redux",
    "Mongoose",
    "GraphQL",
    "Agile Development",
    "Responsive Design",
    "UI/UX",
    "Software Engineer",
    "HTML",
    "CSS",
    "JavaScript Frameworks",
    "ES6",
    "Node.js Developer",
    "React.js Developer",
    "MongoDB Developer",
    "Express.js Developer",
    "MERN Stack Projects",
    "MERN Developer Portfolio",
  ],
  title: {
    default: "faris tp",
    template: "%s | faris tp",
  },
  openGraph: {
    description:
      "Portfolio of a Full Stack Developer specializing in the MERN stack. Experienced in building web applications using MongoDB, Express.js, React.js, and Node.js. Skilled in frontend and backend development, creating responsive and dynamic web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <TransitionProvider>
          {children}
          <SpeedInsights />
          <Pointer />
        </TransitionProvider>
      </body>
    </html>
  );
}
