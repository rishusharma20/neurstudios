import { useState, useEffect } from "react";
import { cn } from "../../utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";

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
        scrolled ? "py-3 md:py-4" : "py-5 md:py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px]">
        <motion.div 
          layout
          className={cn(
            "relative flex items-center justify-between px-6 md:px-8 py-3 rounded-2xl transition-all duration-500",
            scrolled || mobileMenuOpen
              ? "bg-black/40 backdrop-blur-xl border border-[var(--color-cyan)]/20 shadow-[0_0_30px_rgba(0,217,255,0.15)]" 
              : "bg-transparent border border-transparent"
          )}
        >
          {/* HUD Corner Accents */}
          <AnimatePresence>
            {(scrolled || mobileMenuOpen) && (
              <>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-cyan)]/50 rounded-tl-lg" />
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-cyan)]/50 rounded-br-lg" />
              </>
            )}
          </AnimatePresence>

          <a href="#" className="flex items-center gap-3 group relative z-10">
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[15px] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src={logo} 
                alt="Neur Studios Logo" 
                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="font-heading font-bold text-lg md:text-xl tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              Neur Studios
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 relative">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <motion.a
                    href={link.href}
                    className="font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--color-text-secondary)] hover:text-white transition-colors py-2 block uppercase"
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                  <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-[var(--color-cyan)] to-transparent transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100" />
                </li>
              ))}
            </ul>

            <motion.a
              href="#contact"
              className="group relative px-6 py-2.5 rounded-xl overflow-hidden flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-[var(--color-cyan)]/30 transition-colors group-hover:border-[var(--color-cyan)]" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-[var(--color-cyan)]/10 blur-xl" />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className="relative z-10 font-mono text-[10px] font-bold tracking-[0.2em] text-[var(--color-cyan)] group-hover:text-white transition-colors uppercase">
                LET'S TALK
              </span>
            </motion.a>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group active:scale-95 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="relative w-5 h-5">
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                  >
                    <X className="w-5 h-5 text-[var(--color-cyan)] drop-shadow-[0_0_8px_rgba(0,217,255,0.5)]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    className="flex flex-col justify-between w-5 h-4"
                  >
                    <span className="w-full h-[1.5px] bg-[var(--color-cyan)] rounded-full" />
                    <span className="w-3/4 h-[1.5px] bg-[var(--color-cyan)] rounded-full self-end" />
                    <span className="w-full h-[1.5px] bg-[var(--color-cyan)] rounded-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu — Cinematic Futuristic Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#08080a]/95 border-l border-white/10 backdrop-blur-3xl p-10 flex flex-col pt-32"
            >
              {/* Background HUD Graphics */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(0,217,255,0.4),transparent_50%)]" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                <div className="absolute left-0 top-0 h-full w-[1px] bg-white/20" />
              </div>

              <div className="flex flex-col gap-6">
                <span className="text-[10px] font-mono font-bold tracking-[0.4em] text-[var(--color-cyan)] opacity-50 mb-4 block">COMMAND_CENTER</span>
                
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group relative flex items-center justify-between py-4 border-b border-white/5"
                  >
                    <span className="font-heading text-2xl font-black tracking-tight text-white group-hover:text-[var(--color-cyan)] transition-colors">
                      {link.name}
                    </span>
                    <span className="font-mono text-[10px] text-white/20 group-hover:text-[var(--color-cyan)] transition-colors">
                      0{i + 1}
                    </span>
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-cyan)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                    />
                  </motion.a>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto"
              >
                <a 
                  href="#contact"
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-purple)] text-black font-mono font-black tracking-[0.2em] text-center block shadow-[0_10px_40px_rgba(0,217,255,0.2)] active:scale-95 transition-transform"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  LET'S TALK
                </a>
                <div className="mt-8 flex justify-between items-center px-2 opacity-30">
                  <span className="text-[8px] font-mono tracking-widest text-white uppercase">NEUR_STUDIOS_v2.0</span>
                  <div className="flex gap-2">
                    <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] animate-pulse delay-75" />
                    <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] animate-pulse delay-150" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
