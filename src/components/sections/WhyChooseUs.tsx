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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className={cn(
        "group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0A0A12]/40 backdrop-blur-3xl p-6 sm:p-8 transition-all duration-500 hover:border-[var(--color-cyan)]/20",
        className
      )}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 hidden sm:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 217, 255, 0.08), transparent 40%)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[var(--color-cyan)]/5 border border-[var(--color-cyan)]/10 flex items-center justify-center text-[var(--color-cyan)] group-hover:scale-110 transition-transform duration-500">
            <Icon size={22} />
          </div>
          {stats && (
            <div className="px-3 py-1.5 rounded-full bg-[#00FF88]/5 border border-[#00FF88]/20">
              <span className="text-[9px] font-mono text-[#00FF88] tracking-[0.2em] uppercase font-black">{stats}</span>
            </div>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-heading font-black text-white mb-3 tracking-tight group-hover:text-[var(--color-cyan)] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[var(--color-text-secondary)] text-sm sm:text-base leading-relaxed mb-8 opacity-60 font-medium">
          {desc}
        </p>

        <div className="mt-auto relative flex-1 min-h-[140px] flex items-center justify-center overflow-hidden">
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
    <section id="why-choose-us" className="section-padding bg-[#030305] relative overflow-hidden" ref={containerRef}>
      {/* 🌌 CINEMATIC BACKGROUND */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-cyan)] rounded-full blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-purple)] rounded-full blur-[180px] opacity-15" />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="max-w-4xl mb-16 sm:mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            THE_NEUR_ADVANTAGE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-heading"
          >
            Why leading <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-cyan)] via-blue-400 to-[var(--color-purple)] animate-gradient-shift bg-[length:200%_auto]">brands</span> partner <span className="relative">
              with us
              <svg className="absolute -bottom-2 left-0 w-full h-1 sm:h-2 text-[var(--color-cyan)]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 auto-rows-[minmax(300px,auto)]">
          
          {/* FEATURED: Business-First Architecture */}
          <BentoCard 
            title="Business-First Architecture"
            desc="We engineer solutions that directly impact your bottom line. We bridge the gap between creative vision and technical ROI."
            icon={TrendingUp}
            stats="+40% GROWTH"
            className="md:col-span-7 md:row-span-2"
            delay={0.1}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-4 gap-1">
                {[40, 25, 60, 45, 80, 55, 95, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.5 + i * 0.05 }}
                    className="flex-1 bg-gradient-to-t from-[var(--color-cyan)]/20 to-[var(--color-cyan)]/80 rounded-t-lg shadow-[0_0_15px_rgba(0,217,255,0.1)]"
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
            stats="99.9% SCORE"
            className="md:col-span-5"
            delay={0.2}
          >
            <div className="relative w-full h-full flex flex-col items-center justify-center scale-90 sm:scale-100">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-dashed border-[var(--color-cyan)]/30 flex items-center justify-center"
              >
                <div className="text-3xl sm:text-4xl font-mono font-black text-[var(--color-cyan)]">0.4s</div>
              </motion.div>
              <div className="mt-4 flex gap-1.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-0.5 bg-[var(--color-cyan)]/60 rounded-full"
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
            stats="PIXEL PERFECT"
            className="md:col-span-5"
            delay={0.3}
          >
            <div className="relative w-full h-full p-4 scale-90 sm:scale-100">
              <div className="w-full h-32 sm:h-full rounded-2xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute top-3 left-3 w-10 h-1 bg-white/10 rounded-full" />
                <div className="absolute top-6 left-3 w-16 h-1 bg-white/[0.05] rounded-full" />
                <div className="absolute inset-6 border border-dashed border-[var(--color-cyan)]/10 rounded-xl flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-5 h-5 rounded-md bg-white/[0.03] border border-white/5" />
                    ))}
                  </div>
                </div>
                <motion.div 
                  animate={{ left: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-px bg-[var(--color-cyan)]/60 shadow-[0_0_15px_var(--color-cyan)] z-20"
                />
              </div>
            </div>
          </BentoCard>

          {/* COLLABORATION: Transparent Collaboration */}
          <BentoCard 
            title="Transparent Collaboration"
            desc="Direct access to engineering teams with structured, predictable delivery."
            icon={Users}
            stats="ENTERPRISE"
            className="md:col-span-12"
            delay={0.4}
          >
            <div className="relative w-full h-24 flex items-center justify-center overflow-hidden scale-75 sm:scale-100">
              <div className="flex gap-8 sm:gap-12 items-center relative">
                {[Shield, Activity, Users, Shield].map((Ico, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[var(--color-cyan)] transition-colors">
                      <Ico size={18} />
                    </div>
                  </div>
                ))}
                <div className="absolute top-5 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                <motion.div 
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute top-[18px] w-12 h-[2px] bg-[var(--color-cyan)]/60 blur-[1px] rounded-full" 
                />
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
