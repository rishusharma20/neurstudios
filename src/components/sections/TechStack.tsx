import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

const TechIcon = ({ 
  name, 
  icon, 
  invert, 
  color, 
  description,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd
}: { 
  name: string; 
  icon: string; 
  invert?: boolean; 
  color: string; 
  description: string;
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 8;
    const tiltY = (centerX - x) / 8;
    setTilt({ x: tiltX, y: tiltY });
  };

  const renderIconEffect = () => {
    if (!isHovered) return null;
    
    switch(name) {
      case "React":
        return (
          <motion.div 
            className="absolute inset-0 border border-cyan-400 rounded-full opacity-40"
            animate={{ rotate: 360, scale: [1, 1.25, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        );
      case "Next.js":
        return (
          <motion.div 
            className="absolute inset-0 border-t border-white rounded-full opacity-50 shadow-[0_0_20px_rgba(255,255,255,0.4)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        );
      case "Three.js":
        return (
          <motion.div 
            className="absolute inset-0 bg-white/15 blur-md"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "relative flex flex-col items-center gap-3 transition-all duration-500",
      isHovered ? "z-[60]" : "z-10"
    )}>
      <motion.div
        onMouseEnter={onHoverStart}
        onMouseLeave={() => {
          onHoverEnd();
          setTilt({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        animate={{ 
          rotateX: tilt.x, 
          rotateY: tilt.y,
          scale: isHovered ? 1.25 : (isAnyHovered ? 0.92 : 1),
          z: isHovered ? 120 : 0,
          filter: isAnyHovered && !isHovered ? "blur(2px) brightness(0.6)" : "blur(0px) brightness(1.1)",
          opacity: isAnyHovered && !isHovered ? 0.45 : 1
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={cn(
          "relative w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center cursor-pointer overflow-visible group/icon shadow-2xl",
          isHovered && "border-opacity-100"
        )}
        style={{ 
          borderColor: isHovered ? color : "rgba(255,255,255,0.1)",
          boxShadow: isHovered ? `0 0 60px ${color}55, inset 0 0 25px ${color}33` : "none",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Powered On Energy Aura */}
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.3 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-[-30%] rounded-full blur-3xl -z-10 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${color}44 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>

        {/* Vision Pro Tracking Light */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 rounded-2xl overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${color}55, transparent 70%)`,
          }}
        />

        {/* Shimmer Sweep */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/icon:opacity-30"
          animate={isHovered ? { x: ["-100%", "200%"] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ background: "linear-gradient(90deg, transparent, white, transparent)" }}
        />

        {renderIconEffect()}

        <img 
          src={icon} 
          alt={name} 
          className={cn(
            "w-8 h-8 md:w-12 md:h-12 transition-all duration-500 relative z-10",
            invert && "invert opacity-90",
            isHovered ? "drop-shadow-[0_0_25px_" + color + "] brightness-110" : "brightness-90"
          )}
          style={{ transform: "translateZ(50px)" }}
        />
        
        {/* Animated HUD Grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:12px_12px] rounded-2xl" />
      </motion.div>

      <span className={cn(
        "font-mono text-[10px] md:text-xs tracking-[0.3em] transition-all duration-500 uppercase font-bold",
        isHovered ? "text-white opacity-100 translate-y-2 text-glow" : (isAnyHovered ? "opacity-0" : "text-white/30")
      )}>
        {name}
      </span>

      {/* Holographic HUD Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.8 }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 z-[70] pointer-events-none"
          >
            <div className="bg-black/90 backdrop-blur-3xl px-6 py-5 rounded-xl border-2 border-cyan-400/50 shadow-[0_0_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00D9FF]" />
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-black">NODE_INFO_ACTIVE</span>
                </div>
                <p className="text-[12px] font-mono text-white leading-relaxed text-center uppercase tracking-wider font-bold">
                  {description}
                </p>
              </div>
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
  visual: Visual,
  activeTech,
  isAnyHovered,
  onTechHover
}: { 
  title: string; 
  color: string; 
  status: string; 
  techs: any[]; 
  className?: string;
  visual?: any;
  activeTech: string | null;
  isAnyHovered: boolean;
  onTechHover: (name: string | null) => void;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * -8, y: y * 8 });
  };

  const isCurrentPanelActive = techs.find(t => t.name === activeTech);

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ 
        rotateX: rotate.x, 
        rotateY: rotate.y,
        opacity: isAnyHovered && !isCurrentPanelActive ? 0.75 : 1,
        scale: isAnyHovered && !isCurrentPanelActive ? 0.99 : 1,
        filter: isAnyHovered && !isCurrentPanelActive ? "blur(1px) brightness(0.8)" : "blur(0px) brightness(1)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "bg-white/[0.01] backdrop-blur-sm rounded-[2.5rem] p-10 md:p-14 relative group overflow-hidden border border-white/5 transition-all duration-700",
        isCurrentPanelActive ? "border-white/20 bg-white/[0.04]" : "border-white/5",
        className
      )}
      style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
    >
      {/* HUD status */}
      <div className="absolute top-8 right-10 flex items-center gap-2 z-20">
        <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_12px_currentColor]" style={{ backgroundColor: color, color }} />
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/50">{status}</span>
      </div>

      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <h3 className="text-3xl md:text-4xl font-heading font-black text-white mb-12 tracking-tight flex items-center gap-5">
          <div className="w-10 h-[2px] shadow-[0_0_15px_currentColor]" style={{ backgroundColor: color, color }} />
          {title}
        </h3>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 md:gap-x-14">
          {techs.map((tech, i) => (
            <TechIcon 
              key={i} 
              {...tech} 
              color={color} 
              isHovered={activeTech === tech.name}
              isAnyHovered={isAnyHovered}
              onHoverStart={() => onTechHover(tech.name)}
              onHoverEnd={() => onTechHover(null)}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-700 overflow-hidden">
        {Visual && <Visual color={color} />}
      </div>

      <div 
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-100 border border-white/10"
        style={{ boxShadow: `inset 0 0 60px ${color}11, 0 0 30px ${color}08` }}
      />
    </motion.div>
  );
};

export const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

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
      {/* Cinematic Focus Overlay - LIGHTER VERSION */}
      <motion.div 
        animate={{ opacity: activeTech ? 1 : 0 }}
        className="absolute inset-0 bg-black/30 backdrop-blur-[1px] z-30 pointer-events-none"
      />

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
            <CategoryPanel 
              key={i} 
              {...cat} 
              activeTech={activeTech} 
              isAnyHovered={!!activeTech} 
              onTechHover={setActiveTech} 
            />
          ))}

          {/* CLOUD & TOOLS - Large horizontal panel */}
          <CategoryPanel 
            title="OPS & ECOSYSTEM" 
            color="#FF6B6B" 
            status="DEPLOYMENT READY" 
            className="md:col-span-2"
            activeTech={activeTech}
            isAnyHovered={!!activeTech}
            onTechHover={setActiveTech}
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

