
"use client";

import React, { useMemo } from "react";
import CoverflowCarousel from "@/components/CoverflowCarousel";

const projectMeta: Record<string, { title: string; subtitle: string }> = {
  cardapio: { title: "Cardápio", subtitle: "Menus com fotos e descrições" },
  cestas: { title: "Cestas", subtitle: "E-commerce simples e rápido" },
  crossword: { title: "Crossword", subtitle: "Palavras-cruzadas web" },
  forca: { title: "Forca", subtitle: "Jogo web com teclado virtual" },
  todoList: { title: "To‑Do", subtitle: "Tarefas com persistência" },
};

const imageBase = "/projetos";

export default function ProjectsCarouselSection() {
  const files = ["cardapio", "cestas", "crossword", "forca", "todoList"];
  const items = useMemo(() => {
    return files.map((k) => ({
      id: k,
      title: projectMeta[k]?.title,
      subtitle: projectMeta[k]?.subtitle,
      imageUrl: `${imageBase}/${k}.png`,
    }));
  }, []);

  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-screen w-full grid place-items-center bg-transparent text-white "
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição do atalho */}
          <div className="">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Projetos em destaque
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold">
              Meus projetos web
            </h2>
            <p className="mt-4 max-w-prose text-slate-300/90 leading-relaxed">
              Aqui estão alguns dos meus projetos web, desenvolvidos com foco em
              usabilidade e design responsivo.
            </p>
          </div>

          {/* DIREITA — carrossel */}
          <div className="">
            <CoverflowCarousel items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
