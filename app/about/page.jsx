"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const timeline = [
  {
    year: "2022",
    title: "The Spark",
    body: "Started with Python in high school. Wrote my first script, got hooked, and spent evenings building small automations and learning the fundamentals.",
    image: "/strt.png",
    alt: "Beginning to code",
  },
  {
    year: "2023",
    title: "Going Deeper",
    body: "Explored data structures, algorithms, and web development. Completed online courses and took on my first freelance projects — grew from beginner to confident developer.",
    image: "/deep.png",
    alt: "Learning deeper concepts",
  },
  {
    year: "2024",
    title: "Taking on Challenges",
    body: "Contributed to open-source, built full-stack applications, and started mastering the React & Next.js ecosystem. Every project pushed my limits.",
    image: "/chal.png",
    alt: "Taking on challenges",
  },
];

const skills = [
  { label: "Languages", items: "TypeScript · JavaScript · Python" },
  { label: "Frontend", items: "React · Next.js · Tailwind CSS" },
  { label: "Backend", items: "Node.js · REST APIs · PostgreSQL" },
  { label: "Tools", items: "Git · Docker · Vercel · Figma" },
];

export default function About() {
  const pageRef = useRef(null);

  useEffect(() => {
    let ctx;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        /* Hero entrance */
        gsap.fromTo(
          ".g-hero-item",
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.1,
          }
        );

        /* Timeline items */
        gsap.utils.toArray(".g-timeline-item").forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        /* Skills grid */
        gsap.utils.toArray(".g-skill-card").forEach((el, i) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.07,
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }, pageRef);
    })();

    return () => ctx?.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50"
    >
      {/* ══ Hero ══ */}
      <section className="pt-24 sm:pt-32 pb-20 px-6 sm:px-10 border-b border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          {/* Profile image */}
          <div className="g-hero-item opacity-0 mb-10">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-zinc-200 dark:border-zinc-800 shadow-xl flex-shrink-0">
              <Image
                src="/e1.png"
                alt="Adil Umer"
                fill
                sizes="80px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <p className="g-hero-item opacity-0 text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-4">
            About Me
          </p>
          <h1 className="g-hero-item opacity-0 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8">
            Adil Umer
          </h1>
          <p className="g-hero-item opacity-0 text-zinc-500 dark:text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-6">
            Full Stack Software Engineer based in Islamabad, Pakistan. I build
            fast, scalable web applications with React, Next.js, and TypeScript
            — from idea to deployment.
          </p>
          <p className="g-hero-item opacity-0 text-zinc-500 dark:text-zinc-400 text-base max-w-2xl leading-relaxed">
            Passionate about clean code, great developer experience, and
            products that genuinely help people. I&apos;m currently open to
            freelance projects and full-time opportunities.
          </p>
        </div>
      </section>

      {/* ══ Skills ══ */}
      <section className="py-20 px-6 sm:px-10 border-b border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3 g-skill-card opacity-0">
            Expertise
          </p>
          <h2 className="text-3xl font-extrabold mb-10 g-skill-card opacity-0">
            Skills &amp; Stack
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((s) => (
              <div
                key={s.label}
                className="g-skill-card opacity-0 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
              >
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-3">
                  {s.label}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {s.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Timeline ══ */}
      <section className="py-24 px-6 sm:px-10 border-b border-zinc-100 dark:border-zinc-900">
        <div className="container mx-auto max-w-5xl">
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">
            My Story
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-16">
            Coding Journey
          </h2>

          <div className="space-y-20">
            {timeline.map((step, i) => (
              <div
                key={step.year}
                className={`g-timeline-item opacity-0 flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 items-center`}
              >
                <div className="md:w-1/2">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    width={520}
                    height={340}
                    className="rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-900/5 w-full"
                  />
                </div>
                <div className="md:w-1/2">
                  <span className="inline-block text-xs font-bold tracking-[0.2em] text-indigo-500 uppercase mb-3">
                    {step.year}
                  </span>
                  <h3 className="text-2xl font-extrabold mb-4">{step.title}</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-28 px-6 sm:px-10 text-center relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
            Let&apos;s work together
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-9 leading-relaxed">
            Have a project in mind or want to chat? I&apos;m always happy to hear
            from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-xl shadow-indigo-600/25 transition-all duration-200"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
