"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import paper from "@/images/cartographer.png";
import personalImage from "@/images/perfil.jpg";
import ParticlesBackground from "@/components/ParticlesBackground";
import ProjectsCarouselSection from "@/app/sections/ProjectsCarouselSection";
import AboutSection from "@/app/sections/AboutSection";
import SkillsSection from "@/app/sections/SkillsSection";
import ContactSection from "@/app/sections/ContactSection";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { PortfolioContent } from "@/lib/portfolioContent";

type PortfolioPageProps = {
  content: PortfolioContent;
};

export default function PortfolioPage({ content }: PortfolioPageProps) {
  const [mode, setMode] = useState<0 | 1 | 2 | 3>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.lang = content.locale;
  }, [content.locale]);

  useEffect(() => {
    const sections = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-section]") ?? []
    );

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
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

    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, []);

  return (
    <main className="relative">
      <ParticlesBackground mode={mode} opacity={0.9} />

      <LanguageSwitcher
        locale={content.locale}
        labels={content.languageSwitcher.labels}
        ariaLabel={content.languageSwitcher.ariaLabel}
      />

      <header
        className="fixed top-1 right-1 z-20 mx-auto hidden h-fit w-fit overflow-hidden rounded-2xl text-white shadow-xl ring-1 ring-white/10 sm:block"
        style={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
          backgroundImage: `url(${paper.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />

        <div className="relative z-10 flex items-center gap-4 px-4 py-2">
          <div className="text-right">
            <h1 className="text-2xl font-bold">{content.header.name}</h1>
            <p className="text-slate-300">{content.header.role}</p>
          </div>

          <Image
            src={personalImage}
            alt={content.header.name}
            width={50}
            height={50}
            className="mx-auto my-4 rounded-full border-2 border-white/20 shadow-lg"
          />
        </div>
      </header>

      <div
        ref={containerRef}
        className="mobile-snap-container relative h-[100svh] w-full max-w-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory custom-scrollbar"
      >
        <ProjectsCarouselSection isActive={mode === 0} content={content.projectsSection} />
        <AboutSection isActive={mode === 1} content={content.aboutSection} />
        <SkillsSection isActive={mode === 2} content={content.skillsSection} />
        <ContactSection isActive={mode === 3} content={content.contactSection} />
      </div>

      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 text-xs tracking-wide text-slate-300/80">
        {content.footerHintPrefix} {mode + 1}/4
      </div>
    </main>
  );
}
