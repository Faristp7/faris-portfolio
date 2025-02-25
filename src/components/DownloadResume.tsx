import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function DownloadResume() {
  const [hideTag, setHideTag] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHideTag(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="absolute right-0 hidden sm:block">
      <motion.a
        onMouseOver={() => setHideTag(false)}
        onMouseLeave={() => setHideTag(true)}
        className="bg-black text-white p-2 cursor-pointer select-none rounded-l-full pl-3 flex items-center gap-1 overflow-hidden"
        initial={{ width: "auto" }}
        animate={{ width: hideTag ? 50 : 210 }} // Shrinks width when hidden
        transition={{ duration: 0.3, ease: "easeInOut" }}
        href="/Faristpresume.pdf"
        download={"/FarisTpresume.pdf"}
      >
        {/* Rotating Icon */}
        <motion.div
          animate={{ rotate: hideTag ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="https://img.icons8.com/windows/32/download--v1.png"
            alt="download"
            width={25}
            height={10}
            className="invert"
          />
        </motion.div>

        {/* Text with fade-out and smooth width transition */}
        <motion.span
          initial={{ opacity: 1, width: "auto" }}
          animate={{
            opacity: hideTag ? 0 : 1,
            width: hideTag ? 0 : "auto",
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden whitespace-nowrap"
        >
          Download Resume
        </motion.span>
      </motion.a>
    </div>
  );
}
