"use client";

import { m, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";

interface WordItem {
  text: string;
  serif: boolean;
  index: number;
}

interface ScrollRevealWordProps {
  word: string;
  serif: boolean;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalWords: number;
  hasTrailingSpace: boolean;
}

function ScrollRevealWord({
  word,
  serif,
  index,
  scrollYProgress,
  totalWords,
  hasTrailingSpace,
}: ScrollRevealWordProps) {
  // We want the words to start revealing at 0.22 and finish at 0.52 of scroll progress
  const startRange = 0.42;
  const endRange = 0.72;
  const rangeLength = endRange - startRange;
  const step = rangeLength / totalWords;

  const wordStart = startRange + index * step;
  // Let the reveal for each word overlap slightly
  const wordEnd = Math.min(endRange, wordStart + step * 3.0);

  // Map scroll progress to opacity, y translation, and blur
  // Starting with a low opacity (0.12) creates a elegant placeholder skeleton style
  const opacity = useTransform(scrollYProgress, [wordStart, wordEnd], [0.12, 1]);
  const y = useTransform(scrollYProgress, [wordStart, wordEnd], [12, 0]);
  const blur = useTransform(scrollYProgress, [wordStart, wordEnd], [4, 0]);

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <m.span
      style={{ opacity, y, filter }}
      className={`inline-block whitespace-nowrap ${
        serif ? "font-serif italic text-accent font-normal" : "font-display"
      }`}
    >
      {word}{hasTrailingSpace ? "\u00A0" : ""}
    </m.span>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the section
  // Triggers reveal as the section moves into the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center 25%"],
  });

  const paragraph1Raw = [
    [
      { text: "I am Faris,", serif: false }
    ],
    [
      { text: "a", serif: false },
      { text: "self-taught full-stack developer.", serif: true }
    ]
  ];

  const paragraph2Raw = [
    [
      { text: "I build scalable web applications,", serif: false }
    ],
    [
      { text: "craft intuitive user experiences,", serif: false }
    ],
    [
      { text: "and turn complex ideas into products.", serif: false }
    ]
  ];

  // Pre-process paragraphs to compute global word indices
  const { p1, p2, totalWords } = useMemo(() => {
    let wordIndex = 0;

    const processParagraph = (rawP: typeof paragraph1Raw) => {
      return rawP.map((line) => {
        const lineWords: WordItem[] = [];
        line.forEach((segment) => {
          const words = segment.text.split(" ").filter(w => w !== "");
          words.forEach((word) => {
            lineWords.push({
              text: word,
              serif: segment.serif,
              index: wordIndex++,
            });
          });
        });
        return lineWords;
      });
    };

    return {
      p1: processParagraph(paragraph1Raw),
      p2: processParagraph(paragraph2Raw),
      totalWords: wordIndex,
    };
  }, []);

  // Scroll transforms for the supporting paragraph block
  const supportOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0.12, 1]);
  const supportY = useTransform(scrollYProgress, [0.65, 0.85], [15, 0]);
  const supportBlur = useTransform(scrollYProgress, [0.65, 0.85], [4, 0]);
  const supportFilter = useMotionTemplate`blur(${supportBlur}px)`;

  return (
    <section
      id="about"
      ref={containerRef}
      className="bg-[#000000] text-white py-48 md:py-64 min-h-[110vh] relative overflow-hidden flex flex-col justify-center items-center"
    >
      <div className="container px-6 md:px-12 max-w-[900px] w-full mx-auto relative z-10 flex flex-col items-center justify-center text-center">
        {/* Main Typographic Statement */}
        <h2 className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] xl:text-[84px] font-semibold leading-[1.05] tracking-tight text-white flex flex-col gap-y-2 md:gap-y-4 select-none">
          {/* Paragraph 1 */}
          <div className="flex flex-col items-center justify-center">
            {p1.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap justify-center items-center">
                {line.map((word, wordIdx) => (
                  <ScrollRevealWord
                    key={word.index}
                    word={word.text}
                    serif={word.serif}
                    index={word.index}
                    scrollYProgress={scrollYProgress}
                    totalWords={totalWords}
                    hasTrailingSpace={wordIdx < line.length - 1}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Paragraph 2 */}
          <div className="flex flex-col items-center justify-center mt-6 md:mt-8">
            {p2.map((line, lineIdx) => (
              <div key={lineIdx} className="flex flex-wrap justify-center items-center">
                {line.map((word, wordIdx) => (
                  <ScrollRevealWord
                    key={word.index}
                    word={word.text}
                    serif={word.serif}
                    index={word.index}
                    scrollYProgress={scrollYProgress}
                    totalWords={totalWords}
                    hasTrailingSpace={wordIdx < line.length - 1}
                  />
                ))}
              </div>
            ))}
          </div>
        </h2>

        {/* Supporting Text */}
        <m.p
          style={{
            opacity: supportOpacity,
            y: supportY,
            filter: supportFilter,
          }}
          className="text-sm md:text-base text-white/60 max-w-[700px] mx-auto mt-12 md:mt-16 leading-relaxed font-sans"
        >
          Over the last 2+ years, I&apos;ve worked on real-world products across automotive, chemical, and eCommerce domains. My focus is building fast, scalable, and accessible digital experiences using React, Next.js, Node.js, TypeScript, PostgreSQL, and modern cloud technologies.
        </m.p>
      </div>
    </section>
  );
}
