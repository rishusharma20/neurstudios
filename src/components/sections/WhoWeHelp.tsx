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
    <section id="who-we-help" className="section-padding relative overflow-hidden bg-[#05050A]" ref={sectionRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-grid" style={{
        backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
      }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* 🧠 HERO SECTION */}
        <div className="mb-16 sm:mb-24 flex flex-col md:items-center md:text-center">
          <span className="section-label mb-6">INNOVATION_ECOSYSTEM</span>
          <h2 className="section-heading mb-8 max-w-4xl">
            Built for <span className="text-gradient">visionary</span> <br className="hidden sm:block" /> digital products
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-70 font-medium">
            We engineer premium digital experiences for founders shaping the future. Scale faster with elite engineering and creative intelligence.
          </p>
        </div>

        {/* 🧩 ASYMMETRICAL BENTO CARD LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 relative">
          {/* SVG Connectors */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/20 to-transparent -z-10" />
          <div className="hidden lg:block absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-purple)]/20 to-transparent -z-10" />

          {bentoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className={cn(
                  "bento-card relative group rounded-[2.5rem] overflow-hidden border border-white/5 backdrop-blur-3xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 sm:p-10 min-h-[280px] sm:min-h-[320px]",
                  card.colSpan,
                  card.bgClasses
                )}
                style={{ "--glow": card.glowColor } as React.CSSProperties}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2.5rem]" style={{ boxShadow: `inset 0 0 0 1px var(--glow), inset 0 0 40px rgba(255,255,255,0.01)` }} />
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: card.glowColor }} />
                
                {/* Top Row: Icon & Stat */}
                <div className="flex justify-between items-start mb-10 relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.05] transition-colors duration-500 relative">
                    <Icon size={22} className="text-white group-hover:text-[var(--glow)] transition-colors duration-500" />
                  </div>
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 group-hover:border-[var(--glow)]/40 transition-colors duration-500">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_var(--glow)]" style={{ backgroundColor: card.glowColor }} />
                    <span className="text-[9px] font-mono text-white/50 font-black tracking-widest uppercase">{card.stat}</span>
                  </div>
                </div>

                {/* Bottom Row: Content & Tags */}
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-3 flex items-center justify-between group-hover:text-[var(--glow)] transition-colors duration-500 tracking-tight">
                    {card.title}
                    <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" size={18} />
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed opacity-60 font-medium">
                    {card.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] uppercase tracking-[0.2em] font-mono px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/40 font-black">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 📊 TRUST & SCALE SECTION */}
        <div className="metrics-row mt-24 sm:mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)]/20 to-transparent" />
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-number flex flex-col items-center justify-center text-center group relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--color-cyan)] rounded-full blur-[40px] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black mb-2 text-white tracking-tighter group-hover:text-[var(--color-cyan)] transition-all duration-500">
                {metric.value}
              </h3>
              <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300 font-black">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
