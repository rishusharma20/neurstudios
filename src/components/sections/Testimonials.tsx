import { useRef, useEffect, useState, useMemo } from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

// --- 🌌 NEURAL PARTICLE SYSTEM ---
const NeuralSpark = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      scale: [0, 1.5, 0],
      x: [0, (Math.random() - 0.5) * 200],
      y: [0, (Math.random() - 0.5) * 200],
    }}
    transition={{ 
      duration: 4 + Math.random() * 4, 
      repeat: Infinity, 
      delay,
      ease: "circOut"
    }}
    className="absolute w-px h-px bg-[var(--color-cyan)] shadow-[0_0_10px_var(--color-cyan)] pointer-events-none"
    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
  />
);

const LightStreak = ({ delay = 0 }) => (
  <motion.div
    initial={{ x: "-100%", opacity: 0 }}
    animate={{ x: "200%", opacity: [0, 0.2, 0] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "linear" }}
    className="absolute h-px w-64 bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent rotate-[-45deg] pointer-events-none"
    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
  />
);

// --- 🧊 HOLOGRAPHIC CARD COMPONENT ---
const TestimonialCard = ({ 
  testimonial, 
  isFocused, 
  isAnyFocused, 
  onHover, 
  index 
}: { 
  testimonial: any; 
  isFocused: boolean; 
  isAnyFocused: boolean;
  onHover: (focused: boolean) => void;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Magnetic & Lighting Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-150, 150], [12, -12]), { stiffness: 100, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-12, 12]), { stiffness: 100, damping: 25 });
  
  // Weightless Floating Drift
  const floatY = useSpring(0, { stiffness: 50, damping: 20 });
  useEffect(() => {
    if (!isFocused) {
      const interval = setInterval(() => {
        floatY.set(Math.sin(Date.now() / 1000) * 10);
      }, 50);
      return () => clearInterval(interval);
    } else {
      floatY.set(-15); // Elevate on focus
    }
  }, [isFocused, floatY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
    
    // Internal refraction spotlight
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
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
        scale: isFocused ? 1.05 : 1,
        opacity: !isAnyFocused || isFocused ? 1 : 0.3,
        filter: !isAnyFocused || isFocused ? "blur(0px) brightness(1.2)" : "blur(8px) brightness(0.6)",
      }}
      className={cn(
        "testimonial-card group relative cursor-pointer transition-all duration-700",
        "min-w-[320px] sm:min-w-[440px] lg:min-w-0 snap-center h-full",
        index === 1 && !isAnyFocused && "lg:-translate-y-12"
      )}
    >
      {/* 💠 Holographic Aura */}
      <div className={cn(
        "absolute -inset-4 rounded-[3rem] transition-all duration-1000 blur-2xl opacity-0 group-hover:opacity-20",
        "bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan),transparent_70%)]"
      )} />

      {/* Internal Light Sweep */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-[-20deg] opacity-0 group-hover:opacity-100"
      />

      {/* Main Ultra-Glass Body */}
      <div className="glass rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden h-full flex flex-col justify-between border border-white/5 bg-white/[0.02] backdrop-blur-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-700 group-hover:border-[var(--color-cyan)]/20">
        
        {/* Dynamic Refraction Spotlight */}
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: useTransform(
              [mouseX, mouseY],
              ([cx, cy]) => `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(0, 217, 255, 0.12), transparent 40%)`
            )
          }}
        />

        {/* Redesigned Holographic Quote */}
        <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-1000 group-hover:rotate-12 group-hover:scale-125">
          <Quote size={180} className="text-[var(--color-cyan)]" strokeWidth={0.5} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            {/* Sparkle Star System */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: isFocused ? [1, 1.3, 1] : 1,
                    filter: isFocused ? ["blur(0px)", "blur(2px)", "blur(0px)"] : "blur(0px)",
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                >
                  <Star size={16} className="text-[var(--color-cyan)] fill-[var(--color-cyan)] drop-shadow-[0_0_12px_rgba(0,217,255,0.8)]" />
                </motion.div>
              ))}
            </div>
            {/* AI Verification Module */}
            <div className="flex items-center gap-2.5 bg-black/40 border border-[#00FF88]/20 px-3.5 py-1.5 rounded-xl backdrop-blur-md relative overflow-hidden group/badge">
              <motion.div 
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF88]/10 to-transparent pointer-events-none"
              />
              <div className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_10px_#00FF88] relative">
                <div className="absolute inset-0 rounded-full bg-[#00FF88] animate-ping opacity-40" />
              </div>
              <span className="text-[#00FF88] text-[10px] font-mono font-black tracking-[0.2em] uppercase">SYSTEM_VERIFIED</span>
            </div>
          </div>
          
          <p className="text-xl sm:text-2xl text-white/90 leading-tight mb-12 font-medium tracking-tight group-hover:text-white transition-colors duration-500">
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

        {/* Holographic Client Profile Card */}
        <div className="flex items-center gap-6 pt-10 border-t border-white/5 relative z-10 group/profile">
          <div className="relative">
            <div className="w-16 h-16 rounded-[1.5rem] p-px bg-gradient-to-br from-[var(--color-cyan)]/40 to-transparent shadow-[0_0_20px_rgba(0,217,255,0.2)]">
              <div className="w-full h-full rounded-[1.4rem] overflow-hidden">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover/profile:scale-110" />
              </div>
            </div>
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border border-dashed border-[var(--color-cyan)]/10 rounded-[1.8rem] pointer-events-none"
            />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-black text-lg tracking-tighter leading-none mb-2">{testimonial.name}</h4>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_5px_var(--color-cyan)]" />
                <p className="text-[10px] text-white/50 font-mono font-black tracking-widest uppercase">{testimonial.role}</p>
              </div>
              <span className="text-[10px] text-[var(--color-cyan)]/60 font-black uppercase tracking-[0.3em] pl-3.5">{testimonial.category}</span>
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
  ], []);

  const metrics = [
    { value: "50+", label: "Projects Delivered" },
    { value: "20+", label: "Happy Clients" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "15+", label: "Tech Stack" }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonial-card",
        { y: 100, opacity: 0, filter: "blur(20px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.3,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          }
        }
      );

      gsap.fromTo(
        ".metric-item",
        { y: 40, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 95%",
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" className="section-padding bg-[#030305] relative overflow-hidden" ref={containerRef}>
      {/* 🎞️ ULTRA-PREMIUM CINEMATIC DEPTH LAYERS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Fog & Noise */}
        <div className="absolute inset-0 bg-[#030305] opacity-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Neural Grid with Breathing Glow */}
        <div className="absolute inset-0 opacity-[0.07]" 
          style={{ backgroundImage: 'linear-gradient(var(--color-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--color-cyan) 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />
        
        {/* Cinematic Particles & Streaks */}
        {[...Array(20)].map((_, i) => <NeuralSpark key={i} delay={i * 0.5} />)}
        {[...Array(5)].map((_, i) => <LightStreak key={i} delay={i * 2} />)}

        {/* Depth Spotlights */}
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_50%_50%,var(--color-cyan)_0%,transparent_70%)] blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.3, 1, 1.3], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute bottom-[-30%] right-[-10%] w-[90%] h-[90%] bg-[radial-gradient(circle_at_50%_50%,var(--color-purple)_0%,transparent_70%)] blur-[150px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* ✨ HOLOGRAPHIC TYPOGRAPHY HERO */}
        <div className="mb-24 sm:mb-40 flex flex-col items-center text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            <div className="section-label mb-8 px-6 py-2 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-md">
              MEMORY_ARCHIVE_v2.0
            </div>
            
            <h2 className="section-heading mb-10 max-w-5xl !leading-[0.95]">
              Experiences that <br className="hidden sm:block" /> clients <span className="relative inline-block px-2 group/hologram">
                <span className="text-gradient drop-shadow-[0_0_30px_rgba(0,217,255,0.4)] transition-all duration-700 group-hover/hologram:drop-shadow-[0_0_50px_rgba(0,217,255,0.8)]">
                  remember
                </span>
                {/* Holographic Glitch Layer */}
                <motion.span 
                  animate={{ opacity: [0, 0.2, 0, 0.3, 0], x: [0, -2, 2, -1, 0] }}
                  transition={{ duration: 4, repeat: Infinity, times: [0, 0.1, 0.15, 0.2, 1] }}
                  className="absolute inset-0 text-[var(--color-purple)] blur-[2px] pointer-events-none translate-x-1"
                >
                  remember
                </motion.span>
                <motion.div 
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -inset-8 bg-[var(--color-cyan)]/5 blur-[50px] rounded-full -z-10"
                />
              </span>
            </h2>
            
            <p className="section-subheading mx-auto text-white/50">
              A neural collection of visionary partnerships. Engineering digital legacies that transcend the ordinary and redefine market standards.
            </p>
          </motion.div>
        </div>

        {/* 🧊 HOLOGRAPHIC MEMORY GRID */}
        <div className="flex gap-8 overflow-x-auto pb-16 snap-x hide-scrollbar lg:grid lg:grid-cols-3 lg:gap-12 lg:overflow-visible lg:pb-0">
          {testimonials.map((t, idx) => (
            <TestimonialCard 
              key={idx}
              index={idx}
              testimonial={t}
              isFocused={focusedIndex === idx}
              isAnyFocused={focusedIndex !== null}
              onHover={(focused) => setFocusedIndex(focused ? idx : null)}
            />
          ))}
        </div>

        {/* ⚡ QUANTUM METRICS SYSTEM */}
        <div ref={metricsRef} className="mt-40 sm:mt-64 pt-24 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-[var(--color-cyan)]/40 to-transparent" />
          
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -10, scale: 1.05 }}
              className="metric-item flex flex-col items-center justify-center text-center group"
            >
              <div className="relative">
                <h3 className="text-6xl sm:text-7xl font-heading font-black mb-4 text-white tracking-tighter transition-all duration-700 group-hover:text-[var(--color-cyan)] group-hover:drop-shadow-[0_0_30px_rgba(0,217,255,0.6)]">
                  {metric.value}
                </h3>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-cyan)] to-transparent"
                />
              </div>
              <p className="text-[12px] font-mono tracking-[0.5em] uppercase text-white/20 group-hover:text-white/50 transition-colors duration-300 font-black mt-6">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
