import { useRef, useEffect } from "react";
import { Code2, LayoutTemplate, Box, Rocket, Palette, Database, Cloud } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    icon: Code2, 
    title: "Full-Stack Applications", 
    desc: "Scalable MERN/PERN systems engineered for performance, secure authentication, and cloud scalability.",
    tags: ['React', 'Node.js', 'APIs'],
    impact: "Revenue Platforms, Dashboards",
    colSpan: 'lg:col-span-8',
    glow: '#00D9FF',
    visual: 'architecture'
  },
  { 
    icon: LayoutTemplate, 
    title: "Landing Pages", 
    desc: "High-conversion pages with immersive animations and premium design.",
    tags: ['Next.js', 'GSAP', 'WebGL'],
    impact: "Lead Generation",
    colSpan: 'lg:col-span-4',
    glow: '#FF6B6B',
    visual: 'mesh'
  },
  { 
    icon: Box, 
    title: "Interactive 3D", 
    desc: "Three.js powered immersive websites that captivate and differentiate your brand.",
    tags: ['Three.js', 'React Fiber', 'Shaders'],
    impact: "Premium Positioning",
    colSpan: 'lg:col-span-4',
    glow: '#00FF88',
    visual: 'cube'
  },
  { 
    icon: Palette, 
    title: "UI/UX Design Systems", 
    desc: "Beautiful, intuitive interfaces backed by research and accessibility standards.",
    tags: ['Figma', 'Prototyping', 'Tokens'],
    impact: "Reduced Churn",
    colSpan: 'lg:col-span-4',
    glow: '#C864FF',
    visual: 'layers'
  },
  { 
    icon: Database, 
    title: "API & Backend", 
    desc: "RESTful & GraphQL APIs, advanced database architecture, and secure integrations.",
    tags: ['PostgreSQL', 'Redis', 'Docker'],
    impact: "System Integration",
    colSpan: 'lg:col-span-4',
    glow: '#0096FF',
    visual: 'nodes'
  },
  { 
    icon: Rocket, 
    title: "SaaS Development", 
    desc: "End-to-end SaaS platforms with payment integration and user management.",
    tags: ['Stripe', 'Auth0', 'Multi-tenant'],
    impact: "Recurring Revenue",
    colSpan: 'lg:col-span-4',
    glow: '#7B61FF',
    visual: 'graph'
  },
  { 
    icon: Cloud, 
    title: "Cloud & Performance", 
    desc: "Production deployment, CI/CD pipelines, speed optimization, and 99.9% uptime architecture.",
    tags: ['AWS', 'Vercel', 'Web Vitals'],
    impact: "Reliability & ROI",
    colSpan: 'lg:col-span-8',
    glow: '#FFB800',
    visual: 'pulse'
  }
];

const metrics = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Technologies" },
  { value: "99%", label: "Client Satisfaction" },
  { value: "5+", label: "Industries Served" }
];

export const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Grid Parallax
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

      // Cards Entrance
      gsap.fromTo(
        ".service-bento",
        { y: 80, opacity: 0 },
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

      // Metrics Entrance
      gsap.fromTo(
        ".impact-metric",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".metrics-container",
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const renderVisual = (type: string, glow: string) => {
    switch (type) {
      case 'architecture':
        return (
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-32 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none hidden md:block">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 border border-[var(--glow)] rounded bg-[var(--glow)]/10"></div>
            <div className="absolute bottom-0 left-0 w-12 h-8 border border-[var(--glow)] rounded bg-[var(--glow)]/10"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-8 border border-[var(--glow)] rounded bg-[var(--glow)]/10"></div>
            <div className="absolute bottom-0 right-0 w-12 h-8 border border-[var(--glow)] rounded bg-[var(--glow)]/10"></div>
            <svg className="absolute inset-0 w-full h-full" style={{ stroke: glow, strokeWidth: 1, fill: 'none', opacity: 0.5 }}>
              <path d="M 96 32 L 96 64 M 96 64 L 24 64 L 24 96 M 96 64 L 168 64 L 168 96 M 96 64 L 96 96" />
            </svg>
          </div>
        );
      case 'mesh':
        return (
          <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none rounded-full blur-[40px] group-hover:animate-spin-slow" 
               style={{ background: `conic-gradient(from 0deg, ${glow}, transparent, #7B61FF, transparent, ${glow})` }}>
          </div>
        );
      case 'cube':
        return (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none hidden md:flex items-center justify-center perspective-[1000px]">
             <div className="w-16 h-16 border-2 border-[var(--glow)] transform rotate-x-45 rotate-y-45 group-hover:rotate-x-90 group-hover:rotate-y-180 transition-transform duration-1000 ease-in-out"></div>
          </div>
        );
      case 'layers':
        return (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none hidden md:block">
            <div className="absolute inset-0 border border-[var(--glow)] bg-[var(--glow)]/5 rounded-xl transform translate-y-4 translate-x-4"></div>
            <div className="absolute inset-0 border border-[var(--glow)] bg-[var(--glow)]/10 rounded-xl transform translate-y-2 translate-x-2"></div>
            <div className="absolute inset-0 border border-[var(--glow)] bg-[var(--glow)]/20 rounded-xl group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500"></div>
          </div>
        );
      case 'nodes':
        return (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-20 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none hidden md:block">
             <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--glow)] animate-pulse shadow-[0_0_10px_var(--glow)]"></div>
             <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-[var(--glow)] animate-ping shadow-[0_0_15px_var(--glow)]" style={{ animationDuration: '3s' }}></div>
             <div className="absolute top-1/2 right-4 w-2 h-2 rounded-full bg-[var(--glow)] shadow-[0_0_5px_var(--glow)]"></div>
             <svg className="absolute inset-0 w-full h-full" style={{ stroke: glow, strokeWidth: 1, strokeDasharray: '4 4' }}>
               <line x1="28" y1="28" x2="80" y2="80" />
               <line x1="80" y1="80" x2="80" y2="48" />
             </svg>
          </div>
        );
      case 'graph':
        return (
          <div className="absolute right-8 bottom-4 w-32 h-24 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none hidden md:block">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <path d="M 0 96 C 20 80, 40 90, 60 50 C 80 10, 100 40, 128 0" fill="none" stroke="var(--glow)" strokeWidth="2" className="group-hover:stroke-[3px]" />
              <path d="M 0 96 C 20 80, 40 90, 60 50 C 80 10, 100 40, 128 0 L 128 96 L 0 96 Z" fill="url(#graph-gradient)" opacity="0.2" />
              <defs>
                <linearGradient id="graph-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--glow)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        );
      case 'pulse':
        return (
          <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none hidden md:flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border border-[var(--glow)] animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute w-2/3 h-2/3 rounded-full border border-[var(--glow)] animate-ping" style={{ animationDuration: '2s' }}></div>
            <div className="w-1/3 h-1/3 rounded-full bg-[var(--glow)] shadow-[0_0_20px_var(--glow)]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" className="py-32 relative bg-[#030305] overflow-hidden" ref={containerRef}>
      {/* 🌌 BACKGROUND ENHANCEMENT */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none services-bg" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}></div>
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[var(--color-purple)] rounded-full mix-blend-screen filter blur-[250px] opacity-[0.07] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[200px] opacity-[0.05] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* 🧠 HERO HEADING ENHANCEMENT */}
        <div className="mb-24 flex flex-col md:items-center md:text-center relative">
          <span className="section-label tracking-[0.3em] mb-6">PRODUCT ENGINEERING</span>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-heading font-black text-white mb-6 leading-[1.1] tracking-tight max-w-4xl relative">
            Scalable systems <span className="text-gradient">crafted</span> for modern brands
            <div className="absolute top-0 right-10 w-3 h-3 bg-[var(--color-cyan)] rounded-full blur-[2px] animate-pulse"></div>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From architecture to deployment, we build high-performance digital ecosystems designed for massive scale and flawless execution.
          </p>
        </div>

        {/* 🧩 12-COLUMN BENTO LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 relative">
          {/* 🌐 CONNECTING VISUAL SYSTEM */}
          <div className="hidden lg:block absolute top-[33%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute top-[66%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute left-1/3 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"></div>
          <div className="hidden lg:block absolute left-2/3 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none"></div>

          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx} 
                className={`service-bento relative group rounded-[2rem] overflow-hidden border border-white/5 bg-[rgba(8,15,35,0.65)] backdrop-blur-[24px] transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 md:p-10 min-h-[340px] ${svc.colSpan}`}
                style={{ "--glow": svc.glow } as React.CSSProperties}
              >
                {/* 💎 GLASSMORPHISM & NEON SHADOWS */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem]" style={{ boxShadow: `inset 0 0 0 1px var(--glow), inset 0 0 40px rgba(255,255,255,0.01)` }}></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[var(--glow)] to-transparent opacity-0 group-hover:opacity-50 transition-all duration-700"></div>
                
                {/* Visual Differentiation Decorators */}
                {renderVisual(svc.visual, svc.glow)}

                {/* Top Section */}
                <div className="relative z-10 flex flex-col items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[var(--glow)] opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-md"></div>
                    <Icon size={24} className="text-white group-hover:text-[var(--glow)] transition-colors duration-500 relative z-10 group-hover:scale-110" />
                  </div>
                  
                  <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[var(--glow)] transition-colors duration-500">
                    {svc.title}
                  </h3>
                  
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-sm">
                    {svc.desc}
                  </p>
                </div>

                {/* Bottom Section: Tags & Impact */}
                <div className="relative z-10 mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-wider font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 group-hover:text-white/90 group-hover:border-[var(--glow)]/30 transition-all duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--glow)] animate-pulse shadow-[0_0_8px_var(--glow)]"></div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                      Impact: <span className="text-white/80">{svc.impact}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 📊 BUSINESS IMPACT SECTION */}
        <div className="metrics-container mt-32 pt-16 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-30"></div>
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="impact-metric flex flex-col items-center justify-center text-center group">
              <h3 className="text-5xl md:text-6xl font-heading font-black mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all duration-500">
                {metric.value}
              </h3>
              <p className="text-xs md:text-sm font-mono tracking-widest uppercase text-[var(--color-text-muted)] group-hover:text-[var(--color-cyan)] transition-colors duration-300">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
