"use client";
// src/app/sections/AboutSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/components/anim";
import paper from "@/images/cartographer.png";
import personalImage from "@/images/perfil.jpg";
import type { PortfolioContent } from "@/lib/portfolioContent";

type AboutSectionProps = {
  isActive: boolean;
  content: PortfolioContent["aboutSection"];
};

export default function AboutSection({ isActive, content }: AboutSectionProps) {
  return (
    <section
      data-section="true"
      data-index={1}
      className="snap-start h-[100svh] w-full flex justify-center items-start md:items-center bg-transparent overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4 pt-8 pb-6 sm:px-6 sm:pt-10 md:px-8 md:py-0">
        <div className="grid items-start gap-5 md:items-center md:grid-cols-2 md:gap-8">
          {/* ESQUERDA — título + texto "sobre mim" */}
          <motion.div
            className="text-center md:text-left"
            initial="hidden"
            animate={isActive ? "show" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-slate-300/80">
              {content.eyebrow}
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl md:mt-2 md:text-5xl font-extrabold text-white drop-shadow">
              {content.title}
            </h2>

            <p className="mx-auto mt-2 max-w-prose text-sm sm:text-base text-slate-300/90 leading-relaxed md:mx-0 md:mt-4">
              {content.paragraphs[0]}
            </p>

            <p className="mx-auto mt-2 max-w-prose text-sm sm:text-base text-slate-300/90 leading-relaxed md:mx-0 md:mt-3">
              {content.paragraphs[1]}
            </p>
          </motion.div>

          {/* DIREITA — cartão visual (estética da seção anterior) */}
          <motion.div
            className="w-full md:justify-self-end md:max-w-2xl"
            initial="hidden"
            animate={isActive ? "show" : "hidden"}
            variants={scaleIn}
          >
            <div
              className="relative mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10 sm:max-w-md md:aspect-square md:max-w-[28rem]"
              style={{
                backgroundImage: `url(${paper.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
              <div className="aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] md:flex-1 md:aspect-auto md:min-h-0">
                <Image
                  src={personalImage}
                  alt="Foto de perfil de Vinicius Pascoal"
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>

              <div className="mt-auto p-4 sm:p-5 md:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-200">
                  Vinicius Pascoal
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300/90">
                  {content.role}
                </p>
              </div>

              {/* sombra/spot para dar profundidade */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto h-16 w-2/3 rounded-[100%] bg-black/10 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
