"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex items-center w-16 h-9 rounded-full 
        bg-gradient-to-r from-blue-600 to-blue-400 
        p-1 shadow-lg hover:shadow-xl transition-all"
    >
      {/* Circle Slider */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-7 h-7 rounded-full flex items-center justify-center 
          bg-white dark:bg-gray-900 text-black dark:text-white shadow-md"
        style={{
          x: isDark ? "28px" : "0px",
        }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-400" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;
