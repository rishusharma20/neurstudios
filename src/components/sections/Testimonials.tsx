import { useRef, useEffect, useState, useMemo } from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

// --- 🌌 ATMOSPHERIC COMPONENTS ---
const NeuralGrid = () => (
  <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
    <motion.div 
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan)_0%,transparent_70%)] opacity-20" 
    />
  </div>
);

const CinematicFog = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div 
      animate={{ 
        x: ["-20%", "20%"],
        y: ["-10%", "10%"],
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(0,217,255,0.03)_0%,transparent_50%)] blur-[100px]" 
    />
    <motion.div 
      animate={{ 
        x: ["20%", "-20%"],
        y: ["10%", "-10%"],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-0 right-0 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03)_0%,transparent_50%)] blur-[120px]" 
    />
  </div>
);

const MemoryParticle = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.4, 0],
      scale: [0, 1.5, 0],
      x: [0, (Math.random() - 0.5) * 300],
      y: [0, (Math.random() - 0.5) * 300],
    }}
    transition={{ duration: 8 + Math.random() * 4, repeat: Infinity, delay, ease: "easeOut" }}
    className="absolute w-1 h-1 bg-[var(--color-cyan)] rounded-full blur-[1px] pointer-events-none"
    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
  />
);

// --- 🧊 HOLOGRAPHIC CARD ---
const TestimonialCard = ({ 
  testimonial, 
  isFocused, 
  isAnyFocused, 
  onHover, 
  index,
  isFeatured 
}: { 
  testimonial: any; 
  isFocused: boolean; 
  isAnyFocused: boolean;
  onHover: (focused: boolean) => void;
  index: number;
  isFeatured: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });
  
  // Floating Inertia
  const floatY = useSpring(0, { stiffness: 40, damping: 20 });
  useEffect(() => {
    const interval = setInterval(() => {
      floatY.set(Math.sin(Date.now() / 1500 + index) * (isFeatured ? 15 : 10));
    }, 50);
    return () => clearInterval(interval);
  }, [index, isFeatured, floatY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, y: floatY, perspective: 1200 }}
      animate={{ 
        scale: isFocused ? 1.05 : isFeatured ? 1 : 0.95,
        opacity: !isAnyFocused || isFocused ? 1 : 0.3,
        z: isFocused ? 50 : 0,
        filter: !isAnyFocused || isFocused ? "blur(0px) brightness(1.1)" : "blur(4px) brightness(0.6)",
      }}
      className={cn(
        "relative transition-all duration-700 ease-out",
        isFeatured ? "z-20 w-full max-w-[500px]" : "z-10 w-full max-w-[400px]",
        "snap-center lg:snap-none"
      )}
    >
      {/* 🔮 Glowing Aura */}
      <div className={cn(
        "absolute -inset-8 rounded-[4rem] transition-all duration-1000 blur-[80px] opacity-0 group-hover:opacity-20",
        isFocused ? "opacity-30 scale-110" : "opacity-0 scale-90",
        "bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan),var(--color-purple),transparent_70%)]"
      )} />

      {/* Main Glass Terminal */}
      <div className={cn(
        "glass rounded-[3rem] p-8 sm:p-12 relative overflow-hidden h-full flex flex-col justify-between border border-white/10 bg-white/[0.01] backdrop-blur-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-700",
        isFocused && "border-[var(--color-cyan)]/30 bg-white/[0.03]"
      )}>
        
        {/* Holographic Scanline */}
        <motion.div 
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-gradient-to-b from-transparent via-[var(--color-cyan)] to-transparent h-20 w-full"
        />

        {/* 💬 Oversized Quote Symbol */}
        <div className={cn(
          "absolute -top-10 -right-10 opacity-[0.03] transition-all duration-1000",
          isFocused ? "opacity-[0.08] scale-125 rotate-12" : "opacity-[0.03] scale-100 rotate-0"
        )}>
          <Quote size={220} className="text-[var(--color-cyan)]" strokeWidth={0.5} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            {/* 🌟 AI Star System */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: isFocused ? [1, 1.3, 1] : 1,
                    color: isFocused ? "var(--color-cyan)" : "rgba(255,255,255,0.2)"
                  }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                >
                  <Star size={16} className="fill-current drop-shadow-[0_0_10px_currentColor]" />
                </motion.div>
              ))}
            </div>
            {/* 🟢 AI Verification Chip */}
            <div className="flex items-center gap-3 bg-black/60 border border-[#00FF88]/20 px-4 py-2 rounded-2xl backdrop-blur-xl relative group/chip overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FF88]/10 to-transparent pointer-events-none"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shadow-[0_0_12px_#00FF88] relative">
                <div className="absolute inset-0 rounded-full bg-[#00FF88] animate-ping opacity-30" />
              </div>
              <span className="text-[#00FF88] text-[10px] font-mono font-black tracking-[0.2em] uppercase">VERIFIED_LOG</span>
            </div>
          </div>
          
          <p className={cn(
            "text-white/80 leading-relaxed font-medium transition-all duration-500 tracking-tight",
            isFeatured ? "text-2xl sm:text-3xl mb-14" : "text-xl sm:text-2xl mb-10",
            isFocused && "text-white"
          )}>
            "{testimonial.quote}
            <span className="text-[var(--color-cyan)] font-black italic relative px-2">
              {testimonial.highlight}
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                className="absolute -bottom-1 left-0 h-0.5 bg-[var(--color-cyan)]/40 blur-[1px]"
              />
            </span>
            {testimonial.quoteEnd}"
          </p>
        </div>

        {/* 👤 Premium Identity Area */}
        <div className="flex items-center gap-6 pt-10 border-t border-white/5 relative z-10">
          <div className="relative">
            <div className={cn(
              "rounded-[1.5rem] p-px transition-all duration-700",
              isFocused ? "bg-gradient-to-br from-[var(--color-cyan)] to-[var(--color-purple)] shadow-[0_0_30px_rgba(0,217,255,0.3)]" : "bg-white/10 shadow-none",
              isFeatured ? "w-20 h-20" : "w-16 h-16"
            )}>
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              </div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-[var(--color-cyan)]/10 rounded-[1.8rem] pointer-events-none"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-xl tracking-tighter leading-none mb-2">{testimonial.name}</h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_5px_var(--color-cyan)]" />
                <p className="text-[10px] text-white/50 font-mono font-black tracking-widest uppercase">{testimonial.role}</p>
              </div>
              <span className="text-[11px] text-[var(--color-cyan)]/60 font-black uppercase tracking-[0.3em] pl-3.5">{testimonial.category}</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const testimonials = useMemo(() => [
    {
      quote: "Working with them was seamless. They delivered a ",
      highlight: "high-performance system",
      quoteEnd: " that perfectly captured our identity and scaled our operations effortlessly.",
      name: "Michael Rodriguez",
      role: "Founder • CreativeHub",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      quote: "Neur Studios transformed our vision into a ",
      highlight: "stunning digital experience",
      quoteEnd: ". The attention to detail and creativity exceeded our expectations at every level.",
      name: "Sarah Chen",
      role: "CEO • TechFlow",
      category: "AI SaaS Platform",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
      quote: "The team's expertise is unmatched. Our new platform is fast, beautiful, and ",
      highlight: "converts visitors",
      quoteEnd: " into lifelong customers with incredible efficiency.",
      name: "Emily Thompson",
      role: "Director • InnovateCo",
      category: "FinTech App",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200"
    }
  ], []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card-wrapper",
        { y: 150, opacity: 0, scale: 0.8, filter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 2,
          stagger: 0.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-[#030305] relative overflow-hidden" ref={containerRef}>
      {/* 🌌 CINEMATIC BACKGROUND SYSTEM */}
      <NeuralGrid />
      <CinematicFog />
      {[...Array(30)].map((_, i) => <MemoryParticle key={i} delay={i * 0.3} />)}

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ✨ CINEMATIC TYPOGRAPHY HERO */}
        <div className="mb-32 sm:mb-48 flex flex-col items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="section-label mb-10 px-8 py-2.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md tracking-[0.4em]">
              AI_MEMORY_VAULT_v4
            </div>
            
            <h2 className="section-heading mb-12 max-w-5xl !leading-[0.9] !text-[clamp(2.5rem,8vw,5.5rem)]">
              Experiences that <br className="hidden sm:block" /> clients <span className="relative inline-block px-4 group/hologram">
                <span className="text-gradient drop-shadow-[0_0_40px_rgba(0,217,255,0.5)] transition-all duration-1000 group-hover/hologram:drop-shadow-[0_0_70px_rgba(0,217,255,0.9)] animate-pulse">
                  remember
                </span>
                
                {/* Local particles for the heading word */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 150],
                        y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * -100],
                      }}
                      transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.5 }}
                      className="absolute w-1 h-1 bg-[var(--color-cyan)] rounded-full blur-[0.5px]"
                    />
                  ))}
                </div>

                {/* Holographic Lighting & Glitch Layer */}
                <motion.span 
                  animate={{ opacity: [0, 0.4, 0, 0.6, 0], x: [0, -3, 3, -1, 0] }}
                  transition={{ duration: 5, repeat: Infinity, times: [0, 0.1, 0.12, 0.15, 1] }}
                  className="absolute inset-0 text-[var(--color-purple)] blur-[3px] pointer-events-none translate-x-2"
                >
                  remember
                </motion.span>
                <div className="absolute -inset-12 bg-[var(--color-cyan)]/10 blur-[60px] rounded-full -z-10 animate-breathing" />
              </span>
            </h2>
            
            <p className="section-subheading mx-auto text-white/40 max-w-2xl text-xl leading-relaxed">
              Unlocking the neural archives of visionary partnerships. Every project is a curated memory of technical excellence and creative mastery.
            </p>
          </motion.div>
        </div>

        {/* 🧊 ASYMMETRICAL FLOATING MEMORY VAULT */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0 lg:h-[700px] lg:mb-40">
          
          {/* Featured Center Card (Large) */}
          <div className="testimonial-card-wrapper lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:z-30 w-full flex justify-center">
            <TestimonialCard 
              index={1}
              testimonial={testimonials[1]}
              isFocused={focusedIndex === 1}
              isAnyFocused={focusedIndex !== null}
              onHover={(focused) => setFocusedIndex(focused ? 1 : null)}
              isFeatured={true}
            />
          </div>

          {/* Left Card (Slightly Smaller, Offset) */}
          <div className="testimonial-card-wrapper lg:absolute lg:left-0 lg:top-20 lg:z-10 w-full flex justify-center lg:justify-start">
            <TestimonialCard 
              index={0}
              testimonial={testimonials[0]}
              isFocused={focusedIndex === 0}
              isAnyFocused={focusedIndex !== null}
              onHover={(focused) => setFocusedIndex(focused ? 0 : null)}
              isFeatured={false}
            />
          </div>

          {/* Right Card (Slightly Smaller, Offset) */}
          <div className="testimonial-card-wrapper lg:absolute lg:right-0 lg:bottom-20 lg:z-10 w-full flex justify-center lg:justify-end">
            <TestimonialCard 
              index={2}
              testimonial={testimonials[2]}
              isFocused={focusedIndex === 2}
              isAnyFocused={focusedIndex !== null}
              onHover={(focused) => setFocusedIndex(focused ? 2 : null)}
              isFeatured={false}
            />
          </div>

        </div>

        {/* 🌌 SCROLL INDICATOR / DECORATION */}
        <div className="flex justify-center mt-32 lg:mt-0 opacity-20">
          <div className="w-px h-32 bg-gradient-to-b from-transparent via-[var(--color-cyan)] to-transparent" />
        </div>

      </div>
    </section>
  );
};
