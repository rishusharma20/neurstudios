import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralNetwork } from "../three/NeuralNetwork";
import { Magnetic } from "../ui/Magnetic";
import { gsap } from "gsap";
import { motion } from "framer-motion";

export const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
            {/* 📊 CARD 1: PROJECTS DELIVERED */}
            <motion.div 
              className="group relative rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl px-6 md:px-10 py-6 md:py-9 flex flex-col items-start min-w-[160px] md:min-w-[240px] overflow-hidden cursor-pointer"
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                rotateX: 4, 
                rotateY: -2,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(0, 217, 255, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ "--accent": "#00D9FF" } as React.CSSProperties}
            >
              {/* Internal Dashboard Lighting */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(var(--accent) 0.5px, transparent 0.5px)', 
                  backgroundSize: '12px 12px' 
                }} />
                {/* Reflection Sweep */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full"
                  animate={{ translateX: ["100%", "-100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative z-10 flex flex-col w-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_15px_var(--accent)] transition-all duration-500">25+</span>
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_10px_var(--accent)] mt-2" />
                </div>
                <span className="text-[10px] md:text-xs text-white/40 group-hover:text-white/80 uppercase tracking-[0.2em] font-mono font-black transition-colors duration-500">Projects Delivered</span>
                
                {/* Purposeful Visual: Progress Beam */}
                <div className="w-full h-[3px] bg-white/5 mt-8 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-40"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* 💻 CARD 2: FULL STACK DEV */}
            <motion.div 
              className="group relative rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl px-6 md:px-10 py-6 md:py-9 flex flex-col items-start min-w-[160px] md:min-w-[240px] overflow-hidden cursor-pointer"
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                rotateX: 4, 
                rotateY: 2,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(0, 85, 255, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ "--accent": "#0055FF" } as React.CSSProperties}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/15 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
                {/* Scanning Line */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-[1px] bg-[var(--accent)]/30 blur-[1px]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <div className="relative z-10 flex flex-col w-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_15px_var(--accent)] transition-all duration-500">Full</span>
                  <div className="flex gap-1 mt-2">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1 h-3 rounded-full bg-[var(--accent)] opacity-20 group-hover:opacity-100 group-hover:animate-pulse transition-all" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
                <span className="text-[10px] md:text-xs text-white/40 group-hover:text-white/80 uppercase tracking-[0.2em] font-mono font-black transition-colors duration-500">Stack Dev</span>
                
                {/* Purposeful Visual: Data Flow Indicator */}
                <div className="flex items-center gap-2 mt-8 h-4">
                  <div className="flex gap-1 items-end h-full">
                    {[0, 1, 2, 3].map(i => (
                      <motion.div 
                        key={i}
                        className="w-[3px] bg-[var(--accent)] rounded-full"
                        animate={{ height: ["4px", "12px", "6px"] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                  <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden">
                    <motion.div 
                      className="absolute top-0 left-0 h-full w-4 bg-[var(--accent)]"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ⚡ CARD 3: HIGH PERFORMANCE */}
            <motion.div 
              className="group relative rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-2xl px-6 md:px-10 py-6 md:py-9 flex flex-col items-start min-w-[160px] md:min-w-[240px] overflow-hidden cursor-pointer"
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                rotateX: -4, 
                rotateY: 0,
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                borderColor: "rgba(123, 97, 255, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ "--accent": "#7B61FF" } as React.CSSProperties}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00D9FF]/10 via-transparent to-[var(--accent)]/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
                {/* Holographic Accents */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ 
                  backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }} />
              </div>

              <div className="relative z-10 flex flex-col w-full">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl md:text-5xl font-black text-white font-heading tracking-tighter group-hover:text-[var(--accent)] group-hover:drop-shadow-[0_0_15px_var(--accent)] transition-all duration-500">High</span>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <motion.div 
                      className="absolute inset-0 border border-[var(--accent)] rounded-full opacity-20"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)]" />
                  </div>
                </div>
                <span className="text-[10px] md:text-xs text-white/40 group-hover:text-white/80 uppercase tracking-[0.2em] font-mono font-black transition-colors duration-500">Performance</span>
                
                {/* Purposeful Visual: Pulse Waveform */}
                <div className="w-full flex items-center justify-between gap-1 mt-8 h-6 opacity-40 group-hover:opacity-100 transition-opacity">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                    <motion.div 
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[var(--accent)] to-[#00D9FF] rounded-full"
                      animate={{ height: ["4px", "16px", "8px", "14px", "4px"] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
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
