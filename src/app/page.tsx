"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
            src="/Farishero.png"
            alt="faris profile"
            fill
            className="object-contain"
          />
        </div>
        <div className="h-1/2 lg:h-full flex flex-col gap-8 items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Hi, I&apos;m Faris, a MERN Stack Developer
          </h1>
          <p className="md:text-xl">
            Dedicated to mastering MERN stack development, based in India, with
            a profound enthusiasm for coding and problem-solving
          </p>
          <div className="w-full flex gap-4">
            <Link href="/portfolio">
              <button className="p-2.5 rounded-lg ring-1 ring-black bg-black text-white">
                View My work
              </button>
            </Link>
            <Link href="/contact">
              <button className="p-2.5 rounded-lg ring-1 ring-black">
                Contact Me
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
