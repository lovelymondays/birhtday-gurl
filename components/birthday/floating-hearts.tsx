"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function createHeartShape() {
  const shape = new THREE.Shape()
  const x = 0
  const y = 0
  shape.moveTo(x, y + 0.25)
  shape.bezierCurveTo(x, y + 0.25, x - 0.05, y, x - 0.25, y)
  shape.bezierCurveTo(x - 0.55, y, x - 0.55, y + 0.35, x - 0.55, y + 0.35)
  shape.bezierCurveTo(x - 0.55, y + 0.55, x - 0.35, y + 0.77, x, y + 1)
  shape.bezierCurveTo(x + 0.35, y + 0.77, x + 0.55, y + 0.55, x + 0.55, y + 0.35)
  shape.bezierCurveTo(x + 0.55, y + 0.35, x + 0.55, y, x + 0.25, y)
  shape.bezierCurveTo(x + 0.1, y, x, y + 0.25, x, y + 0.25)
  return shape
}

function Heart({
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
  const meshRef = useRef<THREE.Mesh>(null)
  const heartShape = useMemo(() => createHeartShape(), [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime * speed
    meshRef.current.position.y = position[1] + Math.sin(t + offset) * 0.8
    meshRef.current.position.x = position[0] + Math.cos(t * 0.5 + offset) * 0.3
    meshRef.current.rotation.z = Math.sin(t * 0.3 + offset) * 0.15
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
      <extrudeGeometry
        args={[
          heartShape,
          {
            depth: 0.15,
            bevelEnabled: true,
            bevelSegments: 4,
            bevelSize: 0.04,
            bevelThickness: 0.04,
          },
        ]}
      />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.4}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  )
}

export function FloatingHearts() {
  const hearts = useMemo(
    () => [
      { position: [-3, 2, 1] as [number, number, number], color: "#ff1493", scale: 0.4, speed: 0.5 },
      { position: [4, 3, -1] as [number, number, number], color: "#ff69b4", scale: 0.3, speed: 0.7 },
      { position: [-5, 1, -2] as [number, number, number], color: "#ff85a2", scale: 0.35, speed: 0.6 },
      { position: [5.5, 2.5, 1] as [number, number, number], color: "#ffb6c1", scale: 0.25, speed: 0.8 },
      { position: [0, 5, -3] as [number, number, number], color: "#ff1493", scale: 0.3, speed: 0.55 },
      { position: [-2, 4, 2] as [number, number, number], color: "#ff69b4", scale: 0.2, speed: 0.9 },
    ],
    []
  )

  return (
    <group>
      {hearts.map((props, i) => (
        <Heart key={i} {...props} />
      ))}
    </group>
  )
}
