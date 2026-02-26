"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

export function GiftBox() {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const lidRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime

    // Hover bobbing
    groupRef.current.position.y = -1.3 + Math.sin(t * 1.5) * 0.1
    groupRef.current.rotation.y = hovered
      ? groupRef.current.rotation.y + 0.02
      : Math.sin(t * 0.5) * 0.1

    // Lid opening
    if (lidRef.current) {
      const targetRotation = clicked ? -Math.PI * 0.6 : 0
      lidRef.current.rotation.x += (targetRotation - lidRef.current.rotation.x) * 0.05
    }

    // Scale bounce on hover
    const targetScale = hovered ? 1.1 : 1
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.08
    )
  })

  return (
    <group
      ref={groupRef}
      position={[3.2, -1.3, 2]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {/* Box body */}
      <mesh>
        <boxGeometry args={[1, 0.8, 1]} />
        <meshStandardMaterial color="#ff1493" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Ribbon horizontal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.02, 0.15, 0.15]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.2}
          metalness={0.6}
          emissive="#ffd700"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 0.82, 1.02]} />
        <meshStandardMaterial
          color="#ffd700"
          roughness={0.2}
          metalness={0.6}
          emissive="#ffd700"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Lid */}
      <group ref={lidRef} position={[0, 0.4, -0.5]}>
        <mesh position={[0, 0.06, 0.5]}>
          <boxGeometry args={[1.1, 0.12, 1.1]} />
          <meshStandardMaterial color="#ff1493" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Lid ribbon cross */}
        <mesh position={[0, 0.08, 0.5]}>
          <boxGeometry args={[1.12, 0.05, 0.15]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.08, 0.5]}>
          <boxGeometry args={[0.15, 0.05, 1.12]} />
          <meshStandardMaterial color="#ffd700" roughness={0.2} metalness={0.6} />
        </mesh>
        {/* Bow */}
        <mesh position={[0, 0.2, 0.5]}>
          <torusGeometry args={[0.12, 0.04, 8, 16]} />
          <meshStandardMaterial
            color="#ffd700"
            roughness={0.2}
            metalness={0.7}
            emissive="#ffd700"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Sparkle when opened */}
      {clicked && (
        <pointLight
          position={[0, 0.8, 0]}
          color="#ffd700"
          intensity={3}
          distance={4}
        />
      )}
    </group>
  )
}
