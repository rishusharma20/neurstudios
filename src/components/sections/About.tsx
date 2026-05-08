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
      textRef.current!.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
        }
      }
    );
  }, []);

  const highlights = [
    { icon: <Network className="text-[var(--color-cyan)] w-6 h-6" />, title: "Neural Network Inspired Design" },
    { icon: <Cuboid className="text-[var(--color-cyan)] w-6 h-6" />, title: "Immersive 3D Interactions" },
    { icon: <Zap className="text-[var(--color-cyan)] w-6 h-6" />, title: "Smooth Animations & Transitions" },
    { icon: <LayoutTemplate className="text-[var(--color-cyan)] w-6 h-6" />, title: "Real World Projects & Case Studies" },
    { icon: <Layers className="text-[var(--color-cyan)] w-6 h-6" />, title: "Modern Tech Stack & Best Practices" },
    { icon: <MousePointer2 className="text-[var(--color-cyan)] w-6 h-6" />, title: "Premium & Futuristic User Interface" }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 relative bg-[var(--color-primary)]">
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Text Content */}
          <div ref={textRef} className="col-span-1 lg:col-span-7">
            <span className="inline-block text-[var(--color-cyan)] font-mono text-xs font-bold tracking-[2px] uppercase mb-4 text-glow">
              About The Experience
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-white mb-8 leading-tight tracking-tight">
              Welcome to Neur Studios
            </h2>
            <div className="text-lg text-[var(--color-text-secondary)] space-y-6 max-w-2xl leading-relaxed mb-12">
              <p>
                Neur Studios is a creative development studio building intelligent, 
                immersive and high-performance digital experiences for modern brands.
              </p>
              <p>
                We combine cutting-edge technology with thoughtful design to create 
                websites and applications that don't just function—they captivate.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 glass rounded-xl hover:glass-hover transition-all duration-300">
                  <div className="p-3 bg-[rgba(0,217,255,0.1)] rounded-lg border border-[rgba(0,217,255,0.2)]">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element (Right Side) */}
          <div className="col-span-1 lg:col-span-5 relative h-[600px] hidden lg:block rounded-2xl overflow-hidden glass border-[rgba(0,217,255,0.2)]">
             <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent"></div>
             {/* Abstract Neural Branch Representation */}
             <svg className="w-full h-full absolute inset-0 opacity-50" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice">
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
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--color-cyan)] rounded-full blur-[100px] opacity-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
