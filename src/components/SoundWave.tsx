"use client";

import { useEffect, useRef } from "react";

interface SoundWaveProps {
  isActive: boolean;
  isAgentTalking: boolean;
}

// Each wave: color, how fast it scrolls (radians/sec), starting phase offset, relative amplitude
const WAVES = [
  { color: "rgba(140, 82, 255, 0.60)", speed: 0.9,  phase: 0.0,  amp: 1.00 },
  { color: "rgba(92, 225, 230, 0.50)",  speed: 0.65, phase: 1.2,  amp: 0.80 },
  { color: "rgba(210, 90, 255, 0.45)",  speed: 1.10, phase: 2.5,  amp: 0.70 },
  { color: "rgba(255, 110, 200, 0.35)", speed: 0.50, phase: 4.0,  amp: 0.55 },
  { color: "rgba(70, 160, 255, 0.30)",  speed: 0.75, phase: 3.1,  amp: 0.65 },
];

export default function SoundWave({ isActive, isAgentTalking }: SoundWaveProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const ampRef     = useRef(0);       // smoothed amplitude 0→1
  const startRef   = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.resetTransform();
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      // Initialise timer on first frame
      if (startRef.current === null) startRef.current = now;
      const elapsed = (now - startRef.current) / 1000; // seconds

      const W   = canvas.offsetWidth;
      const H   = canvas.offsetHeight;
      const mid = H / 2;

      // Smoothly lerp amplitude toward target
      const target = isAgentTalking ? 1.0 : isActive ? 0.30 : 0.0;
      ampRef.current += (target - ampRef.current) * 0.03; // slow lerp

      ctx.clearRect(0, 0, W, H);

      // Centre glow
      if (ampRef.current > 0.02) {
        const grd = ctx.createRadialGradient(W / 2, mid, 0, W / 2, mid, W * 0.4);
        grd.addColorStop(0,   `rgba(160, 90, 255, ${0.15 * ampRef.current})`);
        grd.addColorStop(0.5, `rgba(92, 225, 230, ${0.07 * ampRef.current})`);
        grd.addColorStop(1,   "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }

      const maxAmp  = mid * 0.50; // never exceed 50% of half-height
      const freqCyc = 2.5;        // how many full wave cycles fit across the width

      for (const wave of WAVES) {
        const amplitude = maxAmp * ampRef.current * wave.amp;
        // frequency in radians per pixel
        const freq = (2 * Math.PI * freqCyc) / W;

        ctx.beginPath();
        for (let x = 0; x <= W; x += 1.5) {
          const angle = freq * x + wave.speed * elapsed + wave.phase;
          const y     = mid + amplitude * Math.sin(angle);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth   = 3;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur  = amplitude > 1 ? 14 : 0;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  // Re-run effect only when activity changes so the timer resets cleanly
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, isAgentTalking]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none"
      style={{
        opacity:    isActive ? 1 : 0,
        transition: "opacity 1s ease",
      }}
    />
  );
}
