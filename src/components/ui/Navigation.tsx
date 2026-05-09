import { useState, useEffect } from "react";
import { cn } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-4" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px]">
        <motion.div 
          layout
          className={cn(
            "relative flex items-center justify-between px-8 py-3 rounded-2xl transition-all duration-500",
            scrolled 
              ? "bg-black/40 backdrop-blur-xl border border-[var(--color-cyan)]/20 shadow-[0_0_30px_rgba(0,217,255,0.15)]" 
              : "bg-transparent border border-transparent"
          )}
        >
          {/* HUD Corner Accents (Visible when scrolled) */}
          <AnimatePresence>
            {scrolled && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-cyan)]/50 rounded-tl-lg" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-cyan)]/50 rounded-br-lg" />
              </>
            )}
          </AnimatePresence>

          <a href="#" className="flex items-center gap-3 group relative z-10">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[15px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src={logo} 
                alt="Neur Studios Logo" 
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-bold text-xl tracking-widest uppercase hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Neur Studios
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-8 relative">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <motion.a
                    href={link.href}
                    className="font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--color-text-secondary)] hover:text-white transition-colors py-2 block uppercase"
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                  {/* Sliding Underline System could be implemented with layoutId here if we had active state tracking */}
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[var(--color-cyan)] to-transparent transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                </li>
              ))}
            </ul>

            {/* REDESIGNED LET'S TALK BUTTON */}
            <motion.a
              href="#contact"
              className="group relative px-6 py-2.5 rounded-xl overflow-hidden flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button Background */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-[var(--color-cyan)]/30 transition-colors group-hover:border-[var(--color-cyan)]" />
              
              {/* Neon Glow & Sweep */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[var(--color-cyan)]/10 blur-xl" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <span className="relative z-10 font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--color-cyan)] group-hover:text-white transition-colors">
                LET'S TALK
              </span>
            </motion.a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-10 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span 
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-[var(--color-cyan)] rounded-full origin-left" 
              />
              <motion.span 
                animate={mobileMenuOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                className="w-full h-[1.5px] bg-[var(--color-cyan)] rounded-full" 
              />
              <motion.span 
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-full h-[1.5px] bg-[var(--color-cyan)] rounded-full origin-left" 
              />
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu — Futuristic Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 bg-[rgba(10,10,15,0.98)] backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8 p-12"
          >
            {/* Background HUD Accents */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.2),transparent_70%)]" />
              <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white/20" />
              <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white/20" />
            </div>

            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="group relative font-mono text-xl font-bold tracking-[0.4em] text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors py-2 uppercase"
              >
                <span className="relative z-10">{link.name}</span>
                <motion.div 
                  className="absolute -inset-x-4 inset-y-0 bg-[var(--color-cyan)]/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-lg -z-10"
                />
              </motion.a>
            ))}

            <motion.a 
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 px-12 py-4 rounded-xl bg-[var(--color-cyan)] text-black font-mono font-bold tracking-[0.2em] shadow-[0_0_30px_rgba(0,217,255,0.4)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              LET'S TALK
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
