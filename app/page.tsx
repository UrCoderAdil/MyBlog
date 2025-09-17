"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Page = () => {
  return (
    <div className="bg-gradient-to-b from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950">
      {/* Hero Section */}
      <section className="container px-4 py-20 mx-auto lg:flex lg:items-center lg:space-x-8">
        {/* Left Text */}
        <div className="w-full text-center lg:text-left lg:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100"
          >
            Hi, I’m <span className="text-blue-600">Adil</span> <br />
            A Passionate <span className="underline decoration-blue-600">Software Engineer</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-6 font-bold text-xs md:text-xl text-black dark:text-blue-500"
          >
            <h1 className="text-5xl"><TypeAnimation
              sequence={[
                "JavaScript Developer",
                1500,
                "TypeScript Wizard",
                1500,
                "React & Next.Js",
                1500,
                " Tailwind CSS UI Expert",
                1500,
                "Senior Python Engineer",
                1500,
                "Full Stack Engineer",
                1500,
                " MERN Stack Developer",
                1500,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            /></h1>
          </motion.div>

          <p className="mt-6 text-gray-600 dark:text-gray-400">
            Building modern, scalable, and stunning web apps with passion and precision.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-full mt-10 lg:mt-0 lg:w-1/2">
          <Image
            src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
            alt="Software Engineer"
            width={500}
            height={500}
            className="w-full h-full max-w-md mx-auto"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="text-center font-semibold">
          <h1 className="text-5xl text-gray-900 dark:text-gray-100">
            <span className="text-blue-600">Project </span> Pricing
          </h1>
          <p className="pt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-normal">
            Transparent pricing for freelance projects. Pay per project type.
          </p>
        </div>

        <div className="pt-16 flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Frontend Project */}
          <div className="w-96 p-8 bg-white dark:bg-gray-800 text-center rounded-3xl shadow-xl">
            <h1 className="text-2xl font-semibold text-black dark:text-white">
              Frontend Project
            </h1>
            <p className="pt-2 tracking-wide">
              <span className="text-gray-400">$ </span>
              <span className="text-3xl font-semibold">25</span>
              <span className="text-gray-400"> / project</span>
            </p>
            <hr className="mt-4 dark:border-gray-600" />
            <div className="pt-8 space-y-4 text-left text-gray-600 dark:text-gray-400">
              <p>✅ Responsive UI with Tailwind</p>
              <p>✅ React Component Development</p>
              <p>✅ Pixel Perfect Designs</p>
            </div>
          </div>

          {/* Full Stack Project */}
          <div className="w-80 p-8 bg-gray-900 text-center rounded-3xl text-white border-4 border-white shadow-xl relative transform scale-110">
            <h1 className="text-2xl font-semibold">Full Stack (Next.js)</h1>
            <p className="pt-2 tracking-wide">
              <span className="text-gray-400">$ </span>
              <span className="text-3xl font-semibold">41</span>
              <span className="text-gray-400"> / project</span>
            </p>
            <hr className="mt-4 border-gray-600" />
            <div className="pt-8 space-y-4 text-left text-gray-400">
              <p>✅ Next.js + API Routes</p>
              <p>✅ Database Integration</p>
              <p>✅ Authentication & Security</p>
            </div>
            <div className="absolute top-4 right-4">
              <p className="bg-blue-700 px-4 py-1 rounded-full uppercase text-xs font-bold">
                Popular
              </p>
            </div>
          </div>

          {/* Enterprise Project */}
          <div className="w-96 p-8 bg-white dark:bg-gray-800 text-center rounded-3xl shadow-xl">
            <h1 className="text-2xl font-semibold text-black dark:text-white">
              Enterprise Project
            </h1>
            <p className="pt-2 tracking-wide">
              <span className="text-gray-400">$ </span>
              <span className="text-3xl font-semibold">55</span>
              <span className="text-gray-400"> / project</span>
            </p>
            <hr className="mt-4 dark:border-gray-600" />
            <div className="pt-8 space-y-4 text-left text-gray-600 dark:text-gray-400">
              <p>✅ Scalable Full Stack Apps</p>
              <p>✅ Advanced Integrations</p>
              <p>✅ Unlimited Cloud Deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative w-full mt-32 rounded-3xl bg-gradient-to-b from-white via-gray-100 to-blue-100 dark:from-black dark:via-gray-900 dark:to-blue-950 px-6 py-20 md:py-28 text-center overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.15),transparent_60%)]" />

        {/* Content */}
        <motion.h2
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-4xl md:text-5xl font-extrabold mb-6"
        >
          Ready to <span className="text-blue-600">Level Up</span> Your Journey?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 mb-10"
        >
          Let’s collaborate on your next big idea.  
          From startup apps to enterprise platforms — I build with excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 flex flex-col sm:flex-row justify-center gap-4 "
        >
          <Link
            href="/contact"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-900 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-transform"
          >
            Connect With Me
          </Link>
        </motion.div>

        {/* Floating Lights */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-10 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"
        />
      </motion.section>
    </div>
  );
};

export default Page;
