import { useRef, useEffect, useState, useMemo } from "react";
import { Shield, Fingerprint } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

// --- 🌌 CINEMATIC ATMOSPHERE COMPONENTS ---
const NeuralEcosystem = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
    {/* Digital Dust */}
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
    
    {/* Holographic Scan Layers */}
    <motion.div 
      animate={{ y: ["-100%", "100%"] }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-cyan)]/5 to-transparent h-[50%] w-full opacity-20"
    />

    {/* Depth Lighting */}
    <div className="absolute top-0 left-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan)_0%,transparent_70%)] opacity-[0.03] blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 w-full h-full bg-[radial-gradient(circle_at_50%_50%,var(--color-purple)_0%,transparent_70%)] opacity-[0.03] blur-[150px]" />
  </div>
);

// --- 🌐 NEURAL CONNECTION SYSTEM ---
const NeuralConnection = ({ from, to, active }: { from: { x: number; y: number }; to: { x: number; y: number }; active: boolean }) => {
  const distance = Math.hypot(to.x - from.x, to.y - from.y);
  const angle = Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 0.4 : 0.1, scale: active ? 1.05 : 1 }}
      className="absolute origin-left pointer-events-none z-0"
      style={{
        left: `${from.x}%`,
        top: `${from.y}%`,
        width: `${distance}%`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-[var(--color-cyan)] to-transparent relative overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-white/20 w-1/4"
        />
      </div>
    </motion.div>
  );
};

// --- 💠 FLOATING MEMORY NODE ---
const MemoryNode = ({ 
  data, 
  active, 
  onClick, 
  position 
}: { 
  data: any; 
  active: boolean; 
  onClick: () => void;
  position: { x: number; y: number };
}) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: active ? 1 : 0.4,
        scale: active ? 1.1 : 0.9,
        x: `${position.x}%`,
        y: `${position.y}%`,
        filter: active ? "blur(0px)" : "blur(2px)",
      }}
      whileHover={{ scale: 1.15, opacity: 1, filter: "blur(0px)" }}
      className="absolute w-20 h-20 sm:w-24 sm:h-24 cursor-pointer z-20 group"
      style={{ marginLeft: "-3rem", marginTop: "-3rem" }}
    >
      {/* Node Aura */}
      <div className={cn(
        "absolute inset-0 rounded-full blur-xl transition-all duration-700",
        active ? "bg-[var(--color-cyan)]/30 opacity-100" : "bg-white/5 opacity-0 group-hover:opacity-40"
      )} />
      
      {/* HUD Ring */}
      <motion.div 
        animate={{ rotate: active ? 360 : 0 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className={cn(
          "absolute inset-0 border border-dashed rounded-full transition-colors duration-500",
          active ? "border-[var(--color-cyan)]/60" : "border-white/10 group-hover:border-white/30"
        )}
      />

      {/* Profile Image Node */}
      <div className="absolute inset-2 rounded-full overflow-hidden p-px bg-white/10 backdrop-blur-md">
        <img src={data.image} alt={data.name} className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500" />
      </div>

      {/* Label (Desktop Only) */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] font-mono tracking-widest text-[var(--color-cyan)] uppercase font-black">{data.name}</span>
      </div>
    </motion.div>
  );
};

// --- 🧠 MEMORY CORE (FEATURED) ---
const MemoryCore = ({ data }: { data: any }) => {
  const coreRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  const [displayText, setDisplayText] = useState("");
  const fullQuote = `${data.quote} ${data.highlight} ${data.quoteEnd}`;

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullQuote.slice(0, i));
      i++;
      if (i > fullQuote.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, [data]);

  return (
    <motion.div
      ref={coreRef}
      onMouseMove={(e) => {
        const rect = coreRef.current?.getBoundingClientRect();
        if (rect) {
          mouseX.set(e.clientX - (rect.left + rect.width / 2));
          mouseY.set(e.clientY - (rect.top + rect.height / 2));
        }
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="relative w-full max-w-4xl mx-auto z-30 px-6 py-20"
    >
      {/* 🔮 Holographic Container */}
      <div className="glass rounded-[3rem] p-10 sm:p-16 border border-white/10 bg-white/[0.01] backdrop-blur-[60px] shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden group">
        
        {/* Core Lighting Streaks */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-cyan)]/5 to-transparent skew-x-[-30deg]"
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center relative z-10">
          
          {/* Identity HUD */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left space-y-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl p-1 bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-purple)] shadow-[0_0_40px_rgba(0,217,255,0.3)]">
                <div className="w-full h-full rounded-[20px] overflow-hidden">
                  <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border border-dashed border-[var(--color-cyan)]/20 rounded-[40px] pointer-events-none"
              />
              {/* Verification Ring */}
              <div className="absolute -bottom-4 -right-4 bg-black/80 border border-[#00FF88]/40 p-3 rounded-2xl backdrop-blur-xl">
                <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Shield size={20} className="text-[#00FF88]" />
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">{data.name}</h4>
              <p className="text-[10px] font-mono font-black tracking-[0.4em] text-[var(--color-cyan)] uppercase opacity-80">{data.role}</p>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Fingerprint size={12} className="text-white/40" />
                <span className="text-[9px] font-mono text-white/40 font-black tracking-widest uppercase">{data.category}</span>
              </div>
            </div>
          </div>

          {/* Holographic Quote Projection */}
          <div className="space-y-8 relative">
            {/* Trust Sync Indicator */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ scaleY: [1, 1.5, 1], backgroundColor: ["var(--color-cyan)", "var(--color-purple)", "var(--color-cyan)"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-1 h-4 rounded-full"
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-white/30 uppercase font-black">NEURAL_SYNC: 99.9%</span>
            </div>

            <div className="relative min-h-[160px]">
              <p className="text-xl sm:text-2xl text-white/90 leading-tight font-medium tracking-tight font-mono lowercase">
                {displayText}
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="inline-block w-2 h-6 bg-[var(--color-cyan)] align-middle ml-1"
                />
              </p>
            </div>

            {/* AI Authentication Tag */}
            <div className="flex items-center gap-6 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">MEM_LOG_AUTH</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-purple)]" />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">SRC_EXP_NODE_0{data.id}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);

  const memories = useMemo(() => [
    {
      id: 1,
      quote: "Working with them was seamless. They delivered a ",
      highlight: "high-performance system",
      quoteEnd: " that perfectly captured our identity.",
      name: "Michael Rodriguez",
      role: "Founder • CreativeHub",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
      pos: { x: 15, y: 30 }
    },
    {
      id: 2,
      quote: "Neur Studios transformed our vision into a ",
      highlight: "stunning digital experience",
      quoteEnd: ". The attention to detail exceeded expectations.",
      name: "Sarah Chen",
      role: "CEO • TechFlow",
      category: "AI SaaS Platform",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
      pos: { x: 50, y: 50 } // Center Core Position
    },
    {
      id: 3,
      quote: "The team's expertise is unmatched. Our platform is fast, beautiful, and ",
      highlight: "converts visitors",
      quoteEnd: " with efficiency.",
      name: "Emily Thompson",
      role: "Director • InnovateCo",
      category: "FinTech App",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
      pos: { x: 85, y: 70 }
    }
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".memory-element", {
        opacity: 0,
        scale: 0.8,
        blur: 20,
        duration: 1.5,
        stagger: 0.3,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-[#030305] relative min-h-screen flex flex-col justify-center overflow-hidden" ref={containerRef}>
      <NeuralEcosystem />
      
      {/* 🌐 NEURAL GRID & CONNECTIONS (Desktop Only Layout) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <NeuralConnection from={memories[0].pos} to={memories[1].pos} active={activeIndex === 0 || activeIndex === 1} />
        <NeuralConnection from={memories[1].pos} to={memories[2].pos} active={activeIndex === 1 || activeIndex === 2} />
        
        {memories.map((m, idx) => (
          idx !== 1 && (
            <MemoryNode 
              key={idx}
              data={m}
              position={m.pos}
              active={activeIndex === idx}
              onClick={() => setActiveIndex(idx)}
            />
          )
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ✨ CINEMATIC HUD HEADER */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--color-cyan)]" />
              <span className="text-[10px] font-mono font-black tracking-[0.5em] text-[var(--color-cyan)] uppercase">CLIENT_MEMORY_STREAM</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-[var(--color-cyan)]" />
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase !leading-none">
              Engineering <span className="text-gradient">Legacies</span>
            </h2>
            <p className="text-[12px] font-mono text-white/30 uppercase tracking-[0.4em] max-w-lg">
              Decrypted experience logs from our most visionary partnerships.
            </p>
          </motion.div>
        </div>

        {/* 🧠 CENTRAL MEMORY STREAM CORE */}
        <div className="relative memory-element">
          <AnimatePresence mode="wait">
            <MemoryCore key={activeIndex} data={memories[activeIndex]} />
          </AnimatePresence>
        </div>

        {/* 📱 MOBILE NAVIGATION (TABS) */}
        <div className="flex lg:hidden justify-center gap-4 mt-12">
          {memories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-500",
                activeIndex === idx ? "bg-[var(--color-cyan)] scale-125 shadow-[0_0_10px_var(--color-cyan)]" : "bg-white/10"
              )}
            />
          ))}
        </div>

      </div>

      {/* 🌠 DECORATIVE HUD LINES */}
      <div className="absolute top-20 right-10 opacity-10 hidden xl:block">
        <div className="flex flex-col gap-2 items-end">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-[1px] bg-white" style={{ width: `${60 - i * 20}px` }} />
          ))}
          <span className="text-[8px] font-mono text-white mt-2">NV_ARCHIVE_v09.24</span>
        </div>
      </div>
    </section>
  );
};
