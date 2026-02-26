"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Balloon({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number]
  color: string
  scale?: number
  speed?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const initialY = position[1]
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime * speed
    groupRef.current.position.y = initialY + Math.sin(t + offset) * 0.5
    groupRef.current.position.x = position[0] + Math.sin(t * 0.5 + offset) * 0.2
    groupRef.current.rotation.z = Math.sin(t * 0.3 + offset) * 0.1
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Balloon body */}
      <mesh scale={scale}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.3}
          emissive={color}
          emissiveIntensity={0.15}
        />
      </mesh>
      {/* Balloon knot */}
      <mesh position={[0, -0.55 * scale, 0]} scale={scale * 0.3}>
        <coneGeometry args={[0.15, 0.2, 8]} />
        <meshStandardMaterial color={color} roughness={0.3} />
      </mesh>
      {/* String */}
      <mesh position={[0, -1.2 * scale, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.2 * scale, 4]} />
        <meshStandardMaterial color="#cccccc" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

export function FloatingBalloons() {
  const balloons = useMemo(
    () => [
      { position: [-4, 4, -2] as [number, number, number], color: "#ff69b4", scale: 0.9, speed: 0.8 },
      { position: [-2.5, 5.5, -1] as [number, number, number], color: "#ffd700", scale: 1.1, speed: 0.6 },
      { position: [3, 4.5, -2] as [number, number, number], color: "#ff1493", scale: 1, speed: 0.7 },
      { position: [4.5, 5, 0] as [number, number, number], color: "#ffb6c1", scale: 0.8, speed: 0.9 },
      { position: [-3.5, 6, 1] as [number, number, number], color: "#ffa500", scale: 0.7, speed: 1.1 },
      { position: [2, 6.5, -1.5] as [number, number, number], color: "#ff69b4", scale: 0.85, speed: 0.75 },
      { position: [5, 3.5, -3] as [number, number, number], color: "#ffd700", scale: 0.95, speed: 0.65 },
      { position: [-5, 3, -1] as [number, number, number], color: "#ff1493", scale: 0.75, speed: 1 },
    ],
    []
  )

  return (
    <group>
      {balloons.map((props, i) => (
        <Balloon key={i} {...props} />
      ))}
    </group>
  )
}
