"use client";

import { myWorks } from "@/Data/Data";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Portfolio() {
  const workRef = useRef<HTMLDivElement>(null);
  const workRefInView = useInView(workRef);

  const handleScroll = () => {
    if (workRef.current) workRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-blue-100 to-red-100"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div>
        <div className="w-screen h-[calc(100vh-15rem)] flex items-center justify-center text-6xl md:text-8xl text-center">
          My Works
        </div>
      </div>
      <div className="flex justify-center">
        <motion.svg
          onClick={handleScroll}
          initial={{ opacity: 0.2, y: 0 }}
          animate={{ opacity: 1, y: "10px" }}
          className="cursor-pointer"
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width={50}
          height={50}
        >
          <path
            d="M5 15C5 16.8565 5.73754 18.6371 7.05029 19.9498C8.36305 21.2626 10.1435 21.9999 12 21.9999C13.8565 21.9999 15.637 21.2626 16.9498 19.9498C18.2625 18.6371 19 16.8565 19 15V9C19 7.14348 18.2625 5.36305 16.9498 4.05029C15.637 2.73754 13.8565 2 12 2C10.1435 2 8.36305 2.73754 7.05029 4.05029C5.73754 5.36305 5 7.14348 5 9V15Z"
            stroke="#000000"
            strokeWidth="1"
          ></path>
          <path d="M12 6V14" stroke="#000000" strokeWidth="1"></path>
          <path d="M15 11L12 14L9 11" stroke="#000000" strokeWidth="1"></path>
        </motion.svg>
      </div>
      {/* work section */}
      <motion.div
        ref={workRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: workRefInView ? 1 : 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="grid py-20 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 px-8 md:px-20"
      >
        {myWorks.map((work) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: "3s" }}
            key={work.id}
            className="flex flex-col max-w-sm justify-center items-center bg-gradient-to-b from-transparent to-gray-50 p-6 rounded-2xl shadow-md"
          >
            <div className="relative group w-full overflow-hidden rounded-t-2xl">
              <Image
                src={work.img}
                alt={work.title}
                layout="responsive"
                width={500}
                height={300}
                className="group-hover:opacity-20 transition-opacity duration-300"
                loading="lazy"
              />
              <Link href={work.link} target="_blank">
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black rounded-full text-white py-7 p-4 cursor-pointer text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View
                </button>
              </Link>
            </div>
            <div className="text-center py-3 px-4">
              <h5 className="text-2xl font-semibold py-2">{work.title}</h5>
              <p className="text-base">{work.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="bg-white w-screen h-screen flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="text-6xl md:text-8xl">Do you have a project?</h1>
        <div className="relative">
          <Link href={"/contact"}>
            <motion.svg
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              viewBox="0 0 300 300"
              className="w-64 h-64 md:w-[500px] md:h-[500px] "
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 150, 150 m -60, 0 a 60,60 0 0,1 120,0 a 60,60 0 0,1 -120,0 "
                />
              </defs>
              <text fill="#000">
                <textPath xlinkHref="#circlePath" className="text-xl">
                  Full-stack Developer | MERN Stack
                </textPath>
              </text>
            </motion.svg>
          </Link>
          <Link
            href="/contact"
            className="w-16 h-16 md:w-28 md:h-28 absolute top-0 left-0 right-0 bottom-0 m-auto bg-black text-white rounded-full flex items-center justify-center"
          >
            <span>Hire Me</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
