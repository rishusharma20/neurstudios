import { useRef, useMemo } from "react";
import { useFrame, useThree, extend } from "@react-three/fiber";
import * as THREE from "three";
import { Particles } from "./Particles";
import { PostProcessing } from "./PostProcessing";
import { Line, Html, shaderMaterial } from "@react-three/drei";

declare module "@react-three/fiber" {
  interface ThreeElements {
    amoebaMaterialBase: any;
  }
}

const AmoebaMaterialBase = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#7B61FF"),
    uGlowColor: new THREE.Color("#5B21FF"),
    uOpacity: 0.6,
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vNoise;
    uniform float uTime;

    // Simplex 3D Noise
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 1.0/7.0;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      
      // Multi-layered organic turbulence
      // Layer 1: Large scale shape deformation (Amoeba body)
      float noiseLrg = snoise(position * 0.8 + uTime * 0.3);
      
      // Layer 2: Medium scale surface ripples (Edge detail)
      float noiseMed = snoise(position * 2.5 - uTime * 0.5);
      
      // Layer 3: High frequency micro-wobble (Energy buzz)
      float noiseSml = snoise(position * 5.0 + uTime * 1.2);
      
      vNoise = noiseLrg * 0.6 + noiseMed * 0.3 + noiseSml * 0.1;
      
      // Constant high-energy distortion (Never returns to circle)
      float displacement = (noiseLrg * 0.35) + (noiseMed * 0.1) + (noiseSml * 0.02);
      
      // Add a slow overall "breathing" expansion
      displacement += sin(uTime * 0.8) * 0.05;
      
      vec3 newPosition = position + normal * displacement;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vNoise;
    uniform float uTime;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    uniform float uOpacity;

    void main() {
      // Fresnel-like glow effect
      float fresnel = pow(1.0 - dot(vNormal, vec3(0, 0, 1)), 2.5);
      
      // Dynamic Plasma Vortex Flow
      vec2 center = vUv - 0.5;
      float angle = atan(center.y, center.x);
      float dist = length(center);
      
      // Create swirling energy bands
      float swirl = sin(angle * 3.0 + dist * 10.0 - uTime * 2.0);
      float plasma = snoise(vec3(vUv * 3.0, uTime * 0.5));
      
      vec3 color = mix(uColor, uGlowColor, plasma * 0.5 + 0.5);
      color = mix(color, uGlowColor * 1.5, swirl * 0.2 + 0.2);
      color += vec3(fresnel * 0.8);
      
      // Add shimmering energy currents
      float currents = sin(vNoise * 15.0 + uTime * 3.0) * 0.1;
      color += currents;

      gl_FragColor = vec4(color, uOpacity + fresnel * 0.4);
    }
  `
);

extend({ AmoebaMaterialBase });

const AmoebaMaterial = () => {
  const materialRef = useRef<any>(null);
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.getElapsedTime();
    }
  });

  return (
    <amoebaMaterialBase 
      ref={materialRef} 
      transparent 
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  );
};

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
      
      {/* Inner glowing core — High-Fidelity Organic Amoeba Shader */}
      <mesh>
        <sphereGeometry args={[0.8, 128, 128]} />
        <AmoebaMaterial />
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
