"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  ArrowUpRight,
  Layers,
  Server,
  Cpu,
  CalendarDays,
} from "lucide-react";

const HeroCanvas = dynamic(() => import("./components/HeroCanvas"), {
  ssr: false,
});

/* ── Data ── */
const services = [
  {
    icon: Layers,
    title: "Frontend Engineering",
    desc: "Pixel-perfect, responsive UIs built with React & Next.js. Performant, accessible, and delightful to use.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "Robust REST & GraphQL APIs with Node.js, Prisma, and PostgreSQL. Designed to scale.",
    tags: ["Node.js", "PostgreSQL", "REST", "GraphQL"],
  },
  {
    icon: Cpu,
    title: "Full Stack Products",
    desc: "End-to-end web applications — from auth and database to deployment. I own the whole stack.",
    tags: ["Full Stack", "TypeScript", "Auth", "CI/CD"],
  },
];

const stack = [
  "TypeScript", "React", "Next.js", "Node.js",
  "Tailwind CSS", "PostgreSQL", "Prisma", "Python",
  "scikit-learn", "Pandas", "Matplotlib", "TensorFlow",
  "Git", "Docker", "Vercel", "REST APIs",
];

const posts = [
  {
    path: "NeuralNetworks",
    title: "What Are Neural Networks? A Visual Explanation",
    date: "March 2025",
    tag: "AI / ML",
  },
  {
    path: "CNN",
    title: "CNNs and Computer Vision: How Machines Learn to See",
    date: "April 2025",
    tag: "Computer Vision",
  },
  {
    path: "RNN",
    title: "RNNs and Language Processing: Teaching Machines to Read",
    date: "May 2025",
    tag: "NLP",
  },
  {
    path: "Git",
    title: "Why Every CS Student Should Learn Git Early",
    date: "June 2025",
    tag: "Dev Tools",
  },
];

/* ── Hero headline words ── */
const heroLine1 = ["Full", "Stack"];
const heroLine2 = ["Software", "Engineer."];

export default function Page() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* ── Hero entrance ── */
        const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.15 });

        tl.fromTo(
          ".g-badge",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 }
        )
          .fromTo(
            ".g-word",
            { opacity: 0, y: 40, skewY: 3 },
            { opacity: 1, y: 0, skewY: 0, duration: 0.75, stagger: 0.07 },
            "-=0.25"
          )
          .fromTo(
            ".g-sub",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4"
          )
          .fromTo(
            ".g-cta",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.35"
          );

        /* ── Scroll reveals ── */
        gsap.utils.toArray<HTMLElement>(".g-reveal").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              delay: (i % 3) * 0.08,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, heroRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      className="bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50"
    >
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen min-h-[100svh] flex flex-col justify-center overflow-hidden">
        {/* Three.js canvas */}
        <HeroCanvas />

        {/* Radial vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, transparent 60%, var(--background) 100%)",
          }}
        />

        <div className="relative z-[2] container mx-auto px-6 sm:px-10 pt-24 sm:pt-32 pb-24 sm:pb-28 max-w-5xl">
          {/* Badge */}
          <span className="g-badge opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Available for work
          </span>

          {/* Headline */}
          <h1 className="mb-8">
            <div className="flex flex-wrap gap-x-4 gap-y-0">
              {heroLine1.map((w) => (
                <span
                  key={w}
                  className="g-word opacity-0 inline-block text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-300 dark:text-zinc-600"
                >
                  {w}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0 mt-1">
              {heroLine2.map((w) => (
                <span
                  key={w}
                  className="g-word opacity-0 inline-block text-4xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  {w}
                </span>
              ))}
            </div>
          </h1>

          {/* Subline */}
          <p className="g-sub opacity-0 text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
            I&apos;m{" "}
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
              Adil Umer
            </span>
            , a full stack engineer building fast, scalable web apps with
            React, Next.js & TypeScript. Based in Islamabad, Pakistan.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="g-cta opacity-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
            >
              Hire Me <ArrowRight size={15} />
            </Link>
            <Link
              href="/blog"
              className="g-cta opacity-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold text-sm transition-all duration-200"
            >
              Read My Blog
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-600 opacity-60">
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-zinc-400 dark:from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section className="py-28 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl">
          <div className="g-reveal mb-14">
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">
              What I Build
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Services
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="g-reveal group p-7 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center mb-5 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/60 transition-colors">
                    <Icon size={18} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-base font-bold mb-3 text-zinc-900 dark:text-zinc-50">
                    {s.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STACK
      ══════════════════════════════════════ */}
      <section className="py-20 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl">
          <div className="g-reveal mb-10">
            <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">
              Tech Stack
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Tools I Work With
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {stack.map((item) => (
              <span
                key={item}
                className="g-reveal px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-sm font-medium hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WRITING
      ══════════════════════════════════════ */}
      <section className="py-28 border-t border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl">
          <div className="flex items-end justify-between mb-12 g-reveal">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">
                Writing
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
                Latest Articles
              </h2>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              All posts <ArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-900">
            {posts.map((post) => (
              <Link
                key={post.path}
                href={`/blog/blogpost/${post.path}`}
                className="g-reveal group flex items-center justify-between gap-6 py-5 hover:pl-2 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500 text-xs font-medium">
                    {post.tag}
                  </span>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {post.title}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-600">
                    <CalendarDays size={11} />
                    {post.date}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-zinc-300 dark:text-zinc-700 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                  />
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/blog"
            className="sm:hidden g-reveal inline-flex items-center gap-1.5 mt-8 text-sm font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="py-32 border-t border-zinc-100 dark:border-zinc-900 relative overflow-hidden">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="g-reveal relative z-10 container mx-auto px-6 sm:px-10 max-w-3xl text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-5">
            Let&apos;s Build Together
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-6">
            Have a project
            <br />
            <span className="text-indigo-500">in mind?</span>
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            From startup MVPs to enterprise platforms — let&apos;s talk about what
            we can build together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-2xl shadow-indigo-600/30 hover:shadow-indigo-500/40 transition-all duration-200"
          >
            Start a Conversation <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 dark:border-zinc-900 py-8">
        <div className="container mx-auto px-6 sm:px-10 max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400 dark:text-zinc-600">
          <span>&copy; {new Date().getFullYear()} Adil Umer. All rights reserved.</span>
          <span>Built with Next.js &amp; Tailwind CSS</span>
        </div>
      </footer>
    </div>
  );
}
