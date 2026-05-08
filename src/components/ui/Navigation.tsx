import React, { useState, useEffect } from "react";
import { cn } from "../../utils/helpers";
import { Button } from "./Button";
import { Network } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#home" },
    { name: "ABOUT", href: "#about" },
    { name: "SERVICES", href: "#services" },
    { name: "PROJECTS", href: "#projects" },
    { name: "PROCESS", href: "#process" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        scrolled ? "bg-[rgba(10,10,15,0.8)] backdrop-blur-md border-b border-[rgba(0,217,255,0.1)] py-3" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px]">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[15px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src="/src/assets/logo.png" 
                alt="Neur Studios Logo" 
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-bold text-xl tracking-wider uppercase hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Neur Studios
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-mono text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] hover:text-glow-hover transition-all duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-cyan)] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <Button variant="secondary" className="px-5 py-2 text-xs" href="#contact">
              LET'S TALK
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={cn("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "rotate-45 translate-y-2" : "")} />
              <span className={cn("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "opacity-0" : "")} />
              <span className={cn("w-full h-0.5 bg-white transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : "")} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[rgba(10,10,15,0.95)] backdrop-blur-lg border-b border-[rgba(0,217,255,0.1)] p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <Button variant="primary" className="mt-4 w-full" href="#contact" onClick={() => setMobileMenuOpen(false)}>
              LET'S TALK
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
