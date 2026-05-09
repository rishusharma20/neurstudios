import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

const TechIcon = ({ name, icon, invert, color, description }: { name: string; icon: string; invert?: boolean; color: string; description: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="relative flex flex-col items-center gap-3">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        className={cn(
          "relative w-14 h-14 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden group/icon",
          isHovered && "border-opacity-50"
        )}
        style={{ borderColor: isHovered ? color : "rgba(255,255,255,0.1)" }}
      >
        {/* Holographic Shine */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${color}33, transparent 70%)`,
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/icon:opacity-20 transition-opacity duration-1000">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-25deg] animate-[sweep_2s_infinite]" />
        </div>

        <img 
          src={icon} 
          alt={name} 
          className={cn(
            "w-7 h-7 md:w-10 md:h-10 transition-all duration-500 relative z-10",
            invert && "invert opacity-80",
            isHovered ? "drop-shadow-[0_0_10px_" + color + "]" : ""
          )}
        />
      </motion.div>

      <span className={cn(
        "font-mono text-[10px] md:text-xs tracking-wider transition-colors duration-300",
        isHovered ? "text-white" : "text-white/40"
      )}>
        {name}
      </span>

      {/* Holographic Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 z-50 pointer-events-none"
          >
            <div className="glass px-4 py-2 rounded-lg border border-white/20 shadow-2xl relative">
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white/20" />
              <p className="text-[10px] font-mono text-white leading-tight text-center">
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CategoryPanel = ({ 
  title, 
  color, 
  status, 
  techs, 
  className,
  visual: Visual 
}: { 
  title: string; 
  color: string; 
  status: string; 
  techs: any[]; 
  className?: string;
  visual?: any;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * -10, y: y * 10 });
  };

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "glass rounded-[2.5rem] p-8 md:p-12 relative group overflow-hidden border border-white/5",
        className
      )}
      style={{ perspective: "1000px" }}
    >
      {/* HUD status */}
      <div className="absolute top-6 right-8 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-[9px] font-mono tracking-widest uppercase text-white/40">{status}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-10 tracking-tight flex items-center gap-4">
          <div className="w-8 h-[2px]" style={{ backgroundColor: color }} />
          {title}
        </h3>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-10">
          {techs.map((tech, i) => (
            <TechIcon key={i} {...tech} color={color} />
          ))}
        </div>
      </div>

      {/* Background Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700 overflow-hidden">
        {Visual && <Visual color={color} />}
      </div>

      {/* Border Glow */}
      <div 
        className="absolute inset-px rounded-[2.5rem] pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 40px ${color}1a, 0 0 20px ${color}1a` }}
      />
    </motion.div>
  );
};

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    {
      title: "FRONTEND ENGINE",
      color: "#00D9FF",
      status: "SYSTEM ONLINE",
      className: "md:col-span-2",
      techs: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", description: "Component-based UI architecture" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true, description: "Production-grade React framework" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", description: "Strictly typed JS development" },
        { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", invert: true, description: "Immersive 3D WebGL rendering" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", description: "Utility-first CSS styling" },
        { name: "GSAP", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/greensock.svg", invert: true, description: "Professional-grade web animations" }
      ],
      visual: ({ color }: any) => (
        <div className="flex flex-col gap-4 p-8">
          {[...Array(10)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
              className="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent"
              style={{ color }}
            />
          ))}
        </div>
      )
    },
    {
      title: "BACKEND ARCH",
      color: "#7B61FF",
      status: "API ACTIVE",
      techs: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", description: "High-performance JS runtime" },
        { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true, description: "Fast, unopinionated web framework" },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", description: "Enterprise-scale backend logic" }
      ],
      visual: ({ color }: any) => (
        <div className="grid grid-cols-5 gap-4 p-8">
          {[...Array(25)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      )
    },
    {
      title: "DATA INFRA",
      color: "#00FF88",
      status: "REAL-TIME SYNC",
      techs: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", description: "NoSQL document storage" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", description: "Reliable relational database" }
      ],
      visual: ({ color }: any) => (
        <div className="flex items-center justify-center h-full">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-64 h-64 border border-dashed rounded-full"
            style={{ borderColor: color }}
          />
        </div>
      )
    }
  ];

  return (
    <section ref={containerRef} id="tech-stack" className="py-32 bg-[#030305] relative overflow-hidden">
      {/* Drifting Code Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] select-none font-mono text-xs whitespace-nowrap leading-relaxed flex">
        {[...Array(3)].map((_, j) => (
          <div key={j} className="flex-1 overflow-hidden">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 40 + j * 10, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(100)].map((_, i) => (
                <div key={i} className="mb-2">
                  {`const tech = { id: ${i}, status: 'ACTIVE', type: 'NEURAL_NODE', sync: true };`}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="mb-24">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            THE STACK
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white max-w-4xl leading-[1.1] tracking-tight"
          >
            Technologies behind the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-cyan)] via-blue-400 to-[var(--color-purple)] animate-gradient-shift bg-[length:200%_auto]">experience</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, i) => (
            <CategoryPanel key={i} {...cat} />
          ))}

          {/* CLOUD & TOOLS - Large horizontal panel */}
          <CategoryPanel 
            title="OPS & ECOSYSTEM" 
            color="#FF6B6B" 
            status="DEPLOYMENT READY" 
            className="md:col-span-2"
            techs={[
              { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", description: "Containerized application scaling" },
              { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true, description: "Version control & collaboration" },
              { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true, description: "Edge-first cloud deployment" },
              { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", description: "Collaborative design interface" }
            ]}
            visual={({ color }: any) => (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="w-full h-full rounded-full border border-current"
                  style={{ color }}
                />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};

