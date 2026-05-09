import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Palette, Code2, ShieldCheck, Rocket, CheckCircle2, Clock, Terminal } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStep {
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  icon: any;
  color: string;
  visual: string;
}

const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "DISCOVER & PLAN",
    tagline: "Strategic Foundation",
    description: "We analyze goals, user behavior, and product direction to establish a scalable digital foundation.",
    deliverables: ["Product Strategy", "User Research", "Wireframes", "Technical Planning"],
    timeline: "1–2 Weeks",
    icon: Search,
    color: "#00D9FF",
    visual: "blueprint"
  },
  {
    num: "02",
    title: "DESIGN & PROTOTYPE",
    tagline: "High-Fidelity Visuals",
    description: "Our team crafts a premium visual language and interactive prototypes that prioritize aesthetics and conversions.",
    deliverables: ["UI/UX Design", "Visual Identity", "Design System", "Prototypes"],
    timeline: "2–3 Weeks",
    icon: Palette,
    color: "#7B61FF",
    visual: "mesh"
  },
  {
    num: "03",
    title: "DEVELOP & ENGINEER",
    tagline: "Full-Stack Implementation",
    description: "We engineer high-performance systems using modern tech stacks, focusing on security and code excellence.",
    deliverables: ["Frontend Architecture", "Backend Integration", "API Development", "DB Optimization"],
    timeline: "4–8 Weeks",
    icon: Code2,
    color: "#00FF88",
    visual: "terminal"
  },
  {
    num: "04",
    title: "TEST & OPTIMIZE",
    tagline: "Quality Assurance",
    description: "Rigorous testing across devices ensures a bug-free experience and peak technical performance.",
    deliverables: ["Security Audit", "Performance Testing", "Browser QA", "Web Vitals"],
    timeline: "1–2 Weeks",
    icon: ShieldCheck,
    color: "#FFB800",
    visual: "audit"
  },
  {
    num: "05",
    title: "DEPLOY & SUPPORT",
    tagline: "Launch & Infrastructure",
    description: "We handle the entire deployment lifecycle and provide ongoing support to ensure your product scales.",
    deliverables: ["CI/CD Setup", "Cloud Deployment", "Launch Support", "Scaling"],
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
      gsap.fromTo(".process-hero-text", 
        { y: 40, opacity: 0 },
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

      gsap.to(".process-bg-grid", {
        y: -80,
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
    <section id="process" className="section-padding relative bg-[#030305] overflow-hidden" ref={containerRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none process-bg-grid" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}></div>
      
      {/* Cinematic Radial Beams */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.05]"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-[var(--color-purple)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.05]"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* 🧠 HERO TEXT AREA */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32">
            <div className="process-hero-text">
              <span className="section-label mb-6">ENGINEERING_LIFECYCLE</span>
              <h2 className="section-heading mb-8">
                Strategic <span className="text-gradient">Design.</span><br />
                Neural <span className="text-gradient">Logic.</span>
              </h2>
            </div>
            <p className="process-hero-text text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-lg mb-10 opacity-80 font-medium">
              We follow a precision-engineered lifecycle to transform ambitious visions into scalable digital realities. Every phase is crafted for elite performance.
            </p>

            <div className="process-hero-text flex flex-wrap gap-2 sm:gap-3">
              {["Agile Workflow", "Scalable Ops", "Code Excellence", "Scale Support"].map((text) => (
                <div key={text} className="px-4 py-2 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md text-[9px] font-mono tracking-widest uppercase text-white/40 font-black">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] inline-block mr-2 shadow-[0_0_8px_var(--color-cyan)]" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* 🚀 TIMELINE SYSTEM */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            {/* Vertical Animated Timeline Line */}
            <div className="absolute left-[15px] sm:left-[20px] md:left-[40px] top-4 bottom-12 w-[1px] bg-white/5">
              <motion.div 
                className="w-full h-full origin-top bg-gradient-to-b from-[var(--color-cyan)] via-[var(--color-purple)] to-[var(--color-pink)]"
                style={{ scaleY }}
              />
            </div>

            <div className="space-y-16 sm:space-y-24">
              {processSteps.map((step, idx) => {
                const Icon = step.icon;
                const isEven = idx % 2 === 0;

                return (
                  <motion.div 
                    key={idx} 
                    className={`process-step relative pl-10 sm:pl-12 md:pl-24 transition-all`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                  >
                    {/* Node */}
                    <div className="absolute left-[8px] sm:left-[13px] md:left-[33px] top-2 w-4 h-4 flex items-center justify-center z-20">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#030305] border border-[var(--color-cyan)] relative">
                        <div className="absolute inset-0.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan)]" />
                      </div>
                    </div>
                    
                    {/* 💎 PROCESS CARD */}
                    <div className="relative group p-8 sm:p-10 rounded-[2.5rem] bg-white/[0.01] backdrop-blur-2xl border border-white/5 hover:border-[var(--color-cyan)]/20 transition-all duration-500 overflow-hidden shadow-2xl">
                      
                      {/* Step Number Background */}
                      <span className="absolute -top-4 -right-4 text-[6rem] sm:text-[8rem] lg:text-[10rem] font-black font-heading text-white opacity-[0.01] pointer-events-none group-hover:opacity-[0.03] transition-opacity">
                        {step.num}
                      </span>

                      {/* Header */}
                      <div className="flex items-center gap-5 sm:gap-6 mb-8 relative z-10">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--color-cyan)]/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[var(--color-cyan)]/10">
                          <Icon className="text-white group-hover:text-[var(--color-cyan)] transition-colors" size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none mb-2">{step.title}</h3>
                          <p className="text-[var(--color-cyan)] font-mono text-[9px] tracking-[0.2em] uppercase font-black">{step.tagline}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed mb-8 relative z-10 opacity-70 font-medium">
                        {step.description}
                      </p>

                      {/* Deliverables & Meta */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/5 relative z-10">
                        <div>
                          <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 mb-5 font-black">Core_Deliverables</p>
                          <ul className="space-y-3">
                            {step.deliverables.map((item, i) => (
                              <li key={i} className="text-[11px] text-white/50 flex items-center gap-3 font-mono tracking-wider">
                                <div className="w-1 h-1 rounded-full bg-[var(--color-cyan)] opacity-40" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col justify-between items-start">
                          <div>
                            <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 mb-3 font-black">Phase_Timeline</p>
                            <div className="flex items-center gap-3 text-white/80 font-bold text-xs sm:text-sm">
                              <Clock size={14} className="text-[var(--color-cyan)]" />
                              {step.timeline}
                            </div>
                          </div>
                          
                          <div className="opacity-[0.03] group-hover:opacity-[0.1] transition-opacity self-end mt-4 text-white">
                            {step.visual === 'terminal' && <Terminal size={32} />}
                            {step.visual === 'blueprint' && <Search size={32} />}
                            {step.visual === 'mesh' && <Palette size={32} />}
                            {step.visual === 'audit' && <ShieldCheck size={32} />}
                            {step.visual === 'cloud' && <Rocket size={32} />}
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
