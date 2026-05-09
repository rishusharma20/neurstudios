import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Particles } from "./Particles";
import { PostProcessing } from "./PostProcessing";
import { Line, Html, MeshDistortMaterial } from "@react-three/drei";

const Branch = ({ points, label, endPoint, index }: { points: THREE.Vector3[], label: string, endPoint: THREE.Vector3, index: number }) => {
  const particleRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate data particle flowing through branch
    if (particleRef.current && points.length > 1) {
      const duration = 3 + (index % 2); // Vary speed
      const progress = ((t + index * 0.5) % duration) / duration;
      
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

    // Label subtle floating micro-motion
    if (labelRef.current) {
      const yOffset = Math.sin(t * 2 + index) * 2;
      labelRef.current.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    }
  });

  return (
    <group>
      <Line 
        points={points}
        color="#4FB8FF"
        lineWidth={1.5}
        transparent
        opacity={0.4}
      />
      {/* End node */}
      <mesh position={endPoint}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#00D9FF" transparent opacity={0.8} />
      </mesh>
      {/* Traveling data particle */}
      <mesh ref={particleRef}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <Html position={endPoint} center distanceFactor={15} zIndexRange={[100, 0]}>
        <div 
          ref={labelRef}
          className="glass px-3 py-1.5 rounded-md text-[10px] sm:text-[11px] font-mono tracking-widest text-white whitespace-nowrap border-[rgba(0,217,255,0.3)] shadow-[0_0_15px_rgba(0,217,255,0.2)] pointer-events-none uppercase transition-all duration-300"
        >
          {label}
        </div>
      </Html>
    </group>
  );
};

const NeuralCell = () => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Smooth continuous axis rotation for the core sphere
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0012;
      meshRef.current.rotation.x += 0.00015;
    }

    // Organic floating motion and subtle branch swaying
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.08;
      // Make branches follow the sphere motion subtly
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.05;
      groupRef.current.rotation.x = Math.cos(t * 0.15) * 0.02;
    }

    // Glow breathing effect
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 1.0 + Math.sin(t * 1.5) * 0.3;
    }
  });

  // Intelligent service placement layout
  const branches = useMemo(() => {
    const services = [
      { label: "FRONTEND", dir: [-1, 0.2, 0.5] },
      { label: "BACKEND", dir: [1, 0.2, 0.5] },
      { label: "3D", dir: [-0.3, 1, 0.2] },
      { label: "UI/UX", dir: [0.3, 1, -0.2] },
      { label: "API", dir: [0.8, 0.6, 0.2] },
      { label: "CLOUD", dir: [1, -0.3, -0.3] },
      { label: "FULL STACK", dir: [-1, -0.4, -0.2] },
      { label: "PERFORMANCE", dir: [0.5, -1, 0.3] },
      { label: "DEPLOYMENT", dir: [-0.5, -1, 0.2] },
      { label: "MOTION", dir: [-0.7, 0.7, -0.1] },
    ];

    return services.map((svc, i) => {
      const points = [];
      const dir = new THREE.Vector3(svc.dir[0], svc.dir[1], svc.dir[2]).normalize();
      
      let currentPos = dir.clone().multiplyScalar(1.2); // Start at surface
      points.push(currentPos.clone());
      
      const length = 2.5 + Math.random() * 1.5;
      const segments = 6;
      
      for (let j = 0; j < segments; j++) {
        // Smooth curved jitter for organic feel
        const jitter = new THREE.Vector3(
          Math.sin(j * 0.5 + i) * 0.2,
          Math.cos(j * 0.4 + i) * 0.2,
          Math.sin(j * 0.6 + i) * 0.2
        );
        // Taper off jitter towards the end
        jitter.multiplyScalar(1 - j / segments);
        
        currentPos.add(dir.clone().multiplyScalar(length / segments)).add(jitter);
        points.push(currentPos.clone());
      }
      return { points, label: svc.label, endPoint: points[points.length - 1] };
    });
  }, []);

  return (
    <group position={[2, 0, 0]} ref={groupRef}>
      {/* Central Cell Body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial 
          ref={materialRef}
          color="#00D9FF" 
          emissive="#00D9FF"
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner glowing core — Living Organic Plasma Blob */}
      <mesh>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial 
          color="#7B61FF"
          speed={1.5}
          distort={0.4}
          radius={1}
          transparent
          opacity={0.6}
          emissive="#7B61FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Secondary Depth Layer */}
      <mesh scale={0.9}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <MeshDistortMaterial 
          color="#5B21FF"
          speed={2}
          distort={0.5}
          radius={1}
          transparent
          opacity={0.3}
          emissive="#5B21FF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Dendrites & Services */}
      {branches.map((branch, index) => (
        <Branch 
          key={index} 
          index={index}
          points={branch.points} 
          label={branch.label} 
          endPoint={branch.endPoint} 
        />
      ))}
    </group>
  );
};

export const NeuralNetwork = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      // Parallax effect based on mouse - kept subtle and cinematic
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.08, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.08, 0.05);
    }
  });

  return (
    <>
      <color attach="background" args={["#0A0A0F"]} />
      <ambientLight intensity={0.2} color="#4FB8FF" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#00D9FF" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#7B61FF" />
      
      <group ref={groupRef}>
        <NeuralCell />
        <Particles count={400} />
      </group>
      
      <PostProcessing />
    </>
  );
};
