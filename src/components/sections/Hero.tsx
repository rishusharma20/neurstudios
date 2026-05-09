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
    <section id="home" className="relative w-full h-screen overflow-hidden bg-[var(--color-primary)]">
      {/* 3D Canvas Background (positioned on the right side mostly via CSS or scene config) */}
      <div className="absolute inset-0 z-0 opacity-80 md:opacity-100">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <NeuralNetwork />
        </Canvas>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 xl:px-20 h-full flex flex-col justify-center pointer-events-none">
        <div className="max-w-3xl pointer-events-auto mt-20">
          <span className="section-label mb-6">
            FULL-STACK CREATIVE DEVELOPMENT STUDIO
          </span>
          <h1 
            ref={headingRef}
            className="section-heading"
          >
            Building <span className="text-gradient">intelligent</span> digital products for modern brands.
          </h1>
          
          <p 
            ref={subRef}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-xl leading-relaxed"
          >
            We partner with startups, businesses, and creators to build premium digital experiences through modern design, full-stack development, and immersive web technologies.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 mb-20">
            {/* PRIMARY CTA: START YOUR PROJECT */}
            <Magnetic strength={0.1}>
              <motion.a
                href="#contact"
                className="group relative px-8 py-4 rounded-xl overflow-hidden flex items-center justify-center min-w-[220px]"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated Plasma Background */}
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
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: "-150%" }}
                    animate={{ x: "300%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                  />
                </div>

                {/* Energy Aura Glow */}
                <div className="absolute inset-0 shadow-[0_0_30px_rgba(0,217,255,0.4)] group-hover:shadow-[0_0_50px_rgba(0,217,255,0.6)] transition-shadow duration-500 rounded-xl" />

                {/* HUD Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40" />

                <span className="relative z-10 font-mono font-bold tracking-[0.2em] text-white text-sm">
                  START YOUR PROJECT
                </span>
              </motion.a>
            </Magnetic>

            {/* SECONDARY CTA: EXPLORE SERVICES */}
            <Magnetic strength={0.1}>
              <motion.a
                href="#services"
                className="group relative px-8 py-4 rounded-xl overflow-hidden flex items-center justify-center min-w-[220px]"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Dark Glass Surface */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md border border-[var(--color-cyan)]/30 group-hover:border-[var(--color-cyan)]/60 transition-colors" />
                
                {/* Neon Border Pulse */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 border border-[var(--color-cyan)] rounded-xl"
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Holographic Light Sweep */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="w-full h-full bg-gradient-to-b from-transparent via-[var(--color-cyan)]/10 to-transparent"
                    initial={{ y: "-100%" }}
                    animate={{ y: "200%" }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Tactical Corner Accents */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-[var(--color-cyan)] rounded-full opacity-50" />
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-[var(--color-cyan)] rounded-full opacity-50" />

                <span className="relative z-10 font-mono font-bold tracking-[0.2em] text-[var(--color-cyan)] group-hover:text-white transition-colors text-sm">
                  EXPLORE SERVICES
                </span>
              </motion.a>
            </Magnetic>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-4 md:gap-8">
            {[
              { value: "25+", label: "Projects Delivered" },
              { value: "Full-Stack", label: "Development" },
              { value: "Performance", label: "Optimized" },
            ].map((stat, i) => (
              <div key={i} className="glass px-6 py-4 rounded-xl flex flex-col items-start min-w-[160px]">
                <span className="text-xl md:text-2xl font-bold text-white font-heading">{stat.value}</span>
                <span className="text-xs text-[var(--color-cyan)] mt-1 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 right-10 flex flex-col items-center gap-4 hidden md:flex"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest style={{ writingMode: 'vertical-rl' }} rotate-180 font-mono">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-cyan)] to-transparent relative">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] absolute -left-[2.5px] top-0 shadow-[0_0_10px_rgba(0,217,255,1)]"></div>
        </div>
      </motion.div>
    </section>
  );
};
