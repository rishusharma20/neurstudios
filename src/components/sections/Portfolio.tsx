import { useRef, useEffect } from "react";
import { ExternalLink, MonitorPlay } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Portfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    <section id="projects" className="section-padding bg-[var(--color-primary)] relative overflow-hidden">
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
        <div className="mb-16 sm:mb-24">
          <span className="section-label">PROJECT SHOWCASE</span>
          <h2 className="section-heading mb-0">
            Selected <span className="text-gradient">Works</span>
          </h2>
        </div>

        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24">
          {/* FEATURED PROJECT: GharTak */}
          <div className="project-card relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--color-cyan)] to-[var(--color-purple)] rounded-[2.5rem] opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-700"></div>
            
            <div className="glass rounded-[2rem] overflow-hidden flex flex-col lg:flex-row relative z-10 border-[rgba(255,255,255,0.05)] bg-[#0A0A0F]/80 backdrop-blur-xl">
              
              {/* Image Section */}
              <div className="lg:w-3/5 relative overflow-hidden aspect-video lg:aspect-auto min-h-[250px] sm:min-h-[400px]">
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/50 text-[#00D9FF] text-[10px] font-mono font-black tracking-widest uppercase rounded-full shadow-[0_0_10px_rgba(0,217,255,0.3)] backdrop-blur-md">
                    Featured
                  </span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1200&h=800" 
                  alt="GharTak Dashboard" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent lg:bg-gradient-to-r"></div>
              </div>

              {/* Content Section */}
              <div className="lg:w-2/5 p-8 sm:p-10 md:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-[0.2em] border border-[var(--color-cyan)]/30 px-2.5 py-1 rounded-lg font-black">Safety Tech</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-[0.2em] border border-[var(--color-purple)]/30 px-2.5 py-1 rounded-lg font-black">Social Impact</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-heading font-black text-white mb-6 leading-tight tracking-tight">
                  <span className="font-sans">घरतक</span> — Night Travel Safety Monitoring System
                </h3>
                
                <p className="text-[var(--color-text-secondary)] mb-8 text-sm sm:text-base leading-relaxed opacity-80">
                  <span className="text-[var(--color-cyan)] font-black uppercase text-[10px] tracking-widest">Challenge:</span> Women's safety during night travel required a reliable, automated monitoring solution with instant emergency alerts.
                  <br/><br/>
                  <span className="text-[var(--color-cyan)] font-black uppercase text-[10px] tracking-widest">Solution:</span> Built a web-based safety platform enabling journey registration, trusted contact management, live tracking, and automatic overdue detection.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 mb-10">
                  {["Journey Registration", "Live Tracking", "Overdue Alerts", "Emergency Notifications", "Contact Management", "Secure Auth"].map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-white/50 font-mono tracking-wider">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_8px_rgba(0,217,255,0.8)] shrink-0"></div>
                      <span className="truncate">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a href="https://ghartak-production.up.railway.app/" target="_blank" rel="noreferrer" className="btn-primary py-4 px-8 h-auto text-[10px] tracking-[0.2em] font-black w-full sm:w-auto">
                    <ExternalLink size={14} className="mr-2" />
                    VISIT_LIVE_SITE
                  </a>
                  <a href="#" className="btn-secondary py-4 px-8 h-auto text-[10px] tracking-[0.2em] font-black w-full sm:w-auto">
                    READ_CASE_STUDY
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY PROJECTS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Project: BST Demo */}
            <div className="project-card glass rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500 border-[rgba(255,255,255,0.05)] bg-white/[0.02]">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=450" 
                  alt="BST Demo" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
              </div>
              
              <div className="p-8 sm:p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-[0.2em] border border-[var(--color-cyan)]/30 px-2.5 py-1 rounded-lg font-black">EdTech</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-[0.2em] border border-[var(--color-purple)]/30 px-2.5 py-1 rounded-lg font-black">Learning</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4 tracking-tight">BST Demo — Interactive Data Structure Visualization</h3>
                
                <p className="text-[var(--color-text-secondary)] text-sm mb-8 line-clamp-3 opacity-80 leading-relaxed">
                  Developed an interactive visualization platform with real-time BST operations, step-by-step animations, and educational tooltips.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10">
                  {["JS Engine", "Canvas/SVG", "Animations", "Vercel"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-white/50 font-black">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <a href="https://bstdemo.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--color-cyan)] text-[10px] font-black tracking-[0.2em] uppercase flex items-center hover:text-white transition-colors">
                    <MonitorPlay size={14} className="mr-2" />
                    TRY_LIVE_DEMO
                  </a>
                  <a href="#" className="text-white/30 text-[10px] font-black tracking-[0.2em] uppercase flex items-center hover:text-white transition-colors">
                    EXPLORE_MORE
                  </a>
                </div>
              </div>
            </div>

            {/* Project: Aeronexx */}
            <div className="project-card glass rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500 border-[rgba(255,255,255,0.05)] bg-white/[0.02]">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=450" 
                  alt="Aeronexx Platform" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent"></div>
              </div>
              
              <div className="p-8 sm:p-10 flex flex-col h-full">
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-[10px] text-[var(--color-cyan)] font-mono uppercase tracking-[0.2em] border border-[var(--color-cyan)]/30 px-2.5 py-1 rounded-lg font-black">Innovation</span>
                  <span className="text-[10px] text-[var(--color-purple)] font-mono uppercase tracking-[0.2em] border border-[var(--color-purple)]/30 px-2.5 py-1 rounded-lg font-black">AI & Full-Stack</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-4 tracking-tight">Aeronexx — Digital Innovation Platform</h3>
                
                <p className="text-[var(--color-text-secondary)] text-sm mb-8 line-clamp-3 opacity-80 leading-relaxed">
                  A modern technology platform focused on building advanced software products, AI-powered solutions, and immersive digital experiences.
                </p>
                
                <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                  {["React", "AI Solutions", "Full-Stack", "Web Apps"].map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-mono tracking-widest text-white/50 font-black">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6">
                  <a href="https://aeronexx.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--color-cyan)] text-[10px] font-black tracking-[0.2em] uppercase flex items-center hover:text-white transition-colors">
                    <ExternalLink size={14} className="mr-2" />
                    VISIT_PLATFORM
                  </a>
                  <a href="#" className="text-white/30 text-[10px] font-black tracking-[0.2em] uppercase flex items-center hover:text-white transition-colors">
                    EXPLORE_MORE
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
