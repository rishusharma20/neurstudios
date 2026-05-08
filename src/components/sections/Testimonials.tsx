import { useRef, useEffect } from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      quote: "Neur Studios transformed our vision into a ",
      highlight: "stunning digital experience",
      quoteEnd: ". The attention to detail and creativity exceeded our expectations at every level.",
      name: "Sarah Chen",
      role: "CEO • TechFlow",
      category: "AI SaaS Platform",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      quote: "Working with them was seamless. They delivered a ",
      highlight: "high-performance system",
      quoteEnd: " that perfectly captured our identity and scaled our operations effortlessly.",
      name: "Michael Rodriguez",
      role: "Founder • CreativeHub",
      category: "E-Commerce",
      location: "New York",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
      quote: "The team's expertise is unmatched. Our new platform is fast, beautiful, and ",
      highlight: "converts visitors",
      quoteEnd: " into lifelong customers with incredible efficiency.",
      name: "Emily Thompson",
      role: "Director • InnovateCo",
      category: "FinTech App",
      location: "London",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
    }
  ];

  const metrics = [
    { value: "50+", label: "Projects Delivered" },
    { value: "20+", label: "Happy Clients" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "15+", label: "Technologies Used" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        ".testimonial-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Metrics animation
      gsap.fromTo(
        ".metric-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 85%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-[var(--color-primary)] relative overflow-hidden" ref={containerRef}>
      {/* Background Depth Effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[var(--color-cyan)] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[var(--color-purple)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        
        {/* HERO HEADING AREA */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="section-label tracking-[0.3em]">CLIENT EXPERIENCES</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight max-w-4xl">
            Experiences that clients <span className="text-gradient">remember</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
            We partner with visionary leaders to build products that don't just function—they leave a lasting impact.
          </p>
        </div>

        {/* TESTIMONIAL CARDS (Asymmetrical Layout) */}
        <div className="flex gap-6 overflow-x-auto pb-12 snap-x hide-scrollbar lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0" style={{ scrollbarWidth: 'none' }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className={`testimonial-card min-w-[320px] sm:min-w-[400px] snap-center group relative cursor-pointer lg:min-w-0 ${
                idx === 1 ? 'lg:-translate-y-8 lg:scale-[1.02] z-10' : 'lg:translate-y-4'
              }`}
            >
              {/* Outer Glow Effect on Hover */}
              <div className="absolute -inset-[1px] bg-gradient-to-b from-[var(--color-cyan)] to-[var(--color-purple)] rounded-3xl opacity-0 group-hover:opacity-50 blur-sm transition-opacity duration-500"></div>
              
              <div className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden h-full flex flex-col justify-between border border-white/5 group-hover:border-white/10 group-hover:-translate-y-2 group-hover:bg-[#0c1222]/80 transition-all duration-500 backdrop-blur-xl">
                
                {/* Large Background Quote Icon */}
                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 -rotate-12 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-110" />

                <div>
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className="text-[var(--color-cyan)] fill-[var(--color-cyan)] drop-shadow-[0_0_8px_rgba(0,217,255,0.6)] group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 bg-[#00FF88]/10 border border-[#00FF88]/30 px-2 py-1 rounded-full text-[#00FF88] text-[10px] font-mono tracking-wide uppercase">
                      <CheckCircle size={10} /> Verified
                    </div>
                  </div>
                  
                  <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-10 relative z-10">
                    "{t.quote}
                    <span className="text-white font-medium bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">
                      {t.highlight}
                    </span>
                    {t.quoteEnd}"
                  </p>
                </div>

                {/* Client Profile Area */}
                <div className="flex items-center gap-4 relative z-10 pt-6 border-t border-white/5">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[var(--color-cyan)]/30 group-hover:border-[var(--color-cyan)] transition-colors duration-500">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0A0A0F] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-[var(--color-cyan)] rounded-full animate-pulse shadow-[0_0_5px_rgba(0,217,255,0.8)]"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">{t.name}</h4>
                    <p className="text-xs text-[var(--color-text-muted)] font-mono">{t.role}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-[var(--color-cyan)] uppercase tracking-wider">{t.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20"></span>
                      <span className="text-[10px] text-white/40 uppercase">{t.location}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* TRUST METRICS AREA */}
        <div ref={metricsRef} className="mt-32 pt-16 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative">
          {/* Ambient glow behind metrics */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent opacity-30"></div>
          
          {metrics.map((metric, idx) => (
            <div key={idx} className="metric-item flex flex-col items-center justify-center text-center group">
              <h3 className="text-4xl md:text-5xl font-heading font-black mb-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_25px_rgba(0,217,255,0.3)] transition-all duration-500">
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
