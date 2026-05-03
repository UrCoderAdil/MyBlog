"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;
  const isDark = resolvedTheme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* ── Floating island — desktop ── */}
      <div className="fixed top-5 inset-x-0 z-50 hidden md:flex justify-center px-6 pointer-events-none">
        <motion.div
          initial={{ y: -16, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center gap-0.5 px-2 py-2 rounded-full
            bg-white/75 dark:bg-zinc-900/75 backdrop-blur-2xl
            border border-zinc-200/70 dark:border-zinc-800/70
            shadow-xl shadow-black/[0.06] dark:shadow-black/40"
        >
          {/* Brand */}
          <Link
            href="/"
            className="px-4 py-1.5 rounded-full text-[13px] font-extrabold tracking-tight
              text-zinc-800 dark:text-zinc-100
              hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
          >
            Adil<span className="text-indigo-500">.</span>
          </Link>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1.5 rounded-full" />

          {/* Nav links */}
          {links.map(({ name, path }) => {
            const active = pathname === path;
            return (
              <Link
                key={name}
                href={path}
                className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-colors duration-200
                  ${active
                    ? "text-zinc-900 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
                  }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </Link>
            );
          })}

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-1.5 rounded-full" />

          {/* Theme */}
          <ThemeToggle />

          {/* CTA */}
          <Link
            href="/contact"
            className="ml-1 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500
              text-white text-[13px] font-semibold tracking-tight
              shadow-md shadow-indigo-600/25 hover:shadow-indigo-500/35
              transition-all duration-200"
          >
            Hire Me
          </Link>
        </motion.div>
      </div>

      {/* ── Mobile bar ── */}
      <header className="md:hidden fixed top-0 inset-x-0 z-50
        bg-white/85 dark:bg-zinc-950/85 backdrop-blur-2xl
        border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-between px-5 h-14">
          <Link href="/" className="text-[15px] font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Adil<span className="text-indigo-500">.</span>
          </Link>
          <div className="flex items-center gap-1.5">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-14 z-40 overflow-hidden
              bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl
              border-b border-zinc-200/60 dark:border-zinc-800/60"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(({ name, path }) => {
                const active = pathname === path;
                return (
                  <Link
                    key={name}
                    href={path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                    }`}
                  >
                    {name}
                  </Link>
                );
              })}
              <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-900">
                <Link
                  href="/contact"
                  className="block text-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
