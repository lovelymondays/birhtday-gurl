"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { Suspense } from "react"
import { FloatingBalloons } from "./floating-balloons"
import { BirthdayCake } from "./birthday-cake"
import { ConfettiParticles } from "./confetti-particles"
import { FloatingHearts } from "./floating-hearts"
import { GiftBox } from "./gift-box"
import { MagicText3D } from "./magic-text-3d"

export function BirthdayScene() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#0a0014"]} />

          {/* Ambient & directional lights */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1} color="#ffeedd" />
          <pointLight position={[-3, 5, 2]} intensity={1.5} color="#ff69b4" />
          <pointLight position={[3, 3, -2]} intensity={1} color="#ffd700" />
          <pointLight position={[0, -2, 4]} intensity={0.5} color="#ff1493" />

          {/* Starfield background */}
          <Stars
            radius={50}
            depth={60}
            count={3000}
            factor={4}
            saturation={0.5}
            fade
            speed={1.5}
          />

          {/* 3D Text */}
          <MagicText3D />

          {/* Birthday Cake */}
          <BirthdayCake />

          {/* Gift Box */}
          <GiftBox />

          {/* Floating Balloons */}
          <FloatingBalloons />

          {/* Confetti */}
          <ConfettiParticles />

          {/* Floating Hearts */}
          <FloatingHearts />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
