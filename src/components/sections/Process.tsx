import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, ShieldCheck, Rocket, CheckCircle2, Clock, Terminal } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    num: "01",
    title: "DISCOVER & PLAN",
    tagline: "Market Research & Strategic Foundation",
    description: "We analyze goals, user behavior, market opportunities, and product direction to establish a scalable digital foundation.",
    deliverables: ["Product Strategy", "User Research", "Wireframes", "Technical Planning"],
    timeline: "1–2 Weeks",
    icon: Search,
    color: "#00D9FF",
    visual: "blueprint"
  },
  {
    num: "02",
    title: "DESIGN & PROTOTYPE",
    tagline: "High-Fidelity UI & Visual Identity",
    description: "Our design team crafts a premium visual language and interactive prototypes that prioritize both aesthetics and conversions.",
    deliverables: ["UI/UX Design", "Visual Identity", "Design System", "Interactive Prototype"],
    timeline: "2–3 Weeks",
    icon: Palette,
    color: "#7B61FF",
    visual: "mesh"
  },
  {
    num: "03",
    title: "DEVELOP & ENGINEER",
    tagline: "Full-Stack Technical Implementation",
    description: "We engineer high-performance systems using modern tech stacks, focusing on security, scalability, and code excellence.",
    deliverables: ["Frontend Architecture", "Backend Integration", "API Development", "Database Optimization"],
    timeline: "4–8 Weeks",
    icon: Code2,
    color: "#00FF88",
    visual: "terminal"
  },
  {
    num: "04",
    title: "TEST & OPTIMIZE",
    tagline: "Quality Assurance & Performance Tuning",
    description: "Rigorous testing across devices and environments ensures a bug-free experience and peak technical performance.",
    deliverables: ["Security Audit", "Performance Testing", "Cross-Browser QA", "Core Web Vitals"],
    timeline: "1–2 Weeks",
    icon: ShieldCheck,
    color: "#FFB800",
    visual: "audit"
  },
  {
    num: "05",
    title: "DEPLOY & SUPPORT",
    tagline: "Launch & Infrastructure Scaling",
    description: "We handle the entire deployment lifecycle and provide ongoing support to ensure your product scales as your brand grows.",
    deliverables: ["CI/CD Setup", "Cloud Deployment", "Launch Support", "Scaling Strategy"],
    timeline: "Ongoing",
    icon: Rocket,
    color: "#FF4D4D",
    visual: "cloud"
  }
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.fromTo(".process-hero-text", 
        { y: 60, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#process",
            start: "top 80%",
          }
        }
      );

      // Background Grid Animation
      gsap.to(".process-bg-grid", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#process",
          scrub: 1,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="py-32 relative bg-[#030305] overflow-hidden" ref={containerRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none process-bg-grid" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}></div>
      
      {/* Cinematic Radial Beams */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.07]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[var(--color-purple)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.07]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-24 items-start">
          
          {/* 🧠 HERO TEXT AREA */}
          <div className="lg:w-1/2 lg:sticky lg:top-32">
            <div className="process-hero-text">
              <span className="section-label tracking-[0.3em] mb-6">OUR METHODOLOGY</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] text-white mb-8">
                Strategic <span className="text-gradient">design.</span><br />
                Intelligent <span className="text-gradient">development.</span>
              </h2>
            </div>
            <p className="process-hero-text text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-lg mb-12">
              We follow a precision-engineered lifecycle to transform ambitious visions into scalable digital realities. Every phase is crafted for maximum impact and elite performance.
            </p>

            {/* How We Work Pills */}
            <div className="process-hero-text flex flex-wrap gap-3">
              {["Agile Workflow", "Transparent Communication", "Scalable Architecture", "Long-term Support"].map((text) => (
                <div key={text} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-[10px] font-mono tracking-widest uppercase text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] inline-block mr-2 shadow-[0_0_5px_var(--color-cyan)]"></span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* 🚀 TIMELINE SYSTEM */}
          <div className="lg:w-1/2 relative">
            {/* Vertical Animated Timeline Line */}
            <div className="absolute left-[20px] md:left-[40px] top-4 bottom-12 w-[2px] bg-white/5">
              <motion.div 
                className="w-full h-full origin-top bg-gradient-to-b from-[var(--color-cyan)] via-[var(--color-purple)] to-[var(--color-pink)]"
                style={{ scaleY }}
              />
            </div>

            <div className="space-y-24">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 === 0;

                return (
                  <motion.div 
                    key={idx} 
                    className={`process-step relative pl-12 md:pl-24 transition-all`}
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                  >
                    {/* Node */}
                    <div className="absolute left-[13px] md:left-[33px] top-2 w-4 h-4 flex items-center justify-center z-20">
                      <div className="w-4 h-4 rounded-full bg-[#030305] border-2 border-[var(--color-cyan)] relative">
                        <div className="absolute inset-1 rounded-full bg-[var(--color-cyan)] shadow-[0_0_15px_var(--color-cyan)]"></div>
                      </div>
                      <div className="absolute inset-0 rounded-full bg-[var(--color-cyan)] opacity-20 animate-ping"></div>
                    </div>
                    
                    {/* 💎 PROCESS CARD */}
                    <div className="relative group p-8 md:p-10 rounded-[2rem] bg-[rgba(10,15,35,0.68)] backdrop-blur-[24px] border border-white/5 hover:border-[var(--color-cyan)]/30 transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                      
                      {/* Step Number Background */}
                      <span className="absolute -top-6 -right-6 text-[10rem] font-black font-heading text-white opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
                        {step.num}
                      </span>

                      {/* Header */}
                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className="text-white group-hover:text-[var(--color-cyan)] transition-colors" size={28} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
                          <p className="text-[var(--color-cyan)] font-mono text-[10px] tracking-[0.2em] uppercase mt-1">{step.tagline}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8 relative z-10">
                        {step.description}
                      </p>

                      {/* Deliverables & Meta */}
                      <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-white/5 relative z-10">
                        <div>
                          <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-4">Core Deliverables</p>
                          <ul className="space-y-2">
                            {step.deliverables.map((item, i) => (
                              <li key={i} className="text-xs text-white/60 flex items-center gap-2 group/item">
                                <CheckCircle2 size={12} className="text-[var(--color-cyan)] opacity-50 group-hover/item:opacity-100" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col justify-between">
                          <div>
                            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Estimated Timeline</p>
                            <div className="flex items-center gap-2 text-white font-medium">
                              <Clock size={14} className="text-[var(--color-purple)]" />
                              {step.timeline}
                            </div>
                          </div>
                          
                          {/* Visual Differentiator Placeholder/Icon-style */}
                          <div className="opacity-10 group-hover:opacity-30 transition-opacity self-end mt-4">
                            {step.visual === 'terminal' && <Terminal size={40} />}
                            {step.visual === 'blueprint' && <Search size={40} />}
                            {step.visual === 'mesh' && <Palette size={40} />}
                            {step.visual === 'audit' && <ShieldCheck size={40} />}
                            {step.visual === 'cloud' && <Rocket size={40} />}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>


      </div>
    </section>
  );
};
