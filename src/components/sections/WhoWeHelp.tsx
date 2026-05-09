import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, ShoppingCart, Cpu, Building2, UserCircle, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

const bentoCards = [
  { 
    title: 'AI Products', 
    description: 'Build intelligent systems powered by automation and real-time intelligence.', 
    icon: Cpu,
    tags: ['AI', 'Automation', 'Analytics'],
    stat: '+40% Faster Workflows',
    colSpan: 'lg:col-span-8',
    bgClasses: 'bg-[rgba(10,15,35,0.65)]',
    glowColor: '#00D9FF'
  },
  { 
    title: 'SaaS Startups', 
    description: 'Accelerate go-to-market with scalable cloud architectures.', 
    icon: Rocket,
    tags: ['Cloud', 'Scalability', 'SaaS'],
    stat: '3x Growth Speed',
    colSpan: 'lg:col-span-4',
    bgClasses: 'bg-[rgba(15,10,35,0.65)]',
    glowColor: '#7B61FF'
  },
  { 
    title: 'Creative Brands', 
    description: 'Stand out with immersive, WebGL-powered interactive experiences.', 
    icon: Sparkles,
    tags: ['WebGL', 'Motion', '3D'],
    stat: '2x Engagement',
    colSpan: 'lg:col-span-4',
    bgClasses: 'bg-[rgba(35,10,25,0.65)]',
    glowColor: '#FF6B6B'
  },
  { 
    title: 'E-Commerce', 
    description: 'High-conversion storefronts engineered for lightning speed and scale.', 
    icon: ShoppingCart,
    tags: ['Headless', 'Payments', 'Conversion'],
    stat: '+65% Conversion Rate',
    colSpan: 'lg:col-span-8',
    bgClasses: 'bg-[rgba(10,25,20,0.65)]',
    glowColor: '#00FF88'
  },
  { 
    title: 'Digital Agencies', 
    description: 'White-label technical partnership for your most ambitious projects.', 
    icon: Building2,
    tags: ['Partnership', 'Scale', 'Delivery'],
    stat: '100% On-Time',
    colSpan: 'lg:col-span-6',
    bgClasses: 'bg-[rgba(10,20,35,0.65)]',
    glowColor: '#0096FF'
  },
  { 
    title: 'Personal Brands', 
    description: 'Establish digital authority with bespoke, high-performance portfolios.', 
    icon: UserCircle,
    tags: ['Identity', 'SEO', 'Performance'],
    stat: 'Top 1% Reach',
    colSpan: 'lg:col-span-6',
    bgClasses: 'bg-[rgba(25,15,35,0.65)]',
    glowColor: '#C864FF'
  },
];

const metrics = [
  { value: "50+", label: "Ventures Launched" },
  { value: "20+", label: "Global Partners" },
  { value: "10+", label: "Tech Stacks" },
  { value: "99%", label: "Success Rate" }
];

export function WhoWeHelp() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".bento-card", 
        { y: 40, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
      
      gsap.to(".bg-grid", {
        y: "10%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      gsap.fromTo(".metric-number",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".metrics-row", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="who-we-help" className="section-padding relative overflow-hidden bg-[#030305]" ref={sectionRef}>
      {/* 🌌 BACKGROUND REFINEMENT — Cleaner atmosphere */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-grid" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
        transform: 'perspective(1000px) rotateX(15deg) translateY(-50px)',
      }}></div>
      
      {/* Soft Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[var(--color-cyan)]/10 to-transparent blur-[120px] opacity-[0.15] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* 🧠 HERO SECTION REFINEMENT — Better Line Balance */}
        <div className="mb-20 sm:mb-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="section-label mb-8">INNOVATION_ECOSYSTEM</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-white mb-8 max-w-2xl leading-[1.1] tracking-tight">
              Built for <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-cyan)] via-[var(--color-purple)] to-[var(--color-cyan)] bg-[length:200%_auto] animate-gradient-slow">visionary</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent"
                  animate={{ opacity: [0.2, 0.5, 0.2], scaleX: [0.8, 1, 0.8] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </span> <br /> digital products
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed opacity-60 font-medium">
              We engineer elite digital systems for founders and brands shaping the next era of innovation. Precision design meets neural intelligence.
            </p>
          </motion.div>
        </div>

        {/* 🧩 REFINED BENTO GRID — Stronger Alignment & Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 relative">
          {bentoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className={cn(
                  "bento-card relative group rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.01] backdrop-blur-xl transition-all duration-700 cursor-pointer flex flex-col justify-between p-8 sm:p-10 min-h-[300px]",
                  card.colSpan
                )}
                style={{ "--glow": card.glowColor } as React.CSSProperties}
                whileHover={{ 
                  y: -8,
                  backgroundColor: "rgba(255,255,255,0.02)",
                  borderColor: "rgba(255,255,255,0.1)"
                }}
              >
                {/* Refined Shine Sweep */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                {/* Subtle Glow Balance */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] opacity-[0.05] group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: card.glowColor }} />
                
                {/* Internal HUD Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/10 group-hover:border-[var(--glow)]/30 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/10 group-hover:border-[var(--glow)]/30 transition-colors" />

                {/* Top Row: Icon & Stat */}
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-center group-hover:border-[var(--glow)]/20 transition-all duration-500">
                    <Icon size={20} className="text-white/80 group-hover:text-[var(--glow)] group-hover:drop-shadow-[0_0_8px_var(--glow)] transition-all duration-500" />
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2 group-hover:border-[var(--glow)]/20 transition-all duration-500">
                    <div className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: card.glowColor, boxShadow: `0 0 10px ${card.glowColor}` }} />
                    <span className="text-[8px] font-mono text-white/40 font-black tracking-widest uppercase group-hover:text-white/70 transition-colors">{card.stat}</span>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-4 flex items-center justify-between tracking-tight group-hover:translate-x-1 transition-transform duration-500">
                    {card.title}
                    <ArrowUpRight className="opacity-0 group-hover:opacity-40 transition-all duration-300" size={16} />
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-8 leading-relaxed opacity-50 group-hover:opacity-70 transition-opacity font-medium">
                    {card.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span key={i} className="text-[8px] uppercase tracking-[0.2em] font-mono px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/30 font-black group-hover:text-white/50 group-hover:border-white/10 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 📊 REFINED METRICS SECTION */}
        <div className="metrics-row mt-32 sm:mt-48 pt-20 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/20 to-transparent" />
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-number flex flex-col items-center justify-center text-center group relative">
              <h3 className="text-4xl sm:text-5xl font-heading font-black mb-3 text-white tracking-tighter group-hover:text-[var(--color-cyan)] group-hover:scale-110 transition-all duration-500">
                {metric.value}
              </h3>
              <p className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-300 font-black">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
