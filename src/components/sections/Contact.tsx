import React, { useRef, useEffect, useState } from "react";
import { Copy, ArrowRight, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

// Custom Premium Inputs
const FloatingInput = ({ label, type = "text", name, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className="relative group">
      <input 
        name={name}
        type={type} 
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        required
        {...props} 
      />
      <label className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono uppercase ${isActive ? 'top-2 text-[9px] text-[var(--color-cyan)] tracking-widest' : 'top-4 text-sm text-white/40'}`}>
        {label}
      </label>
      <div className={`absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-colors duration-500 ${isFocused ? 'shadow-[0_0_15px_rgba(0,217,255,0.15)] border-[var(--color-cyan)]/50' : 'group-hover:border-white/20'}`}></div>
    </div>
  );
};

const FloatingTextarea = ({ label, name, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className="relative group">
      <textarea 
        name={name}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] resize-none min-h-[120px]"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        required
        {...props} 
      />
      <label className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono uppercase ${isActive ? 'top-2 text-[9px] text-[var(--color-cyan)] tracking-widest' : 'top-4 text-sm text-white/40'}`}>
        {label}
      </label>
      <div className={`absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-colors duration-500 ${isFocused ? 'shadow-[0_0_15px_rgba(0,217,255,0.15)] border-[var(--color-cyan)]/50' : 'group-hover:border-white/20'}`}></div>
    </div>
  );
};

const FloatingSelect = ({ label, name, options }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className="relative group">
      <select 
        name={name}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] appearance-none cursor-pointer"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== "");
        }}
        onChange={(e) => setHasValue(e.target.value !== "")}
        defaultValue=""
        required
      >
        <option value="" disabled hidden></option>
        {options.map((opt: string) => <option key={opt} value={opt} className="bg-[#0f172a] text-white py-2">{opt}</option>)}
      </select>
      <label className={`absolute left-4 pointer-events-none transition-all duration-300 font-mono uppercase ${isActive ? 'top-2 text-[9px] text-[var(--color-cyan)] tracking-widest' : 'top-4 text-sm text-white/40'}`}>
        {label}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--color-cyan)] opacity-60">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={`absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-colors duration-500 ${isFocused ? 'shadow-[0_0_15px_rgba(0,217,255,0.15)] border-[var(--color-cyan)]/50' : 'group-hover:border-white/20'}`}></div>
    </div>
  );
}

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel animations
      gsap.fromTo(
        ".contact-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      // Form animation
      gsap.fromTo(
        ".contact-form-container",
        { y: 80, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
        }
      );
      
      // Trust Signals animation
      gsap.fromTo(
        ".trust-signal",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ".trust-container", start: "top 90%" }
        }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/xnjwgdoa", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-[#030305] overflow-hidden" ref={sectionRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
      }}></div>
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[300px] opacity-[0.06] pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-purple)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.08] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          
          {/* ✨ LEFT PANEL ENHANCEMENT */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            
            {/* Live Status Widget */}
            <div className="contact-reveal inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 w-fit shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF88] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FF88] shadow-[0_0_10px_#00FF88]"></span>
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">Available for Q3 Projects</span>
            </div>

            {/* 🧠 HERO TEXT AREA */}
            <h2 className="contact-reveal text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] text-white mb-8">
              Let's engineer the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-cyan)] via-blue-500 to-[var(--color-purple)] drop-shadow-[0_0_15px_rgba(0,217,255,0.4)]">
                future
              </span> together.
            </h2>
            
            <p className="contact-reveal text-lg text-[var(--color-text-secondary)] leading-relaxed mb-12 max-w-md">
              Ready to transform your ambitious ideas into scalable, intelligent systems? Collaborate with elite engineers to build something impossible.
            </p>

            {/* Mini Trust Metrics */}
            <div className="contact-reveal flex flex-col gap-4 mb-16">
              {[
                { label: "24h Average Response Time", active: true },
                { label: "End-to-End Product Support", active: false },
                { label: "Global Remote Collaboration", active: false }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-mono text-[var(--color-text-muted)]">
                  <CheckCircle2 size={16} className={item.active ? "text-[var(--color-cyan)]" : "text-white/20"} />
                  <span className={item.active ? "text-white" : ""}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 💎 CONTACT CARD REDESIGN */}
          <div className="lg:col-span-7 relative contact-form-container">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative p-12 md:p-20 rounded-[2.5rem] w-full bg-[rgba(8,12,28,0.72)] backdrop-blur-[24px] border border-[var(--color-cyan)]/30 shadow-[0_0_50px_rgba(0,217,255,0.15)] flex flex-col items-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cyan)]/5 to-transparent"></div>
                  
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-[var(--color-cyan)] rounded-full blur-[40px] opacity-20 animate-pulse"></div>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-24 h-24 rounded-full bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30 flex items-center justify-center relative z-10"
                    >
                      <CheckCircle2 size={48} className="text-[var(--color-cyan)] drop-shadow-[0_0_15px_rgba(0,217,255,1)]" />
                    </motion.div>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 relative z-10">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-lg max-w-sm leading-relaxed relative z-10">
                    Thanks for reaching out to Neur Studios. We'll review your project and contact you within 24 hours.
                  </p>
                  
                  <motion.div 
                    className="mt-12 flex items-center gap-2 text-[var(--color-cyan)] font-mono text-[10px] tracking-widest uppercase opacity-60"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <PartyPopper size={14} />
                    Ready for the next phase
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  ref={formRef} 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative p-8 md:p-12 rounded-[2.5rem] w-full bg-[rgba(8,12,28,0.72)] backdrop-blur-[24px] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden"
                >
                  {/* Internal top gradient reflection */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                  <input type="hidden" name="_subject" value="New Project Inquiry - Neur Studios" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FloatingInput label="Full Name" name="full_name" />
                    <FloatingInput label="Email Address" name="email" type="email" />
                  </div>
                  
                  <div className="mb-6">
                    <FloatingInput label="Company / Organization" name="company" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <FloatingSelect 
                      label="Project Type" 
                      name="project_type"
                      options={["SaaS Platform", "AI Product", "Full-Stack Web App", "Interactive 3D Experience", "Enterprise System"]} 
                    />
                    <FloatingSelect 
                      label="Budget Range" 
                      name="budget_range"
                      options={["$10k - $25k", "$25k - $50k", "$50k - $100k", "$100k+"]} 
                    />
                  </div>
                  
                  <div className="mb-10">
                    <FloatingTextarea label="Project Details & Goals" name="message" />
                  </div>
                  
                  <button 
                    disabled={status === "sending"}
                    className={`relative group w-full h-16 rounded-2xl font-bold text-lg tracking-wide overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 ${
                      status === "error" 
                      ? "bg-red-500/20 border border-red-500/50 text-red-500" 
                      : "bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-purple)] text-white hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:-translate-y-1"
                    }`}
                  >
                    {/* Shine Sweep Effect */}
                    <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out"></div>
                    
                    <span className="relative z-10 drop-shadow-md">
                      {status === "sending" ? "SENDING..." : status === "error" ? "SOMETHING WENT WRONG" : "LAUNCH YOUR VISION"}
                    </span>
                    
                    {status === "sending" ? (
                      <Loader2 className="relative z-10 w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>

                  <p className="text-center text-white/40 text-xs mt-6 font-mono uppercase tracking-widest">
                    Protected by strict NDA standards.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
