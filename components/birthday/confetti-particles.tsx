"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const PARTICLE_COUNT = 200
const COLORS = ["#ff69b4", "#ffd700", "#ff1493", "#ffb6c1", "#ffa500", "#ff6347", "#fff0f5"]

export function ConfettiParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        Math.random() * 15 - 2,
        (Math.random() - 0.5) * 15
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        -(Math.random() * 0.02 + 0.005),
        (Math.random() - 0.5) * 0.02
      ),
      rotation: new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
      rotationSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      ),
      scale: Math.random() * 0.08 + 0.03,
      colorIndex: Math.floor(Math.random() * COLORS.length),
    }))
  }, [])

  const colorArray = useMemo(() => {
    const colors = new Float32Array(PARTICLE_COUNT * 3)
    particles.forEach((p, i) => {
      const color = new THREE.Color(COLORS[p.colorIndex])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    })
    return colors
  }, [particles])

  useFrame(() => {
    if (!meshRef.current) return

    particles.forEach((p, i) => {
      p.position.add(p.velocity)
      p.rotation.x += p.rotationSpeed.x
      p.rotation.y += p.rotationSpeed.y
      p.rotation.z += p.rotationSpeed.z

      // Sway
      p.position.x += Math.sin(Date.now() * 0.001 + i) * 0.003

      // Reset if fallen too low
      if (p.position.y < -5) {
        p.position.y = 10 + Math.random() * 5
        p.position.x = (Math.random() - 0.5) * 20
        p.position.z = (Math.random() - 0.5) * 15
      }

      dummy.position.copy(p.position)
      dummy.rotation.copy(p.rotation)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  // Assign instance colors manually after mount
  useFrame(() => {
    if (!meshRef.current) return
    const mesh = meshRef.current
    if (!mesh.instanceColor) {
      const colorAttr = new THREE.InstancedBufferAttribute(colorArray, 3)
      mesh.instanceColor = colorAttr
      mesh.instanceColor.needsUpdate = true
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  )
}
