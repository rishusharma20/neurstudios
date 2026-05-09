import { useRef, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, ShieldCheck, Zap, Globe, Cpu, Send, PartyPopper } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

// --- Neural Particles Component ---
const NeuralParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--color-cyan)] rounded-full blur-[1px]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random()
          }}
          animate={{ 
            y: [null, Math.random() * 100 + "%"],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

// --- Magnetic Component ---
const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactElement; strength?: number }) => {
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
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
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

// --- Input Field ---
const InputField = ({ label, type = "text", placeholder, name }: any) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="relative group/field w-full">
      <label className="block font-mono text-[10px] tracking-[0.3em] text-[var(--color-cyan)] mb-3 uppercase font-black opacity-60">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={cn(
            "w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white font-mono text-sm transition-all duration-500 outline-none",
            focused ? "border-[var(--color-cyan)] bg-white/[0.08] shadow-[0_0_20px_rgba(0,217,255,0.15)]" : "hover:border-white/20"
          )}
          required
        />
        <div className={cn(
          "absolute top-0 left-0 w-2 h-2 border-t border-l border-[var(--color-cyan)] transition-opacity duration-500",
          focused ? "opacity-100" : "opacity-0"
        )} />
        <div className={cn(
          "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[var(--color-cyan)] transition-opacity duration-500",
          focused ? "opacity-100" : "opacity-0"
        )} />
      </div>
    </div>
  );
};

export const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");
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
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 2500);
  };

  return (
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden bg-[#050508]">
      <NeuralParticles />
      
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Cinematic Content */}
          <div className="space-y-12">
            <div className="contact-reveal">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-[var(--color-cyan)] rounded-full animate-pulse" />
                  <div className="w-1 h-3 bg-[var(--color-cyan)]/40 rounded-full animate-pulse delay-75" />
                  <div className="w-1 h-3 bg-[var(--color-cyan)]/10 rounded-full animate-pulse delay-150" />
                </div>
                <span className="section-label m-0">TRANSMISSION_READY</span>
              </div>

              <h2 className="section-heading mb-8">
                Let's engineer the <br />
                <motion.span 
                  animate={{ 
                    color: ["#00D9FF", "#7B61FF", "#00D9FF"],
                    textShadow: [
                      "0 0 20px rgba(0,217,255,0.3)",
                      "0 0 40px rgba(123,97,255,0.3)",
                      "0 0 20px rgba(0,217,255,0.3)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  future
                </motion.span> together.
              </h2>
              
              <p className="section-subheading">
                Ready to transform your vision into a high-performance digital reality? Join our neural network of innovative partners.
              </p>
            </div>

            {/* Status Chips */}
            <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Cpu, label: "SYSTEM_ONLINE", val: "99.9% Uptime" },
                { icon: Zap, label: "NEURAL_LATENCY", val: "12ms Response" },
                { icon: ShieldCheck, label: "ENCRYPTION", val: "AES-256" },
                { icon: Globe, label: "AVAILABILITY", val: "GLOBAL" }
              ].map((chip, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                  className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-5 py-4 rounded-2xl group cursor-default transition-all"
                >
                  <chip.icon className="w-5 h-5 text-[var(--color-cyan)] group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[8px] font-mono tracking-[0.2em] text-white/40 uppercase font-black">{chip.label}</div>
                    <div className="text-[10px] font-mono text-white font-black">{chip.val}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Neural Launch Interface (Form) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="relative p-10 sm:p-16 rounded-[2.5rem] w-full bg-[#08080a]/90 backdrop-blur-[40px] border border-[var(--color-cyan)]/30 shadow-[0_0_100px_rgba(0,0,0,0.8)] flex flex-col items-center text-center overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-cyan)]/5 to-transparent" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-20 h-20 rounded-full bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30 flex items-center justify-center relative z-10 mb-8"
                  >
                    <CheckCircle2 size={40} className="text-[var(--color-cyan)] drop-shadow-[0_0_20px_#00D9FF]" />
                  </motion.div>
                  <h3 className="text-2xl sm:text-4xl font-heading font-black text-white mb-6">TRANSMISSION RECEIVED</h3>
                  <p className="text-white/50 text-base max-w-sm leading-relaxed mb-10 uppercase tracking-wider font-mono">We've locked onto your signal. Expect contact within 24 hours.</p>
                  <motion.div 
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 text-[var(--color-cyan)] text-[10px] font-mono tracking-[0.4em] uppercase font-black"
                  >
                    <PartyPopper size={14} /> Ready for Ignition
                  </motion.div>
                </motion.div>
              ) : (
                <div key="form" className="relative bg-white/[0.02] backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-12 border border-white/10 overflow-hidden shadow-2xl">
                  {/* Internal HUD Elements */}
                  <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                      <circle cx="30" cy="30" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                      <path d="M30 10 L30 50 M10 30 L50 30" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <InputField label="NODE_NAME" placeholder="Your Name" name="name" />
                      <InputField label="TARGET_EMAIL" type="email" placeholder="email@example.com" name="email" />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <InputField label="PROJECT_TYPE" placeholder="e.g. Web App" name="type" />
                      <InputField label="BUDGET_TIER" placeholder="Select Tier" name="budget" />
                    </div>

                    <div className="w-full">
                      <label className="block font-mono text-[10px] tracking-[0.3em] text-[var(--color-cyan)] mb-3 uppercase font-black opacity-60">
                        MISSION_BRIEF
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Tell us about your project..."
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-6 py-4 text-white font-mono text-sm transition-all duration-500 outline-none hover:border-white/20 focus:border-[var(--color-cyan)] focus:bg-white/[0.08] focus:shadow-[0_0_20px_rgba(0,217,255,0.15)] resize-none"
                      />
                    </div>

                    {/* THE LAUNCH BUTTON */}
                    <div className="pt-4">
                      <Magnetic strength={0.2}>
                        <button 
                          type="submit"
                          disabled={formState !== "idle"}
                          onMouseEnter={() => setIsSubmitHovered(true)}
                          onMouseLeave={() => setIsSubmitHovered(false)}
                          className={cn(
                            "group relative w-full h-16 sm:h-20 rounded-2xl overflow-hidden transition-all duration-500",
                            formState === "idle" ? "cursor-pointer" : "cursor-wait"
                          )}
                        >
                          <div className={cn(
                            "absolute inset-0 transition-all duration-700",
                            formState === "idle" 
                              ? "bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/20 group-hover:border-[var(--color-cyan)] group-hover:shadow-[0_0_40px_rgba(0,217,255,0.3)]"
                              : "bg-[var(--color-cyan)]/20 border-[var(--color-cyan)]"
                          )} />

                          <div className="absolute inset-0 opacity-20 pointer-events-none">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/40" />
                            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white/40" />
                          </div>

                          <AnimatePresence>
                            {formState === "idle" && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                              >
                                <div className="absolute inset-0 border-2 border-[var(--color-cyan)] opacity-0 group-hover:opacity-40 rounded-2xl" />
                                <motion.div 
                                  className="absolute top-0 left-0 w-20 h-[2px] bg-[var(--color-cyan)] shadow-[0_0_15px_#00D9FF]"
                                  animate={{ left: ["-20%", "120%"] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div 
                                  className="absolute bottom-0 right-0 w-20 h-[2px] bg-[var(--color-cyan)] shadow-[0_0_15px_#00D9FF]"
                                  animate={{ right: ["-20%", "120%"] }}
                                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <motion.div 
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
                            animate={{ translateX: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            style={{ background: "linear-gradient(110deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                          />

                          <div className="relative z-10 flex items-center justify-center gap-4">
                            <AnimatePresence mode="wait">
                              {formState === "idle" && (
                                <motion.div 
                                  key="idle"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className="flex items-center gap-4"
                                >
                                  <span className="font-mono font-black tracking-[0.4em] text-white group-hover:text-[var(--color-cyan)] transition-colors text-xs sm:text-sm uppercase">
                                    LAUNCH VISION
                                  </span>
                                  <Send className="w-5 h-5 text-white/40 group-hover:text-[var(--color-cyan)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </motion.div>
                              )}
                              {formState === "submitting" && (
                                <motion.div 
                                  key="submitting"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex items-center gap-6"
                                >
                                  <div className="flex gap-1.5">
                                    {[0, 1, 2].map(i => (
                                      <motion.div
                                        key={i}
                                        animate={{ height: [4, 16, 4], opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-1.5 bg-[var(--color-cyan)] rounded-full"
                                      />
                                    ))}
                                  </div>
                                  <span className="font-mono font-black tracking-[0.3em] text-[var(--color-cyan)] text-[10px] sm:text-xs">UPLOADING_CORE_ASSETS...</span>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </button>
                      </Magnetic>
                    </div>

                    <div className="flex flex-col items-center gap-2 opacity-50">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[var(--color-cyan)]" />
                        <span className="text-[9px] font-mono tracking-widest text-white uppercase font-bold">Encrypted Connection</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
