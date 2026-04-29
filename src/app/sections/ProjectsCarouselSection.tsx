
"use client";

import CoverflowCarousel from "@/components/CoverflowCarousel";
import type { PortfolioContent } from "@/lib/portfolioContent";

type ProjectsCarouselSectionProps = {
  isActive: boolean;
  content: PortfolioContent["projectsSection"];
};

export default function ProjectsCarouselSection({ isActive, content }: ProjectsCarouselSectionProps) {
  void isActive;

  const items = content.projects;

  return (
    <section
      data-section="true"
      data-index={0}
      className="snap-start h-[100svh] w-full flex justify-center items-start md:items-center bg-transparent text-white"
    >
      <div className="w-full max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-10 md:py-0">
        <div className="grid items-center gap-5 md:gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + descrição do atalho */}
          <div className="text-center md:text-left">
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-slate-300/80">
              {content.eyebrow}
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl md:mt-2 md:text-5xl font-extrabold">
              {content.title}
            </h2>
            <p className="mt-2 md:mt-4 mx-auto md:mx-0 max-w-prose text-sm sm:text-base text-slate-300/90 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* DIREITA — carrossel */}
          <div className="w-full max-w-md mx-auto md:max-w-none">
            <CoverflowCarousel items={items} labels={content.carouselLabels} />
          </div>
        </div>
      </div>
    </section>
  );
}
