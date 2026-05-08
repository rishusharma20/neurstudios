import React, { useEffect, useRef } from "react";
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
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-20">
            <Button variant="primary" href="#contact">START YOUR PROJECT</Button>
            <Button variant="secondary" href="#services">EXPLORE SERVICES</Button>
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
