import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import TransitionProvider from "@/components/TransitionProvider";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faris tp",
  description: "Faris tp portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
