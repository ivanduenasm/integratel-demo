"use client";

import { useEffect, useState } from "react";

// Female avatar rendered as an inline SVG — no external dependency needed
function FemaleAvatar() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      {/* Background circle */}
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#5C3BE8" />
          <stop offset="100%" stopColor="#1a0a3e" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="#f5c5a3" />
          <stop offset="100%" stopColor="#d4956a" />
        </radialGradient>
        <clipPath id="circleClip">
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>

      {/* BG */}
      <circle cx="50" cy="50" r="50" fill="url(#bgGrad)" />

      {/* Body / shirt */}
      <ellipse cx="50" cy="92" rx="30" ry="20" fill="#8C52FF" clipPath="url(#circleClip)" />

      {/* Neck */}
      <rect x="44" y="58" width="12" height="12" rx="4" fill="url(#skinGrad)" clipPath="url(#circleClip)" />

      {/* Head */}
      <ellipse cx="50" cy="45" rx="20" ry="22" fill="url(#skinGrad)" />

      {/* Hair */}
      <path
        d="M30 38 Q30 15 50 18 Q70 15 70 38 Q68 28 50 27 Q32 28 30 38Z"
        fill="#2d1b00"
      />
      {/* Hair sides */}
      <path d="M30 38 Q27 50 30 60 Q32 50 34 40Z" fill="#2d1b00" />
      <path d="M70 38 Q73 50 70 60 Q68 50 66 40Z" fill="#2d1b00" />

      {/* Eyes */}
      <ellipse cx="42" cy="46" rx="3" ry="3.5" fill="#2d1b00" />
      <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#2d1b00" />
      {/* Eye shine */}
      <circle cx="43.5" cy="44.5" r="1" fill="white" opacity="0.8" />
      <circle cx="59.5" cy="44.5" r="1" fill="white" opacity="0.8" />

      {/* Eyebrows */}
      <path d="M38 41 Q42 39 46 41" stroke="#2d1b00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M54 41 Q58 39 62 41" stroke="#2d1b00" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <path d="M49 50 Q48 55 50 56 Q52 55 51 50" stroke="#c4845a" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* Smile */}
      <path d="M44 60 Q50 65 56 60" stroke="#b0614a" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Small earrings */}
      <circle cx="30" cy="50" r="2" fill="#FFD700" opacity="0.9" />
      <circle cx="70" cy="50" r="2" fill="#FFD700" opacity="0.9" />

      {/* Subtle glow ring */}
      <circle cx="50" cy="50" r="49" fill="none" stroke="#8C52FF" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

export default function WidgetOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Wait for the Retell widget to mount, then hide the original button
    const timer = setTimeout(() => {
      // Find the real Retell button and hide it
      const retellBtn = document.querySelector<HTMLElement>(
        "[id^='retell-widget-button'], button[class*='retell'], div[class*='retell-launcher']"
      );
      if (retellBtn) {
        retellBtn.style.opacity = "0";
        retellBtn.style.pointerEvents = "none";
      }
      setVisible(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Trigger click on the hidden real Retell button
    const retellBtn = document.querySelector<HTMLElement>(
      "[id^='retell-widget-button'], button[class*='retell'], div[class*='retell-launcher']"
    );
    if (retellBtn) {
      retellBtn.style.opacity = "1";
      retellBtn.style.pointerEvents = "auto";
      retellBtn.click();
      // Re-hide it after it opens the modal
      setTimeout(() => {
        retellBtn.style.opacity = "0";
        retellBtn.style.pointerEvents = "none";
      }, 300);
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      aria-label="Abrir chat con Camila"
      className="fixed bottom-6 right-6 z-[9999] w-[60px] h-[60px] rounded-full p-0 border-0 cursor-pointer shadow-[0_4px_20px_rgba(140,82,255,0.5)] hover:shadow-[0_4px_30px_rgba(140,82,255,0.8)] hover:scale-110 transition-all duration-300"
      style={{ background: "none" }}
    >
      <FemaleAvatar />
    </button>
  );
}
