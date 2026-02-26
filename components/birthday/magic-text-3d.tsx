"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";

export function MagicText3D() {
  const textRef = useRef<THREE.Group>(null);
  const subTextRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (textRef.current) {
      const t = state.clock.elapsedTime;
      textRef.current.position.y = 3.5 + Math.sin(t * 0.8) * 0.15;
      // Gentle shimmer via emissive
      textRef.current.children.forEach((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.emissiveIntensity = 0.3 + Math.sin(t * 2) * 0.15;
        }
      });
    }
    if (subTextRef.current) {
      const t = state.clock.elapsedTime;
      subTextRef.current.position.y = 2.2 + Math.sin(t * 0.8 + 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Main title */}
      <group ref={textRef} position={[0, 3.5, 0]}>
        <Center>
          <Text3D
            font="/fonts/Inter_Bold.json"
            size={0.7}
            height={0.15}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelSegments={5}
          >
            {"Happy Birthday!"}
            <meshStandardMaterial
              color="#ffd700"
              roughness={0.2}
              metalness={0.8}
              emissive="#ffa500"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>

      {/* Sub text */}
      <group ref={subTextRef} position={[0, 2.2, 0]}>
        <Center>
          <Text3D
            font="/fonts/Inter_Regular.json"
            size={0.32}
            height={0.06}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
            bevelSegments={3}
          >
            {"Bernadita RV"}
            <meshStandardMaterial
              color="#ff69b4"
              roughness={0.3}
              metalness={0.5}
              emissive="#ff69b4"
              emissiveIntensity={0.2}
            />
          </Text3D>
        </Center>
      </group>
    </>
  );
}
