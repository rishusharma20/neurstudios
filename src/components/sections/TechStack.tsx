import React from "react";
import { motion } from "framer-motion";

export const TechStack = () => {
  const categories = [
    {
      title: "Frontend",
      baseColor: "#00D9FF",
      glowColor: "rgba(0, 217, 255, 0.4)",
      borderColor: "hover:border-[#00D9FF]",
      techs: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", invert: true },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg", invert: true },
        { name: "Vite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" }
      ]
    },
    {
      title: "Backend",
      baseColor: "#7B61FF",
      glowColor: "rgba(123, 97, 255, 0.4)",
      borderColor: "hover:border-[#7B61FF]",
      techs: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
        { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
        { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" }
      ]
    },
    {
      title: "Database",
      baseColor: "#00FF88",
      glowColor: "rgba(0, 255, 136, 0.4)",
      borderColor: "hover:border-[#00FF88]",
      techs: [
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
      ]
    },
    {
      title: "Tools",
      baseColor: "#FF6B6B",
      glowColor: "rgba(255, 107, 107, 0.4)",
      borderColor: "hover:border-[#FF6B6B]",
      techs: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
        { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg", invert: true },
        { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-[var(--color-primary)] relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 xl:px-20 max-w-[1400px] relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <span className="section-label">TECHNOLOGY STACK</span>
          <h2 className="section-heading mb-0">
            Technologies behind the <span className="text-gradient">experience</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              className={`glass rounded-[2rem] p-8 md:p-10 relative group overflow-hidden border border-white/5 transition-all duration-500 ${cat.borderColor}`}
              whileHover={{ y: -8 }}
              style={{"--glow-color": cat.glowColor} as React.CSSProperties}
            >
              {/* Animated Gradient Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${cat.baseColor}, transparent)` }}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 0%, ${cat.baseColor}, transparent 70%)` }}></div>
              
              <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-8 relative z-10 flex items-center">
                <div className="w-2 h-2 rounded-full mr-4 shadow-[0_0_10px_var(--glow-color)]" style={{ backgroundColor: cat.baseColor }}></div>
                {cat.title}
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-y-8 gap-x-4 relative z-10">
                {cat.techs.map((tech, techIdx) => (
                  <div key={techIdx} className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:shadow-[0_0_20px_var(--glow-color)] group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500">
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className={`w-7 h-7 md:w-8 md:h-8 transition-transform duration-500 group-hover:scale-110 ${tech.invert ? 'invert opacity-80 group-hover:opacity-100' : ''}`}
                        onError={(e) => {
                          if (tech.name === "Vercel") {
                             e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTI0IDIyLjUyNUgxLjUzMmwxMS4yMzQtMTkuNDVMMjQgMjIuNTI1eiIvPjwvc3ZnPg==";
                             e.currentTarget.classList.add("invert");
                          }
                        }}
                      />
                    </div>
                    <span className="font-mono text-[10px] md:text-xs text-[var(--color-text-muted)] group-hover:text-white transition-colors duration-300 text-center">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
