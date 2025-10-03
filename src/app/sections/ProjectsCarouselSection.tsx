"use client";

import React, { useEffect, useState } from "react";
import ThreeDCarousel, { CarouselItem } from "@/components/ThreeDCarousel";

type Payload = { files: string[] };

export default function ProjectsCarouselSection() {
  const [items, setItems] = useState<CarouselItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projetos")
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return (await r.json()) as Payload;
      })
      .then((data) => {
        const mapped =
          (data.files || []).map((f) => ({
            id: f,
            title: f.replace(/\.(png|jpe?g|webp|gif|svg)$/i, "").replace(/[-_]/g, " "),
            imageUrl: `/projetos/${f}`,
          })) ?? [];
        setItems(mapped);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-screen w-full grid place-items-center bg-transparent"
    >
      <div className="w-full max-w-6xl px-4">
        <h2 className="text-center text-2xl font-semibold mb-6 text-slate-100">
          Projetos em destaque
        </h2>

        {error && (
          <div className="text-center text-red-300">
            Erro ao carregar projetos: {error}
          </div>
        )}

        {items === null ? (
          <div className="text-center text-slate-300">Carregando...</div>
        ) : items.length > 0 ? (
          <div className="isolate">
            <ThreeDCarousel
              items={items}
              className="mx-auto max-w-5xl"
              /* mais devagar para leitura suave */
              durationMs={36000}
              hoverDurationMs={18000}
              /* anel levemente inclinado e MAIS PRÓXIMO (menor raio) */
              tiltDeg={8}
              radius={420}
              /* CARDS MENORES (encaixam melhor na tela) */
              cardClassName="w-40 h-56 md:w-48 md:h-64"
              /* sem destaque no card da frente */
              highlight={false}
            />
          </div>
        ) : (
          <div className="text-center text-slate-300">
            Adicione imagens em <code>/public/projetos</code> para o carrossel.
          </div>
        )}
      </div>
    </section>
  );
}
