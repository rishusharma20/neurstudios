import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralNetwork } from "../three/NeuralNetwork";
import { Magnetic } from "../ui/Magnetic";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

export const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    )
    .fromTo(
      subRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo(
      statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, []);

  const stats = [
    { 
      label: "Projects Delivered", 
      value: "25+", 
      accent: "#00B8D9", // Muted Cyan
      visual: 'progress' 
    },
    { 
      label: "Full Stack Dev", 
      value: "Expert", 
      accent: "#0047AB", // Deep Cobalt Blue
      visual: 'flow' 
    },
    { 
      label: "High Performance", 
      value: "99.9%", 
      accent: "#6344D4", // Muted Royal Purple
      visual: 'pulse' 
    }
  ];

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[var(--color-primary)]">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 opacity-60 lg:opacity-100">
        <div className="absolute inset-0 lg:left-1/3">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <NeuralNetwork />
          </Canvas>
        </div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="section-label mb-8"
          >
            NEURAL_ENGINEERING_STUDIO
          </motion.span>
          
          <h1 
            ref={headingRef}
            className="section-heading mb-8"
          >
            Engineering <span className="text-gradient">intelligent</span> digital products for modern brands.
          </h1>
          
          <p 
            ref={subRef}
            className="section-subheading"
          >
            We partner with startups, businesses, and creators to build premium digital experiences through modern design, full-stack development, and immersive web technologies.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 mb-24">
            <Magnetic strength={0.1}>
              <motion.a
                href="#contact"
                className="group relative px-8 py-5 rounded-2xl overflow-hidden flex items-center justify-center min-w-[240px]"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-cyan)] to-[#0055FF] opacity-90 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  className="absolute inset-0 opacity-40"
                  animate={{ 
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.4) 0%, transparent 50%)",
                      "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4) 0%, transparent 50%)"
                    ] 
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: "-150%" }}
                    animate={{ x: "300%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                </div>
                <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-shadow duration-500 rounded-2xl" />
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40" />
                <span className="relative z-10 font-mono font-black tracking-[0.2em] text-white text-[13px] uppercase">
                  START YOUR PROJECT
                </span>
              </motion.a>
            </Magnetic>

            <Magnetic strength={0.1}>
              <motion.a
                href="#services"
                className="group relative px-8 py-5 rounded-2xl overflow-hidden flex items-center justify-center min-w-[240px]"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 group-hover:border-[var(--color-cyan)]/60 transition-colors" />
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 border border-[var(--color-cyan)] rounded-2xl"
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="w-full h-full bg-gradient-to-b from-transparent via-[var(--color-cyan)]/10 to-transparent"
                    initial={{ y: "-100%" }}
                    animate={{ y: "200%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <span className="relative z-10 font-mono font-black tracking-[0.2em] text-[var(--color-cyan)] group-hover:text-white transition-colors text-[13px] uppercase">
                  EXPLORE SERVICES
                </span>
              </motion.a>
            </Magnetic>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-4 md:gap-8">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx}
                className={cn(
                  "relative group rounded-[1.5rem] border transition-all duration-1000 cursor-pointer flex flex-col items-start min-w-[160px] md:min-w-[240px] px-6 md:px-10 py-6 md:py-9 overflow-hidden",
                  hoveredStat === idx ? "border-white/20 bg-white/[0.04] z-20" : "border-white/5 bg-white/[0.01] z-10",
                  hoveredStat !== null && hoveredStat !== idx ? "opacity-30 blur-[1px] scale-[0.98]" : "opacity-100 blur-0 scale-100"
                )}
                onMouseEnter={() => setHoveredStat(idx)}
                onMouseLeave={() => setHoveredStat(null)}
                animate={{
                  y: hoveredStat === idx ? -10 : 0,
                  boxShadow: hoveredStat === idx ? `0 30px 60px -15px ${stat.accent}15` : "none"
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                style={{ "--accent": stat.accent } as React.CSSProperties}
              >
                {/* 🌌 CINEMATIC INTERNAL LIGHTING */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-transparent" />
                  {/* Slow Reflection Sweep */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  />
                  {/* Subtle Grid Accent */}
                  <div className="absolute inset-0 opacity-[0.05]" style={{ 
                    backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', 
                    backgroundSize: '24px 24px' 
                  }} />
                </div>

                {/* Refined Typography */}
                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter transition-all duration-700 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                      {stat.value}
                    </span>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-700",
                      hoveredStat === idx ? "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] scale-125" : "bg-white/10"
                    )} />
                  </div>
                  <span className="text-[9px] md:text-xs text-white/30 group-hover:text-white/60 uppercase tracking-[0.3em] font-mono font-black transition-colors duration-500">
                    {stat.label}
                  </span>

                  {/* Refined Visual Telemetry */}
                  <div className="mt-10 relative">
                    {stat.visual === 'progress' && (
                      <div className="w-full h-[2px] bg-white/[0.03] rounded-full overflow-hidden relative">
                        <motion.div 
                          className="h-full bg-[var(--accent)] opacity-40 group-hover:opacity-100 transition-opacity duration-700"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "85%" }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    )}
                    {stat.visual === 'flow' && (
                      <div className="flex gap-1 items-center h-4 opacity-10 group-hover:opacity-40 transition-opacity duration-700">
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <motion.div 
                            key={i}
                            className="w-[2px] h-full bg-[var(--accent)] rounded-full"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                          />
                        ))}
                      </div>
                    )}
                    {stat.visual === 'pulse' && (
                      <div className="flex items-end gap-[2px] h-4 opacity-10 group-hover:opacity-40 transition-opacity duration-700">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                          <motion.div 
                            key={i}
                            className="w-[2px] bg-[var(--accent)] rounded-full"
                            animate={{ height: ["4px", "12px", "6px", "14px", "4px"] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtle Edge Highlight */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 right-10 flex flex-col items-center gap-4 hidden lg:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-[0.5em] rotate-180 font-mono font-bold" style={{ writingMode: 'vertical-rl' }}>
          SCROLL_TO_EXPLORE
        </span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[var(--color-cyan)] to-transparent relative">
          <motion.div 
            className="w-2 h-2 rounded-full bg-[var(--color-cyan)] absolute -left-[3.5px] top-0 shadow-[0_0_15px_rgba(0,217,255,1)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
