import { Fragment } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
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
    "Trusted by Startups Worldwide",
    "50+ Successful Launches",
    "Modern Full-Stack Engineering",
    "AI-Powered Product Expertise",
  ];

  return (
    <footer className="bg-[#030305] pt-12 pb-10 relative overflow-hidden">
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ 
        backgroundImage: 'linear-gradient(var(--color-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)', 
        backgroundSize: '100px 100px' 
      }}></div>
      
      {/* Cinematic Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* SECTION 1 — TRUST BAR (REFINED) */}
        <div className="relative mb-24">
          {/* Ambient Glow behind bar */}
          <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 h-full bg-[var(--color-cyan)]/10 blur-[60px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 py-10 border-y border-white/5 bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] relative z-10 px-8">
            {trustMetrics.map((metric, idx) => (
              <Fragment key={idx}>
                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan)] animate-pulse group-hover:scale-125 transition-transform"></div>
                  <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-colors">
                    {metric}
                  </span>
                </div>
                {idx < trustMetrics.length - 1 && (
                  <div className="hidden xl:block w-[1px] h-6 bg-white/10"></div>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        {/* SECTION 2 — MAIN FOOTER CONTENT (3-COLUMN RESTRUCTURED) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-center mb-24">
          
          {/* LEFT COLUMN — BRANDING (LOGO FOCUS) */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <a href="#" className="flex items-center gap-5 group mb-8">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Layered Glows */}
                <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[30px] opacity-20 group-hover:opacity-50 transition-opacity duration-700 animate-pulse"></div>
                <div className="absolute -inset-2 border border-[var(--color-cyan)]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <img 
                  src={logo} 
                  alt="Neur Studios Logo" 
                  className="w-full h-full object-contain relative z-10 transition-all duration-700 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-heading font-black text-4xl tracking-tighter uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40 leading-none">
                  Neur Studios
                </span>
                <div className="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20">
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] animate-pulse"></span>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-[#00FF88] uppercase">Available for projects</span>
                </div>
              </div>
            </a>
            <p className="text-[var(--color-text-secondary)] text-base max-w-[340px] leading-relaxed font-light">
              Crafting immersive digital experiences for ambitious modern brands. Engineered for scale and innovation.
            </p>
          </div>

          {/* CENTER COLUMN — NAVIGATION (ALIGNED) */}
          <nav className="flex flex-col items-center lg:border-x lg:border-white/5 lg:px-10 h-full justify-center">
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-sm font-mono tracking-[0.3em] uppercase text-white/40 hover:text-[var(--color-cyan)] transition-all relative group py-1"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-cyan)] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_var(--color-cyan)]"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* RIGHT COLUMN — SOCIAL DOCK */}
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20 mb-8 text-center">Connect with us</p>
            <div className="flex gap-6">
              {socialLinks.map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  whileHover={{ scale: 1.15, y: -8 }}
                  className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-[var(--color-cyan)] hover:border-[var(--color-cyan)]/30 hover:bg-[var(--color-cyan)]/10 transition-all shadow-xl backdrop-blur-xl group"
                >
                  <Icon size={24} className="transition-transform group-hover:rotate-12" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3 — BOTTOM BAR (CLEAN) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 relative">
          <div className="flex items-center gap-4">
            <div className="w-10 h-[1px] bg-white/10"></div>
            <p className="text-[10px] font-mono text-white/20 tracking-[0.4em] uppercase">
              Innovation through precision
            </p>
          </div>
          <div className="flex items-center gap-10 text-[10px] text-white/20 font-mono tracking-widest uppercase">
            <span className="hover:text-white/40 transition-colors">&copy; {new Date().getFullYear()} Neur Studios</span>
            <a href="#" className="hover:text-[var(--color-cyan)] transition-colors border-b border-transparent hover:border-[var(--color-cyan)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-cyan)] transition-colors border-b border-transparent hover:border-[var(--color-cyan)]">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
