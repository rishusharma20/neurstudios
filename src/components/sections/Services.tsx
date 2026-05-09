import { useRef, useEffect, useState } from "react";
import { Code2, LayoutTemplate, Box, Rocket, Palette, Database, Cloud, ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    icon: Code2, 
    title: "Full-Stack Applications", 
    desc: "Scalable MERN/PERN systems engineered for performance, secure authentication, and cloud scalability.",
    tags: ['React', 'Node.js', 'APIs'],
    impact: "Revenue Platforms",
    colSpan: 'lg:col-span-8 md:col-span-2',
    glow: '#00D9FF', // Cyan
    visual: 'architecture'
  },
  { 
    icon: LayoutTemplate, 
    title: "Landing Pages", 
    desc: "High-conversion pages with immersive animations and premium design.",
    tags: ['Next.js', 'GSAP', 'WebGL'],
    impact: "Lead Generation",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#FF6B6B', // Red/Pink
    visual: 'mesh'
  },
  { 
    icon: Box, 
    title: "Interactive 3D", 
    desc: "Three.js powered immersive websites that captivate and differentiate your brand.",
    tags: ['Three.js', 'React Fiber', 'Shaders'],
    impact: "Premium Branding",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#00FF88', // Green
    visual: 'cube'
  },
  { 
    icon: Palette, 
    title: "UI/UX Systems", 
    desc: "Beautiful, intuitive interfaces backed by research and accessibility standards.",
    tags: ['Figma', 'Prototyping', 'Tokens'],
    impact: "Reduced Churn",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#C864FF', // Magenta/Purple
    visual: 'layers'
  },
  { 
    icon: Database, 
    title: "API & Backend", 
    desc: "RESTful & GraphQL APIs, advanced database architecture, and secure integrations.",
    tags: ['PostgreSQL', 'Redis', 'Docker'],
    impact: "System Integrity",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#0096FF', // Blue
    visual: 'nodes'
  },
  { 
    icon: Rocket, 
    title: "SaaS Products", 
    desc: "End-to-end SaaS platforms with payment integration and user management.",
    tags: ['Stripe', 'Auth0', 'Multi-tenant'],
    impact: "Recurring ROI",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#7B61FF', // Purple
    visual: 'graph'
  },
  { 
    icon: Cloud, 
    title: "Cloud & Performance", 
    desc: "Production deployment, CI/CD pipelines, speed optimization, and 99.9% uptime architecture.",
    tags: ['AWS', 'Vercel', 'Web Vitals'],
    impact: "Reliability",
    colSpan: 'lg:col-span-8 md:col-span-2',
    glow: '#FFB800', // Amber/Gold
    visual: 'pulse'
  }
];

const metrics = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Technologies" },
  { value: "99%", label: "Satisfaction" },
  { value: "5+", label: "Industries" }
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".services-bg", {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.fromTo(
        ".service-bento",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="section-padding relative bg-[#030305] overflow-hidden" ref={containerRef}>
      {/* 🌌 BACKGROUND ATMOSPHERE */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none services-bg" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
        backgroundSize: '100px 100px',
      }}></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        <div className="mb-20 sm:mb-28 flex flex-col items-center text-center">
          <span className="section-label mb-6">SERVICES_&_SOLUTIONS</span>
          <h2 className="section-heading max-w-4xl">
            Scalable systems <span className="text-gradient">engineered</span> for modern brands
          </h2>
          <p className="section-subheading max-w-2xl mx-auto opacity-60">
            From architecture to deployment, we build high-performance digital ecosystems designed for massive scale and flawless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isHovered = hoveredIndex === idx;
            const isAnyHovered = hoveredIndex !== null;

            return (
              <motion.div 
                key={idx} 
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "service-bento relative group rounded-[2.5rem] overflow-hidden border transition-all duration-700 cursor-pointer flex flex-col justify-between p-8 sm:p-10 min-h-[380px] sm:min-h-[420px]",
                  svc.colSpan,
                  isHovered ? "z-20 border-white/20" : "z-10 border-white/5",
                  isAnyHovered && !isHovered ? "opacity-30 blur-[2px] scale-[0.98]" : "opacity-100 blur-0 scale-100"
                )}
                animate={{
                  backgroundColor: isHovered ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.02)",
                  y: isHovered ? -10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ 
                  "--glow": svc.glow,
                  boxShadow: isHovered ? `0 40px 100px -20px ${svc.glow}22, 0 0 0 1px ${svc.glow}33` : "none"
                } as React.CSSProperties}
              >
                {/* 🌈 ACTIVE INTERNAL LIGHTING */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {/* Radial Ambient Bloom */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: `radial-gradient(circle at center, ${svc.glow}44 0%, transparent 70%)` }}
                      />
                      
                      {/* Reflection Sweep */}
                      <motion.div 
                        initial={{ x: "-100%" }}
                        animate={{ x: "200%" }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none z-0"
                        style={{ background: "linear-gradient(110deg, transparent, rgba(255,255,255,0.05), transparent)" }}
                      />

                      {/* Moving Edge Shimmer */}
                      <motion.div 
                        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--glow)] to-transparent"
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                    </>
                  )}
                </AnimatePresence>

                {/* Corner HUD Accents */}
                <div className={cn(
                  "absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 transition-colors duration-500",
                  isHovered && "border-[var(--glow)]/50"
                )} />
                <div className={cn(
                  "absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 transition-colors duration-500",
                  isHovered && "border-[var(--glow)]/50"
                )} />

                <div className="relative z-10">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-700 mb-10 relative overflow-hidden",
                    isHovered && "bg-white/10 border-[var(--glow)]/30 scale-110"
                  )}>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1.5 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute inset-0 bg-[var(--glow)]/20 blur-xl"
                        />
                      )}
                    </AnimatePresence>
                    <Icon size={28} className={cn(
                      "text-white/80 transition-all duration-700 relative z-10",
                      isHovered && "text-white drop-shadow-[0_0_15px_var(--glow)]"
                    )} />
                  </div>
                  
                  <h3 className={cn(
                    "text-2xl sm:text-3xl font-heading font-black text-white mb-6 tracking-tight transition-all duration-500",
                    isHovered && "text-[var(--glow)] translate-x-2"
                  )}>
                    {svc.title}
                  </h3>
                  
                  <p className={cn(
                    "text-[var(--color-text-secondary)] text-[15px] leading-relaxed max-w-sm transition-all duration-500",
                    isHovered ? "opacity-100 text-white" : "opacity-60"
                  )}>
                    {svc.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {svc.tags.map((tag, i) => (
                      <span key={i} className={cn(
                        "text-[9px] uppercase tracking-widest font-mono px-3.5 py-2 rounded-xl transition-all duration-500",
                        isHovered 
                          ? "bg-[var(--glow)]/10 border-[var(--glow)]/30 text-white" 
                          : "bg-white/5 border-white/10 text-white/40"
                      )}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        isHovered ? "bg-[var(--glow)] shadow-[0_0_15px_var(--glow)] scale-125" : "bg-white/20"
                      )} />
                      <span className={cn(
                        "text-[9px] font-mono uppercase tracking-[0.3em] transition-all duration-500 font-black",
                        isHovered ? "text-white" : "text-white/30"
                      )}>
                        STRATEGIC_VALUE: <span className={isHovered ? "text-[var(--glow)]" : "text-white/60"}>{svc.impact}</span>
                      </span>
                    </div>
                    <ArrowUpRight className={cn(
                      "transition-all duration-500",
                      isHovered ? "text-[var(--glow)] opacity-100 translate-x-0 translate-y-0" : "text-white opacity-0 -translate-x-2 translate-y-2"
                    )} size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="metrics-container mt-32 pt-20 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/20 to-transparent" />
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="impact-metric flex flex-col items-center justify-center text-center group">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-3 text-white tracking-tighter group-hover:text-[var(--color-cyan)] transition-all duration-500">
                {metric.value}
              </h3>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20 group-hover:text-white/50 transition-colors font-black">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
