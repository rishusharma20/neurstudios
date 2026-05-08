import React, { useRef, useEffect } from "react";
import { ArrowRight, ExternalLink, MonitorPlay } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards
      gsap.fromTo(
        ".project-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Neural pathways animation
      gsap.fromTo(
        ".neural-path",
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-32 bg-[var(--color-primary)] relative overflow-hidden">
      {/* Background Neural Pathways */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <path 
            className="neural-path" 
            d="M 100 0 C 100 300, 300 400, 300 800 C 300 1200, 100 1300, 100 1800" 
            fill="none" 
            stroke="url(#cyan-gradient)" 
            strokeWidth="2"
            strokeDasharray="1000"
          />
          <path 
            className="neural-path" 
            d="M 800 0 C 800 500, 500 600, 500 1000 C 500 1400, 800 1500, 800 1800" 
            fill="none" 
            stroke="url(#purple-gradient)" 
            strokeWidth="2"
            strokeDasharray="1000"
          />
          <defs>
            <linearGradient id="cyan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D9FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7B61FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#7B61FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#7B61FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10" ref={containerRef}>
        <div className="mb-20">
          <span className="section-label">PROJECT SHOWCASE</span>
          <h2 className="section-heading mb-0">
            Selected <span className="text-gradient">Works</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          {/* FEATURED PROJECT: GharTak */}
          <div className="project-card relative group">
            {/* Glowing border effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-purple)] rounded-[2.5rem] opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-700"></div>
            
            <div className="glass rounded-[2rem] overflow-hidden flex flex-col lg:flex-row relative z-10 border-[rgba(255,255,255,0.05)] bg-[#0A0A0F]/80 backdrop-blur-xl">
              
              {/* Image Section */}
              <div className="lg:w-3/5 relative overflow-hidden aspect-video lg:aspect-auto min-h-[300px]">
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/50 text-[#00D9FF] text-xs font-mono font-bold tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(0,217,255,0.3)] backdrop-blur-md">
                    Featured
                  </span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200&h=800" 
                  alt="GharTak Dashboard" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-widest border border-[var(--color-cyan)]/30 px-2 py-1 rounded">Safety Tech</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-widest border border-[var(--color-purple)]/30 px-2 py-1 rounded">Social Impact</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-tight">
                  <span className="font-sans">घरतक</span> — Night Travel Safety Monitoring System
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-6 text-sm md:text-base leading-relaxed">
                  <span className="text-[var(--color-cyan)] font-medium">Challenge:</span> Women's safety during night travel required a reliable, automated monitoring solution with instant emergency alerts.
                  <br/><br/>
                  <span className="text-[var(--color-cyan)] font-medium">Solution:</span> Built a web-based safety platform enabling journey registration, trusted contact management, live tracking, and automatic overdue detection with emergency notifications.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-8">
                  {["Journey Registration", "Live Tracking", "Overdue Alerts", "Emergency Notifications", "Contact Management", "Secure Auth"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-[var(--color-text-muted)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_5px_rgba(0,217,255,0.8)] shrink-0"></div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a href="https://ghartak-production.up.railway.app/" target="_blank" rel="noreferrer" className="btn-primary py-3 px-6 h-auto text-sm w-full sm:w-auto">
                    <ExternalLink size={16} className="mr-2" />
                    VISIT LIVE SITE
                  </a>
                  <a href="#" className="btn-secondary py-3 px-6 h-auto text-sm w-full sm:w-auto">
                    READ FULL CASE STUDY
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY PROJECTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Project: BST Demo */}
            <div className="project-card glass rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border-[rgba(255,255,255,0.05)]">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450" 
                  alt="BST Demo" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-widest border border-[var(--color-cyan)]/30 px-2 py-1 rounded">EdTech</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-widest border border-[var(--color-purple)]/30 px-2 py-1 rounded">Interactive Learning</span>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-white mb-3">BST Demo — Interactive Data Structure Visualization</h3>
                
                <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-3">
                  Developed an interactive visualization platform with real-time BST operations, step-by-step animations, and educational tooltips to make abstract algorithms intuitive and accessible for computer science students.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {["JS Engine", "Canvas/SVG", "Animations", "Vercel"].map(t => (
                    <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href="https://bstdemo.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--color-cyan)] text-sm font-bold uppercase tracking-wider flex items-center hover:text-white transition-colors">
                    <MonitorPlay size={16} className="mr-2" />
                    TRY LIVE DEMO
                  </a>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <a href="#" className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider flex items-center hover:text-white transition-colors">
                    EXPLORE FEATURES
                  </a>
                </div>
              </div>
            </div>

            {/* Project: Aeronexx */}
            <div className="project-card glass rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border-[rgba(255,255,255,0.05)]">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=450" 
                  alt="Aeronexx Platform" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
              </div>
              
              <div className="p-8 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-widest border border-[var(--color-cyan)]/30 px-2 py-1 rounded">Innovation</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-widest border border-[var(--color-purple)]/30 px-2 py-1 rounded">AI & Full-Stack</span>
                </div>
                
                <h3 className="text-2xl font-heading font-bold text-white mb-3">Aeronexx — Digital Innovation Platform</h3>
                
                <p className="text-[var(--color-text-secondary)] text-sm mb-6 line-clamp-3">
                  A modern technology platform focused on building advanced software products, web applications, AI-powered solutions, and immersive digital experiences.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {["React", "AI Solutions", "Full-Stack", "Web Apps"].map(t => (
                    <span key={t} className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-white/70">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href="https://aeronexx.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--color-cyan)] text-sm font-bold uppercase tracking-wider flex items-center hover:text-white transition-colors">
                    <ExternalLink size={16} className="mr-2" />
                    VISIT PLATFORM
                  </a>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <a href="#" className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-wider flex items-center hover:text-white transition-colors">
                    EXPLORE MORE
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
