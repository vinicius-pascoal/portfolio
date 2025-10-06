"use client";
// src/app/sections/AboutSection.tsx
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/components/anim";
import paper from "@/images/cartographer.png";
import personalImage from "@/images/perfil.jpg";

export default function AboutSection() {
  return (
    <section
      data-section="true"
      data-index={1}
      className="snap-start h-screen w-full grid place-items-center bg-transparent"
    >
      <div className="w-full max-w-7xl px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* ESQUERDA — título + texto "sobre mim" */}
          <motion.div
            className="text-left"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-300/80">
              Sobre mim
            </p>
            <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
              Quem sou e o que faço
            </h2>

            <p className="mt-4 max-w-prose text-slate-300/90 leading-relaxed">
              Sou um desenvolvedor apaixonado por criar experiências digitais
              que combinam performance, acessibilidade e design.
            </p>

            <p className="mt-3 max-w-prose text-slate-300/90 leading-relaxed">
              Aqui você encontrará alguns projetos e experimentos que gosto de
              construir no tempo livre, sempre com foco em qualidade e cuidado
              com os detalhes.
            </p>
          </motion.div>

          {/* DIREITA — cartão visual (estética da seção anterior) */}
          <motion.div
            className="md:justify-self-end w-full md:w-[44rem]"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
          >
            <div
              className="relative mx-auto w-72 sm:w-80 md:w-96 rounded-2xl bg-slate-900/70 shadow-xl ring-1 ring-white/10 overflow-hidden"
              style={{
                backgroundImage: `url(${paper.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-400/10 via-transparent to-indigo-500/10" />
              <div className="h-56 w-full overflow-hidden">
                <Image
                  src={personalImage}
                  alt="Foto de perfil de Vinicius Pascoal"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-slate-200">
                  Vinicius Pascoal
                </h3>
                <p className="mt-1 text-sm text-slate-300/90">
                  Desenvolvedor Front-end / Full-stack
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
