"use client";
import DarkModeToggle from "./DarkModeToggle";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg shadow-lg border-b border-blue-500/40"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AdiBlog
            </span>
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium text-white">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <Link href={link.path}>{link.name}</Link>
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </motion.div>
          ))}

          {/* Login / Sign Up Button */}
          

          {/* Dark Mode Toggle */}
          <DarkModeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-white">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

     {/* Mobile Dropdown */}
{isOpen && (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="md:hiddenz-50 bg-black/0.01 backdrop-blur-lg shadow-lg border-b border-blue-500/40 px-6 py-4 space-y-4 text-white"
  >
    {navLinks.map((link) => (
      <Link
        key={link.name}
        href={link.path}
        className="block text-lg font-medium hover:bg-blue-600/30 px-4 py-2 rounded-lg transition-colors"
        onClick={() => setIsOpen(false)}
      >
        {link.name}
      </Link>
    ))}

    {/* Mobile Login / Sign Up Button */}
    <Link
      href="/auth"
      className="block text-center px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
      onClick={() => setIsOpen(false)}
    >
      Login / Sign Up
    </Link>

    {/* Mobile Dark Mode Toggle */}
    <div className="flex justify-center">
      <DarkModeToggle />
    </div>
  </motion.div>
)}

    </motion.nav>
  );
};

export default Navbar;
