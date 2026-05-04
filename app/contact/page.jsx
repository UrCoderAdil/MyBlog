"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Github, Linkedin, Copy, CheckCheck,
  Zap, MessageSquare, Briefcase, Send, ArrowUpRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────── */
const stats = [
  { value: "< 24h", label: "Response time" },
  { value: "5+", label: "Projects shipped" },
  { value: "100%", label: "Client satisfaction" },
];

const inquiryTypes = [
  { id: "freelance", icon: Briefcase, label: "Freelance Project" },
  { id: "fulltime", icon: Zap, label: "Full-time Role" },
  { id: "collab", icon: MessageSquare, label: "Just Saying Hi" },
];

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:AdilUmer2005@gmail.com", icon: Mail },
];

const EMAIL = "AdilUmer2005@gmail.com";

/* ─── Page ─────────────────────────────────── */
export default function Contact() {
  const pageRef = useRef(null);
  const formRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [inquiry, setInquiry] = useState("freelance");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formFocus, setFormFocus] = useState(null);

  /* GSAP entrance */
  useEffect(() => {
    let ctx;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(".g-item",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.09, delay: 0.1 }
        );
      }, pageRef);
    })();
    return () => ctx?.revert();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError("");
    setSending(true);

    const formData = new FormData(formRef.current);
    const name = formData.get("user_name")?.toString().trim() ?? "";
    const email = formData.get("user_email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, inquiry_type: inquiryLabel }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setSuccess(true);
        formRef.current.reset();
        setFormFocus(null);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSending(false);
    }
  };

  const inquiryLabel = inquiryTypes.find((t) => t.id === inquiry)?.label ?? "";

  return (
    <div ref={pageRef} className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50">

      {/* ══ Hero ══════════════════════════════════════════ */}
      <div className="relative pt-24 sm:pt-32 pb-20 px-6 sm:px-10 overflow-hidden border-b border-zinc-100 dark:border-zinc-900">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 30% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Available badge */}
          <div className="g-item opacity-0 inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              Available for new projects
            </span>
          </div>

          <h1 className="g-item opacity-0 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-none">
            Let&apos;s build something
            <br />
            <span className="text-indigo-500">extraordinary.</span>
          </h1>

          <p className="g-item opacity-0 text-zinc-500 dark:text-zinc-400 text-lg max-w-xl leading-relaxed mb-10">
            Got a product idea, a technical challenge, or just want to say hi?
            I read every message and reply within 24 hours.
          </p>

          {/* Stats */}
          <div className="g-item opacity-0 flex flex-wrap gap-6">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">{s.value}</span>
                <span className="text-xs text-zinc-400 dark:text-zinc-600 font-medium mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ Main ══════════════════════════════════════════ */}
      <div className="container mx-auto px-6 sm:px-10 max-w-5xl py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Left column ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">

            {/* Copy email */}
            <div className="g-item opacity-0">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-3">
                Email me directly
              </p>
              <button
                onClick={copyEmail}
                className="group w-full flex items-center justify-between gap-3 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex-shrink-0">
                    <Mail size={16} className="text-indigo-500" />
                  </div>
                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                    {EMAIL}
                  </span>
                </div>
                <div className="flex-shrink-0 transition-all duration-200">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div key="check"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                        className="flex items-center gap-1 text-xs font-semibold text-emerald-500"
                      >
                        <CheckCheck size={14} /> Copied!
                      </motion.div>
                    ) : (
                      <motion.div key="copy"
                        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                        className="text-zinc-400 group-hover:text-indigo-500 transition-colors"
                      >
                        <Copy size={14} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </div>

            {/* Social links */}
            <div className="g-item opacity-0">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-3">
                Find me on
              </p>
              <div className="flex flex-col gap-2">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all duration-200"
                  >
                    <Icon size={15} className="text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                      {label}
                    </span>
                    <ArrowUpRight size={13} className="ml-auto text-zinc-300 dark:text-zinc-700 group-hover:text-indigo-400 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="g-item opacity-0 p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50">
              <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
                &ldquo;The best way to predict the future is to create it.&rdquo;
              </p>
              <p className="text-xs text-indigo-400 dark:text-indigo-600 mt-2">— Peter Drucker</p>
            </div>
          </div>

          {/* ── Right column: Form ── */}
          <div className="lg:col-span-3">
            <div className="g-item opacity-0 p-7 sm:p-9 rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 backdrop-blur-sm">

              {/* Inquiry type selector */}
              <div className="mb-7">
                <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-600 uppercase mb-3">
                  I&apos;m reaching out about a…
                </p>
                <div className="flex flex-wrap gap-2">
                  {inquiryTypes.map(({ id, icon: Icon, label }) => (
                    <button
                      key={id}
                      onClick={() => setInquiry(id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
                        inquiry === id
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/25"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-500"
                      }`}
                    >
                      <Icon size={13} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic header */}
              <div className="mb-7">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={inquiry}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50"
                  >
                    {inquiry === "freelance" && "Tell me about your project"}
                    {inquiry === "fulltime" && "Tell me about the opportunity"}
                    {inquiry === "collab" && "What's on your mind?"}
                  </motion.h2>
                </AnimatePresence>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                  {inquiry === "freelance" && "Budget, timeline, and tech stack — the more details, the better."}
                  {inquiry === "fulltime" && "Company, role, and what makes it exciting."}
                  {inquiry === "collab" && "No agenda needed — just hit send and I'll reply."}
                </p>
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
                {/* Hidden inquiry field */}
                <input type="hidden" name="inquiry_type" value={inquiryLabel} />

                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "user_name", placeholder: "Your name", type: "text", label: "Name" },
                    { name: "user_email", placeholder: "your@email.com", type: "email", label: "Email" },
                  ].map((field) => (
                    <div key={field.name} className="relative">
                      <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                        formFocus === field.name
                          ? "top-2 text-[10px] text-indigo-500"
                          : "top-3.5 text-sm text-zinc-400 dark:text-zinc-600"
                      }`}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        required
                        placeholder=""
                        onFocus={() => setFormFocus(field.name)}
                        onBlur={(e) => !e.target.value && setFormFocus(null)}
                        className="w-full pt-6 pb-2 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/12 transition-all placeholder-transparent"
                      />
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <label className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
                    formFocus === "message"
                      ? "top-2 text-[10px] text-indigo-500"
                      : "top-3.5 text-sm text-zinc-400 dark:text-zinc-600"
                  }`}>
                    Message
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder=""
                    onFocus={() => setFormFocus("message")}
                    onBlur={(e) => !e.target.value && setFormFocus(null)}
                    className="w-full pt-6 pb-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/80 text-zinc-900 dark:text-zinc-50 text-sm outline-none focus:border-indigo-400 dark:focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/12 resize-none transition-all placeholder-transparent"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/35 transition-all duration-200"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {success && (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"
                      >
                        <CheckCheck size={15} /> Sent! I&apos;ll reply soon.
                      </motion.p>
                    )}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                        className="text-sm font-medium text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
