"use client";

import { jobData, skills } from "@/Data/Data";
import Brain from "@/components/Brain";
import { motion, useInView, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: containerRef });

  const skillRef = useRef<HTMLDivElement>(null);

  const isSkillRefInView = useInView(skillRef, { margin: "-100px" });

  const experienceRef = useRef<HTMLDivElement>(null);
  const isExperienceRefInView = useInView(experienceRef, { margin: "-100px" });

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full overflow-scroll lg:flex" ref={containerRef}>
        <div className="p-4 sm:p-8 md:p-12 lg:p-20 xl:p-40 flex flex-col gap-24 md:gap-32 lg:gap-48 lg:w-2/3 lg:pr-0 xl:w-1/2 xl:gap-64">
          <div className="flex flex-col gap-12 justify-center">
            <h1 className="font-bold text-2xl">About Me</h1>
            <p className="text-lg">
              Dedicated to mastering MERN stack development, based in India,
              with a profound enthusiasm for coding and problem-solving. This
              journey involves not only learning but actively applying acquired
              skills to build web applications. The goal is to become a
              well-rounded and updated developer in the MERN stack, driven by a
              passion for the constant pursuit of excellence in the
              ever-evolving field of web development.
            </p>
            <span className="italic">
              MERN Stack Developer | Code Artisan Building Web Wonders
            </span>
            <div className="self-end ">
              <Image
                src={"./signature.svg"}
                alt="Faris"
                width={200}
                height={0}
              />
            </div>
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
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
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* skills */}
          <div className="flex flex-col gap-12 justify-center" ref={skillRef}>
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              SKILLS
            </motion.h1>
            <motion.div
              initial={{ x: "-300px" }}
              animate={isSkillRefInView ? { x: 0 } : {}}
              className="flex gap-4 flex-wrap"
            >
              {skills.map((skill) => (
                <div
                  className="rounded p-2 text-sm cursor-pointer bg-black text-white hover:bg-white hover:text-black transition duration-300"
                  key={skill}
                >
                  {skill}
                </div>
              ))}
            </motion.div>
            <motion.svg
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: "10px" }}
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
              <path
                d="M15 11L12 14L9 11"
                stroke="#000000"
                strokeWidth="1"
              ></path>
            </motion.svg>
          </div>
          {/* EXPERIENCE */}
          <div
            className="flex flex-col gap-12 justify-center pb-48"
            ref={experienceRef}
            // ref={experienceRef}
          >
            {/* EXPERIENCE TITLE */}
            <motion.h1
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl"
            >
              EXPERIENCE
            </motion.h1>
            {/* EXPERIENCE LIST */}

            <motion.div
              initial={{ x: "-300px" }}
              animate={isExperienceRefInView ? { x: "0" } : {}}
              className=""
            >
              {jobData.map((job, index) => (
                <div
                  key={index}
                  className={`flex justify-between h-48 ${
                    index % 2 === 0 ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-1/3">
                    {/* JOB TITLE */}
                    <div className="bg-white p-3  font-semibold rounded-b-lg rounded-s-lg">
                      {job.jobTitle}
                    </div>
                    {/* JOB DESC */}
                    <div className="p-3 text-sm italic">
                      {job.jobDescription}
                    </div>
                    {/* JOB DATE */}
                    <div className="p-3 text-red-400 text-sm font-semibold">
                      {job.jobDate}
                    </div>
                    {/* JOB COMPANY */}
                    <div className="p-1 rounded bg-white text-sm font-semibold w-fit">
                      {job.jobCompany}
                    </div>
                  </div>
                  {/* CENTER */}
                  <div className="w-1/6 flex justify-center">
                    {/* LINE */}
                    <div className="w-1 h-full bg-gray-600 rounded relative">
                      {/* LINE CIRCLE */}
                      <div className="absolute w-5 h-5 rounded-full ring-4 ring-red-400 bg-white -left-2"></div>
                    </div>
                  </div>
                  {/* RIGHT */}
                  <div className="w-1/3"></div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="hidden lg:block w-1/3 xl:w-1/2 sticky top-0 z-30">
          <Brain scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </motion.div>
  );
}
