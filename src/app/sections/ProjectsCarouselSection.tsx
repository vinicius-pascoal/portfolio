
"use client";

import CoverflowCarousel from "@/components/CoverflowCarousel";

const projectMeta: Record<string, { title: string; subtitle: string; href: string }> = {
  "2048": {
    title: "2048",
    subtitle: "Quebra-cabeca numerico classico",
    href: "https://github.com/vinicius-pascoal/2048_game",
  },
  asciiMorph: {
    title: "ASCII Morph",
    subtitle: "Conversor de imagens e GIF para arte ASCII",
    href: "https://github.com/vinicius-pascoal/AsciiMorph",
  },
  "biblioteca-magica": {
    title: "Biblioteca Magica",
    subtitle: "Conversor de pdf para epub",
    href: "https://github.com/vinicius-pascoal/biblioteca-magica",
  },
  geradorRecibos: {
    title: "Gerador de Recibos",
    subtitle: "Criação rápida de recibos em PDF",
    href: "https://github.com/vinicius-pascoal/automacao-recibo-cestas",
  },
  planify: {
    title: "Planify",
    subtitle: "plataforma kanban para organização pessoal e de equipes",
    href: "https://github.com/vinicius-pascoal/Kanban-To-Do-Full-Stack",
  },
  runebound: {
    title: "Runebound",
    subtitle: "jogo no estilo conect-four ",
    href: "https://github.com/vinicius-pascoal/Runebound",
  },
  voidcrypt: {
    title: "Voidcrypt",
    subtitle: "jogo de exploracao de masmorras",
    href: "https://github.com/vinicius-pascoal/Voidcrypt",
  },
};

const imageBase = "/projetos";
const files = ["planify", "2048", "asciiMorph", "biblioteca-magica", "geradorRecibos", "runebound", "voidcrypt"];

const items = files.map((k) => ({
  id: k,
  title: projectMeta[k]?.title,
  subtitle: projectMeta[k]?.subtitle,
  imageUrl: `${imageBase}/${k}.png`,
  href: projectMeta[k]?.href,
}));

export default function ProjectsCarouselSection() {
  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-[100svh] w-full flex justify-center items-start md:items-center bg-transparent text-white"
    >
      <div className="w-full max-w-7xl px-4 pt-16 pb-8 sm:px-6 md:py-0">
        <div className="grid items-center gap-6 md:gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição do atalho */}
          <div className="text-center md:text-left">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-slate-300/80">
              Projetos em destaque
            </p>
            <h2 className="mt-2 text-2xl sm:text-3xl md:text-5xl font-extrabold">
              Meus projetos web
            </h2>
            <p className="mt-3 md:mt-4 mx-auto md:mx-0 max-w-prose text-sm sm:text-base text-slate-300/90 leading-relaxed">
              Aqui estão alguns dos meus projetos web, desenvolvidos com foco em
              usabilidade e design responsivo.
            </p>
          </div>

          {/* DIREITA — carrossel */}
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <CoverflowCarousel items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}
