import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { NeuralNetwork } from "../three/NeuralNetwork";
import { Button } from "../ui/Button";
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
      {/* 🌌 HERO COMPOSITION SYSTEM */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* RIGHT AREA: 3D Intelligence Core (48% of screen) */}
        <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-10 opacity-60 lg:opacity-100">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <NeuralNetwork />
          </Canvas>
        </div>
      </div>

      {/* 💎 LEFT AREA: Editorial Typography & Content (52% of screen) */}
      <div className="relative z-40 container mx-auto px-6 md:px-12 xl:px-20 h-full flex flex-col justify-center">
        <div className="max-w-[100%] lg:max-w-[55%] pointer-events-auto mt-20 lg:mt-0">
          <span className="section-label mb-6 inline-block">
            FULL-STACK CREATIVE DEVELOPMENT STUDIO
          </span>
          <h1 
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] mb-8"
          >
            Building <span className="text-gradient">intelligent</span> digital products for modern brands.
          </h1>
          
          <p 
            ref={subRef}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-xl leading-relaxed font-light"
          >
            We partner with startups, businesses, and creators to build premium digital experiences through modern design, full-stack development, and immersive web technologies.
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button variant="primary" href="#contact" className="px-8 py-4">START YOUR PROJECT</Button>
            <Button variant="secondary" href="#services" className="px-8 py-4">EXPLORE SERVICES</Button>
          </div>

          <div ref={statsRef} className="flex flex-wrap gap-4 md:gap-8">
            {[
              { value: "25+", label: "Projects Delivered" },
              { value: "Full-Stack", label: "Engineering" },
              { value: "Performance", label: "Optimized" },
            ].map((stat, i) => (
              <div key={i} className="glass px-6 py-5 rounded-2xl flex flex-col items-start min-w-[160px] border-white/5 bg-white/[0.02]">
                <span className="text-2xl md:text-3xl font-bold text-white font-heading">{stat.value}</span>
                <span className="text-[10px] font-mono text-[var(--color-cyan)] mt-2 uppercase tracking-[0.2em]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator (Repositioned for balance) */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden lg:flex z-50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <span className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-mono">
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-cyan)]/50 to-transparent relative">
          <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] absolute -left-[1.5px] top-0 shadow-[0_0_10px_var(--color-cyan)]"></div>
        </div>
      </motion.div>
    </section>
  );
};
