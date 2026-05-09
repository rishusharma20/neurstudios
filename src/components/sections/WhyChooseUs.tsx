import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { TrendingUp, Zap, Users, Palette, Activity, Shield } from 'lucide-react';
import { cn } from '../../utils/helpers';

const BentoCard = ({ 
  title, 
  desc, 
  stats, 
  icon: Icon, 
  className, 
  children,
  delay = 0 
}: { 
  title: string; 
  desc: string; 
  stats?: string;
  icon: any; 
  className?: string; 
  children?: React.ReactNode;
  delay?: number;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0A0A12]/60 backdrop-blur-xl p-8 transition-all duration-500 hover:border-[var(--color-cyan)]/30",
        className
      )}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 217, 255, 0.08), transparent 40%)`,
        }}
      />

      {/* Inner Light Sweep */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
        <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg] animate-[sweep_3s_infinite]" />
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/20 flex items-center justify-center text-[var(--color-cyan)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
            <Icon size={24} />
          </div>
          {stats && (
            <div className="px-3 py-1 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/20">
              <span className="text-[10px] font-mono text-[#00FF88] tracking-widest uppercase">{stats}</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-heading font-bold text-white mb-4 tracking-tight group-hover:text-[var(--color-cyan)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[var(--color-text-secondary)] font-body leading-relaxed mb-8 text-sm md:text-base">
          {desc}
        </p>

        <div className="mt-auto relative flex-1 min-h-[120px] flex items-center justify-center overflow-hidden">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 100, damping: 30 });

  return (
    <section id="why-choose-us" className="py-32 bg-[#030305] relative overflow-hidden" ref={containerRef}>
      {/* 🌌 CINEMATIC BACKGROUND */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-cyan)] rounded-full blur-[120px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-purple)] rounded-full blur-[150px] opacity-15" />
      </motion.div>

      {/* Floating Micro-Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="max-w-4xl mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            THE NEUR ADVANTAGE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] tracking-tight"
          >
            Why leading <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-cyan)] via-blue-400 to-[var(--color-purple)] animate-gradient-shift bg-[length:200%_auto]">brands</span> partner <span className="relative">
              with us
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[var(--color-cyan)]/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <motion.path 
                  d="M0 5 Q 25 0, 50 5 T 100 5" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </svg>
            </span>.
          </motion.h2>
        </div>

        {/* 🧩 BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(300px,auto)]">
          
          {/* FEATURED: Business-First Architecture */}
          <BentoCard 
            title="Business-First Architecture"
            desc="We engineer solutions that directly impact your bottom line. We bridge the gap between creative vision and technical ROI."
            icon={TrendingUp}
            stats="+40% CONVERSION GROWTH"
            className="md:col-span-7 md:row-span-2"
            delay={0.1}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Animated Analytics Visual */}
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-4 gap-1">
                {[40, 25, 60, 45, 80, 55, 95, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-[var(--color-cyan)]/40 to-[var(--color-cyan)] rounded-t-lg shadow-[0_0_15px_rgba(0,217,255,0.3)]"
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A12] via-transparent to-transparent z-10" />
            </div>
          </BentoCard>

          {/* PERFORMANCE: Uncompromising Performance */}
          <BentoCard 
            title="Uncompromising Performance"
            desc="Speed is revenue. Sub-second load times and SEO dominance by default."
            icon={Zap}
            stats="99.9% PERFORMANCE SCORE"
            className="md:col-span-5"
            delay={0.2}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-32 rounded-full border-2 border-dashed border-[var(--color-cyan)]/30 flex items-center justify-center"
              >
                <div className="text-4xl font-mono font-bold text-[var(--color-cyan)]">0.4s</div>
              </motion.div>
              <div className="mt-4 flex gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [8, 20, 8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 bg-[var(--color-cyan)] rounded-full"
                  />
                ))}
              </div>
            </div>
          </BentoCard>

          {/* AESTHETIC: Premium Aesthetic Standards */}
          <BentoCard 
            title="Aesthetic Standards"
            desc="Award-winning visual design tailored for premium brands."
            icon={Palette}
            stats="PIXEL PERFECT UI"
            className="md:col-span-5"
            delay={0.3}
          >
            <div className="relative w-full h-full p-4">
              <div className="w-full h-full rounded-xl border border-white/10 bg-white/5 relative overflow-hidden">
                <div className="absolute top-2 left-2 w-12 h-1 bg-white/20 rounded-full" />
                <div className="absolute top-5 left-2 w-20 h-1 bg-white/10 rounded-full" />
                <div className="absolute inset-4 border border-dashed border-[var(--color-cyan)]/20 rounded-lg flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-6 h-6 rounded-md bg-white/5 border border-white/10" />
                    ))}
                  </div>
                </div>
                <motion.div 
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-[1px] bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan)] z-20"
                />
              </div>
            </div>
          </BentoCard>

          {/* COLLABORATION: Transparent Collaboration */}
          <BentoCard 
            title="Transparent Collaboration"
            desc="Direct access to engineering teams with structured, predictable delivery."
            icon={Users}
            stats="ENTERPRISE READY"
            className="md:col-span-12"
            delay={0.4}
          >
            <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
              <div className="flex gap-12 items-center relative">
                {[Shield, Activity, Users, Shield].map((Ico, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[var(--color-cyan)] transition-colors">
                      <Ico size={18} />
                    </div>
                  </div>
                ))}
                {/* Connecting Lines */}
                <div className="absolute top-5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <motion.div 
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[18px] w-12 h-[3px] bg-[var(--color-cyan)] blur-[2px] rounded-full" 
                />
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
