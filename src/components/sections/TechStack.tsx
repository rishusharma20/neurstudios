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
    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;
    setTilt({ x: tiltX, y: tiltY });
  };

  return (
    <div className={cn(
      "relative flex flex-col items-center gap-3 transition-all duration-300",
      isHovered ? "z-[100]" : "z-10"
    )}>
      <motion.div
        onMouseEnter={onHoverStart}
        onMouseLeave={() => {
          onHoverEnd();
          setTilt({ x: 0, y: 0 });
        }}
        onMouseMove={handleMouseMove}
        onTouchStart={onHoverStart}
        animate={{ 
          rotateX: tilt.x, 
          rotateY: tilt.y,
          scale: isHovered ? 1.2 : (isAnyHovered ? 0.95 : 1),
          z: isHovered ? 50 : 0,
          opacity: isAnyHovered && !isHovered ? 0.4 : 1
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center cursor-pointer overflow-visible group/icon shadow-xl",
          isHovered && "border-opacity-100 bg-white/[0.08]"
        )}
        style={{ 
          borderColor: isHovered ? color : "rgba(255,255,255,0.1)",
          boxShadow: isHovered ? `0 0 30px ${color}33` : "none",
          transformStyle: "preserve-3d"
        }}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-[-10%] rounded-full blur-xl -z-10 pointer-events-none opacity-40"
              style={{ background: `radial-gradient(circle, ${color}44 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>

        <img 
          src={icon} 
          alt={name} 
          className={cn(
            "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-all duration-500 relative z-10",
            invert && "invert opacity-90",
            isHovered ? "drop-shadow-[0_0_10px_" + color + "] brightness-110" : "brightness-75"
          )}
          style={{ transform: "translateZ(30px)" }}
        />
        
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:10px_10px] rounded-2xl" />
      </motion.div>

      <span className={cn(
        "font-mono text-[9px] md:text-[10px] tracking-[0.2em] transition-all duration-500 uppercase font-black",
        isHovered ? "text-white opacity-100 translate-y-1" : (isAnyHovered ? "opacity-0" : "text-white/20")
      )}>
        {name}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.9 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 sm:w-56 z-[110] pointer-events-none"
          >
            <div className="bg-[#08080a]/90 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/10 shadow-2xl relative overflow-hidden text-center">
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />
              <p className="text-[10px] sm:text-[11px] font-mono text-white leading-relaxed uppercase tracking-wider font-bold">
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
    if (!panelRef.current || window.innerWidth < 1024) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    setRotate({ x: x * -5, y: y * 5 });
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
        opacity: isAnyHovered && !isCurrentPanelActive ? 0.8 : 1,
        scale: isAnyHovered && !isCurrentPanelActive ? 0.98 : 1
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "bg-white/[0.02] backdrop-blur-md rounded-[2rem] p-8 sm:p-12 md:p-16 relative group overflow-hidden border border-white/5 transition-all duration-700",
        isCurrentPanelActive ? "border-white/10 bg-white/[0.04] z-20" : "border-white/5 z-10",
        className
      )}
      style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
    >
      <div className="absolute top-6 right-8 flex items-center gap-2 z-20 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
        <span className="text-[9px] font-mono tracking-[0.2em] uppercase text-white font-bold">{status}</span>
      </div>

      <div className="relative z-10">
        <h3 className="text-2xl sm:text-3xl font-heading font-black text-white mb-10 tracking-tight flex items-center gap-4">
          <div className="w-8 h-[2px] opacity-50" style={{ backgroundColor: color }} />
          {title}
        </h3>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 sm:gap-x-12">
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

      <div className="absolute inset-0 pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 overflow-hidden">
        {Visual && <Visual color={color} />}
      </div>
    </motion.div>
  );
};

export const TechStack = () => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const categories = [
    {
      title: "FRONTEND ENGINE",
      color: "#00D9FF",
      status: "SYSTEM ONLINE",
      className: "lg:col-span-2",
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
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ x: -100 }}
              animate={{ x: 100 }}
              transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
              className="h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20"
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
        <div className="grid grid-cols-4 gap-4 p-8">
          {[...Array(12)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
              className="w-1.5 h-1.5 rounded-full"
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
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-48 h-48 border border-dashed rounded-full opacity-20"
            style={{ borderColor: color }}
          />
        </div>
      )
    }
  ];

  return (
    <section id="tech-stack" className="section-padding bg-[#030305] relative overflow-hidden">
      {/* Drifting Code Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] select-none font-mono text-[10px] whitespace-nowrap leading-relaxed flex hidden sm:flex">
        {[...Array(3)].map((_, j) => (
          <div key={j} className="flex-1 overflow-hidden">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 60 + j * 20, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(50)].map((_, i) => (
                <div key={i} className="mb-4">
                  {`const node_${i} = { state: 'SYNCED', load: '${Math.floor(Math.random() * 100)}%' };`}
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="mb-20 sm:mb-28 text-center sm:text-left">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            THE_TECH_ECOSYSTEM
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-heading max-w-4xl"
          >
            Technologies behind the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-cyan)] via-blue-400 to-[var(--color-purple)]">experience</span>.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, i) => (
            <CategoryPanel 
              key={i} 
              {...cat} 
              activeTech={activeTech} 
              isAnyHovered={!!activeTech} 
              onTechHover={setActiveTech} 
            />
          ))}

          <CategoryPanel 
            title="OPS & ECOSYSTEM" 
            color="#FF6B6B" 
            status="READY_FOR_LAUNCH" 
            className="lg:col-span-2"
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
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 5, repeat: Infinity }}
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

