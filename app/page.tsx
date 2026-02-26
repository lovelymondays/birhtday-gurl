"use client"

import dynamic from "next/dynamic"
import { BirthdayOverlay } from "@/components/birthday/birthday-overlay"
import { SparkleCursor } from "@/components/birthday/sparkle-cursor"

const BirthdayScene = dynamic(
  () =>
    import("@/components/birthday/birthday-scene").then(
      (mod) => mod.BirthdayScene
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0014]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 animate-ping rounded-full bg-[#ff69b4]/30" />
            <div className="absolute inset-2 animate-pulse rounded-full bg-[#ffd700]/50" />
            <div className="absolute inset-4 rounded-full bg-[#ff69b4]" />
          </div>
          <p className="animate-pulse text-sm tracking-widest text-[#ffb6c1]/60 uppercase">
            Preparing your surprise...
          </p>
        </div>
      </div>
    ),
  }
)

export default function BirthdayPage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#0a0014]">
      {/* Radial glow behind the scene */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(255,105,180,0.08) 0%, rgba(10,0,20,0) 70%)",
        }}
      />

      {/* 3D Scene */}
      <BirthdayScene />

      {/* HTML Overlay */}
      <BirthdayOverlay />

      {/* Sparkle trail cursor */}
      <SparkleCursor />
    </main>
  )
}
