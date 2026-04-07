
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

export type CoverflowItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  imageUrl: string;
};

type Props = {
  items: CoverflowItem[];
  className?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function CoverflowCarousel({ items, className }: Props) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasTouched, setHasTouched] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const go = useCallback((dir: number) => {
    setIndex((i) => clamp(i + dir, 0, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setIndex((i) => clamp(i, 0, Math.max(0, items.length - 1)));
  }, [items.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const trackHeight = isMobile ? 300 : 420;
  const cardWidth = isMobile ? 220 : 320;
  const cardHeight = isMobile ? 270 : 380;
  const spacing = isMobile ? 112 : 160;
  const rotateFactor = isMobile ? -5 : -8;

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
    touchDeltaX.current = 0;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    touchDeltaX.current = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    if (Math.abs(touchDeltaX.current) >= 40) {
      go(touchDeltaX.current < 0 ? 1 : -1);
    }
    if (!hasTouched) setHasTouched(true);
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div className={["relative select-none w-full", className].filter(Boolean).join(" ")} style={{ maxWidth: "100vw" }}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: trackHeight }}
        aria-roledescription="coverflow"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((item, i) => {
          const offset = i - index;

          // style math for coverflow
          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          const translateX = offset * spacing; // spacing between cards
          const rotate = offset * rotateFactor; // slight tilt
          const scale = isCenter ? 1 : 0.9 - Math.min(0.25, abs * 0.05);
          const z = 100 - abs; // stacking

          const opacity = isCenter ? 1 : (isMobile ? 0.28 : 0.45) - Math.min(0.15, (abs - 1) * 0.07);
          const blur = isCenter ? 0 : Math.min(4, abs * 1);
          const visible = abs <= (isMobile ? 1 : 2);

          return (
            <figure
              key={String(item.id)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 400ms cubic-bezier(.2,.7,.2,1), opacity 400ms, filter 400ms",
                zIndex: z,
                opacity: visible ? opacity : 0,
                filter: `blur(${blur}px)`,
                pointerEvents: visible ? "auto" : "none",
              }}
              onClick={() => setIndex(i)}
              aria-hidden={!isCenter}
            >
              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
                {/* image */}
                <img
                  src={item.imageUrl}
                  alt={item.title ?? ""}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,20,0.0)_0%,rgba(18,18,20,0.6)_55%,rgba(18,18,20,0.9)_100%)]" />

                {/* Content */}
                <figcaption className="relative z-10 h-full p-4 md:p-5 grid grid-rows-[auto_1fr_auto] text-white">
                  <div className="mt-2">
                    <h3 className="text-center text-lg md:text-xl font-extrabold tracking-wide">
                      {item.title ?? ""}
                    </h3>
                    <div className="mx-auto mt-2 h-0.5 w-24 rounded bg-cyan-700" />
                  </div>

                  <div />

                  {item.subtitle && (
                    <p className="text-center text-xs sm:text-sm/5 text-white/90">{item.subtitle}</p>
                  )}
                </figcaption>
              </div>
            </figure>
          );
        })}
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-2 flex items-center justify-center md:hidden" aria-hidden={hasTouched}>
        <div
          className={[
            "flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] tracking-wide text-white/80 backdrop-blur",
            hasTouched ? "opacity-0 transition-opacity duration-300" : "opacity-100 animate-pulse",
          ].join(" ")}
        >
          <span className="text-white/70">◀</span>
          <span>Deslize para navegar</span>
          <span className="text-white/70">▶</span>
        </div>
      </div>

      {/* Controls (desktop only visible) */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute inset-y-0 left-0 grid place-items-center">
          <button
            type="button"
            onClick={() => go(-1)}
            className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-2 text-white text-sm"
            aria-label="Anterior"
          >
            ◀
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 grid place-items-center">
          <button
            type="button"
            onClick={() => go(1)}
            className="pointer-events-auto rounded-full bg-white/10 hover:bg-white/20 backdrop-blur px-3 py-2 text-white text-sm"
            aria-label="Próximo"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir para slide ${i + 1}`}
            className={[
              "h-1.5 w-6 rounded-full transition-all",
              i === index ? "bg-white" : "bg-white/30 hover:bg-white/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
