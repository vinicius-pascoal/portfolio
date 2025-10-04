"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export type CarouselItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  content?: React.ReactNode; // descrição do projeto (string/JSX)
};

type Props = {
  items: CarouselItem[];
  className?: string;
  tiltDeg?: number;
  durationMs?: number;
  hoverDurationMs?: number;
  cardClassName?: string;
  highlight?: boolean;
  gapPx?: number;
  onFrontChange?: (index: number) => void;
};

const DEFAULT_CARD_TW = "w-40 h-56";

export default function ThreeDCarousel({
  items,
  className,
  tiltDeg = 8,
  durationMs = 32000,
  hoverDurationMs = 14000,
  cardClassName = DEFAULT_CARD_TW,
  highlight = false,
  gapPx = 5,
  onFrontChange,
}: Props) {
  const N = Math.max(1, items.length);
  const step = 360 / N;

  const [offset, setOffset] = useState(0);
  const playing = useRef(true);
  const hovering = useRef(false);
  const raf = useRef<number | null>(null);
  const last = useRef<number | null>(null);

  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number | null>(null);

  useEffect(() => {
    const el = firstCardRef.current;
    if (!el) return;
    const measure = () => setCardWidth(el.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const dynamicRadius = useMemo(() => {
    if (!cardWidth) return 500;
    return (N * (cardWidth + gapPx)) / (2 * Math.PI);
  }, [N, cardWidth, gapPx]);

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
    setOffset((d) => d + dx * 0.35);
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
      if (e.key === "ArrowRight") { setOffset((d) => d - step); playing.current = false; }
      if (e.key === "ArrowLeft") { setOffset((d) => d + step); playing.current = false; }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step]);

  const front = useMemo(() => {
    const norm = ((-offset % 360) + 360) % 360;
    return Math.round(norm / step) % N;
  }, [offset, step, N]);

  const lastFrontRef = useRef<number>(-1);
  useEffect(() => {
    if (front !== lastFrontRef.current) {
      lastFrontRef.current = front;
      onFrontChange?.(front);
    }
  }, [front, onFrontChange]);

  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
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
          className="relative h-full w-full"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 40%",
            transformStyle: "preserve-3d",
          }}
        >
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
              const zLift = highlight && isFront ? 36 : 0;
              const scale = highlight ? (isFront ? 1.06 : 1) : 1;

              return (
                <figure
                  key={String(item.id)}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: `translate(-50%,-50%) rotateY(${ang}deg) translateZ(${dynamicRadius}px)`,
                    willChange: "transform",
                  }}
                >
                  <div
                    ref={i === 0 ? firstCardRef : undefined}
                    className={`group rounded-2xl bg-white/90 shadow-xl ring-1 ring-black/5 backdrop-blur dark:bg-slate-900/80 dark:ring-white/5 overflow-hidden ${cardClassName}`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `translateZ(${zLift}px) scale(${scale})`,
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

                    <div className="flex h-3/5 flex-col justify-start p-3">
                      {item.title && (
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {item.title}
                        </h3>
                      )}
                      {item.content && (
                        <div
                          className="prose prose-xs mt-1 max-w-none text-slate-600 dark:text-slate-300 line-clamp-3 group-hover:line-clamp-none transition-all duration-200"
                          title={typeof item.content === "string" ? item.content : undefined}
                        >
                          {item.content}
                        </div>
                      )}
                    </div>
                  </div>
                </figure>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
        </div>
      </div>

      <span className="sr-only" role="status" aria-live="polite">
        Slide {front + 1} de {N}
      </span>
    </div>
  );
}
