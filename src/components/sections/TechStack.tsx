import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/helpers";

const TechIcon = ({ 
  name, 
  icon, 
  invert, 
  color, 
  description,
  isAnyHovered,
  onHoverChange
}: { 
  name: string; 
  icon: string; 
  invert?: boolean; 
  color: string; 
  description: string;
  isAnyHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Calculate tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange(false);
    setTilt({ x: 0, y: 0 });
  };

  // Icon Specific Animation Logic
  const renderIconEffect = () => {
    if (!isHovered) return null;
    
    switch(name) {
      case "React":
        return (
          <motion.div 
            className="absolute inset-0 border border-cyan-400 rounded-full opacity-20"
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        );
      case "Next.js":
        return (
          <motion.div 
            className="absolute inset-0 border-t border-white rounded-full opacity-30"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        );
      case "Three.js":
        return (
          <motion.div 
            className="absolute inset-0 bg-white/5"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative flex flex-col items-center gap-3">
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        animate={{ 
          rotateX: tilt.x, 
          rotateY: tilt.y,
          scale: isHovered ? 1.15 : 1,
          z: isHovered ? 50 : 0
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative w-16 h-16 md:w-24 md:h-24 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-500 cursor-pointer overflow-hidden group/icon shadow-2xl",
          isAnyHovered && !isHovered ? "opacity-30 blur-[1px]" : "opacity-100 blur-0",
          isHovered && "border-opacity-100"
        )}
        style={{ 
          borderColor: isHovered ? color : "rgba(255,255,255,0.1)",
          boxShadow: isHovered ? `0 0 30px ${color}33` : "none",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Apple Vision Pro Tracking Light */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${color}44, transparent 70%)`,
          }}
        />

        {/* Holographic Reflection Sweep */}
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-0 group-hover/icon:opacity-20"
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
            invert && "invert opacity-80",
            isHovered ? "drop-shadow-[0_0_15px_" + color + "]" : ""
          )}
          style={{ transform: "translateZ(30px)" }}
        />
        
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
      </motion.div>

      <span className={cn(
        "font-mono text-[10px] md:text-xs tracking-[0.2em] transition-all duration-300 uppercase font-bold",
        isHovered ? "text-white text-glow" : "text-white/30"
      )}>
        {name}
      </span>

      {/* Holographic HUD Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 z-50 pointer-events-none"
          >
            <div className="bg-black/60 backdrop-blur-xl px-5 py-3 rounded-xl border border-cyan-400/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
              {/* Tooltip Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
              
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent" />
              <p className="text-[11px] font-mono text-white leading-relaxed text-center relative z-10 font-bold uppercase tracking-wider">
                <span className="text-cyan-400">SYS_INFO:</span> {description}
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
  const [isAnyHovered, setIsAnyHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * -12, y: y * 12 });
  };

  return (
    <motion.div
      ref={panelRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "bg-white/[0.01] backdrop-blur-sm rounded-[2.5rem] p-10 md:p-14 relative group overflow-hidden border border-white/5 transition-all duration-700",
        isAnyHovered ? "border-white/20 bg-white/[0.03]" : "border-white/5",
        className
      )}
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
    >
      {/* HUD status */}
      <div className="absolute top-8 right-10 flex items-center gap-2 z-20">
        <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: color, color }} />
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
              isAnyHovered={isAnyHovered}
              onHoverChange={setIsAnyHovered}
            />
          ))}
        </div>
      </div>

      {/* Interactive Light Surface */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}05 0%, transparent 70%)`
        }}
      />

      {/* Holographic Grid Visual */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700 overflow-hidden">
        {Visual && <Visual color={color} />}
      </div>

      {/* Border Glow System */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] pointer-events-none transition-all duration-700 opacity-0 group-hover:opacity-100 border border-white/10"
        style={{ boxShadow: `inset 0 0 60px ${color}11, 0 0 30px ${color}08` }}
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

