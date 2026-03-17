"use client";

import { useEffect, useRef } from "react";

interface SoundWaveProps {
  isActive: boolean;      // call is live
  isAgentTalking: boolean; // drives amplitude
}

const WAVES = [
  { color: "rgba(140, 82, 255, 0.55)", speed: 0.018, phase: 0,     amplitude: 1.0 },
  { color: "rgba(92, 225, 230, 0.45)",  speed: 0.013, phase: 2.1,   amplitude: 0.85 },
  { color: "rgba(200, 100, 255, 0.40)", speed: 0.021, phase: 4.2,   amplitude: 0.70 },
  { color: "rgba(255, 120, 220, 0.35)", speed: 0.010, phase: 1.0,   amplitude: 0.60 },
  { color: "rgba(80, 160, 255, 0.30)",  speed: 0.016, phase: 3.3,   amplitude: 0.75 },
];

export default function SoundWave({ isActive, isAgentTalking }: SoundWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const ampRef = useRef<number>(0);    // current smoothed amplitude
  const targetAmpRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas to fill its container
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const cx = H / 2;

      // Smooth amplitude towards target
      const target = isAgentTalking ? 1 : (isActive ? 0.35 : 0);
      ampRef.current += (target - ampRef.current) * 0.06;

      ctx.clearRect(0, 0, W, H);

      // Glow effect: radial gradient in centre
      if (ampRef.current > 0.05) {
        const grd = ctx.createRadialGradient(W / 2, cx, 0, W / 2, cx, W * 0.45);
        grd.addColorStop(0, `rgba(180, 100, 255, ${0.12 * ampRef.current})`);
        grd.addColorStop(0.5, `rgba(92, 225, 230, ${0.06 * ampRef.current})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, H);
      }

      // Draw each wave
      for (const wave of WAVES) {
        const amp = cx * 0.55 * ampRef.current * wave.amplitude;
        const freq = (2 * Math.PI * 2.2) / W;

        ctx.beginPath();
        ctx.moveTo(0, cx);

        for (let x = 0; x <= W; x += 2) {
          const y =
            cx +
            amp *
              Math.sin(freq * x + timeRef.current * wave.speed * 60 + wave.phase);
          ctx.lineTo(x, y);
        }

        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 3.5;
        ctx.shadowColor = wave.color;
        ctx.shadowBlur = 12 * ampRef.current;
        ctx.stroke();
      }

      timeRef.current += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isActive, isAgentTalking]);

  // Keep target updated when props change
  useEffect(() => {
    targetAmpRef.current = isAgentTalking ? 1 : isActive ? 0.35 : 0;
  }, [isActive, isAgentTalking]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-3xl pointer-events-none"
      style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.8s ease" }}
    />
  );
}
