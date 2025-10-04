"use client";

import React, { useEffect, useState } from "react";
import ThreeDCarousel, { CarouselItem } from "@/components/ThreeDCarousel";

type Payload = { files: string[] };

const projectMeta: Record<string, { title?: string; description?: string }> = {

  "cardapio": {
    title: "Cardápio Digital",
    description:
      "Aplicativo web para restaurantes exibirem seus menus digitalmente, com fotos e descrições.",
  },
  "cestas": {
    title: "Cestas e Afetos",
    description:
      "E-commerce para venda de cestas personalizadas, com carrinho de compras e checkout.",
  },
  "crossword": {
    title: "Palavras Cruzadas",
    description: "Jogo de palavras cruzadas interativo com diferentes níveis de dificuldade.",
  },
  "forca": {
    title: "Jogo da Forca",
    description: "Jogo clássico da forca com temas variados e dicas para ajudar o jogador.",
  },
  "todoList": {
    title: "Lista de Tarefas",
    description: "Aplicativo simples para gerenciar tarefas diárias com funcionalidades CRUD.",
  },
};

function toSlug(name: string) {
  return name
    .replace(/\.(png|jpe?g|webp|gif|svg)$/i, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

function toTitleFromFilename(name: string) {
  return name
    .replace(/\.(png|jpe?g|webp|gif|svg)$/i, "")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .replace(/^\w/, (m) => m.toUpperCase());
}

export default function ProjectsCarouselSection() {
  const [items, setItems] = useState<CarouselItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/projetos")
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return (await r.json()) as Payload;
      })
      .then((data) => {
        const mapped: CarouselItem[] =
          (data.files || []).map((file) => {
            const slug = toSlug(file);
            const meta = projectMeta[slug] ?? {};
            return {
              id: file,
              title: meta.title ?? toTitleFromFilename(file),
              imageUrl: `/projetos/${file}`,
              // description vai dentro de "content" e aparece no card
              content:
                meta.description ??
                "Descrição breve do projeto. Edite em projectMeta no arquivo ProjectsCarouselSection.tsx.",
            };
          }) ?? [];
        setItems(mapped);
      })
      .catch((e) => setError(e.message));
  }, []);

  const active = items?.[current];

  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-screen w-full grid place-items-center bg-transparent"
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição do projeto ativo */}
          <div className="text-left">
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
          </div>

          {/* DIREITA — carrossel 3D */}
          <div className="md:justify-self-end w-full md:w-[44rem]">
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
                  className="mx-auto"
                  /* sem destaque e GAP EXATO de 5px entre cards */
                  highlight={false}
                  gapPx={5}
                  /* tamanho mais contido para caber melhor na tela */
                  cardClassName="w-36 h-52 md:w-40 md:h-56"
                  /* velocidade suave */
                  durationMs={36000}
                  hoverDurationMs={18000}
                  tiltDeg={8}
                  onFrontChange={setCurrent}
                />
              </div>
            ) : (
              <div className="text-center text-slate-300">
                Adicione imagens em <code>/public/projetos</code> para o carrossel.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
