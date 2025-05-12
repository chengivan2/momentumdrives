"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function FuturisticHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/10 dark:bg-black/10 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">
                Momentum Drives
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-8"
          >
            <Link
              href="/"
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/vehicles"
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              Vehicles
            </Link>
            <Link
              href="/stations"
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              Stations
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-purple-500 transition-colors"
            >
              Contact
            </Link>
          </motion.nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5"
            >
              {theme === "dark" ? (
                <Sun size={18} className="text-yellow-400" />
              ) : (
                <Moon size={18} className="text-purple-600" />
              )}
            </motion.button>

            {/* Auth Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden md:flex items-center space-x-3"
            >
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-black/30"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5"
            >
              {isOpen ? (
                <X size={20} className="text-foreground" />
              ) : (
                <Menu size={20} className="text-foreground" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-lg"
      >
        <div className="container mx-auto px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-foreground hover:text-purple-500 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/vehicles"
            className="block text-foreground hover:text-purple-500 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Vehicles
          </Link>
          <Link
            href="/stations"
            className="block text-foreground hover:text-purple-500 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Stations
          </Link>
          <Link
            href="/about"
            className="block text-foreground hover:text-purple-500 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-foreground hover:text-purple-500 transition-colors py-2"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col space-y-3 pt-4 border-t border-white/10 dark:border-white/5">
            <Link href="/signin" onClick={() => setIsOpen(false)}>
              <Button
                variant="outline"
                className="w-full rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/10 dark:border-white/5 hover:bg-white/20 dark:hover:bg-black/30"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
