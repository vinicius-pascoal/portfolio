"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type CarouselItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  content?: React.ReactNode;
};

type Props = {
  items: CarouselItem[];
  className?: string;
  /** Distância do anel à câmera (px). Menor = cartas mais próximas visualmente. */
  radius?: number;
  /** Pequena inclinação do anel para evidenciar a profundidade. */
  tiltDeg?: number;
  /** Duração base de uma volta (ms). Quanto maior, mais devagar. */
  durationMs?: number;
  /** Duração quando hover (ms). */
  hoverDurationMs?: number;
  /** Tamanho dos cards via Tailwind (ex.: "w-48 h-64"). */
  cardClassName?: string;
  /** Remove destaque do card da frente (scale/brightness/lift). */
  highlight?: boolean;
};

const DEFAULT_CARD_TW = "w-64 h-80";

export default function ThreeDCarousel({
  items,
  className,
  radius = 600,
  tiltDeg = 10,
  durationMs = 16000,
  hoverDurationMs = 6000,
  cardClassName = DEFAULT_CARD_TW,
  highlight = true,
}: Props) {
  const N = Math.max(1, items.length);
  const step = 360 / N;

  // rotação global do anel (em graus)
  const [offset, setOffset] = useState(0);
  const playing = useRef(true);
  const hovering = useRef(false);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  // autoplay estilo @keyframes (uma volta completa)
  useEffect(() => {
    const loop = (t: number) => {
      if (last.current == null) last.current = t;
      const dt = t - last.current;
      last.current = t;

      const dur = hovering.current ? hoverDurationMs : durationMs;
      const degPerMs = 360 / Math.max(2000, dur);
      if (playing.current && N > 1) setOffset((d) => d - degPerMs * dt);

      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
      last.current = null;
    };
  }, [N, durationMs, hoverDurationMs]);

  // Drag / Wheel / Teclado (permanece — só removemos UI de controle)
  const drag = useRef({ on: false, x: 0 });
  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { on: true, x: e.clientX };
    playing.current = false;
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!drag.current.on) return;
    const dx = e.clientX - drag.current.x;
    drag.current.x = e.clientX;
    setOffset((d) => d + dx * 0.35); // px -> graus
  };
  const onPointerUp: React.PointerEventHandler<HTMLDivElement> = () => {
    drag.current.on = false;
  };
  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const s = e.deltaY !== 0 ? e.deltaY : -e.deltaX;
    setOffset((d) => d + (s > 0 ? step : -step));
    playing.current = false;
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setOffset((d) => d - step);
        playing.current = false;
      }
      if (e.key === "ArrowLeft") {
        setOffset((d) => d + step);
        playing.current = false;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  // índice aproximado do card "da frente" (pode ser útil a quem use fora)
  const front = useMemo(() => {
    const norm = ((-offset % 360) + 360) % 360; // 0° = frente
    return Math.round(norm / step) % N;
  }, [offset, step, N]);

  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      {/* Isolador + Stage com perspectiva real */}
      <div
        className="relative mx-auto grid h-[30rem] w-full place-items-center isolate"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        role="region"
        aria-roledescription="Carrossel 3D"
      >
        <div
          className="relative h-full w-full max-w-6xl"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 40%",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Anel 3D */}
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tiltDeg}deg) rotateY(${offset}deg)`,
              willChange: "transform",
            }}
          >
            {items.map((item, i) => {
              const ang = i * step;
              const isFront = i === front;

              // Destaque opcional
              const zLift = highlight && isFront ? 36 : 0;
              const scale = highlight ? (isFront ? 1.08 : 1) : 1;
              const brightness = highlight ? (isFront ? 1 : 1) : 1;

              return (
                <figure
                  key={String(item.id)}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translate(-50%,-50%) rotateY(${ang}deg) translateZ(${radius}px)`,
                    willChange: "transform",
                  }}
                >
                  <div
                    className={`rounded-2xl bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-slate-900/80 dark:ring-white/5 overflow-hidden ${cardClassName}`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${zLift}px) scale(${scale})`,
                      filter: `brightness(${brightness})`,
                      backfaceVisibility: "hidden",
                      willChange: "transform, filter",
                    }}
                  >
                    {item.imageUrl ? (
                      <div className="h-2/5 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.imageUrl}
                          alt={item.title ?? "imagem"}
                          className="h-full w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    ) : (
                      <div className="h-2/5 w-full bg-gradient-to-br from-sky-400/40 to-indigo-500/40" />
                    )}

                    <div className="flex h-3/5 flex-col justify-between p-4">
                      <div>
                        {item.subtitle && (
                          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        )}
                        {item.title && (
                          <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </h3>
                        )}
                        {item.content && (
                          <div className="prose prose-sm mt-2 line-clamp-4 max-w-none dark:prose-invert">
                            {item.content}
                          </div>
                        )}
                      </div>
                      {/* removido: botões/controles dentro do card */}
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>

          {/* sombra no “chão” */}
          <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
        </div>
      </div>

      {/* removido: paginação (bolinhas) e controles superiores */}
      <span className="sr-only" role="status" aria-live="polite">
        Slide {front + 1} de {N}
      </span>
    </div>
  );
}
