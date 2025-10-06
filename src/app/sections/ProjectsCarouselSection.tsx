// src/app/sections/ProjectsCarouselSection.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/components/anim";
import ThreeDCarousel, { CarouselItem } from "@/components/ThreeDCarousel";

const projectMeta: Record<string, { title?: string; description?: string }> = {
  cardapio: {
    title: "Cardápio Digital",
    description:
      "Aplicativo web para restaurantes exibirem seus menus digitalmente, com fotos e descrições.",
  },
  cestas: {
    title: "Cestas",
    description:
      "Landing page para vendas de cestas de presentes com catálogo visual responsivo.",
  },
  crossword: {
    title: "Crossword",
    description:
      "Jogo de palavras cruzadas com validação e dicas em tempo real.",
  },
  forca: {
    title: "Jogo da Forca",
    description:
      "Versão web do jogo da forca com animações e contagem de erros.",
  },
  todoList: {
    title: "Todo List",
    description:
      "Gerenciador de tarefas com filtros, persistência e layout minimalista.",
  },
};

export default function ProjectsCarouselSection() {
  // imagens disponíveis em /public/projetos
  const files = ["cardapio.png", "cestas.png", "crossword.png", "forca.png", "todoList.png"];

  const items: CarouselItem[] = useMemo(() => {
    return files.map((f, i) => {
      const key = f.replace(/\.(png|jpg|jpeg|webp)$/i, "");
      const meta = projectMeta[key] ?? {};
      return {
        id: i,
        title: meta.title ?? key,
        subtitle: undefined,
        imageUrl: `/projetos/${f}`,
        content: meta.description ?? "",
      };
    });
  }, []);

  const [current, setCurrent] = useState<number>(0);
  const active = items[current] ?? items[0];

  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-screen w-full grid place-items-center bg-transparent"
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição do ativo */}
          <motion.div
            className="text-left"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Projeto em Destaque
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
              {active?.title ?? "—"}
            </h2>
            <p className="mt-4 max-w-prose text-slate-300/90 leading-relaxed">
              {typeof active?.content === "string"
                ? active?.content
                : "Selecione ou aguarde o carrossel girar para visualizar informações do projeto."}
            </p>
          </motion.div>

          {/* DIREITA — carrossel 3D */}
          <motion.div
            className="md:justify-self-end w-full md:w-[44rem]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            {items.length > 0 ? (
              <div className="mx-auto w-full max-w-[44rem]">
                <ThreeDCarousel
                  items={items}
                  gapPx={5}
                  highlight={false}
                  durationMs={36000}
                  hoverDurationMs={18000}
                  cardClassName="w-36 h-52 md:w-40 md:h-56"
                  onFrontChange={setCurrent}
                />
              </div>
            ) : (
              <div className="text-center text-slate-300">
                Adicione imagens em <code>/public/projetos</code> para o carrossel.
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
