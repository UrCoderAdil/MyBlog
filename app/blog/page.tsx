"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { TypeAnimation } from "react-type-animation";

// Blog data (replace with your FS logic if needed)
const blogs = [
  {
    path: "Git",
    title: "Why Every CS Student Should Learn Git and GitHub Early",
    description:
      "Git and GitHub aren’t just tools for professionals—they’re essential skills every CS student should master early. They make collaboration easier, keep track of your code history, and showcase your projects to the world. Learning them early builds strong habits that will help you in university projects, internships, and your career.",
    slug: "why-learn-git-github-early",
    date: "2025-06-16",
    author: "Muhammad Adil Umer",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", // coding teamwork vibe
  },
  {
    path: "Mistakes",
    title: "Top 5 Mistakes Beginners Make When Learning Programming",
    description:
      "Learning to code can be exciting, but many beginners fall into common traps. From copying code without understanding to avoiding problem-solving practice, these mistakes slow down growth. In this blog, I break down the 5 biggest mistakes I’ve seen beginners make—and how to avoid them to become a stronger programmer faster.",
    slug: "top-5-mistakes-beginners",
    date: "2024-06-16",
    author: "Muhammad Adil Umer",
    image:
      "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg", // code on laptop
  },
  {
    path: "Journey" ,
    title: "How I Started Coding in Python",
    description:
      "Back in 2022, I wrote my very first lines of code in Python. I was amazed at how simple it was to print 'Hello World' and gradually explored variables, loops, and functions. Python’s simplicity and huge community made it the perfect starting point. In this post, I share my journey, challenges, and tips for anyone starting out.",
    slug: "how-i-started-coding-python",
    date: "2024-10-16",
    author: "Muhammad Adil Umer",
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg", // python or laptop coding
  },
];


const Blog = () => {
  let index=0;
  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-b dark:from-black dark:to-blue-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Header Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 40, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <h1 className="text-5xl font-extrabold mt-14 mb-10">
          <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            <TypeAnimation
              sequence={[
                "Welcome to My Blog",
                1500,
                "Explore!",
                1500,
                "Learn!",
                1500,
                "Grow!",
                1500,
              ]}
              speed={50}
              repeat={Infinity}
            />
          </span>
        </h1>
        <p className="text-lg opacity-80 my-7">
          Dive into articles, stories, and experiences crafted just for you.
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-blue-400/20 bg-white/70 dark:bg-black/40 backdrop-blur-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  {blog.title}
                </h2>
                <p className="mb-4 opacity-80">{blog.description}</p>
                <div className="text-sm mb-6 opacity-70">
                  <span>✍️ {blog.author}</span> |{" "}
                  <span>
                    {new Date(blog.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Button */}
                <Link key={blog.author}
                  href={`/blog/blogpost/${blog.path}`}
                  className={`${buttonVariants({
                    variant: "default",
                  })} px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition`}
                >
            Read More →
               
                </Link>
                
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center py-6 border-t border-blue-500/30"
      >
        <p className="opacity-70">
          © {new Date().getFullYear()} AdiBlog. All rights reserved.
        </p>
      </motion.footer>
    </div>
  );
};

export default Blog;
