"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { AuroraText } from "@/components/magicui/aurora-text";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

export default function Home() {
  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48 md:gap-2">
        <div className="h-1/2 lg:h-full lg:w-1/2 relative">
          <Image
            src="/chatGptHeroImg.png"
            alt="faris profile"
            fill
            priority={true}
            className="object-contain"
          />
        </div>
        <div className="h-1/2 lg:h-full flex flex-col gap-8 items-center justify-center">
          <h1 className="text-center sm:text-left text-4xl md:text-6xl font-bold">
            Hi, I&apos;m <AuroraText>Faris</AuroraText>, a MERN Stack Developer
          </h1>
          <p className="text-center sm:text-left md:text-xl">
            Dedicated to mastering MERN stack development, based in India, with
            a profound enthusiasm for coding and problem-solving
          </p>
          <div className="w-full flex gap-4">
            <Link href="/portfolio">
              <InteractiveHoverButton className="pr-10 bg-black text-white">
                View My work
              </InteractiveHoverButton>
            </Link>
            <Link href="/contact">
              <InteractiveHoverButton className="">
                Contact Me
              </InteractiveHoverButton>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
