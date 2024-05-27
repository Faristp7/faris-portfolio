"use client";

import { motion } from "framer-motion";
import { useRef, useState, MutableRefObject } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const text: string = "Say Hello";

  const form: MutableRefObject<HTMLFormElement | null> =
    useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    if (!form.current) {
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setError(true);
      return;
    }

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setSuccess(true);
          setLoading(false);
          form.current!.reset();
        },
        (error: any) => {
          setLoading(false);
          setError(true);
        }
      );
  };

  return (
    <motion.div
      className="h-full"
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
    >
      <div className="h-full flex flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        <div className="h-1/2 lg:h-full lg:w-1/2 flex items-center justify-center text-center text-6xl">
          <motion.div>
            {text.split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.1,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>
        <form
          onSubmit={sendEmail}
          className="h-1/2 lg:h-full lg:w-1/2 rounded-xl flex flex-col gap-8 justify-center p-8 sm:p-24"
          ref={form}
        >
          <span>Dear Faris </span>
          <textarea
            rows={3}
            name="user_message"
            className="bg-transparent border-b-2 border-b-black outline-none resize-none"
          />
          <span>My mail address is</span>
          <input
            type="text"
            name="user_email"
            className="bg-transparent border-b-2 border-b-black outline-none "
          />
          <span>Regards</span>
          <button className="rounded font-semibold bg-black text-gray-300 p-2 flex gap-1 justify-center">
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              "Send"
            )}
          </button>
          {success && (
            <span className="bg-green-600 font-semibold">
              Your message has been sent succefully
            </span>
          )}
          {error && (
            <span className="bg-red-600 font-semibold">
              Someting went wrong!
            </span>
          )}
        </form>
      </div>
    </motion.div>
  );
}
