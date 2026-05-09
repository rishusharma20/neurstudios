import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Network, Cuboid, Zap, LayoutTemplate, Layers, MousePointer2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(
      ".about-reveal",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
        }
      }
    );
  }, []);

  const highlights = [
    { icon: <Network className="text-[var(--color-cyan)] w-5 h-5" />, title: "Neural Design Systems" },
    { icon: <Cuboid className="text-[var(--color-cyan)] w-5 h-5" />, title: "Immersive 3D Tech" },
    { icon: <Zap className="text-[var(--color-cyan)] w-5 h-5" />, title: "High-Performance Logic" },
    { icon: <LayoutTemplate className="text-[var(--color-cyan)] w-5 h-5" />, title: "Enterprise Scalability" },
    { icon: <Layers className="text-[var(--color-cyan)] w-5 h-5" />, title: "Premium Visual Stack" },
    { icon: <MousePointer2 className="text-[var(--color-cyan)] w-5 h-5" />, title: "Dynamic Interaction" }
  ];

  return (
    <section id="about" ref={sectionRef} className="section-padding relative bg-[var(--color-primary)] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="col-span-1 lg:col-span-7">
            <div className="about-reveal">
              <span className="section-label mb-4">THE_NEURAL_STUDIO</span>
              <h2 className="section-heading mb-8">
                Welcome to <br className="hidden sm:block" /> Neur Studios
              </h2>
            </div>
            
            <div className="about-reveal text-base sm:text-lg text-[var(--color-text-secondary)] space-y-6 max-w-2xl leading-relaxed mb-12 opacity-80">
              <p>
                Neur Studios is a creative development studio building intelligent, 
                immersive and high-performance digital experiences for modern brands.
              </p>
              <p>
                We combine cutting-edge technology with thoughtful design to create 
                websites and applications that don't just function—they captivate and convert.
              </p>
            </div>

            <div className="about-reveal grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 glass rounded-2xl hover:bg-white/[0.05] transition-all duration-300 border border-white/5">
                  <div className="p-2.5 bg-[var(--color-cyan)]/10 rounded-xl border border-[var(--color-cyan)]/20 shadow-[0_0_15px_rgba(0,217,255,0.1)]">
                    {item.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-mono tracking-wider text-white font-bold uppercase">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element (Right Side) */}
          <div className="about-reveal col-span-1 lg:col-span-5 relative h-[300px] sm:h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden glass border-white/10 group">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
             
             {/* Abstract Neural Branch Representation */}
             <svg className="w-full h-full absolute inset-0 opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
                <path className="animate-pulse" d="M100,600 C150,400 50,300 200,100" fill="none" stroke="url(#cyan-grad)" strokeWidth="2"/>
                <path d="M200,100 C300,50 350,200 400,150" fill="none" stroke="url(#cyan-grad)" strokeWidth="1" strokeDasharray="5,5"/>
                <circle cx="200" cy="100" r="6" fill="#00D9FF" className="animate-pulse shadow-[0_0_20px_#00D9FF]"/>
                <circle cx="100" cy="600" r="4" fill="#7B61FF" />
                <circle cx="400" cy="150" r="4" fill="#00D9FF" />
                
                <defs>
                  <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D9FF" />
                    <stop offset="100%" stopColor="#7B61FF" />
                  </linearGradient>
                </defs>
             </svg>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[var(--color-cyan)] rounded-full blur-[120px] opacity-20 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
