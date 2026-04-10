
"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import paper from "@/images/cartographer.png";

export type CoverflowItem = {
  id: string | number;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  href?: string;
};

type Props = {
  items: CoverflowItem[];
  className?: string;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function wrapIndex(n: number, length: number) {
  if (length <= 0) return 0;
  return ((n % length) + length) % length;
}

function circularOffset(itemIndex: number, activeIndex: number, length: number) {
  if (length <= 1) return 0;
  let offset = itemIndex - activeIndex;
  const half = Math.floor(length / 2);

  if (offset > half) offset -= length;
  if (offset < -half) offset += length;

  return offset;
}

export default function CoverflowCarousel({ items, className }: Props) {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const go = useCallback((dir: number) => {
    setIndex((i) => wrapIndex(i + dir, items.length));
  }, [items.length]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    setIndex((i) => wrapIndex(i, items.length));
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
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <div className={["relative isolate select-none w-full", className].filter(Boolean).join(" ")} style={{ maxWidth: "100vw" }}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: trackHeight }}
        aria-roledescription="coverflow"
        onTouchStart={isMobile ? onTouchStart : undefined}
        onTouchMove={isMobile ? onTouchMove : undefined}
        onTouchEnd={isMobile ? onTouchEnd : undefined}
      >
        {items.map((item, i) => {
          const offset = circularOffset(i, index, items.length);

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

          const card = (
            <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10">
              <img
                src={item.imageUrl}
                alt={item.title ?? ""}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,18,20,0.0)_30%,rgba(18,18,20,0.38)_55%,rgba(18,18,20,0.78)_100%)]" />

              <div className="absolute inset-x-3 top-3 z-10 rounded-xl border border-white/15 bg-slate-900/65 px-3 py-2 text-white shadow-lg ring-1 ring-black/20 backdrop-blur-sm"
                style={{
                  backgroundImage: `url(${paper.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
                <h3 className="relative z-10 text-[12px] sm:text-sm md:text-base font-extrabold tracking-wide text-slate-100">
                  {item.title ?? ""}
                </h3>
              </div>

              <div className="absolute inset-x-3 bottom-3 z-10 rounded-xl border border-white/15 bg-slate-900/65 p-3 text-white shadow-lg ring-1 ring-black/20 backdrop-blur-sm"
                style={{
                  backgroundImage: `url(${paper.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />

                <div className="relative z-10">
                  {item.subtitle && (
                    <p className="text-[10px] sm:text-[11px] md:text-xs leading-relaxed text-slate-200/90 line-clamp-2">{item.subtitle}</p>
                  )}

                  {item.href && (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex rounded-full border border-white/20 bg-slate-900/70 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-100 md:px-2.5 md:py-1 md:text-[10px] md:tracking-[0.16em]"
                      aria-label={`Visualizar ${item.title ?? "projeto"}`}
                      title={`Visualizar ${item.title ?? "projeto"}`}
                    >
                      <span className="md:hidden">Visualizar</span>
                      <span className="hidden md:inline">Visualizar projeto</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );

          return (
            <figure
              key={String(item.id)}
              className="absolute left-1/2 top-1/2"
              style={{
                width: cardWidth,
                height: cardHeight,
                transform: `translate(-50%, -50%) translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 400ms cubic-bezier(.2,.7,.2,1), opacity 400ms, filter 400ms",
                zIndex: z,
                opacity: visible ? opacity : 0,
                filter: `blur(${blur}px)`,
                pointerEvents: visible && isCenter ? "auto" : "none",
              }}
              aria-hidden={!isCenter}
            >
              {card}
            </figure>
          );
        })}

        {/* Controls (desktop only visible) */}
        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            go(-1);
          }}
          className="absolute left-0 top-0 bottom-0 z-[9999] hidden w-14 items-center justify-center md:flex"
          aria-label="Anterior"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm text-white transition-colors hover:bg-white/30">
            ◀
          </span>
        </button>

        <button
          type="button"
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            go(1);
          }}
          className="absolute right-0 top-0 bottom-0 z-[9999] hidden w-14 items-center justify-center md:flex"
          aria-label="Próximo"
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm text-white transition-colors hover:bg-white/30">
            ▶
          </span>
        </button>
      </div>

      {/* Mobile swipe hint */}
      <div className="mt-2 flex items-center justify-center md:hidden">
        <div
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] tracking-wide text-white/80 backdrop-blur"
        >
          <span className="text-white/70">◀</span>
          <span>Deslize para navegar</span>
          <span className="text-white/70">▶</span>
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
