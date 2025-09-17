"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Typed from "typed.js";
import { motion } from "framer-motion";

function About() {
  const typedRef = useRef(null);

  useEffect(() => {
    // ensure span is mounted
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Software Developer 💻",
        "Tech Enthusiast 🚀",
        "Lifelong Learner 📚",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    // cleanup to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-blue-50 text-black dark:from-black dark:via-gray-900 dark:to-blue-900 dark:text-white transition-colors duration-500">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center text-center py-24 md:py-32 px-4 sm:px-6"
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 mb-6 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-600/50"
        >
          <Image src="/e1.png" alt="Profile" fill className="object-cover" />
        </motion.div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Hi, I'm Adil Umer 👋
        </h1>

        {/* Typewriter effect */}
        <span
          ref={typedRef}
          className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-500 dark:text-blue-400 block h-8"
        />

        <p className="mt-6 max-w-2xl text-gray-600 dark:text-gray-300 px-4">
          Passionate about building impactful applications, Full Stack Projects,
          Providing Software as a Service with AI Integration.
        </p>
      </motion.section>

      {/* Journey Timeline */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16">
          My <span className="text-blue-500 dark:text-blue-400">Coding Journey</span>
        </h2>

        <div className="space-y-16 md:space-y-20">
          {/* Step 1 */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            <div className="md:w-1/2">
              <Image
                src="/strt.png"
                alt="The Spark"
                width={500}
                height={350}
                className="rounded-xl shadow-lg shadow-blue-600/30"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400">
                The Spark of Curiosity
              </h3>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                My journey began in high school with Python. What started as
                curiosity quickly grew into a passion as I spent nights building
                small projects and learning the fundamentals of coding.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10"
          >
            <div className="md:w-1/2">
              <Image
                src="/deep.png"
                alt="Learning"
                width={500}
                height={350}
                className="rounded-xl shadow-lg shadow-blue-600/30"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400">
                Diving Deeper
              </h3>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                I started exploring advanced concepts — algorithms, data
                structures, and web development. With online courses and
                freelance projects, I grew from beginner to confident developer.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            <div className="md:w-1/2">
              <Image
                src="/chal.png"
                alt="Projects"
                width={500}
                height={350}
                className="rounded-xl shadow-lg shadow-blue-600/30"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-500 dark:text-blue-400">
                Taking on Challenges
              </h3>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                From open-source contributions to full-stack apps, I embraced
                challenges. Each project was an opportunity to level up and
                grow as a developer.
              </p>
            </div>
          </motion.div>

          {/* Step 4 */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10"
          >
          
          </motion.div>
        </div>
      </section>

      {/* Call To Action */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-20 text-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 dark:from-blue-900 dark:via-blue-800 dark:to-blue-900 transition-colors duration-500"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ">
          Let’s Build Something Great Together 🚀
        </h2>
        <p className=" mb-6 max-w-xl mx-auto">
          Have an idea or project in mind? Reach out and let’s collaborate.
        </p>
        <a
          href="/contact"
          className="px-5 py-3 bg-black dark:bg-gray-900 hover:bg-gray-800 text-blue-400 font-semibold rounded-lg shadow-md shadow-black/40 transition duration-300"
        >
          Contact Me
        </a>
      </motion.section>
    </div>
  );
}
export default About;
