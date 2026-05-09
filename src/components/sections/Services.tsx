import { useRef, useEffect } from "react";
import { Code2, LayoutTemplate, Box, Rocket, Palette, Database, Cloud } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    glow: '#00D9FF',
    visual: 'architecture'
  },
  { 
    icon: LayoutTemplate, 
    title: "Landing Pages", 
    desc: "High-conversion pages with immersive animations and premium design.",
    tags: ['Next.js', 'GSAP', 'WebGL'],
    impact: "Lead Generation",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#FF6B6B',
    visual: 'mesh'
  },
  { 
    icon: Box, 
    title: "Interactive 3D", 
    desc: "Three.js powered immersive websites that captivate and differentiate your brand.",
    tags: ['Three.js', 'React Fiber', 'Shaders'],
    impact: "Premium Branding",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#00FF88',
    visual: 'cube'
  },
  { 
    icon: Palette, 
    title: "UI/UX Systems", 
    desc: "Beautiful, intuitive interfaces backed by research and accessibility standards.",
    tags: ['Figma', 'Prototyping', 'Tokens'],
    impact: "Reduced Churn",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#C864FF',
    visual: 'layers'
  },
  { 
    icon: Database, 
    title: "API & Backend", 
    desc: "RESTful & GraphQL APIs, advanced database architecture, and secure integrations.",
    tags: ['PostgreSQL', 'Redis', 'Docker'],
    impact: "System Integrity",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#0096FF',
    visual: 'nodes'
  },
  { 
    icon: Rocket, 
    title: "SaaS Products", 
    desc: "End-to-end SaaS platforms with payment integration and user management.",
    tags: ['Stripe', 'Auth0', 'Multi-tenant'],
    impact: "Recurring ROI",
    colSpan: 'lg:col-span-4 md:col-span-1',
    glow: '#7B61FF',
    visual: 'graph'
  },
  { 
    icon: Cloud, 
    title: "Cloud & Performance", 
    desc: "Production deployment, CI/CD pipelines, speed optimization, and 99.9% uptime architecture.",
    tags: ['AWS', 'Vercel', 'Web Vitals'],
    impact: "Reliability",
    colSpan: 'lg:col-span-8 md:col-span-2',
    glow: '#FFB800',
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

      gsap.fromTo(
        ".impact-metric",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-container",
            start: "top 90%",
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
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 h-32 opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none hidden lg:block">
            <svg className="absolute inset-0 w-full h-full" style={{ stroke: glow, strokeWidth: 1, fill: 'none', opacity: 0.5 }}>
              <path d="M 96 32 L 96 64 M 96 64 L 24 64 L 24 96 M 96 64 L 168 64 L 168 96 M 96 64 L 96 96" />
            </svg>
          </div>
        );
      case 'mesh':
        return (
          <div className="absolute -bottom-20 -right-20 w-64 h-64 opacity-10 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none rounded-full blur-[60px] group-hover:animate-spin-slow" 
               style={{ background: `conic-gradient(from 0deg, ${glow}, transparent, #7B61FF, transparent, ${glow})` }}>
          </div>
        );
      case 'cube':
        return (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-24 h-24 opacity-5 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none hidden xl:flex items-center justify-center perspective-[1000px]">
             <div className="w-16 h-16 border-2 border-[var(--glow)] transform rotate-x-45 rotate-y-45 group-hover:rotate-x-90 group-hover:rotate-y-180 transition-transform duration-1000 ease-in-out"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="services" className="section-padding relative bg-[#030305] overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none services-bg" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }}></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        <div className="mb-20 sm:mb-28 flex flex-col md:items-center md:text-center">
          <span className="section-label mb-6">SERVICES_&_SOLUTIONS</span>
          <h2 className="section-heading max-w-4xl">
            Scalable systems <span className="text-gradient">engineered</span> for modern brands
          </h2>
          <p className="section-subheading max-w-2xl">
            From architecture to deployment, we build high-performance digital ecosystems designed for massive scale and flawless execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div 
                key={idx} 
                className={cn(
                  "service-bento relative group rounded-[2rem] overflow-hidden border border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 cursor-pointer flex flex-col justify-between p-8 sm:p-10 min-h-[360px]",
                  svc.colSpan
                )}
                style={{ "--glow": svc.glow } as React.CSSProperties}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: `inset 0 0 0 1px var(--glow), inset 0 0 60px ${svc.glow}11` }}></div>
                
                {renderVisual(svc.visual, svc.glow)}

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-500 mb-8 relative">
                    <div className="absolute inset-0 bg-[var(--glow)] opacity-0 group-hover:opacity-20 transition-opacity blur-md" />
                    <Icon size={24} className="text-white group-hover:text-[var(--glow)] transition-all duration-500 relative z-10 group-hover:scale-110" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4 group-hover:text-[var(--glow)] transition-colors duration-500 tracking-tight">
                    {svc.title}
                  </h3>
                  
                  <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed max-w-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    {svc.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-8 border-t border-white/5">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {svc.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase tracking-widest font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 group-hover:text-white group-hover:border-[var(--glow)]/30 transition-all duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--glow)] animate-pulse shadow-[0_0_10px_var(--glow)]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">
                      STRATEGIC_VALUE: <span className="text-white font-bold">{svc.impact}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="metrics-container mt-32 pt-16 border-t border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, idx) => (
            <div key={idx} className="impact-metric flex flex-col items-center justify-center text-center group py-4">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black mb-3 text-white tracking-tighter group-hover:text-[var(--color-cyan)] transition-colors duration-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                {metric.value}
              </h3>
              <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/30 group-hover:text-white transition-colors duration-300 font-bold">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
