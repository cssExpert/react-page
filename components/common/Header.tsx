"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import { motion } from "framer-motion";

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  return (
    <nav
      className={`border-b border-zinc-800/60 bg-brand-background/80 header top-0 left-0 z-40 flex w-full items-center py-0 lg:py-2 ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark shadow-sticky fixed z-9999 bg-black/80 backdrop-blur-lg transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="w-10 h-10 flex items-center justify-center rounded-md bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
        >
          <Icon
            name="Logo"
            size="24"
            fill="currentColor"
            role="button"
            className="w-7 h-7"
          />
        </Link>

        <div className="inline-flex items-center gap-2.5">
          <Link
            href="/"
            className="inline-flex items-center border-[1.5px] border-white text-black bg-white hover:border-indigo-700 hover:text-white hover:bg-indigo-700 px-6 min-h-11 rounded-full text-[13px] transition-all"
          >
            <span className="font-bold tracking-tight">Login</span>
          </Link>
          <Link
            className="group text-indigo-300 hover:text-indigo-500"
            href="/"
          >
            <motion.div
              // Framer Motion spring physics handle hover and tap smoothly!
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="relative inline-flex rounded-full p-[1.5px] overflow-hidden bg-zinc-800/40 shadow-lg cursor-pointer select-none"
            >
              {/* 1. ROTATING GLOW BEAM */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] pointer-events-none"
                style={{
                  x: "-50%",
                  y: "-50%",
                  background:
                    "conic-gradient(from 0deg at 50% 50%, transparent 60%, #4939EB 85%, transparent 100%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />

              {/* 2. INNER CONTENT CARD */}
              <div className="relative z-10 flex items-center px-6 py-2.5 rounded-full text-[13px] text-zinc-400 bg-black border border-zinc-900/60">
                <span className="font-bold text-indigo-300 hover:text-indigo-500 tracking-tight">
                  Get Started — Save 50%
                </span>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
