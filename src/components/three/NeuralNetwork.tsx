import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Particles } from "./Particles";
import { PostProcessing } from "./PostProcessing";
import { Line, Html, Sphere, MeshDistortMaterial } from "@react-three/drei";

const isMobileGlobal = typeof window !== "undefined" && window.innerWidth < 768;

// --- SHADERS & CONSTANTS ---
const CORE_COLOR = "#00D9FF";
const ACCENT_COLOR = "#7B61FF";

const Branch = ({ points, label, endPoint, index, isHovered, onHover }: { 
  points: THREE.Vector3[], 
  label: string, 
  endPoint: THREE.Vector3, 
  index: number,
  isHovered: boolean,
  onHover: (hovered: boolean) => void
}) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const lineRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate data particle flowing through branch
    if (particleRef.current && points.length > 1) {
      const duration = 2 + (index % 3); 
      const progress = ((t + index * 0.7) % duration) / duration;
      
      const numSegments = points.length - 1;
      const segmentProgress = progress * numSegments;
      const segmentIndex = Math.floor(segmentProgress);
      const tSegment = segmentProgress - segmentIndex;
      
      const p1 = points[segmentIndex];
      const p2 = points[Math.min(segmentIndex + 1, points.length - 1)];
      
      if (p1 && p2) {
        particleRef.current.position.lerpVectors(p1, p2, tSegment);
      }
    }

    if (lineRef.current) {
      lineRef.current.material.dashOffset = -t * 0.5;
    }
  });

  return (
    <group>
      <Line 
        ref={lineRef}
        points={points}
        color={isHovered ? CORE_COLOR : "#4FB8FF"}
        lineWidth={isHovered ? 2.5 : 1.2}
        transparent
        opacity={isHovered ? 0.8 : 0.3}
        dashed={true}
        dashScale={5}
        dashSize={0.5}
      />
      
      {/* End node hub */}
      <mesh 
        position={endPoint} 
        onPointerOver={() => onHover(true)}
        onPointerOut={() => onHover(false)}
      >
        <sphereGeometry args={[isHovered ? 0.1 : 0.06, 16, 16]} />
        <meshBasicMaterial 
          color={isHovered ? CORE_COLOR : "#00D9FF"} 
          transparent 
          opacity={0.8} 
        />
        {isHovered && (
          <mesh>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial color={CORE_COLOR} transparent opacity={0.2} />
          </mesh>
        )}
      </mesh>

      {/* Traveling data particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
      </mesh>

      <Html position={endPoint} center distanceFactor={12} zIndexRange={[100, 0]}>
        <motion.div 
          initial={false}
          animate={{
            scale: isHovered ? 1.2 : 1,
            backgroundColor: isHovered ? "rgba(0, 217, 255, 0.2)" : "rgba(10, 10, 15, 0.6)",
            borderColor: isHovered ? "rgba(0, 217, 255, 0.8)" : "rgba(0, 217, 255, 0.3)",
          }}
          className="glass px-4 py-2 rounded-lg text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-white whitespace-nowrap pointer-events-auto cursor-pointer uppercase shadow-2xl transition-all duration-500"
          onMouseEnter={() => onHover(true)}
          onMouseLeave={() => onHover(false)}
        >
          {label}
        </motion.div>
      </Html>
    </group>
  );
};

const IntelligenceCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Group>(null);
  const ringRef2 = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    
    // Core interaction - tilt toward mouse
    if (groupRef.current) {
      const targetRotationX = pointer.y * 0.15;
      const targetRotationY = pointer.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      
      // Magnetic pull / float
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
      groupRef.current.position.x = Math.cos(t * 0.5) * 0.05;
    }

    // Layer rotations
    if (innerRef.current) {
      innerRef.current.rotation.y += 0.005;
      innerRef.current.rotation.z += 0.002;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= 0.003;
      outerRef.current.rotation.x += 0.001;
    }

    // Rings
    if (ringRef1.current) ringRef1.current.rotation.z += 0.01;
    if (ringRef2.current) ringRef2.current.rotation.z -= 0.008;
    if (ringRef2.current) ringRef2.current.rotation.x = Math.sin(t * 0.5) * 0.2;
  });

  const branches = useMemo(() => {
    const services = [
      { label: "FRONTEND", dir: [-1.2, 0.4, 0.5] },
      { label: "BACKEND", dir: [1.2, 0.4, 0.5] },
      { label: "3D VISUALS", dir: [-0.4, 1.2, 0.2] },
      { label: "UI/UX DESIGN", dir: [0.4, 1.2, -0.2] },
      { label: "API SYSTEMS", dir: [1, 0.8, 0.2] },
      { label: "CLOUD INFRA", dir: [1.2, -0.4, -0.3] },
      { label: "FULL STACK", dir: [-1.2, -0.5, -0.2] },
      { label: "SYSTEM ARCH", dir: [0.6, -1.2, 0.3] },
      { label: "DEPLOYMENT", dir: [-0.6, -1.2, 0.2] },
      { label: "AI CORE", dir: [-0.8, 0.8, -0.5] },
    ];

    if (isMobile) services.splice(6);

    return services.map((svc, i) => {
      const points = [];
      const dir = new THREE.Vector3(svc.dir[0], svc.dir[1], svc.dir[2]).normalize();
      let currentPos = dir.clone().multiplyScalar(1.2);
      points.push(currentPos.clone());
      
      const length = isMobile ? 1.8 : 3.0;
      const segments = 8;
      
      for (let j = 0; j < segments; j++) {
        const jitter = new THREE.Vector3(
          Math.sin(j * 0.6 + i) * 0.25,
          Math.cos(j * 0.5 + i) * 0.25,
          Math.sin(j * 0.7 + i) * 0.25
        ).multiplyScalar(1 - j / segments);
        
        currentPos.add(dir.clone().multiplyScalar(length / segments)).add(jitter);
        points.push(currentPos.clone());
      }
      return { points, label: svc.label, endPoint: points[points.length - 1] };
    });
  }, [isMobile]);

  return (
    <group position={isMobile ? [0, 0.5, 0] : [2.5, 0, 0]} ref={groupRef}>
      {/* LAYER 1: Core Plasma Orb */}
      <Sphere args={[0.9, 64, 64]} ref={innerRef}>
        <MeshDistortMaterial
          color={ACCENT_COLOR}
          speed={4}
          distort={0.4}
          radius={1}
          emissive={ACCENT_COLOR}
          emissiveIntensity={hoveredNode !== null ? 4 : 2}
          transparent
          opacity={0.6}
        />
      </Sphere>

      {/* LAYER 2: Geometric Wireframe Shell */}
      <Sphere args={[1.3, 32, 32]} ref={outerRef}>
        <meshStandardMaterial
          color={CORE_COLOR}
          wireframe
          transparent
          opacity={0.2}
          emissive={CORE_COLOR}
          emissiveIntensity={1}
        />
      </Sphere>

      {/* LAYER 3: Outer Energy Rings */}
      <group ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.6, 0.01, 16, 100]} />
          <meshBasicMaterial color={CORE_COLOR} transparent opacity={0.3} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.005, 16, 100]} />
          <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0.2} />
        </mesh>
      </group>

      <group ref={ringRef2} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.008, 16, 100]} />
          <meshBasicMaterial color={CORE_COLOR} transparent opacity={0.15} />
        </mesh>
      </group>

      {/* Connection Lines & Service Nodes */}
      {branches.map((branch, index) => (
        <Branch 
          key={index} 
          index={index}
          points={branch.points} 
          label={branch.label} 
          endPoint={branch.endPoint}
          isHovered={hoveredNode === index}
          onHover={(h) => setHoveredNode(h ? index : null)}
        />
      ))}

      {/* System Data indicators */}
      <Html position={[0, 1.8, 0]} center distanceFactor={15}>
        <div className="flex flex-col items-center gap-1 opacity-40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            <span className="text-[8px] font-mono tracking-widest text-[#00FF88]">CORE ACTIVE</span>
          </div>
          <div className="text-[8px] font-mono tracking-widest text-white/50">PERFORMANCE 99.9%</div>
        </div>
      </Html>
    </group>
  );
};

export const NeuralNetwork = () => {
  const { pointer } = useThree();
  const starRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (starRef.current) {
      starRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      starRef.current.position.x = pointer.x * 0.2;
      starRef.current.position.y = pointer.y * 0.2;
    }
  });

  return (
    <>
      <color attach="background" args={["#030305"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color={CORE_COLOR} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={ACCENT_COLOR} />
      <spotLight 
        position={[0, 5, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        color={CORE_COLOR} 
        castShadow 
      />
      
      <IntelligenceCore />
      
      {/* Immersive background starfield */}
      <Particles count={isMobileGlobal ? 300 : 800} />
      
      <PostProcessing />
    </>
  );
};

