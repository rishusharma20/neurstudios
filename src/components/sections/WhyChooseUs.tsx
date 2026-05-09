import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Zap, Users, Layout, Layers } from 'lucide-react';
import { cn } from '../../utils/helpers';

// --- MICRO-VISUAL COMPONENTS ---

const ArchitectureVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-60 transition-opacity duration-700">
    <div className="relative w-full h-full max-h-[150px] overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 400 150">
        <path d="M 0 100 Q 50 80, 100 110 T 200 60 T 300 90 T 400 40" fill="none" stroke="var(--color-cyan)" strokeWidth="2" strokeDasharray="1000" strokeDashoffset="0" className="animate-draw" />
        {[50, 100, 200, 300].map((x, i) => (
          <circle key={i} cx={x} cy={70 + Math.sin(i) * 30} r="3" fill="var(--color-cyan)" className="animate-pulse" />
        ))}
      </svg>
    </div>
  </div>
);

const AestheticVisual = () => (
  <div className="absolute inset-0 overflow-hidden opacity-20 group-hover:opacity-40 transition-opacity duration-700">
    <div className="grid grid-cols-6 gap-2 p-4">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="h-12 border border-[var(--color-purple)]/30 rounded-lg flex items-center justify-center">
          <Layers size={14} className="text-[var(--color-purple)]" />
        </div>
      ))}
    </div>
  </div>
);

const PerformanceVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-50 transition-opacity duration-700">
    <div className="relative w-24 h-24">
      <svg className="w-full h-full rotate-[-90deg]">
        <circle cx="48" cy="48" r="40" stroke="rgba(0, 255, 136, 0.1)" strokeWidth="4" fill="none" />
        <motion.circle 
          cx="48" cy="48" r="40" stroke="var(--color-green, #00FF88)" strokeWidth="4" fill="none" 
          strokeDasharray="251" strokeDashoffset="50"
          animate={{ strokeDashoffset: [251, 60] }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <span className="text-[var(--color-green, #00FF88)] font-mono text-xs font-bold">99.9%</span>
        <span className="text-[8px] text-white/40 uppercase font-mono">Uptime</span>
      </div>
    </div>
  </div>
);

const CollaborationVisual = () => (
  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
    <svg className="w-full h-full">
      <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="5 5" />
      <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="var(--color-cyan)" strokeWidth="1" strokeDasharray="5 5" />
      <circle cx="50%" cy="50%" r="20" fill="none" stroke="var(--color-cyan)" strokeWidth="1" />
    </svg>
  </div>
);

const AdvantageCard = ({ 
  title, 
  desc, 
  icon: Icon, 
  visual: Visual, 
  stats, 
  className,
  delay = 0 
}: { 
  title: string; 
  desc: string; 
  icon: any; 
  visual: any; 
  stats?: string;
  className?: string;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
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
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative glass rounded-[2.5rem] p-8 md:p-10 border border-white/5 overflow-hidden transition-all duration-500 hover:border-[var(--color-cyan)]/30 hover:-translate-y-2",
        className
      )}
    >
      {/* Interactive Spotlight Overlay */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 217, 255, 0.15) 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--color-cyan)] group-hover:bg-[var(--color-cyan)]/10 group-hover:scale-110 transition-all duration-500">
            <Icon size={28} />
          </div>
          {stats && (
            <div className="px-3 py-1 rounded-full bg-[var(--color-cyan)]/10 border border-[var(--color-cyan)]/30">
              <span className="text-[10px] font-mono font-bold text-[var(--color-cyan)] tracking-widest">{stats}</span>
            </div>
          )}
        </div>

        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4 group-hover:text-[var(--color-cyan)] transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-[var(--color-text-secondary)] leading-relaxed text-sm md:text-base font-light mb-8 max-w-[280px]">
          {desc}
        </p>

        <div className="mt-auto relative h-[120px] rounded-2xl overflow-hidden bg-white/[0.02] border border-white/5">
          <Visual />
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

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section id="why-choose-us" className="py-32 md:py-48 bg-[#030305] relative overflow-hidden">
      {/* 🌌 CINEMATIC BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Moving Grid */}
        <motion.div 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
          animate={{ y: [0, 100] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-20"
        />
        
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-cyan)]/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-purple)]/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <motion.div style={{ opacity, y }} className="mb-24 flex flex-col items-center text-center">
          <span className="section-label mb-6">THE NEUR ADVANTAGE</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[1.1] mb-8 tracking-tighter">
            Why leading <span className="text-gradient-cyan-blue">brands</span> <br/>
            <span className="text-gradient-purple-cyan">partner</span> with us.
          </h2>
          <p className="section-subheading max-w-[700px] mx-auto text-base md:text-lg">
            We merge elite product strategy with high-end technical engineering to create digital ecosystems that define industries.
          </p>
        </motion.div>

        {/* 🧩 BENTO LAYOUT SYSTEM */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 auto-rows-[minmax(400px,auto)]">
          
          <AdvantageCard 
            className="md:col-span-7"
            title="Business-First Architecture"
            desc="We engineer systems that convert. Every line of code is written to drive ROI and facilitate massive scale."
            icon={TrendingUp}
            visual={ArchitectureVisual}
            stats="+42% CONVERSION"
            delay={0.1}
          />

          <AdvantageCard 
            className="md:col-span-5"
            title="Premium Standards"
            desc="Award-winning visual aesthetics that build instant trust and define your brand's digital identity."
            icon={Layout}
            visual={AestheticVisual}
            stats="ELITE UI/UX"
            delay={0.2}
          />

          <AdvantageCard 
            className="md:col-span-5"
            title="Uncompromising Speed"
            desc="Zero lag. Sub-second load times. We optimize for the highest possible Core Web Vitals and SEO rank."
            icon={Zap}
            visual={PerformanceVisual}
            stats="< 0.5S LOAD"
            delay={0.3}
          />

          <AdvantageCard 
            className="md:col-span-7"
            title="Direct Collaboration"
            desc="Transparent workflows with real-time updates. We become an extension of your product team."
            icon={Users}
            visual={CollaborationVisual}
            stats="24/7 SYNC"
            delay={0.4}
          />

        </div>

        {/* Mini Trust Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
        >
          {['ENTERPRISE SCALE', 'ISO SECURITY', '99.9% UPTIME', '24/7 SUPPORT'].map((stat) => (
            <div key={stat} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan)]"></div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white font-bold">{stat}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
