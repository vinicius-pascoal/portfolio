"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import personalImage from "../images/perfil.jpg";
import paper from "../images/cartographer.png";
import ParticlesBackground from "@/components/ParticlesBackground";
import ProjectsCarouselSection from "@/app/sections/ProjectsCarouselSection";
import AboutSection from "@/app/sections/AboutSection";
import SkillsSection from "@/app/sections/SkillsSection";
import ContactSection from "@/app/sections/ContactSection";

export default function Page() {
  const [mode, setMode] = useState<0 | 1 | 2 | 3>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const sections = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-section]") ?? []
    );

    const io = new IntersectionObserver(
      (entries) => {
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
      <ParticlesBackground mode={mode} opacity={0.9} />
      <header
        className="fixed top-1 right-1 z-20 mx-auto w-fit h-fit text-white rounded-2xl shadow-xl ring-1 ring-white/10  overflow-hidden hidden sm:block"
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
            <h1 className="text-2xl font-bold">Vinicius Pascoal</h1>
            <p className="text-slate-300">Full Stack Developer</p>
          </div>

          <Image
            src={personalImage}
            alt="Vinicius Pascoal"
            width={50}
            height={50}
            className="rounded-full mx-auto my-4 border-2 border-white/20 shadow-lg"
          />
        </div>
      </header>

      {/* Container com snap */}
      <div
        ref={containerRef}
        className="relative h-screen w-screen overflow-x-hidden overflow-y-scroll snap-y snap-mandatory custom-scrollbar"
      >
        {/* Seção 1 - Galáxia */}
        <ProjectsCarouselSection />

        {/* Seção 2 - Ondas */}
        < AboutSection />

        {/* Seção 3 - Ondas das laterais */}
        <SkillsSection />

        {/* Seção 4 - Bolha central */}
        <ContactSection />
      </div>

      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 text-slate-300/80 text-xs tracking-wide">
        role para navegar • seção {mode + 1}/4
      </div>
    </main>
  );
}
