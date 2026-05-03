"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, CalendarDays, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface Post {
  path: string;
  title: string;
  desc: string;
  date: string;
  tag: string;
  tagColor: string;
  image: string;
  readTime: string;
  featured?: boolean;
}

const posts: Post[] = [
  {
    path: "Git",
    title: "Why Every CS Student Should Learn Git and GitHub Early",
    desc: "Git and GitHub aren't just tools — they're professional habits that separate good engineers from great ones. Learn why mastering them early is a career cheat code.",
    date: "June 2025",
    tag: "Dev Tools",
    tagColor: "bg-violet-500",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    readTime: "5 min read",
    featured: true,
  },
  {
    path: "NeuralNetworks",
    title: "What Are Neural Networks? A Visual Explanation",
    desc: "Neurons, layers, weights, and activations — demystified. Understand how neural networks learn from data and why they power everything from image recognition to ChatGPT.",
    date: "March 2025",
    tag: "AI / ML",
    tagColor: "bg-indigo-500",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    readTime: "6 min read",
  },
  {
    path: "CNN",
    title: "CNNs and Computer Vision: How Machines Learn to See",
    desc: "Convolutional Neural Networks gave machines the gift of sight. Dive into how filters, pooling, and feature maps enable models to detect objects, faces, and scenes.",
    date: "April 2025",
    tag: "Computer Vision",
    tagColor: "bg-emerald-500",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    readTime: "7 min read",
  },
  {
    path: "RNN",
    title: "RNNs and Language Processing: Teaching Machines to Read",
    desc: "Recurrent Neural Networks process sequences like sentences, audio, and time-series data. Explore how RNNs, LSTMs, and GRUs laid the foundation for modern language models.",
    date: "May 2025",
    tag: "NLP",
    tagColor: "bg-rose-500",
    image: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    readTime: "8 min read",
  },
  {
    path: "Mistakes",
    title: "Top 5 Mistakes Beginners Make When Learning to Code",
    desc: "Copying without understanding, skipping problem-solving, and other traps that slow you down — plus how to avoid all of them.",
    date: "June 2024",
    tag: "Career",
    tagColor: "bg-orange-500",
    image: "https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg",
    readTime: "4 min read",
  },
  {
    path: "Journey",
    title: "How I Started Coding in Python",
    desc: "From a curious high schooler to building real products — the honest story of my first year as a developer, mistakes included.",
    date: "October 2024",
    tag: "Python",
    tagColor: "bg-blue-500",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    readTime: "3 min read",
  },
];

const featured = posts[0];
const rest = posts.slice(1);

export default function Blog() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".g-header > *",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.1 }
        );
        gsap.fromTo(".g-featured",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.3,
            scrollTrigger: { trigger: ".g-featured", start: "top 90%", toggleActions: "play none none none" } }
        );
        gsap.utils.toArray<HTMLElement>(".g-card").forEach((el, i) => {
          gsap.fromTo(el, { opacity: 0, y: 32 }, {
            opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" }
          });
        });
      }, pageRef);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">

      {/* ── Header ── */}
      <div className="pt-32 pb-12 px-6 sm:px-10 border-b border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto max-w-5xl g-header">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase">Writing</span>
            <ChevronRight size={12} className="text-zinc-400" />
            <span className="text-xs text-zinc-400 dark:text-zinc-600">{posts.length} articles</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Blog
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-lg leading-relaxed">
            Thoughts on software engineering, developer growth, and building
            things that last.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 sm:px-10 max-w-5xl py-12">

        {/* ── Featured Post ── */}
        <div className="g-featured opacity-0 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-5 h-px bg-indigo-500" />
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase">Featured</span>
          </div>

          <Link
            href={`/blog/blogpost/${featured.path}`}
            data-cursor="Read"
            className="group relative block rounded-3xl overflow-hidden"
            style={{ height: "min(58vh, 520px)" }}
          >
            {/* Background image */}
            <img
              src={featured.image}
              alt={featured.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

            {/* Glowing border on hover */}
            <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-white/10 transition-all duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${featured.tagColor}`}>
                  {featured.tag}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <Clock size={11} /> {featured.readTime}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/60">
                  <CalendarDays size={11} /> {featured.date}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 max-w-2xl">
                {featured.title}
              </h2>
              <p className="text-white/60 text-sm leading-relaxed max-w-xl mb-5 line-clamp-2 hidden sm:block">
                {featured.desc}
              </p>

              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">
                Read article
                <motion.div
                  animate={{ x: hoveredPost === "featured" ? 3 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={16} />
                </motion.div>
              </div>
            </div>
          </Link>
        </div>

        {/* ── Rest of posts ── */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-5 h-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase">More Articles</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {rest.map((post) => (
            <Link
              key={post.path}
              href={`/blog/blogpost/${post.path}`}
              data-cursor="Read"
              className="g-card opacity-0 group relative flex flex-col rounded-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/30 hover:border-indigo-200/70 dark:hover:border-indigo-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5"
              onMouseEnter={() => setHoveredPost(post.path)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-white text-[11px] font-bold ${post.tagColor}`}>
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-[11px] text-zinc-400 dark:text-zinc-600 mb-3">
                  <span className="flex items-center gap-1.5"><Clock size={11} />{post.readTime}</span>
                  <span className="flex items-center gap-1.5"><CalendarDays size={11} />{post.date}</span>
                </div>

                <h2 className="text-base font-bold leading-snug mb-3 text-zinc-800 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 mb-5 line-clamp-2">
                  {post.desc}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500 mt-auto">
                  Read article
                  <motion.div
                    animate={{ x: hoveredPost === post.path ? 3 : 0, y: hoveredPost === post.path ? -3 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={13} />
                  </motion.div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Newsletter teaser ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-16 p-8 sm:p-10 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
          />
          <div className="relative z-10">
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">More coming soon</p>
            <h3 className="text-2xl font-extrabold mb-3">Stay in the loop</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mx-auto mb-6 leading-relaxed">
              New articles on full stack engineering, productivity, and career growth — published regularly.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all duration-200"
            >
              Get notified <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 mt-12 py-8">
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl text-center text-xs text-zinc-400 dark:text-zinc-600">
          &copy; {new Date().getFullYear()} Adil Umer. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
