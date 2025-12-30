
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

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
  const trackRef = useRef<HTMLDivElement | null>(null);

  const go = (dir: number) => {
    setIndex((i) => clamp(i + dir, 0, items.length - 1));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={["relative select-none w-full", className].filter(Boolean).join(" ")} style={{ maxWidth: "100vw" }}>
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-[360px] md:h-[420px] w-full"
        aria-roledescription="coverflow"
      >
        {items.map((item, i) => {
          const offset = i - index;

          // style math for coverflow
          const isCenter = offset === 0;
          const abs = Math.abs(offset);
          const translateX = offset * 160; // spacing between cards
          const rotate = offset * -8; // slight tilt
          const scale = isCenter ? 1 : 0.9 - Math.min(0.25, abs * 0.05);
          const z = 100 - abs; // stacking

          const opacity = isCenter ? 1 : 0.45 - Math.min(0.15, (abs - 1) * 0.07);
          const blur = isCenter ? 0 : Math.min(4, abs * 1);

          return (
            <figure
              key={String(item.id)}
              className="absolute left-1/2 top-1/2 w-[280px] h-[340px] md:w-[320px] md:h-[380px] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`,
                transition: "transform 400ms cubic-bezier(.2,.7,.2,1), opacity 400ms, filter 400ms",
                zIndex: z,
                opacity,
                filter: `blur(${blur}px)`,
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
                <figcaption className="relative z-10 h-full p-5 grid grid-rows-[auto_1fr_auto] text-white">
                  <div className="mt-2">
                    <h3 className="text-center text-xl font-extrabold tracking-wide">
                      {item.title ?? ""}
                    </h3>
                    <div className="mx-auto mt-2 h-0.5 w-24 rounded bg-cyan-700" />
                  </div>

                  <div />

                  {item.subtitle && (
                    <p className="text-center text-sm/5 text-white/90">{item.subtitle}</p>
                  )}
                </figcaption>
              </div>
            </figure>
          );
        })}
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
