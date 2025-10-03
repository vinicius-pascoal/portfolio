"use client";

import React, { useEffect, useRef, useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";

/**
 * Página com 4 seções em scroll-snap.
 * Cada seção ativa um “modo” do background:
 * 0: galáxia | 1: ondas | 2: ondas laterais | 3: bolha central
 */
export default function Page() {
  const [mode, setMode] = useState<0 | 1 | 2 | 3>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-section]") ?? []
    );

    const io = new IntersectionObserver(
      (entries) => {
        // pega a seção mais visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number((visible.target as HTMLElement).dataset.index || "0");
        setMode(idx as 0 | 1 | 2 | 3);
      },
      {
        root: containerRef.current,
        threshold: [0.3, 0.55, 0.8],
      }
    );

    sections.forEach((sec) => io.observe(sec));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative">
      {/* Background de partículas */}
      <ParticlesBackground mode={mode} opacity={0.9} />

      {/* Container com snap */}
      <div
        ref={containerRef}
        className="relative h-screen w-screen overflow-y-scroll snap-y snap-mandatory"
      >
        {/* Seção 1 - Galáxia */}
        <section
          data-section
          data-index={0}
          className="snap-start h-screen w-full grid place-items-center bg-transparent"
        >
          <div className="text-center px-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300/80">Padrão 1</p>
            <h1 className="mt-2 text-5xl md:text-6xl font-bold text-white drop-shadow">
              Galáxia
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-slate-300/90">
              Partículas em espiral com leve rotação, em braços de galáxia.
              Role para ver a transição suave.
            </p>
          </div>
        </section>

        {/* Seção 2 - Ondas */}
        <section
          data-section
          data-index={1}
          className="snap-start h-screen w-full grid place-items-center bg-transparent"
        >
          <div className="text-center px-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300/80">Padrão 2</p>
            <h2 className="mt-2 text-5xl md:text-6xl font-bold text-white drop-shadow">Ondas</h2>
            <p className="mt-4 max-w-xl mx-auto text-slate-300/90">
              Faixas senoidais horizontais, com movimento contínuo.
            </p>
          </div>
        </section>

        {/* Seção 3 - Ondas das laterais */}
        <section
          data-section
          data-index={2}
          className="snap-start h-screen w-full grid place-items-center bg-transparent"
        >
          <div className="text-center px-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300/80">Padrão 3</p>
            <h2 className="mt-2 text-5xl md:text-6xl font-bold text-white drop-shadow">
              Ondas das Laterais
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-slate-300/90">
              Fluxos senoidais entrando pela esquerda e direita,
              “derivando” até o centro.
            </p>
          </div>
        </section>

        {/* Seção 4 - Bolha central */}
        <section
          data-section
          data-index={3}
          className="snap-start h-screen w-full grid place-items-center bg-transparent"
        >
          <div className="text-center px-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-300/80">Padrão 4</p>
            <h2 className="mt-2 text-5xl md:text-6xl font-bold text-white drop-shadow">
              Bolha Central
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-slate-300/90">
              Aglomeração “respirando” no centro, com anéis concêntricos.
            </p>
          </div>
        </section>
      </div>

      {/* UI de dica de navegação (opcional) */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 text-slate-300/80 text-xs tracking-wide">
        role para navegar • seção {mode + 1}/4
      </div>
    </main>
  );
}
