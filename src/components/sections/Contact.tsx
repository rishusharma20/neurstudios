import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, PartyPopper, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

// --- Neural Particles Component ---
const NeuralParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: [null, -100],
            opacity: [null, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
          style={{ filter: "blur(1px) drop-shadow(0 0 5px rgba(0, 217, 255, 0.8))" }}
        />
      ))}
    </div>
  );
};

// --- Magnetic Component ---
const Magnetic = ({ children }: { children: React.ReactElement }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.2);
    y.set((clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

// --- Custom Premium Inputs ---
const FloatingInput = ({ label, type = "text", name, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className="relative group">
      <motion.input 
        animate={{ scale: isFocused ? 1.02 : 1 }}
        name={name}
        type={type} 
        className={cn(
          "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] caret-cyan-400",
          isFocused && "shadow-[0_0_20px_rgba(0,217,255,0.1)]"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        required
        {...props} 
      />
      <motion.label 
        animate={{ 
          top: isActive ? 8 : 16,
          fontSize: isActive ? 10 : 14,
          color: isActive ? "#22d3ee" : "rgba(255,255,255,0.4)"
        }}
        className="absolute left-4 pointer-events-none font-mono uppercase tracking-widest font-bold"
      >
        {label}
      </motion.label>
      <div className={cn(
        "absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-all duration-500",
        isFocused ? "border-cyan-400/30" : "group-hover:border-white/20"
      )}></div>
    </div>
  );
};

const FloatingTextarea = ({ label, name, ...props }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const isActive = isFocused || hasValue;

  return (
    <div className="relative group">
      <motion.textarea 
        animate={{ scale: isFocused ? 1.01 : 1 }}
        name={name}
        className={cn(
          "w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] resize-none min-h-[140px] caret-cyan-400",
          isFocused && "shadow-[0_0_20px_rgba(0,217,255,0.1)]"
        )}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={(e) => setHasValue(e.target.value.length > 0)}
        required
        {...props} 
      />
      <motion.label 
        animate={{ 
          top: isActive ? 8 : 16,
          fontSize: isActive ? 10 : 14,
          color: isActive ? "#22d3ee" : "rgba(255,255,255,0.4)"
        }}
        className="absolute left-4 pointer-events-none font-mono uppercase tracking-widest font-bold"
      >
        {label}
      </motion.label>
      <div className={cn(
        "absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-all duration-500",
        isFocused ? "border-cyan-400/30" : "group-hover:border-white/20"
      )}></div>
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
        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)] appearance-none cursor-pointer"
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
      <motion.label 
        animate={{ 
          top: isActive ? 8 : 16,
          fontSize: isActive ? 10 : 14,
          color: isActive ? "#22d3ee" : "rgba(255,255,255,0.4)"
        }}
        className="absolute left-4 pointer-events-none font-mono uppercase tracking-widest font-bold"
      >
        {label}
      </motion.label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400/60">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className={cn(
        "absolute inset-0 rounded-xl pointer-events-none border border-transparent transition-all duration-500",
        isFocused ? "border-cyan-400/30" : "group-hover:border-white/20"
      )}></div>
    </div>
  );
};

const StatusChip = ({ label }: { label: string }) => (
  <motion.div 
    whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 w-fit group cursor-default transition-colors"
  >
    <div className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400 shadow-[0_0_8px_#4ade80]"></span>
    </div>
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors font-bold">{label}</span>
  </motion.div>
);

const TrustMetric = ({ label, sub }: { label: string; sub: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="text-xl font-heading font-black text-white mb-1">{label}</div>
      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{sub}</div>
    </div>
  </motion.div>
);

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      gsap.fromTo(".contact-form-container",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
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
        headers: { 'Accept': 'application/json' }
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
      <NeuralParticles />
      
      {/* 🌌 Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-cyan-500/10 rounded-full blur-[250px] mix-blend-screen" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[250px] mix-blend-screen" />
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* ✨ Left Cinematic Panel */}
          <div className="lg:col-span-5 relative">
            <div className="contact-reveal inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-md">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 font-black">NEURAL_INTERFACE_READY</span>
            </div>

            <h2 className="contact-reveal text-5xl md:text-7xl font-heading font-black leading-[1.05] text-white mb-10">
              Let's engineer <br/> the{" "}
              <motion.span 
                animate={{ 
                  color: ["#00d9ff", "#7b61ff", "#00d9ff"],
                  textShadow: [
                    "0 0 20px rgba(0,217,255,0.4)",
                    "0 0 20px rgba(123,97,255,0.4)",
                    "0 0 20px rgba(0,217,255,0.4)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block"
              >
                future
              </motion.span> <br/> together.
            </h2>
            
            <p className="contact-reveal text-lg text-white/50 leading-relaxed mb-12 max-w-md font-medium">
              Ready to transform your ambitious ideas into scalable, intelligent systems? Collaborate with elite engineers to build the next generation of digital infrastructure.
            </p>

            <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
              <TrustMetric label="50+" sub="Products Launched" />
              <TrustMetric label="GLOBAL" sub="Remote Collaboration" />
              <TrustMetric label="24H" sub="System Response" />
              <TrustMetric label="SECURE" sub="NDA Standards" />
            </div>

            <div className="contact-reveal flex flex-col gap-3">
              <StatusChip label="RESPONSE SYSTEM ONLINE" />
              <StatusChip label="GLOBAL COLLAB ACTIVE" />
              <StatusChip label="PRODUCT ENGINEERING READY" />
            </div>
          </div>

          {/* 💎 Cinematic Contact Form */}
          <div className="lg:col-span-7 relative contact-form-container">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative p-12 md:p-20 rounded-[3rem] w-full bg-[#08080a]/90 backdrop-blur-[40px] border border-cyan-400/30 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-transparent"></div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center relative z-10 mb-10"
                  >
                    <CheckCircle2 size={48} className="text-cyan-400 drop-shadow-[0_0_20px_#22d3ee]" />
                  </motion.div>
                  <h3 className="text-3xl md:text-5xl font-heading font-black text-white mb-6">TRANSMISSION RECEIVED</h3>
                  <p className="text-white/50 text-lg max-w-sm leading-relaxed mb-10">Thanks for reaching out to Neur Studios. We'll analyze your request and contact you within 24 hours.</p>
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-[10px] font-mono tracking-[0.4em] uppercase font-black"
                  >
                    <PartyPopper size={14} /> Ready for Ignition
                  </motion.div>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  ref={formRef} 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative p-10 md:p-14 rounded-[3rem] w-full bg-[#08080a]/80 backdrop-blur-[32px] border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden"
                >
                  {/* Energy Border Animation */}
                  <motion.div 
                    className="absolute inset-0 rounded-[3rem] border-2 border-cyan-400/20 pointer-events-none"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  {/* HUD Corner Accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-cyan-400/30 rounded-tl-[3rem]" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-cyan-400/30 rounded-br-[3rem]" />

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <FloatingInput label="Full Name" name="full_name" />
                      <FloatingInput label="Email Address" name="email" type="email" />
                    </div>
                    
                    <div className="mb-8">
                      <FloatingInput label="Company / Organization" name="company" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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
                    
                    <div className="flex flex-col items-center gap-6">
                      <Magnetic>
                        <motion.button 
                          onMouseEnter={() => setIsSubmitHovered(true)}
                          onMouseLeave={() => setIsSubmitHovered(false)}
                          whileTap={{ scale: 0.96 }}
                          disabled={status === "sending"}
                          className={cn(
                            "relative w-full h-18 rounded-2xl font-black text-lg tracking-[0.2em] uppercase overflow-hidden flex items-center justify-center gap-4 transition-all duration-500",
                            status === "error" 
                            ? "bg-red-500/20 border-red-500/50 text-red-500" 
                            : "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-[0_0_50px_rgba(0,217,255,0.2)]"
                          )}
                        >
                          {/* Light Sweep Animation */}
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-20"
                            animate={{ x: ["-150%", "150%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          />

                          <span className="relative z-10 flex items-center gap-3">
                            {status === "sending" ? (
                              <>ANALYZING DATA <Loader2 className="w-5 h-5 animate-spin" /></>
                            ) : status === "error" ? (
                              "RETRY TRANSMISSION"
                            ) : (
                              <>LAUNCH YOUR VISION <ArrowRight className={cn("w-5 h-5 transition-transform", isSubmitHovered && "translate-x-2")} /></>
                            )}
                          </span>

                          {/* Circulating Energy Border */}
                          {isSubmitHovered && (
                            <motion.div 
                              className="absolute inset-0 border-2 border-white/40 rounded-2xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            />
                          )}
                        </motion.button>
                      </Magnetic>

                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.4em] font-black">SECURE TRANSMISSION ACTIVE</span>
                        </div>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em] font-bold flex items-center gap-2">
                          <ShieldCheck size={10} /> Protected by Neural NDA Standards
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
