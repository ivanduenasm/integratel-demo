"use client";

import { useEffect, useState } from "react";

function FemaleAvatar() {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
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
      <circle cx="50" cy="50" r="50" fill="url(#bgGrad)" />
      <ellipse cx="50" cy="92" rx="30" ry="20" fill="#8C52FF" clipPath="url(#circleClip)" />
      <rect x="44" y="58" width="12" height="12" rx="4" fill="url(#skinGrad)" clipPath="url(#circleClip)" />
      <ellipse cx="50" cy="45" rx="20" ry="22" fill="url(#skinGrad)" />
      <path d="M30 38 Q30 15 50 18 Q70 15 70 38 Q68 28 50 27 Q32 28 30 38Z" fill="#2d1b00" />
      <path d="M30 38 Q27 50 30 60 Q32 50 34 40Z" fill="#2d1b00" />
      <path d="M70 38 Q73 50 70 60 Q68 50 66 40Z" fill="#2d1b00" />
      <ellipse cx="42" cy="46" rx="3" ry="3.5" fill="#2d1b00" />
      <ellipse cx="58" cy="46" rx="3" ry="3.5" fill="#2d1b00" />
      <circle cx="43.5" cy="44.5" r="1" fill="white" opacity="0.8" />
      <circle cx="59.5" cy="44.5" r="1" fill="white" opacity="0.8" />
      <path d="M38 41 Q42 39 46 41" stroke="#2d1b00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M54 41 Q58 39 62 41" stroke="#2d1b00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M49 50 Q48 55 50 56 Q52 55 51 50" stroke="#c4845a" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path d="M44 60 Q50 65 56 60" stroke="#b0614a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="50" r="2" fill="#FFD700" opacity="0.9" />
      <circle cx="70" cy="50" r="2" fill="#FFD700" opacity="0.9" />
      <circle cx="50" cy="50" r="49" fill="none" stroke="#8C52FF" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

/** Finds the Retell launcher button using multiple strategies */
function findRetellButton(): HTMLElement | null {
  // Strategy 1: look for any element containing an SVG robot icon near bottom-right
  const allButtons = Array.from(document.querySelectorAll<HTMLElement>("button, div[role='button']"));
  
  for (const el of allButtons) {
    const rect = el.getBoundingClientRect();
    const isBottomRight =
      rect.bottom > window.innerHeight - 120 &&
      rect.right > window.innerWidth - 120 &&
      rect.width > 30 &&
      rect.width < 100;

    if (isBottomRight && !el.dataset.customOverlay) {
      return el;
    }
  }

  // Strategy 2: id/class attribute patterns
  const selectors = [
    "[id^='retell']",
    "[class*='retell']",
    "[id*='widget-button']",
    "[class*='widget-launcher']",
    "[class*='chat-launcher']",
    "[class*='chat-button']",
  ];

  for (const sel of selectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el) return el;
  }

  return null;
}

export default function WidgetOverlay() {
  const [retellBtn, setRetellBtn] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let found: HTMLElement | null = null;

    const tryHide = () => {
      found = findRetellButton();
      if (found) {
        found.style.setProperty("display", "none", "important");
        setRetellBtn(found);
        observer.disconnect();
      }
    };

    // Watch for DOM changes (Retell injects the button asynchronously)
    const observer = new MutationObserver(() => tryHide());
    observer.observe(document.body, { childList: true, subtree: true });

    // Also try immediately and with a delay
    tryHide();
    const t1 = setTimeout(tryHide, 1000);
    const t2 = setTimeout(tryHide, 2500);
    const t3 = setTimeout(tryHide, 5000);

    return () => {
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleClick = () => {
    if (!retellBtn) return;
    // Temporarily show & click the real button to open the modal
    retellBtn.style.removeProperty("display");
    retellBtn.click();
    // Re-hide after modal opens
    setTimeout(() => {
      retellBtn.style.setProperty("display", "none", "important");
    }, 400);
  };

  return (
    <button
      onClick={handleClick}
      data-custom-overlay="true"
      aria-label="Abrir chat con Camila"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 2147483647, // max possible z-index
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        padding: 0,
        border: "none",
        background: "none",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(140,82,255,0.55)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1.12)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(140,82,255,0.85)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(140,82,255,0.55)";
      }}
    >
      <FemaleAvatar />
    </button>
  );
}
