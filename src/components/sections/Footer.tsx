import { Fragment } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

export const Footer = () => {
  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { Icon: FaGithub, href: "https://github.com/rishusharma20" },
    { Icon: FaLinkedin, href: "https://www.linkedin.com/in/rishusharma2007/" },
  ];

  const trustMetrics = [
    "Trusted by Startups",
    "50+ Successful Launches",
    "Modern Engineering",
    "AI-Powered Solutions",
  ];

  return (
    <footer className="bg-[#030305] pt-16 sm:pt-24 pb-10 relative overflow-hidden">
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(var(--color-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)', 
        backgroundSize: '80px 80px' 
      }}></div>
      
      {/* Cinematic Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* SECTION 1 — TRUST BAR */}
        <div className="relative mb-16 sm:mb-24">
          <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-full bg-[var(--color-cyan)]/5 blur-[60px] rounded-full pointer-events-none" />
          
          <div className="flex flex-wrap justify-center items-center gap-x-10 lg:gap-x-16 gap-y-6 py-8 sm:py-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl rounded-[2.5rem] relative z-10 px-6 sm:px-10">
            {trustMetrics.map((metric, idx) => (
              <Fragment key={idx}>
                <div className="flex items-center gap-3 sm:gap-4 group cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan)] group-hover:scale-125 transition-transform" />
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] uppercase text-white/40 group-hover:text-white transition-colors font-black">
                    {metric}
                  </span>
                </div>
                {idx < trustMetrics.length - 1 && (
                  <div className="hidden xl:block w-[1px] h-6 bg-white/10" />
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* SECTION 2 — MAIN FOOTER CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-20 items-start lg:items-center mb-16 sm:mb-24">
          
          {/* LEFT COLUMN — BRANDING */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="flex items-center gap-4 group mb-8">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[25px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 animate-pulse" />
                <img 
                  src={logo} 
                  alt="Neur Studios Logo" 
                  className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter uppercase text-white leading-none">
                  Neur Studios
                </span>
                <div className="flex items-center gap-2 mt-2 px-2.5 py-0.5 rounded-full bg-[#00FF88]/5 border border-[#00FF88]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
                  <span className="text-[8px] font-mono tracking-[0.2em] text-[#00FF88] uppercase font-black">Online</span>
                </div>
              </div>
            </a>
            <p className="text-[var(--color-text-secondary)] text-sm sm:text-base max-w-[340px] lg:max-w-none leading-relaxed font-medium opacity-60">
              Crafting immersive digital experiences for ambitious modern brands. Engineered for scale and innovation.
            </p>
          </div>

          {/* CENTER COLUMN — NAVIGATION */}
          <nav className="flex flex-col items-center lg:border-x lg:border-white/5 lg:px-10 h-full justify-center">
            <ul className="grid grid-cols-2 lg:flex lg:flex-col gap-x-12 gap-y-6 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 hover:text-[var(--color-cyan)] transition-all relative group py-1 font-black"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-cyan)] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_var(--color-cyan)]" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT COLUMN — SOCIAL DOCK */}
          <div className="flex flex-col items-center lg:items-end justify-center h-full md:col-span-2 lg:col-span-1">
            <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/20 mb-8 font-black">Global Connectivity</p>
            <div className="flex gap-4 sm:gap-6">
              {socialLinks.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/30 hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/30 hover:bg-[var(--color-cyan)]/5 transition-all backdrop-blur-xl group"
                >
                  <Icon size={20} className="transition-transform group-hover:rotate-12" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3 — BOTTOM BAR */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-10 pt-10 border-t border-white/5 relative">
          <div className="flex items-center gap-4 order-2 lg:order-1">
            <div className="hidden sm:block w-8 h-[1px] bg-white/10" />
            <p className="text-[9px] font-mono text-white/20 tracking-[0.4em] uppercase font-black text-center sm:text-left">
              Engineered by Neur Studios &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-[9px] text-white/20 font-mono tracking-widest uppercase font-black order-1 lg:order-2">
            <a href="#" className="hover:text-[var(--color-cyan)] transition-colors border-b border-transparent hover:border-[var(--color-cyan)]">Privacy_Policy</a>
            <a href="#" className="hover:text-[var(--color-cyan)] transition-colors border-b border-transparent hover:border-[var(--color-cyan)]">Terms_Of_Service</a>
            <a href="#" className="hover:text-[var(--color-cyan)] transition-colors border-b border-transparent hover:border-[var(--color-cyan)]">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
