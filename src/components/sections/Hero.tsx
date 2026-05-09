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
            <motion.div 
              className="group relative glass px-6 md:px-10 py-5 md:py-8 flex flex-col items-start min-w-[160px] md:min-w-[220px] overflow-hidden cursor-default"
              whileHover={{ y: -8, scale: 1.05, rotateX: 5, rotateY: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4">
                <motion.div 
                  className="w-2 h-2 bg-[var(--color-cyan)] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-3xl md:text-5xl font-black text-white font-heading relative z-10 group-hover:text-[var(--color-cyan)] transition-colors">25+</span>
              <span className="text-[10px] md:text-xs text-[var(--color-cyan)] mt-3 uppercase tracking-[0.2em] font-mono font-black relative z-10 opacity-70">Projects Delivered</span>
              <div className="w-full h-[2px] bg-white/5 mt-6 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-[var(--color-cyan)] shadow-[0_0_15px_rgba(0,217,255,0.6)]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "85%" }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="group relative glass px-6 md:px-10 py-5 md:py-8 flex flex-col items-start min-w-[160px] md:min-w-[220px] overflow-hidden cursor-default"
              whileHover={{ y: -8, scale: 1.05, rotateX: 5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-4 right-4 flex gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div 
                    key={i}
                    className="w-1 h-3 bg-[var(--color-cyan)]/30 rounded-full"
                    animate={{ height: [4, 12, 4], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
              <span className="text-3xl md:text-5xl font-black text-white font-heading relative z-10 group-hover:text-[var(--color-cyan)] transition-colors">Full</span>
              <span className="text-[10px] md:text-xs text-[var(--color-cyan)] mt-3 uppercase tracking-[0.2em] font-mono font-black relative z-10 opacity-70">Stack Dev</span>
              <div className="flex gap-2 mt-6 opacity-30">
                <div className="w-10 h-[1px] bg-white/20" />
                <motion.div 
                  className="w-1 h-1 bg-[var(--color-cyan)] rounded-full"
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="group relative glass px-6 md:px-10 py-5 md:py-8 flex flex-col items-start min-w-[160px] md:min-w-[220px] overflow-hidden cursor-default"
              whileHover={{ y: -8, scale: 1.05, rotateX: -5, rotateY: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute top-6 right-6">
                <svg width="24" height="24" viewBox="0 0 24 24" className="overflow-visible">
                  <motion.circle 
                    cx="12" cy="12" r="10" 
                    fill="none" 
                    stroke="rgba(0,217,255,0.1)" 
                    strokeWidth="2" 
                  />
                  <motion.circle 
                    cx="12" cy="12" r="10" 
                    fill="none" 
                    stroke="var(--color-cyan)" 
                    strokeWidth="2" 
                    strokeDasharray="62.8"
                    animate={{ strokeDashoffset: [62.8, 10, 62.8] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              <span className="text-3xl md:text-5xl font-black text-white font-heading relative z-10 group-hover:text-[var(--color-cyan)] transition-colors">High</span>
              <span className="text-[10px] md:text-xs text-[var(--color-cyan)] mt-3 uppercase tracking-[0.2em] font-mono font-black relative z-10 opacity-70">Performance</span>
              <div className="flex items-end gap-1 mt-6 h-4 opacity-40">
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div 
                    key={i}
                    className="w-[2px] bg-[var(--color-cyan)]"
                    animate={{ height: [2, 12, 2] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
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
