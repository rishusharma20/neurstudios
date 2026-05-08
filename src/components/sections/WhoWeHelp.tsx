import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, ShoppingCart, Cpu, Building2, UserCircle, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    description: 'White-label technical partnership for your most ambitious client projects.', 
    icon: Building2,
    tags: ['Partnership', 'Scale', 'Delivery'],
    stat: '100% On-Time Delivery',
    colSpan: 'lg:col-span-6',
    bgClasses: 'bg-[rgba(10,20,35,0.65)]',
    glowColor: '#0096FF'
  },
  { 
    title: 'Personal Brands', 
    description: 'Establish digital authority with bespoke, high-performance portfolios.', 
    icon: UserCircle,
    tags: ['Identity', 'SEO', 'Performance'],
    stat: 'Top 1% Audience Reach',
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
      // Cards entrance
      gsap.fromTo(".bento-card", 
        { y: 60, opacity: 0 },
        { 
          y: 0, opacity: 1, 
          duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );
      
      // Background Parallax
      gsap.to(".bg-grid", {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
      
      // Metrics entrance
      gsap.fromTo(".metric-number",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)", scrollTrigger: { trigger: ".metrics-row", start: "top 85%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="who-we-help" className="py-32 relative overflow-hidden bg-[#05050A]" ref={sectionRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-grid" style={{
        backgroundImage: `linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
      }}></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.05] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* 🧠 HERO SECTION ENHANCEMENTS */}
        <div className="mb-24 flex flex-col md:items-center md:text-center">
          <span className="section-label tracking-[0.3em] mb-6">INNOVATION ECOSYSTEM</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-[1.1] tracking-tight max-w-4xl relative">
            Built for <span className="text-gradient">visionary</span> digital products
            {/* Dynamic accent particles */}
            <div className="absolute -top-4 -right-8 w-4 h-4 bg-[var(--color-cyan)] rounded-full blur-[2px] animate-pulse"></div>
            <div className="absolute bottom-4 -left-6 w-2 h-2 bg-[var(--color-purple)] rounded-full blur-[1px] animate-ping"></div>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We engineer premium digital experiences for founders shaping the future. Scale faster with elite engineering and creative intelligence.
          </p>
        </div>

        {/* 🧩 ASYMMETRICAL BENTO CARD LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative">
          {/* SVG Connectors behind cards (visible on desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-20 -z-10"></div>
          <div className="hidden lg:block absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-[var(--color-purple)] to-transparent opacity-20 -z-10"></div>

          {bentoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                className={`bento-card relative group rounded-[2rem] overflow-hidden border border-white/5 backdrop-blur-[20px] transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 md:p-10 min-h-[320px] ${card.colSpan} ${card.bgClasses}`}
                style={{ "--glow": card.glowColor } as React.CSSProperties}
                whileHover={{ y: -5, scale: 0.995 }}
              >
                {/* 💎 PREMIUM CARD DESIGN: Glows & Reflections */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" style={{ boxShadow: `inset 0 0 0 1px var(--glow), inset 0 0 40px rgba(255,255,255,0.02)` }}></div>
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" style={{ backgroundColor: card.glowColor }}></div>
                
                {/* Hover light sweep effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none"></div>

                {/* Top Row: Icon & Stat */}
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500 relative">
                    <Icon size={24} className="text-white group-hover:text-[var(--glow)] transition-colors duration-500" />
                    {/* Icon floating animation on hover */}
                    <div className="absolute inset-0 rounded-2xl border border-[var(--glow)] scale-110 opacity-0 group-hover:opacity-100 group-hover:animate-ping duration-1000"></div>
                  </div>
                  <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 group-hover:border-[var(--glow)] transition-colors duration-500">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: card.glowColor }}></div>
                    <span className="text-xs font-mono text-white/80">{card.stat}</span>
                  </div>
                </div>

                {/* Bottom Row: Content & Tags */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold text-white mb-3 flex items-center justify-between group-hover:text-[var(--glow)] transition-colors duration-500">
                    {card.title}
                    <ArrowUpRight className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" size={20} />
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-6 leading-relaxed">
                    {card.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-white/60 group-hover:text-white/90 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 📊 TRUST & SCALE SECTION BELOW */}
        <div className="metrics-row mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-number flex flex-col items-center justify-center text-center group relative">
              {/* Blur glow beneath numbers */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[var(--color-cyan)] rounded-full blur-[30px] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 group-hover:to-[var(--color-cyan)] transition-all duration-500">
                {metric.value}
              </h3>
              <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-[var(--color-text-muted)] group-hover:text-white transition-colors duration-300">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
