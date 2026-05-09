import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const Particles = ({ count = 400 }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 500;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -40 + Math.random() * 80;
      const size = 0.02 + Math.random() * 0.08;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, size });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    const { pointer } = state;
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor, size } = particle;
      t = particle.t += speed;
      
      const s = Math.cos(t) * size;
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10 + pointer.x * 2,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10 + pointer.y * 2,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial 
        color="#FFFFFF" 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
};
