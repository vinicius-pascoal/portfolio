"use client";

import React, { useEffect, useRef } from "react";

type Mode = 0 | 1 | 2 | 3; // 0: galaxy, 1: waves, 2: side-waves, 3: bubble

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  seed: number;
};

interface ParticlesBackgroundProps {
  mode: Mode;       // vem da página (seção ativa)
  count?: number;
  opacity?: number; // 0..1
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

export default function ParticlesBackground({
  mode,
  count,
  opacity = 0.9,
}: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const partsRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  // Estado de transição
  const activeModeRef = useRef<Mode>(0); // modo “corrente” após transições
  const fromModeRef = useRef<Mode>(0);   // blend origem
  const toModeRef = useRef<Mode>(0);     // blend destino
  const progressRef = useRef(1);         // 0..1 (1 = sem transição)

  // quando prop `mode` muda, inicia uma transição controlada
  if (toModeRef.current !== mode && progressRef.current >= 1) {
    fromModeRef.current = activeModeRef.current;
    toModeRef.current = mode;
    progressRef.current = 0;
  }

  const pickCount = () => {
    if (count) return count;
    const area = window.innerWidth * window.innerHeight;
    return clamp(Math.floor(area / 8000), 140, 480);
  };

  const resizeCanvas = (ctx: CanvasRenderingContext2D) => {
    const { canvas } = ctx;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(canvas.clientWidth * dpr);
    canvas.height = Math.floor(canvas.clientHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const initParticles = (ctx: CanvasRenderingContext2D) => {
    const w = ctx.canvas.clientWidth;
    const h = ctx.canvas.clientHeight;
    const n = pickCount();
    const arr: Particle[] = [];
    for (let i = 0; i < n; i++) {
      arr.push({
        x: rand(0, w),
        y: rand(0, h),
        vx: 0,
        vy: 0,
        size: rand(1, 2.2),
        hue: rand(160, 210),
        seed: Math.random(),
      });
    }
    partsRef.current = arr;
  };

  // Alvo por padrão
  const targetFor = (
    p: Particle,
    i: number,
    modeLocal: Mode,
    w: number,
    h: number,
    t: number
  ) => {
    const cx = w / 2;
    const cy = h / 2;

    switch (modeLocal) {
      // 0 - Galáxia
      case 0: {
        const arms = 3;
        const arm = i % arms;
        const ratio = i / partsRef.current.length;
        const radius = (Math.sqrt(ratio) * 0.45 + 0.05) * Math.min(w, h);
        const baseAngle = ratio * 8 * Math.PI + arm * ((2 * Math.PI) / arms);
        const spin = t * 0.15;
        const angle = baseAngle + spin;
        const jitter = (p.seed - 0.5) * 14;
        return {
          x: cx + Math.cos(angle) * radius + jitter,
          y: cy + Math.sin(angle) * radius + jitter,
        };
      }

      // 1 - Ondas horizontais
      case 1: {
        const cols = Math.max(10, Math.floor(w / 70));
        const col = i % cols;
        const x = ((col + p.seed) / cols) * w;
        const rows = Math.max(8, Math.floor(h / 90));
        const row = Math.floor(i / cols) % rows;
        const ky = (row + 0.5) / (rows + 1);
        const baseY = ky * h;
        const amp = Math.min(120, h * 0.18);
        const lambda = 400 + 200 * p.seed;
        const y = baseY + Math.sin((x / lambda) * Math.PI * 2 + t * 1.2 + row * 0.6) * amp;
        return { x, y };
      }

      // 2 - Ondas vindas das laterais
      case 2: {
        const rows = Math.max(12, Math.floor(h / 60));
        const row = i % rows;
        const y = ((row + 0.5) / rows) * h;
        const fromLeft = ((i + Math.floor(p.seed * 1000)) % 2) === 0;
        const margin = Math.min(120, w * 0.12);
        const drift = lerp(fromLeft ? margin : w - margin, w * 0.5, (Math.sin(t * 0.7 + p.seed * 6) * 0.5 + 0.5));
        const amp = Math.min(130, w * 0.15);
        const lambda = 320 + 160 * p.seed;
        const x = drift + Math.sin((y / lambda) * Math.PI * 2 + t * 1.4 + (fromLeft ? 0 : Math.PI)) * amp;
        return { x, y };
      }

      // 3 - Bolha central “respirando”
      case 3: {
        const rBase = Math.min(w, h) * 0.2;
        const ring = Math.floor(p.seed * 4);
        const radius =
          rBase * (0.2 + ring * 0.2) +
          (p.seed - 0.5) * 18 +
          Math.sin(t * 1.1 + p.seed * 8) * 12;
        const angle = (i / partsRef.current.length) * Math.PI * 8 + p.seed * Math.PI * 2;
        return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
      }
    }
  };

  const tick = (ctx: CanvasRenderingContext2D) => {
    const w = ctx.canvas.clientWidth;
    const h = ctx.canvas.clientHeight;
    const t = (timeRef.current += 0.016);
    const parts = partsRef.current;

    // Avança a transição (se houver)
    if (progressRef.current < 1) {
      progressRef.current = clamp(progressRef.current + 0.025, 0, 1);
      // quando termina, confirma o novo modo como ativo
      if (progressRef.current >= 1) {
        activeModeRef.current = toModeRef.current;
      }
    }

    // Fundo com leve trail
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = 0.22 * opacity;
    ctx.fillStyle = "#0b1020";
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    const fromMode = progressRef.current < 1 ? fromModeRef.current : activeModeRef.current;
    const toMode = progressRef.current < 1 ? toModeRef.current : activeModeRef.current;
    const blend = progressRef.current; // 0..1

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];

      // alvo origem e alvo destino (dinâmicos, dependem de t)
      const f = targetFor(p, i, fromMode, w, h, t);
      const d = targetFor(p, i, toMode,   w, h, t);

      // blend entre os dois alvos → alvo final desta frame
      const tx = lerp(f.x, d.x, blend);
      const ty = lerp(f.y, d.y, blend);

      // força de atração + pequena turbulência
      const ax = (tx - p.x) * 0.06;
      const ay = (ty - p.y) * 0.06;

      const swirl = 0.25 * Math.sin(t * 0.8 + p.seed * 10 + i * 0.002);
      const swirlX = -swirl * (p.y - h / 2) * 0.0006;
      const swirlY =  swirl * (p.x - w / 2) * 0.0006;

      p.vx = (p.vx + ax + swirlX) * 0.9;
      p.vy = (p.vy + ay + swirlY) * 0.9;

      p.x += p.vx;
      p.y += p.vy;

      // wrap suave
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // desenho
      const speed = Math.hypot(p.vx, p.vy);
      const flicker = 0.5 + 0.5 * Math.sin(t * 2 + p.seed * 12);
      const alpha = clamp(0.35 + 0.35 * flicker + 0.2 * (1 - speed), 0.08, 0.95);

      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = alpha * opacity;
      ctx.fillStyle = `hsl(${p.hue}, 70%, 65%)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    rafRef.current = requestAnimationFrame(() => tick(ctx));
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas(ctx);
    initParticles(ctx);

    const onResize = () => resizeCanvas(ctx);
    window.addEventListener("resize", onResize);

    rafRef.current = requestAnimationFrame(() => tick(ctx));
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-screen w-screen block"
      style={{ background: "transparent" }}
    />
  );
}
