"use client";

import { useState, useEffect } from "react";
import { Heart, Sparkles, Gift, PartyPopper } from "lucide-react";

export function BirthdayOverlay() {
  const [showMessage, setShowMessage] = useState(false);
  const [showWishes, setShowWishes] = useState(false);
  const [currentWish, setCurrentWish] = useState(0);

  const wishes = [
    "Happy banget",
    "Makasih cantik",
    "Semoga jadi potong rambut pendeknya",
    "Makasih yahh content bocinya",
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setShowMessage(true), 800);
    const timer2 = setTimeout(() => setShowWishes(true), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  useEffect(() => {
    if (!showWishes) return;
    const interval = setInterval(() => {
      setCurrentWish((prev) => (prev + 1) % wishes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showWishes, wishes.length]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col items-center justify-between p-4 md:p-8">
      {/* Top sparkle badge */}
      <div
        className={`mt-4 flex items-center gap-2 rounded-full border border-[#ffd700]/30 bg-[#1a0a2e]/60 px-4 py-2 backdrop-blur-md transition-all duration-1000 md:mt-8 md:px-6 md:py-3 ${
          showMessage ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
      >
        <Sparkles className="h-4 w-4 text-[#ffd700] md:h-5 md:w-5" />
        <span className="text-xs font-medium tracking-widest text-[#ffd700] uppercase md:text-sm">
          A celebration of you
        </span>
        <Sparkles className="h-4 w-4 text-[#ffd700] md:h-5 md:w-5" />
      </div>

      {/* Center area is empty so 3D scene is visible */}
      <div className="flex-1" />

      {/* Bottom card with wishes */}
      <div
        className={`pointer-events-auto mb-4 w-full max-w-lg transition-all duration-1000 md:mb-8 ${
          showWishes ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-[#ff69b4]/20 bg-[#1a0a2e]/70 p-5 shadow-2xl shadow-[#ff69b4]/10 backdrop-blur-xl md:rounded-3xl md:p-8">
          {/* Rotating wishes */}
          <div className="mb-4 min-h-[3rem] md:mb-6">
            <p
              key={currentWish}
              className="animate-in fade-in slide-in-from-bottom-4 text-center font-[family-name:var(--font-serif)] text-xl leading-relaxed text-[#ffb6c1] duration-700 md:text-3xl"
            >
              {wishes[currentWish]}
            </p>
          </div>

          {/* Decorative divider */}
          <div className="mb-4 flex items-center gap-3 md:mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff69b4]/40 to-transparent" />
            <Heart className="h-4 w-4 text-[#ff69b4] md:h-5 md:w-5" />
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#ff69b4]/40 to-transparent" />
          </div>

          {/* Action hints */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <div className="flex items-center gap-1.5 text-[10px] text-[#ffd700]/60 md:gap-2 md:text-xs">
              <PartyPopper className="h-3 w-3 md:h-4 md:w-4" />
              <span>Drag to explore</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#ffd700]/60 md:gap-2 md:text-xs">
              <Gift className="h-3 w-3 md:h-4 md:w-4" />
              <span>Click the gift</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#ffd700]/60 md:gap-2 md:text-xs">
              <Heart className="h-3 w-3 md:h-4 md:w-4" />
              <span>Hover the cake</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
