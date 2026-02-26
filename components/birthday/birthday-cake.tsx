"use client"

import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function CandleFlame({ position }: { position: [number, number, number] }) {
  const flameRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!flameRef.current) return
    const t = state.clock.elapsedTime
    flameRef.current.scale.y = 1 + Math.sin(t * 8) * 0.2
    flameRef.current.scale.x = 1 + Math.sin(t * 6 + 1) * 0.15
    flameRef.current.position.x = position[0] + Math.sin(t * 4) * 0.02
  })

  return (
    <group position={position}>
      {/* Flame */}
      <mesh ref={flameRef}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff6600"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>
      {/* Glow */}
      <pointLight color="#ff8800" intensity={0.8} distance={2} />
    </group>
  )
}

function Candle({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Candle body */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 8]} />
        <meshStandardMaterial color="#ffe4e1" />
      </mesh>
      {/* Wick */}
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.08, 4]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Flame */}
      <CandleFlame position={[0, 0.38, 0]} />
    </group>
  )
}

export function BirthdayCake() {
  const cakeRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!cakeRef.current) return
    const targetScale = hovered ? 1.08 : 1
    cakeRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    )
    cakeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
  })

  return (
    <group
      ref={cakeRef}
      position={[0, -1.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Plate */}
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[1.8, 1.9, 0.08, 32]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Bottom tier */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[1.4, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#ff85a2" roughness={0.4} />
      </mesh>

      {/* Bottom tier frosting ring */}
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[1.45, 0.08, 12, 32]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.3} />
      </mesh>

      {/* Middle tier */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1, 1.1, 0.7, 32]} />
        <meshStandardMaterial color="#ffb3c6" roughness={0.4} />
      </mesh>

      {/* Middle tier frosting ring */}
      <mesh position={[0, 1.45, 0]}>
        <torusGeometry args={[1.05, 0.06, 12, 32]} />
        <meshStandardMaterial color="#fff5f8" roughness={0.3} />
      </mesh>

      {/* Top tier */}
      <mesh position={[0, 1.75, 0]}>
        <cylinderGeometry args={[0.65, 0.7, 0.55, 32]} />
        <meshStandardMaterial color="#ffc8dd" roughness={0.4} />
      </mesh>

      {/* Top frosting */}
      <mesh position={[0, 2.02, 0]}>
        <cylinderGeometry args={[0.68, 0.68, 0.04, 32]} />
        <meshStandardMaterial color="#fff0f5" roughness={0.2} />
      </mesh>

      {/* Decorative dots on bottom tier */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh
            key={`dot-b-${i}`}
            position={[Math.cos(angle) * 1.42, 0.35, Math.sin(angle) * 1.42]}
          >
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial
              color="#ffd700"
              emissive="#ffd700"
              emissiveIntensity={0.5}
            />
          </mesh>
        )
      })}

      {/* Decorative dots on middle tier */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={`dot-m-${i}`}
            position={[Math.cos(angle) * 1.02, 1.1, Math.sin(angle) * 1.02]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color="#ff69b4"
              emissive="#ff69b4"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}

      {/* Candles */}
      <Candle position={[0, 2.3, 0]} />
      <Candle position={[-0.25, 2.25, 0.2]} />
      <Candle position={[0.25, 2.25, -0.15]} />
      <Candle position={[-0.15, 2.25, -0.25]} />
      <Candle position={[0.2, 2.25, 0.22]} />
    </group>
  )
}
